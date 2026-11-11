"""
Deterministic 3D Flavour Graph layout generator.
Adheres to DRISHYAM Master Specification §5.8:
- Ingredients sit on a Fibonacci sphere.
- Each compound sits at the exact centroid of the ingredients that contain it.
- Computes identically on server, web Three.js, and Android Compose Canvas.
"""
import math
from typing import Any, Dict, List, Set


def fibonacci_sphere(samples: int) -> List[Dict[str, float]]:
    """Generate uniformly distributed points on a unit sphere."""
    points = []
    phi = math.pi * (math.sqrt(5.0) - 1.0)  # Golden angle in radians

    for i in range(samples):
        y = 1.0 - (i / float(samples - 1)) * 2.0 if samples > 1 else 0.0
        radius = math.sqrt(max(0.0, 1.0 - y * y))
        theta = phi * i

        x = math.cos(theta) * radius
        z = math.sin(theta) * radius
        points.append({"x": round(x, 4), "y": round(y, 4), "z": round(z, 4)})
    return points


def compute_flavour_graph_3d(
    ingredients: List[str],
    ingredient_compound_map: Dict[str, Set[str]],
    radius: float = 120.0
) -> Dict[str, Any]:
    """
    Computes a deterministic 3D layout for ingredients and aroma compounds.
    """
    clean_ings = sorted(list(set(i.strip().lower() for i in ingredients if i.strip())))
    sphere_points = fibonacci_sphere(len(clean_ings))

    nodes = []
    ing_pos_map = {}

    # 1. Place ingredients on Fibonacci sphere
    for idx, ing in enumerate(clean_ings):
        pt = sphere_points[idx]
        pos = {
            "x": round(pt["x"] * radius, 2),
            "y": round(pt["y"] * radius, 2),
            "z": round(pt["z"] * radius, 2),
        }
        ing_pos_map[ing] = pos
        nodes.append({
            "id": ing,
            "label": ing.title(),
            "type": "ingredient",
            "position": pos,
            "compound_count": len(ingredient_compound_map.get(ing, set())),
        })

    # 2. Place compounds at the centroid of their associated ingredients
    compound_to_ings: Dict[str, List[str]] = {}
    for ing, comps in ingredient_compound_map.items():
        if ing in ing_pos_map:
            for c in comps:
                compound_to_ings.setdefault(c, []).append(ing)

    edges = []
    for comp, linked_ings in sorted(compound_to_ings.items()):
        if not linked_ings:
            continue
        # Centroid
        avg_x = sum(ing_pos_map[ing]["x"] for ing in linked_ings) / len(linked_ings)
        avg_y = sum(ing_pos_map[ing]["y"] for ing in linked_ings) / len(linked_ings)
        avg_z = sum(ing_pos_map[ing]["z"] for ing in linked_ings) / len(linked_ings)

        # Pull compounds slightly inward (85% distance) to create natural cluster depth
        pos = {
            "x": round(avg_x * 0.85, 2),
            "y": round(avg_y * 0.85, 2),
            "z": round(avg_z * 0.85, 2),
        }
        comp_id = f"cmp:{comp}"
        nodes.append({
            "id": comp_id,
            "label": comp,
            "type": "compound",
            "position": pos,
            "shared_by": len(linked_ings),
        })

        for ing in linked_ings:
            edges.append({
                "source": ing,
                "target": comp_id,
                "shared": len(linked_ings) > 1,
            })

    return {
        "nodes": nodes,
        "edges": edges,
        "ingredient_count": len(clean_ings),
        "compound_count": len(compound_to_ings),
        "provenance": "calculated"
    }
