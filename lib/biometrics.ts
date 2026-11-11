/**
 * Biometrics, BMI, Macro & Micronutrient Engine.
 * Implements Mifflin-St Jeor equation, WHO/CDC BMI categories,
 * macro nutrient targets, and key micronutrient daily reference values (DRVs).
 */

export interface BiometricProfile {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: "male" | "female" | "other";
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  primaryGoal: "fat_loss" | "lean_bulk" | "bulk" | "recomposition" | "maintenance" | "athletic_performance";
}

export interface BmiAnalysis {
  bmi: number;
  category: "Underweight" | "Normal weight" | "Overweight" | "Obesity Class I" | "Obesity Class II+";
  healthyWeightRangeKg: { min: number; max: number };
  color: string;
}

export interface MicronutrientTarget {
  name: string;
  category: "Minerals" | "Vitamins" | "Electrolytes";
  target: number;
  unit: string;
  benefits: string;
  keySources: string[];
}

export interface FullNutritionalPlan {
  biometrics: BiometricProfile;
  bmi: BmiAnalysis;
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    proteinG: number;
    carbsG: number;
    fatG: number;
    fibreG: number;
    proteinKcal: number;
    carbsKcal: number;
    fatKcal: number;
    percentages: { protein: number; carbs: number; fat: number };
  };
  micros: MicronutrientTarget[];
  waterIntakeLiters: number;
}

export function computeBmi(weightKg: number, heightCm: number): BmiAnalysis {
  const heightM = Math.max(heightCm / 100, 0.5);
  const rawBmi = weightKg / (heightM * heightM);
  const bmi = Math.round(rawBmi * 10) / 10;

  const minHealthyWeight = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxHealthyWeight = Math.round(24.9 * heightM * heightM * 10) / 10;

  let category: BmiAnalysis["category"] = "Normal weight";
  let color = "#8FA989"; // Calming sage green

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#E8B56A";
  } else if (bmi >= 18.5 && bmi < 25.0) {
    category = "Normal weight";
    color = "#8FA989";
  } else if (bmi >= 25.0 && bmi < 30.0) {
    category = "Overweight";
    color = "#E59E6B";
  } else if (bmi >= 30.0 && bmi < 35.0) {
    category = "Obesity Class I";
    color = "#D96A1F";
  } else {
    category = "Obesity Class II+";
    color = "#E2705A";
  }

  return {
    bmi,
    category,
    healthyWeightRangeKg: { min: minHealthyWeight, max: maxHealthyWeight },
    color,
  };
}

export function computeBmr(weightKg: number, heightCm: number, age: number, gender: string): number {
  const isFemale = String(gender).toLowerCase() === "female";
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round((isFemale ? base - 161 : base + 5) * 10) / 10;
}

export function computeTdee(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const factor = multipliers[activityLevel.toLowerCase()] || 1.55;
  return Math.round(bmr * factor);
}

