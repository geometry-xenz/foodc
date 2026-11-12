/**
 * Goal and metabolic calculation engine.
 * Implements Mifflin-St Jeor formula, TDEE, 8 fitness protocols, and safety bounds.
 */

export function calculateBmr(
  gender: string,
  weightKg: number,
  heightCm: number,
  age: number
): number {
  const base = 10.0 * weightKg + 6.25 * heightCm - 5.0 * age;
  if ((gender || "").toLowerCase() === "male") {
    return Math.round((base + 5.0) * 10) / 10;
  } else {
    return Math.round((base - 161.0) * 10) / 10;
  }
}

export function calculateTdee(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const multiplier = multipliers[(activityLevel || "").toLowerCase()] ?? 1.55;
  return Math.round(bmr * multiplier * 10) / 10;
}

export function calculateMacroTargets(
  gender: string,
  weightKg: number,
  heightCm: number,
  age: number,
  activityLevel: string,
  goal: string,
  overrides?: Record<string, number>
) {
  const bmr = calculateBmr(gender, weightKg, heightCm, age);
  const tdee = calculateTdee(bmr, activityLevel);

  const genderFloor = (gender || "").toLowerCase() === "male" ? 1500.0 : 1200.0;
  const absoluteCalorieFloor = Math.max(bmr, genderFloor);

  const warnings: string[] = [];
  const goalKey = (goal || "lean_bulk").toLowerCase().trim();

  let targetCalories = tdee;
  let proteinG = weightKg * 1.8;
  let fatG = (targetCalories * 0.25) / 9.0;
  let carbsG = 150.0;

  if (goalKey === "fat_loss") {
    targetCalories = tdee * 0.8;
    proteinG = weightKg * 2.2;
    fatG = Math.max(35.0, (targetCalories * 0.25) / 9.0);
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(50.0, remainingKcal / 4.0);
  } else if (goalKey === "lean_bulk") {
    targetCalories = tdee * 1.1;
    proteinG = weightKg * 2.0;
    fatG = (targetCalories * 0.25) / 9.0;
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(100.0, remainingKcal / 4.0);
  } else if (goalKey === "bulk") {
    targetCalories = tdee * 1.15;
    proteinG = weightKg * 1.9;
    fatG = (targetCalories * 0.28) / 9.0;
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(150.0, remainingKcal / 4.0);
  } else if (goalKey === "dirty_bulk") {
    targetCalories = tdee * 1.25;
    proteinG = weightKg * 1.8;
    fatG = (targetCalories * 0.32) / 9.0;
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(200.0, remainingKcal / 4.0);
    warnings.push("Dirty bulk protocol carries higher adipose accumulation trade-offs.");
  } else if (goalKey === "recomposition") {
    targetCalories = tdee * 0.95;
    proteinG = weightKg * 2.3;
    fatG = (targetCalories * 0.25) / 9.0;
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(80.0, remainingKcal / 4.0);
  } else if (goalKey === "athletic_performance") {
    targetCalories = tdee * 1.05;
    proteinG = weightKg * 1.8;
    carbsG = weightKg * 5.5;
    const remainingKcal = targetCalories - (proteinG * 4.0 + carbsG * 4.0);
    fatG = Math.max(40.0, remainingKcal / 9.0);
  } else if (goalKey === "general_health") {
    targetCalories = tdee;
    proteinG = (targetCalories * 0.25) / 4.0;
    fatG = (targetCalories * 0.25) / 9.0;
    carbsG = (targetCalories * 0.5) / 4.0;
  } else {
    // maintenance
    targetCalories = tdee;
    proteinG = weightKg * 1.7;
    fatG = (targetCalories * 0.28) / 9.0;
    const remainingKcal = targetCalories - (proteinG * 4.0 + fatG * 9.0);
    carbsG = Math.max(100.0, remainingKcal / 4.0);
  }

  if (targetCalories < absoluteCalorieFloor) {
    warnings.push(
      `Calculated intake (${Math.round(targetCalories)} kcal) was below safety threshold (${Math.round(absoluteCalorieFloor)} kcal). Adjusted to biological minimum.`
    );
    targetCalories = absoluteCalorieFloor;
  }

  let isOverride = false;
  if (overrides) {
    isOverride = true;
    if (overrides.calories) targetCalories = Number(overrides.calories);
    if (overrides.protein_g) proteinG = Number(overrides.protein_g);
    if (overrides.carbs_g) carbsG = Number(overrides.carbs_g);
    if (overrides.fat_g) fatG = Number(overrides.fat_g);
  }

  const roundedBmr = Math.round(bmr);
  const roundedTdee = Math.round(tdee);
  const roundedCal = Math.round(targetCalories);
  const roundedPro = Math.round(proteinG * 10) / 10;
  const roundedCarb = Math.round(carbsG * 10) / 10;
  const roundedFat = Math.round(fatG * 10) / 10;

  return {
    bmr_kcal: roundedBmr,
    tdee_kcal: roundedTdee,
    target_calories_kcal: roundedCal,
    target_protein_g: roundedPro,
    target_carbs_g: roundedCarb,
    target_fat_g: roundedFat,
    target_fiber_g: 30.0,
    bmr: roundedBmr,
    tdee: roundedTdee,
    targetCalories: roundedCal,
    targetProteinG: roundedPro,
    targetCarbsG: roundedCarb,
    targetFatG: roundedFat,
    targetFibreG: 30.0,
    is_override: isOverride,
    warnings,
    provenance: "calculated",
  };
}
