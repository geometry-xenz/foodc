"use client";

import { useEffect, useRef, useState } from "react";
import { Atom, MousePointer2 } from "lucide-react";

type NodeType = "ingredient" | "compound";

type GraphNode = {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  compounds: string[];
  latin: string;
  flavor: string[];
};

type Edge = { a: number; b: number; rest: number };

const INGREDIENTS = [
  {
    id: "turmeric",
    label: "Turmeric",
    color: "#F0A93F",
    compounds: ["curcumin", "ar-turmerone", "zingiberene", "curcumenol"],
    latin: "Curcuma longa",
    flavor: ["earthy", "warm", "woody"],
  },
  {
    id: "cumin",
    label: "Cumin",
    color: "#C98E54",
    compounds: ["cuminaldehyde", "pinene", "myrcene", "beta-caryophyllene"],
    latin: "Cuminum cyminum",
    flavor: ["nutty", "pungent", "warm"],
  },
  {
    id: "cloves",
    label: "Cloves",
    color: "#DE7D4F",
    compounds: ["eugenol", "eugenyl acetate", "beta-caryophyllene", "vanillin"],
    latin: "Syzygium aromaticum",
    flavor: ["sweet", "medicinal", "woody"],
  },
  {
    id: "black pepper",
    label: "Black pepper",
    color: "#B39A7A",
    compounds: ["piperine", "beta-caryophyllene", "pinene", "linalool"],
    latin: "Piper nigrum",
    flavor: ["sharp", "terpenic", "woody"],
  },
  {
    id: "garlic",
    label: "Garlic",
    color: "#D3C49D",
    compounds: ["allicin", "diallyl disulfide", "diallyl trisulfide"],
    latin: "Allium sativum",
    flavor: ["sulfuric", "savoury", "pungent"],
  },
  {
    id: "onion",
    label: "Onion",
    color: "#C1A98C",
    compounds: ["syn-propanethial-S-oxide", "dipropyl disulfide", "linalool"],
    latin: "Allium cepa",
    flavor: ["sweet", "sulfuric", "caramelised"],
  },
];

const COMPOUND_LINKS = new Map<string, string[]>([
  ["curcumin", ["turmeric"]],
  ["ar-turmerone", ["turmeric"]],
  ["zingiberene", ["turmeric"]],
  ["curcumenol", ["turmeric"]],
  ["cuminaldehyde", ["cumin"]],
  ["pinene", ["cumin", "black pepper"]],
  ["myrcene", ["cumin"]],
  ["beta-caryophyllene", ["cumin", "cloves", "black pepper"]],
  ["eugenol", ["cloves"]],
  ["eugenyl acetate", ["cloves"]],
  ["vanillin", ["cloves"]],
  ["piperine", ["black pepper"]],
  ["linalool", ["black pepper", "onion"]],
  ["allicin", ["garlic"]],
  ["diallyl disulfide", ["garlic"]],
  ["diallyl trisulfide", ["garlic"]],
  ["syn-propanethial-S-oxide", ["onion"]],
  ["dipropyl disulfide", ["onion"]],
]);

function buildGraph(): { nodes: GraphNode[]; edges: Edge[] } {
  const nodes: GraphNode[] = INGREDIENTS.map((ingredient, index) => {
    const angle = (index / INGREDIENTS.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...ingredient,
      type: "ingredient" as const,
      x: Math.cos(angle) * 210,
      y: Math.sin(angle) * 160,
      vx: 0,
      vy: 0,
      radius: 17,
    };
  });

  const ingredientIndex = new Map(nodes.map((node, index) => [node.id, index]));
  const edges: Edge[] = [];
  const compoundNames = [...COMPOUND_LINKS.keys()];

  compoundNames.forEach((compound, index) => {
    const linked = COMPOUND_LINKS.get(compound) ?? [];
    const parentIndex = ingredientIndex.get(linked[0] ?? "turmeric") ?? 0;
    const parent = nodes[parentIndex];
    const angle = (index / compoundNames.length) * Math.PI * 2 + index * 0.31;
    const distance = 100 + (index % 3) * 34;
    nodes.push({
      id: compound,
      label: compound,
      type: "compound",
      x: parent.x + Math.cos(angle) * distance,
      y: parent.y + Math.sin(angle) * distance,
      vx: 0,
      vy: 0,
      radius: 9,
      color: linked.length > 1 ? "#FFB25E" : "#8E7A5E",
      compounds: [],
      latin: "",
      flavor: [],
    });
    const compoundIndex = nodes.length - 1;
    for (const ingredient of linked) {
      const targetIndex = ingredientIndex.get(ingredient);
      if (targetIndex === undefined) continue;
      edges.push({ a: compoundIndex, b: targetIndex, rest: 96 });
    }
  });

  return { nodes, edges };
}

