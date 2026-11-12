/**
 * Deterministic 3D Flavour Graph layout generator.
 * Produces Fibonacci sphere points and centroid-positioned volatile molecules.
 */

export function fibonacciSphere(samples: number): Array<{ x: number; y: number; z: number }> {
  const points: Array<{ x: number; y: number; z: number }> = [];
  const phi = Math.PI * (Math.sqrt(5.0) - 1.0); // Golden angle in radians

  for (let i = 0; i < samples; i++) {
    const y = samples > 1 ? 1.0 - (i / (samples - 1)) * 2.0 : 0.0;
    const radius = Math.sqrt(Math.max(0.0, 1.0 - y * y));
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push({
      x: Math.round(x * 10000) / 10000,
      y: Math.round(y * 10000) / 10000,
      z: Math.round(z * 10000) / 10000,
    });
  }
  return points;
}

export function computeFlavourGraph3D(
  ingredients: string[],
  ingredientCompoundMap: Record<string, string[]>,
  radius: number = 120.0
) {
  const cleanIngs = Array.from(
    new Set(ingredients.map((i) => i.trim().toLowerCase()).filter(Boolean))
  ).sort();

  const spherePoints = fibonacciSphere(cleanIngs.length);
  const nodes: any[] = [];
  const ingPosMap: Record<string, { x: number; y: number; z: number }> = {};

  // 1. Place ingredients on Fibonacci sphere
  cleanIngs.forEach((ing, idx) => {
    const pt = spherePoints[idx] || { x: 0, y: 0, z: 0 };
    const pos = {
      x: Math.round(pt.x * radius * 100) / 100,
      y: Math.round(pt.y * radius * 100) / 100,
      z: Math.round(pt.z * radius * 100) / 100,
    };
    ingPosMap[ing] = pos;
    nodes.push({
      id: ing,
      name: ing.charAt(0).toUpperCase() + ing.slice(1),
      label: ing.charAt(0).toUpperCase() + ing.slice(1),
      type: "ingredient",
      group: "ingredient",
      position: pos,
      compound_count: (ingredientCompoundMap[ing] || []).length,
    });
  });

  // 2. Map compounds to ingredients
  const compoundToIngs: Record<string, string[]> = {};
  for (const [ing, comps] of Object.entries(ingredientCompoundMap)) {
    if (ingPosMap[ing]) {
      for (const c of comps) {
        if (!compoundToIngs[c]) compoundToIngs[c] = [];
        compoundToIngs[c].push(ing);
      }
    }
  }

  const edges: any[] = [];
  const compKeys = Object.keys(compoundToIngs).sort();

  for (const comp of compKeys) {
    const linked = compoundToIngs[comp];
    if (!linked || linked.length === 0) continue;

    const avgX = linked.reduce((sum, ing) => sum + ingPosMap[ing].x, 0) / linked.length;
    const avgY = linked.reduce((sum, ing) => sum + ingPosMap[ing].y, 0) / linked.length;
    const avgZ = linked.reduce((sum, ing) => sum + ingPosMap[ing].z, 0) / linked.length;

    const pos = {
      x: Math.round(avgX * 0.85 * 100) / 100,
      y: Math.round(avgY * 0.85 * 100) / 100,
      z: Math.round(avgZ * 0.85 * 100) / 100,
    };

    const compId = `cmp:${comp}`;
    nodes.push({
      id: compId,
      name: comp,
      label: comp,
      type: "compound",
      group: "compound",
      position: pos,
      shared_by: linked.length,
    });

    for (const ing of linked) {
      edges.push({
        source: ing,
        target: compId,
        shared: linked.length > 1,
      });
    }
  }

  return {
    nodes,
    edges,
    ingredient_count: cleanIngs.length,
    compound_count: compKeys.length,
  };
}
