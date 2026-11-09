// Three.js Ambient Molecular Particle & Lighting Scene
import * as THREE from 'three';

export function initHeroThreeScene(canvasElement) {
  if (!canvasElement) return null;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 25;

  // Renderer with DPR capping and optimal power management
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    console.warn('WebGL initialization failed, running lightweight mode.', e);
    return null;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvasElement.clientWidth || window.innerWidth, canvasElement.clientHeight || window.innerHeight);

  // Responsive particle count (reduced on mobile for buttery 60fps)
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 80 : 220;

  // Golden Amber & Warm Spice Palette
  const colors = [
    new THREE.Color(0xFF8A32), // Pure Amber
    new THREE.Color(0xE8B56A), // Warm Gold
    new THREE.Color(0xFF4757), // Chili Crimson
    new THREE.Color(0xFFFFFF)  // Light Crystal
  ];

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    const col = colors[Math.floor(Math.random() * colors.length)];
    particleColors[i * 3] = col.r;
    particleColors[i * 3 + 1] = col.g;
    particleColors[i * 3 + 2] = col.b;

    scales[i] = Math.random() * 2.0 + 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  // Circular point texture generated on canvas
  const pointCanvas = document.createElement('canvas');
  pointCanvas.width = 64;
  pointCanvas.height = 64;
  const pCtx = pointCanvas.getContext('2d');
  const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(255, 180, 80, 0.8)');
  grad.addColorStop(0.8, 'rgba(255, 138, 50, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  pCtx.fillStyle = grad;
  pCtx.fillRect(0, 0, 64, 64);

  const pointTexture = new THREE.CanvasTexture(pointCanvas);

  const material = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    map: pointTexture,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Floating Molecular Ring Wireframe
  const ringGeo = new THREE.TorusGeometry(12, 0.08, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xE8B56A,
    wireframe: true,
    transparent: true,
    opacity: 0.12
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  // Parallax mouse responsiveness
  let mouseX = 0;
  let mouseY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Handle Resize
  const onResize = () => {
    const w = canvasElement.clientWidth || window.innerWidth;
    const h = canvasElement.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize);

  // Animation Loop
  let animId = null;
  const clock = new THREE.Clock();

  const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Gentle floating rotation
    particleSystem.rotation.y = elapsedTime * 0.03 + mouseX * 0.1;
    particleSystem.rotation.x = elapsedTime * 0.015 - mouseY * 0.1;
    ring.rotation.z = elapsedTime * 0.05;
    ring.rotation.y = elapsedTime * 0.02;

    renderer.render(scene, camera);
    animId = requestAnimationFrame(animate);
  };
  animate();

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    }
  };
}