export function AromaNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<number | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const [hovered, setHovered] = useState<{
    node: GraphNode;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { nodes, edges } = buildGraph();
    nodesRef.current = nodes;
    edgesRef.current = edges;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frame = 0;
    let visible = true;
    let disposed = false;
    let settled = false;

    function resize() {
      if (!canvas || !container || !context) return;
      width = container.clientWidth;
      height = container.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cx = width / 2;
      const cy = height / 2;
      nodes.forEach((node, index) => {
        if (index < 6) {
          const angle = (index / 6) * Math.PI * 2 - Math.PI / 2;
          node.x = cx + Math.cos(angle) * Math.min(width * 0.3, 220);
          node.y = cy + Math.sin(angle) * Math.min(height * 0.3, 170);
          node.vx = 0;
          node.vy = 0;
        }
      });
    }

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const tickSimulation = () => {
      if (!context) return;
      const cx = width / 2;
      const cy = height / 2;
      const count = nodes.length;

      for (let i = 0; i < count; i += 1) {
        const node = nodes[i];
        for (let j = i + 1; j < count; j += 1) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distSq = dx * dx + dy * dy + 0.01;
          if (distSq < 30000) {
            const dist = Math.sqrt(distSq);
            const force = (node.type === "ingredient" ? 950 : 520) / distSq;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            node.vx -= fx;
            node.vy -= fy;
            other.vx += fx;
            other.vy += fy;
          }
        }
        node.vx += (cx - node.x) * 0.0009;
        node.vy += (cy - node.y) * 0.0012;
        node.vx *= 0.9;
        node.vy *= 0.9;
      }

      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const force = (dist - edge.rest) * 0.004;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        const padding = node.radius + 20;
        node.x = Math.max(padding, Math.min(width - padding, node.x));
        node.y = Math.max(padding + 10, Math.min(height - padding, node.y));
      }
    };

    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      const gradient = context.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.62,
      );
      gradient.addColorStop(0, "rgba(255,138,50,0.06)");
      gradient.addColorStop(0.55, "rgba(232,181,106,0.022)");
      gradient.addColorStop(1, "rgba(8,8,8,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(232,181,106,0.04)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 46) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 46) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }

      const hoveredIndex = hoverRef.current;
      const hoveredNode = hoveredIndex === null ? null : nodes[hoveredIndex];
      const related = new Set<number>();
      if (hoveredNode) {
        related.add(hoveredIndex as number);
        edges.forEach((edge, index) => {
          if (edge.a === hoveredIndex || edge.b === hoveredIndex) {
            related.add(edge.a);
            related.add(edge.b);
            void index;
          }
        });
      }

      edges.forEach((edge) => {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const isActive =
          hoveredIndex !== null && (edge.a === hoveredIndex || edge.b === hoveredIndex);
        const isShared = a.type === "compound" || b.type === "compound";
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.strokeStyle = isActive
          ? "rgba(255,164,92,0.85)"
          : isShared
            ? "rgba(232,181,106,0.2)"
            : "rgba(232,181,106,0.12)";
        context.lineWidth = isActive ? 1.6 : 0.8;
        context.stroke();
      });

      nodes.forEach((node, index) => {
        const isHovered = index === hoveredIndex;
        const isRelated = related.has(index);
        const alpha = hoveredIndex === null ? 1 : isRelated || isHovered ? 1 : 0.22;
        const radius = node.radius * (isHovered ? 1.45 : 1);

        context.save();
        context.globalAlpha = alpha;

        if (node.type === "ingredient") {
          const glow = context.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            radius * 3.4,
          );
          glow.addColorStop(0, `${node.color}44`);
          glow.addColorStop(1, "rgba(0,0,0,0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(node.x, node.y, radius * 3.4, 0, Math.PI * 2);
          context.fill();

          context.beginPath();
          context.arc(node.x, node.y, radius, 0, Math.PI * 2);
          context.fillStyle = "rgba(18,15,12,0.92)";
          context.fill();
          context.strokeStyle = node.color;
          context.lineWidth = isHovered ? 2 : 1.4;
          context.stroke();

          context.beginPath();
          context.arc(node.x, node.y, radius * 0.32, 0, Math.PI * 2);
          context.fillStyle = node.color;
          context.fill();

          context.font = `600 10px Manrope, sans-serif`;
          context.fillStyle = isHovered ? "#FFF4E4" : "rgba(236,224,205,0.88)";
          context.textAlign = "center";
          context.fillText(node.label, node.x, node.y + radius + 15);
        } else {
          const isShared = (COMPOUND_LINKS.get(node.id)?.length ?? 0) > 1;
          context.beginPath();
          context.arc(node.x, node.y, radius, 0, Math.PI * 2);
          context.fillStyle = isShared ? "rgba(255,138,50,0.22)" : "rgba(232,181,106,0.09)";
          context.fill();
          context.strokeStyle = node.color;
          context.lineWidth = isHovered ? 1.8 : 0.9;
          context.stroke();

          if (isHovered || isShared) {
            context.font = `500 8px Manrope, sans-serif`;
            context.fillStyle = isHovered
              ? "#FFD2A8"
              : "rgba(232,181,106,0.62)";
            context.textAlign = "center";
            context.fillText(node.label, node.x, node.y + radius + 12);
          }
        }
        context.restore();
      });
    };

    const loop = () => {
      if (disposed) return;
      if (visible) {
        if (!reduced && !settled) {
          tickSimulation();
          tickSimulation();
        }
        draw();
      }
      frame = requestAnimationFrame(loop);
    };
    loop();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      let nearest: number | null = null;
      let distance = Number.POSITIVE_INFINITY;
      nodes.forEach((node, index) => {
        const dx = node.x - x;
        const dy = node.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < node.radius + 10 && d < distance) {
          nearest = index;
          distance = d;
        }
      });
      hoverRef.current = nearest;
      if (nearest === null) {
        setHovered(null);
      } else {
        const node = nodes[nearest];
        setHovered({ node, x, y });
        if (reduced) draw();
      }
    };

    const onPointerLeave = () => {
      hoverRef.current = null;
      setHovered(null);
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-reveal
      className="relative h-[440px] w-full overflow-hidden rounded-[24px] border border-[rgba(232,181,106,.18)] bg-[linear-gradient(155deg,rgba(24,21,17,.9),rgba(8,8,8,.97))] sm:h-[550px]"
    >
      <div className="absolute left-5 top-4 z-10 flex items-center gap-2 rounded-full border border-[rgba(232,181,106,.15)] bg-[rgba(8,8,8,.5)] px-3 py-1.5 backdrop-blur-md">
        <Atom size={11} className="text-[#FF8A32]" />
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-[#D9C7AE]">
          Molecular aroma graph
        </span>
      </div>
      <div className="absolute right-5 top-4 z-10 hidden items-center gap-1.5 text-[0.46rem] uppercase tracking-[0.16em] text-[#6F665B] sm:flex">
        <MousePointer2 size={10} /> Hover a node
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair touch-none" />
      {hovered && (
        <div
          className="pointer-events-none absolute z-20 w-[220px] -translate-x-1/2 -translate-y-full rounded-xl border border-[rgba(232,181,106,.25)] bg-[rgba(10,9,8,.92)] p-3 shadow-[0_18px_50px_rgba(0,0,0,.55)] backdrop-blur-xl"
          style={{
            left: Math.max(120, Math.min(hovered.x, 760)),
            top: hovered.y - 14,
          }}
        >
          {hovered.node.type === "ingredient" ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[0.72rem] font-semibold text-[#F6EFE4]">
                  {hovered.node.label}
                </span>
                <span className="text-[0.42rem] uppercase tracking-[0.12em] text-[#FF9B52]">
                  Ingredient
                </span>
              </div>
              <div className="mt-0.5 text-[0.5rem] italic text-[#8F8373]">
                {hovered.node.latin}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {hovered.node.compounds.slice(0, 4).map((compound) => (
                  <span
                    key={compound}
                    className="rounded-full border border-[rgba(255,138,50,.24)] bg-[rgba(255,138,50,.06)] px-1.5 py-0.5 text-[0.45rem] text-[#E7C49D]"
                  >
                    {compound}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-[0.48rem] uppercase tracking-[0.1em] text-[#756D62]">
                {hovered.node.flavor.join(" · ")}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] font-semibold text-[#F6EFE4]">
                  {hovered.node.label}
                </span>
                <span className="text-[0.42rem] uppercase tracking-[0.12em] text-[#E8B56A]">
                  Volatile
                </span>
              </div>
              <div className="mt-1.5 text-[0.58rem] leading-4 text-[#A79C8D]">
                Shared by{" "}
                {(COMPOUND_LINKS.get(hovered.node.id) ?? [])
                  .map((id) => INGREDIENTS.find((i) => i.id === id)?.label)
                  .filter(Boolean)
                  .join(", ")}
              </div>
              <div className="mt-2 text-[0.45rem] uppercase tracking-[0.12em] text-[#6F665B]">
                Spring-tensioned molecular bridge
              </div>
            </>
          )}
        </div>
      )}
      <div className="absolute bottom-4 left-5 z-10 flex gap-4 text-[0.44rem] uppercase tracking-[0.14em] text-[#5F574D]">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F0A93F]" /> Ingredient
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FFB25E]" /> Shared volatile
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8E7A5E]" /> Unique volatile
        </span>
      </div>
    </div>
  );
}
