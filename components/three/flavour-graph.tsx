"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import { AromaNetwork } from "@/components/scenes/aroma-network";
import { useThreeScene } from "./use-three-scene";
import { Eye, List, RotateCcw, Sparkles } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  type: "ingredient" | "compound";
  position: { x: number; y: number; z: number };
  compound_count?: number;
  shared_by?: number;
}

interface GraphEdge {
  source: string;
  target: string;
  shared?: boolean;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  ingredient_count: number;
  compound_count: number;
}

type Rig = { camera: THREE.PerspectiveCamera; controls: OrbitControls };

const CAMERA_HOME = { x: 0, y: 0, z: 320 };

function labelSprite(text: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = "600 44px Manrope, system-ui, sans-serif";
  ctx.font = font;
  canvas.width = Math.ceil(ctx.measureText(text).width) + 24;
  canvas.height = 64;
  ctx.font = font;
  ctx.fillStyle = "#F6EFE4";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 12, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  sprite.scale.set((canvas.width / canvas.height) * 9, 9, 1);
  return sprite;
}

/** Mounted only once graph data exists, so the scene is built with real nodes. */
function GraphCanvas({
  data,
  onSelect,
  onUnsupported,
  rigRef,
}: {
  data: GraphData;
  onSelect: (node: GraphNode) => void;
  onUnsupported: () => void;
  rigRef: React.MutableRefObject<Rig | null>;
}) {
  const { containerRef, canvasRef, isSupported, isReducedMotion } = useThreeScene({
    alpha: true,
    antialias: true,
    onInit: ({ canvas, scene, camera, renderer }) => {
      camera.position.set(CAMERA_HOME.x, CAMERA_HOME.y, CAMERA_HOME.z);
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.maxDistance = 600;
      controls.minDistance = 60;
      rigRef.current = { camera, controls };

      scene.add(new THREE.AmbientLight(0xffffff, 1.2));
      const light = new THREE.PointLight(0xffecd2, 2.5, 800);
      light.position.set(100, 150, 200);
      scene.add(light);

      const group = new THREE.Group();
      scene.add(group);

      const ingGeo = new THREE.SphereGeometry(6.5, 20, 20);
      const compGeo = new THREE.SphereGeometry(3.2, 14, 14);
      const sharedGeo = new THREE.SphereGeometry(4.2, 16, 16);
      const ingMat = new THREE.MeshStandardMaterial({ color: 0xf3d3a1, emissive: 0xe8b56a, emissiveIntensity: 0.35, roughness: 0.25 });
      const sharedMat = new THREE.MeshStandardMaterial({ color: 0xff8a32, emissive: 0xff6600, emissiveIntensity: 0.6, roughness: 0.2 });
      const compMat = new THREE.MeshStandardMaterial({ color: 0x8b7e6d, emissive: 0x5a5043, emissiveIntensity: 0.2, roughness: 0.5 });

      const meshes: Array<{ mesh: THREE.Mesh; node: GraphNode }> = [];
      const positions = new Map<string, THREE.Vector3>();
      for (const node of data.nodes) {
        const pos = new THREE.Vector3(node.position.x, node.position.y, node.position.z);
        positions.set(node.id, pos);
        const isIng = node.type === "ingredient";
        const isShared = !isIng && (node.shared_by ?? 0) > 1;
        const mesh = new THREE.Mesh(isIng ? ingGeo : isShared ? sharedGeo : compGeo, isIng ? ingMat : isShared ? sharedMat : compMat);
        mesh.position.copy(pos);
        group.add(mesh);
        meshes.push({ mesh, node });
        if (isIng) {
          const label = labelSprite(node.label);
          label.position.copy(pos).add(new THREE.Vector3(0, 11, 0));
          group.add(label);
        }
      }

      const points: THREE.Vector3[] = [];
      const colors: number[] = [];
      for (const edge of data.edges) {
        const a = positions.get(edge.source);
        const b = positions.get(edge.target);
        if (!a || !b) continue;
        points.push(a, b);
        const c = new THREE.Color(edge.shared ? 0xff9944 : 0x5a4d3e);
        colors.push(c.r, c.g, c.b, c.r, c.g, c.b);
      }
      const edgeGeo = new THREE.BufferGeometry().setFromPoints(points);
      edgeGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      group.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.5 })));

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      const pick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(meshes.map((m) => m.mesh))[0];
        return hit ? meshes.find((m) => m.mesh === hit.object) : undefined;
      };
      const handleClick = (e: MouseEvent) => {
        const hit = pick(e);
        if (hit) onSelect(hit.node);
      };
      const handleDblClick = (e: MouseEvent) => {
        const hit = pick(e);
        if (!hit) return;
        const target = hit.mesh.position;
        gsap.to(camera.position, {
          x: target.x + 30,
          y: target.y + 20,
          z: target.z + 50,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => {
            controls.target.copy(target);
            controls.update();
          },
        });
      };
      canvas.addEventListener("click", handleClick);
      canvas.addEventListener("dblclick", handleDblClick);

      return () => {
        canvas.removeEventListener("click", handleClick);
        canvas.removeEventListener("dblclick", handleDblClick);
        controls.dispose();
        rigRef.current = null;
      };
    },
    onTick: () => rigRef.current?.controls.update(),
  });

  useEffect(() => {
    if (!isSupported || isReducedMotion) onUnsupported();
  }, [isSupported, isReducedMotion, onUnsupported]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}