export function getMicronutrientTargets(gender: string = "male"): MicronutrientTarget[] {
  const isFemale = gender.toLowerCase() === "female";
  return [
    {
      name: "Iron",
      category: "Minerals",
      target: isFemale ? 18 : 8,
      unit: "mg",
      benefits: "Hemoglobin oxygen transport & cellular energy production",
      keySources: ["Spinach", "Lentils", "Chickpeas", "Sesame seeds", "Tofu"],
    },
    {
      name: "Calcium",
      category: "Minerals",
      target: 1000,
      unit: "mg",
      benefits: "Bone mineral density & neuromuscular signaling",
      keySources: ["Yogurt", "Paneer", "Milk", "Ragi", "Almonds"],
    },
    {
      name: "Zinc",
      category: "Minerals",
      target: isFemale ? 8 : 11,
      unit: "mg",
      benefits: "Immune defense, enzymatic synthesis & testosterone balance",
      keySources: ["Pumpkin seeds", "Cashews", "Yogurt", "Lentils"],
    },
    {
      name: "Potassium",
      category: "Electrolytes",
      target: 3400,
      unit: "mg",
      benefits: "Blood pressure regulation, vascular tone & fluid balance",
      keySources: ["Coconut water", "Spinach", "Potatoes", "Bananas", "Tomatoes"],
    },
    {
      name: "Magnesium",
      category: "Minerals",
      target: isFemale ? 310 : 400,
      unit: "mg",
      benefits: "Muscle relaxation, ATP synthesis & restorative sleep",
      keySources: ["Dark leafy greens", "Almonds", "Pumpkin seeds", "Dark chocolate"],
    },
    {
      name: "Vitamin C",
      category: "Vitamins",
      target: isFemale ? 75 : 90,
      unit: "mg",
      benefits: "Collagen synthesis, antioxidant defense & iron absorption",
      keySources: ["Amla", "Lemon", "Bell peppers", "Coriander", "Tomatoes"],
    },
    {
      name: "Vitamin D3",
      category: "Vitamins",
      target: 600,
      unit: "IU",
      benefits: "Calcium homeostasis, bone health & mood regulation",
      keySources: ["Sunlight exposure", "Fortified milk", "Mushrooms", "Eggs"],
    },
    {
      name: "Vitamin B12",
      category: "Vitamins",
      target: 2.4,
      unit: "mcg",
      benefits: "Nerve myelin integrity, RBC maturation & DNA synthesis",
      keySources: ["Dairy", "Yogurt", "Eggs", "Fortified yeast"],
    },
  ];
}

export function calculateFullNutritionPlan(profile: BiometricProfile): FullNutritionalPlan {
  const { weightKg, heightCm, age, gender, activityLevel, primaryGoal } = profile;
  const bmi = computeBmi(weightKg, heightCm);
  const bmr = computeBmr(weightKg, heightCm, age, gender);
  const tdee = computeTdee(bmr, activityLevel);

  let targetCalories = tdee;
  let proteinMultiplier = 1.8;
  let fatPct = 0.25;
  let fibreG = 32;

  switch (primaryGoal) {
    case "fat_loss":
      targetCalories = Math.max(tdee - 450, bmr);
      proteinMultiplier = 2.2;
      fatPct = 0.25;
      fibreG = 35;
      break;
    case "lean_bulk":
      targetCalories = tdee + 250;
      proteinMultiplier = 2.0;
      fatPct = 0.25;
      fibreG = 35;
      break;
    case "bulk":
      targetCalories = tdee + 450;
      proteinMultiplier = 1.8;
      fatPct = 0.28;
      fibreG = 30;
      break;
    case "recomposition":
      targetCalories = tdee;
      proteinMultiplier = 2.3;
      fatPct = 0.24;
      fibreG = 35;
      break;
    case "athletic_performance":
      targetCalories = tdee + 200;
      proteinMultiplier = 1.8;
      fatPct = 0.22;
      fibreG = 35;
      break;
    case "maintenance":
    default:
      targetCalories = tdee;
      proteinMultiplier = 1.6;
      fatPct = 0.28;
      fibreG = 30;
      break;
  }

  const proteinG = Math.round(weightKg * proteinMultiplier * 10) / 10;
  const proteinKcal = Math.round(proteinG * 4);
  const fatKcal = Math.round(targetCalories * fatPct);
  const fatG = Math.round((fatKcal / 9) * 10) / 10;
  const remainingKcal = Math.max(targetCalories - proteinKcal - fatKcal, 0);
  const carbsG = Math.round((remainingKcal / 4) * 10) / 10;
  const carbsKcal = Math.round(carbsG * 4);

  const waterIntakeLiters = Math.round((weightKg * 0.035 + (activityLevel === "active" || activityLevel === "very_active" ? 0.7 : 0.3)) * 10) / 10;

  return {
    biometrics: profile,
    bmi,
    bmr,
    tdee,
    targetCalories: Math.round(targetCalories),
    macros: {
      proteinG,
      carbsG,
      fatG,
      fibreG,
      proteinKcal,
      carbsKcal,
      fatKcal,
      percentages: {
        protein: Math.round((proteinKcal / targetCalories) * 100),
        carbs: Math.round((carbsKcal / targetCalories) * 100),
        fat: Math.round((fatKcal / targetCalories) * 100),
      },
    },
    micros: getMicronutrientTargets(gender),
    waterIntakeLiters,
  };
}
