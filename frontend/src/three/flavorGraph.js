// Interactive FlavorDB Molecular Aroma Pairing Graph (Canvas 2D / WebGL)

export function initFlavorGraph(canvasElement, infoElement) {
  if (!canvasElement) return null;

  const ctx = canvasElement.getContext('2d');
  let width = canvasElement.width = canvasElement.clientWidth || 800;
  let height = canvasElement.height = canvasElement.clientHeight || 500;

  // Real chemical entities and shared aroma volatile links from FlavorDB
  const nodes = [
    { id: 'turmeric', label: 'Turmeric', category: 'spice', color: '#FFB800', radius: 24, x: width * 0.32, y: height * 0.40, vx: 0, vy: 0, compounds: ['curcumin', 'ar-turmerone', 'zingiberene', 'cineole'] },
    { id: 'ginger', label: 'Ginger', category: 'aromatic', color: '#E8B56A', radius: 22, x: width * 0.22, y: height * 0.65, vx: 0, vy: 0, compounds: ['gingerol', 'shogaol', 'zingiberene', 'citral'] },
    { id: 'black_pepper', label: 'Black Pepper', category: 'spice', color: '#708090', radius: 20, x: width * 0.48, y: height * 0.30, vx: 0, vy: 0, compounds: ['piperine', 'beta-caryophyllene', 'pinene'] },
    { id: 'cloves', label: 'Cloves', category: 'spice', color: '#A0522D', radius: 22, x: width * 0.68, y: height * 0.32, vx: 0, vy: 0, compounds: ['eugenol', 'eugenyl acetate', 'beta-caryophyllene'] },
    { id: 'cinnamon', label: 'Cinnamon', category: 'spice', color: '#D2691E', radius: 22, x: width * 0.80, y: height * 0.50, vx: 0, vy: 0, compounds: ['cinnamaldehyde', 'eugenol', 'linalool'] },
    { id: 'cardamom', label: 'Cardamom', category: 'spice', color: '#556B2F', radius: 20, x: width * 0.65, y: height * 0.68, vx: 0, vy: 0, compounds: ['1,8-cineole', 'terpinyl acetate', 'linalool'] },
    { id: 'cumin', label: 'Cumin', category: 'spice', color: '#CD853F', radius: 24, x: width * 0.45, y: height * 0.62, vx: 0, vy: 0, compounds: ['cuminaldehyde', 'cymene', 'pinene'] },
    { id: 'coriander', label: 'Coriander', category: 'spice', color: '#DAA520', radius: 20, x: width * 0.50, y: height * 0.80, vx: 0, vy: 0, compounds: ['linalool', 'alpha-pinene', 'camphor'] },
    { id: 'garlic', label: 'Garlic', category: 'aromatic', color: '#E0E0E0', radius: 22, x: width * 0.18, y: height * 0.35, vx: 0, vy: 0, compounds: ['allicin', 'diallyl disulfide', 'trisulfide'] }
  ];

  // Authentic molecular aroma links (shared volatile aroma compounds)
  const links = [
    { source: 'turmeric', target: 'ginger', shared: 'zingiberene, curcumenol', strength: 0.9 },
    { source: 'turmeric', target: 'black_pepper', shared: 'bioavailability enhancer (piperine + curcumin)', strength: 0.95 },
    { source: 'cloves', target: 'cinnamon', shared: 'eugenol, caryophyllene', strength: 0.92 },
    { source: 'cardamom', target: 'cinnamon', shared: 'linalool, terpenes', strength: 0.82 },
    { source: 'cumin', target: 'coriander', shared: 'pinene, cymene terpenes', strength: 0.88 },
    { source: 'cumin', target: 'black_pepper', shared: 'pinene, warm terpenes', strength: 0.75 },
    { source: 'garlic', target: 'ginger', shared: 'sulfur-phenol culinary synergy', strength: 0.85 }
  ];

  let selectedNode = nodes[0];
  let hoveredNode = null;
  let animId = null;

  function updateInfoOverlay(node) {
    if (!infoElement) return;
    infoElement.innerHTML = `
      <div class="glass-panel" style="padding: 16px; border: 1px solid rgba(255, 138, 50, 0.3); background: rgba(14, 14, 14, 0.85);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="color: ${node.color}; font-size: 1.15rem; font-weight: 700;">${node.label}</h4>
          <span class="badge badge-amber" style="font-size: 0.7rem;">FlavorDB Entity</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;">
          Dominant volatile aroma compounds:
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;">
          ${node.compounds.map(c => `<span class="compound-pill" style="border-color: ${node.color}55; color: #FFF;">${c}</span>`).join('')}
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); font-family: var(--font-mono);">
          Click any connected node to inspect molecular pairing synergy.
        </p>
      </div>
    `;
  }
  updateInfoOverlay(selectedNode);

  // Animation Loop with gentle organic floating
  let time = 0;
  function render() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    // Draw Links
    links.forEach(link => {
      const s = nodes.find(n => n.id === link.source);
      const t = nodes.find(n => n.id === link.target);
      if (!s || !t) return;

      const isConnected = selectedNode && (selectedNode.id === s.id || selectedNode.id === t.id);

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);

      if (isConnected) {
        ctx.strokeStyle = '#FF8A32';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
      }
      ctx.stroke();

      // Draw shared compound badge at midpoint when connected
      if (isConnected) {
        const midX = (s.x + t.x) / 2;
        const midY = (s.y + t.y) / 2;
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#080808';
        const txt = link.shared;
        const tw = ctx.measureText(txt).width;
        ctx.fillStyle = 'rgba(24, 24, 24, 0.9)';
        ctx.fillRect(midX - tw / 2 - 6, midY - 10, tw + 12, 18);
        ctx.strokeStyle = 'rgba(255, 138, 50, 0.5)';
        ctx.strokeRect(midX - tw / 2 - 6, midY - 10, tw + 12, 18);
        ctx.fillStyle = '#E8B56A';
        ctx.fillText(txt, midX - tw / 2, midY + 3);
      }
    });

    // Draw Nodes
    nodes.forEach((node, i) => {
      // Gentle floating offset
      const floatY = Math.sin(time + i * 1.2) * 4;
      const curY = node.y + floatY;

      const isSelected = selectedNode && selectedNode.id === node.id;
      const isHovered = hoveredNode && hoveredNode.id === node.id;

      // Glow circle
      if (isSelected || isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, curY, node.radius + 10, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}33`;
        ctx.fill();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(node.x, curY, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#141414';
      ctx.fill();
      ctx.lineWidth = isSelected ? 3 : 1.5;
      ctx.strokeStyle = node.color;
      ctx.stroke();

      // Inner atom core
      ctx.beginPath();
      ctx.arc(node.x, curY, 6, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Node label
      ctx.font = `${isSelected ? 'bold' : 'normal'} 12px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = '#F5F0E9';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, curY + node.radius + 16);
    });

    animId = requestAnimationFrame(render);
  }
  animId = requestAnimationFrame(render);

  // Mouse interactivity
  const handleInteraction = (e) => {
    const rect = canvasElement.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    nodes.forEach(node => {
      const dist = Math.hypot(node.x - mx, node.y - my);
      if (dist < node.radius + 12) {
        found = node;
      }
    });
    return found;
  };

  const onMouseMove = (e) => {
    hoveredNode = handleInteraction(e);
    canvasElement.style.cursor = hoveredNode ? 'pointer' : 'default';
  };

  const onClick = (e) => {
    const clicked = handleInteraction(e);
    if (clicked) {
      selectedNode = clicked;
      updateInfoOverlay(clicked);
    }
  };

  canvasElement.addEventListener('mousemove', onMouseMove);
  canvasElement.addEventListener('click', onClick);

  return {
    destroy: () => {
      if (animId) cancelAnimationFrame(animId);
      canvasElement.removeEventListener('mousemove', onMouseMove);
      canvasElement.removeEventListener('click', onClick);
    }
  };
}