export function FlavourGraph({ initialIngredients }: { initialIngredients?: string }) {
  const [data, setData] = useState<GraphData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [fallback2d, setFallback2d] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "list">("3d");
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const rigRef = useRef<Rig | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = initialIngredients
      ? `/api/flavour/graph?ingredients=${encodeURIComponent(initialIngredients)}`
      : "/api/flavour/graph";
    setStatus("loading");
    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((json: GraphData) => {
        setData(json);
        setStatus(json.nodes.length ? "ready" : "error");
      })
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.error("Failed to fetch flavour graph data", err);
          setStatus("error");
        }
      });
    return () => controller.abort();
  }, [initialIngredients]);

  // Who is connected to the selected node: an ingredient's compounds, or a compound's ingredients.
  const neighbours = useMemo(() => {
    if (!data || !selected) return [];
    const labels = new Map(data.nodes.map((n) => [n.id, n.label]));
    return data.edges
      .filter((e) => e.source === selected.id || e.target === selected.id)
      .map((e) => labels.get(e.source === selected.id ? e.target : e.source) ?? "")
      .filter(Boolean);
  }, [data, selected]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!data?.nodes.length) return;
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (step) {
      e.preventDefault();
      const current = selected ? data.nodes.findIndex((n) => n.id === selected.id) : -1;
      setSelected(data.nodes[(current + step + data.nodes.length) % data.nodes.length]);
    } else if (e.key === "Escape") {
      setSelected(null);
    }
  };

  if (fallback2d) return <AromaNetwork />;

  const filteredNodes =
    data?.nodes.filter((n) => n.label.toLowerCase().includes(searchQuery.toLowerCase())) ?? [];

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Flavour graph. Use arrow keys to move between ingredients and compounds."
      className="relative h-[620px] w-full overflow-hidden rounded-2xl border border-[rgba(232,181,106,.15)] bg-[rgba(10,8,7,.9)] outline-none focus-visible:border-[#E8B56A]"
    >
      <div className="pointer-events-auto absolute inset-x-4 top-4 z-20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-[rgba(232,181,106,.2)] bg-[#080808]/85 px-3 py-1.5 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#E8B56A]">
            <Sparkles size={13} />
            3D Flavour Graph
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[0.62rem] text-[#A79C8D]">
            {status === "ready" && data
              ? `${data.ingredient_count} ingredients · ${data.compound_count} volatiles · curated dataset`
              : status === "loading"
                ? "Loading…"
                : "Unavailable"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const rig = rigRef.current;
              if (!rig) return;
              gsap.to(rig.camera.position, { ...CAMERA_HOME, duration: 0.8 });
              rig.controls.target.set(0, 0, 0);
            }}
            title="Reset camera"
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#080808]/80 px-2.5 py-1.5 text-xs text-[#A79C8D] hover:text-[#F6EFE4]"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <div className="flex rounded-lg border border-white/10 bg-[#080808]/80 p-0.5 backdrop-blur-md">
            {(["3d", "list"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs transition-colors ${
                  viewMode === mode ? "bg-[#E8B56A] font-semibold text-[#080808]" : "text-[#A79C8D] hover:text-[#F6EFE4]"
                }`}
              >
                {mode === "3d" ? <Eye size={13} /> : <List size={13} />}
                {mode === "3d" ? "3D Orbit" : "List View"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {status !== "ready" && (
        <div className="absolute inset-0 grid place-items-center text-sm text-[#8B7E6D]">
          {status === "loading" ? "Loading flavour data…" : "Flavour data is unavailable right now."}
        </div>
      )}

      {status === "ready" && data && viewMode === "3d" && (
        <>
          <GraphCanvas data={data} onSelect={setSelected} onUnsupported={() => setFallback2d(true)} rigRef={rigRef} />
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden items-center gap-2 rounded-lg border border-white/5 bg-[#080808]/70 px-3 py-1.5 text-[0.62rem] text-[#756D62] backdrop-blur-md sm:flex">
            <span>Drag: rotate</span>·<span>Scroll: zoom</span>·<span>Click: details</span>·<span>Double-click: fly to node</span>
          </div>
        </>
      )}

      {status === "ready" && selected && viewMode === "3d" && (
        <div className="absolute bottom-4 right-4 z-20 w-72 rounded-xl border border-[rgba(232,181,106,.3)] bg-[#080808]/95 p-4 shadow-2xl backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <span className="text-[0.62rem] font-medium uppercase tracking-widest text-[#E8B56A]">
              {selected.type === "ingredient" ? "Ingredient" : "Aroma compound"}
            </span>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close details" className="text-xs text-[#8B7E6D] hover:text-[#F6EFE4]">
              ✕
            </button>
          </div>
          <h4 className="mt-1 font-display text-lg font-semibold capitalize text-[#F6EFE4]">{selected.label}</h4>
          <p className="mt-1 text-xs leading-5 text-[#B3A798]">
            {selected.type === "ingredient"
              ? neighbours.length
                ? `Contains ${neighbours.length} profiled aroma compound${neighbours.length === 1 ? "" : "s"}:`
                : "No aroma compounds profiled for this ingredient yet."
              : neighbours.length > 1
                ? `Shared by ${neighbours.length} ingredients — a molecular bridge between them:`
                : "Found in:"}
          </p>
          {neighbours.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {neighbours.map((name) => (
                <span key={name} className="rounded-full border border-white/10 px-2 py-0.5 text-[0.65rem] capitalize text-[#E7DCCB]">
                  {name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {status === "ready" && viewMode === "list" && (
        <div className="absolute inset-0 z-10 flex flex-col bg-[#0a0807] p-6 pt-20">
          <input
            type="text"
            placeholder="Filter ingredients and aroma compounds…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 w-full rounded-lg border border-[rgba(232,181,106,.2)] bg-black/50 px-4 py-2 text-sm text-[#F6EFE4] placeholder-[#756D62] outline-none focus:border-[#E8B56A]"
          />
          <div className="flex-1 overflow-y-auto rounded-xl border border-white/5">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-[#14100c] text-[0.62rem] uppercase tracking-wider text-[#8B7E6D]">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Connections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#B3A798]">
                {filteredNodes.map((n) => (
                  <tr key={n.id} className="hover:bg-white/[0.02]">
                    <td className="p-3 font-medium capitalize text-[#F6EFE4]">{n.label}</td>
                    <td className="p-3">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider ${
                          n.type === "ingredient" ? "bg-[rgba(232,181,106,.15)] text-[#E8B56A]" : "bg-[rgba(255,138,50,.15)] text-[#FF8A32]"
                        }`}
                      >
                        {n.type}
                      </span>
                    </td>
                    <td className="p-3">
                      {n.type === "ingredient" ? `${n.compound_count ?? 0} compounds` : `${n.shared_by ?? 1} ingredient${(n.shared_by ?? 1) === 1 ? "" : "s"}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
