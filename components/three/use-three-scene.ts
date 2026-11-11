"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface UseThreeSceneOptions {
  alpha?: boolean;
  antialias?: boolean;
  powerPreference?: "default" | "high-performance" | "low-power";
  onInit?: (context: ThreeSceneContext) => void | (() => void);
  onTick?: (context: ThreeSceneContext, delta: number, elapsed: number) => void;
  onResize?: (context: ThreeSceneContext, width: number, height: number) => void;
}

export interface ThreeSceneContext {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  isLowEnd: boolean;
  reducedMotion: boolean;
}

export function useThreeScene(options: UseThreeSceneOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Reduced motion check (§5.8 rule 6)
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;
    setIsReducedMotion(reducedMotion);

    // 2. Low-end device check (§5.8 rule 5: deviceMemory <= 4 or hardwareConcurrency <= 4)
    const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
    const isLowEnd =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4);

    // 3. WebGL support check
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: options.alpha ?? true,
        antialias: options.antialias ?? !isLowEnd,
        powerPreference: options.powerPreference ?? "default",
      });
    } catch {
      setIsSupported(false);
      return;
    }

    // 4. DPR cap <= 2 (§5.8 rule 4)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    const context: ThreeSceneContext = {
      canvas,
      container,
      scene,
      camera,
      renderer,
      isLowEnd,
      reducedMotion,
    };

    let cleanupInit: void | (() => void);
    if (options.onInit) {
      cleanupInit = options.onInit(context);
    }

    // 5. Visibility and IntersectionObserver pausing (§5.8 rule 4)
    let isVisible = true;
    let isIntersecting = true;
    let animId: number | null = null;
    let lastTime = performance.now();
    const startTime = performance.now();

    const renderLoop = (now: number) => {
      animId = requestAnimationFrame(renderLoop);

      if (!isVisible || !isIntersecting) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1); // clamp delta
      const elapsed = (now - startTime) / 1000;
      lastTime = now;

      if (options.onTick) {
        options.onTick(context, delta, elapsed);
      }
      renderer.render(scene, camera);
    };

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastTime = performance.now();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting = entry ? entry.isIntersecting : true;
        if (isIntersecting) {
          lastTime = performance.now();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 6. Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        const w = Math.floor(cr.width);
        const h = Math.floor(cr.height);
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h, false);
          if (options.onResize) {
            options.onResize(context, w, h);
          }
        }
      }
    });
    resizeObserver.observe(container);

    // Start loop
    animId = requestAnimationFrame(renderLoop);

    // 7. Cleanup & resource disposal
    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      resizeObserver.disconnect();

      if (typeof cleanupInit === "function") {
        cleanupInit();
      }

      // Dispose Three.js scene objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.LineSegments) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return { containerRef, canvasRef, isSupported, isReducedMotion };
}
