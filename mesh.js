/* Bivetica hero — living gold node-sphere with firing synapse sparks, on cream.
   Organic 3-axis rotation + wobble + perspective; edges/nodes flare warm gold
   like synapses firing; occasional ember flares. Warm-gold palette (no neon).
   Bounded: ~30fps, DPR<=1.6, fewer nodes on small screens, pauses off-screen,
   single static frame under prefers-reduced-motion. */
(function () {
  const c = document.querySelector('[data-mesh]');
  if (!c) return;
  const ctx = c.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0, h = 0, dpr = 1, on = true, last = 0;
  let nodes = [], edges = [], sparks = [];

  const DEEP = [120, 94, 44];    // near lines / nodes
  const GOLD = [171, 140, 73];   // far lines
  const WARM = [228, 176, 96];   // firing (warm gold, not orange)

  function build() {
    const N = w < 720 ? 96 : 150;
    nodes = []; edges = []; sparks = [];
    const ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - 2 * (i + 0.5) / N;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = ga * i;
      const rough = 0.9 + Math.random() * 0.14;   // organic surface
      nodes.push({ x: Math.cos(th) * r * rough, y: y * rough, z: Math.sin(th) * r * rough,
                   ph: Math.random() * Math.PI * 2 });
    }
    // nearest-K neighbours -> clean network
    const K = 4, seen = new Set();
    for (let i = 0; i < N; i++) {
      const near = [];
      for (let j = 0; j < N; j++) if (j !== i) {
        const a = nodes[i], b = nodes[j];
        near.push([(a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2, j]);
      }
      near.sort((p, q) => p[0] - q[0]);
      for (let k = 0; k < K; k++) {
        const j = near[k][1], key = i < j ? i+'-'+j : j+'-'+i;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j, Math.random() * Math.PI * 2]); }
      }
    }
    for (let i = 0; i < 22; i++)
      sparks.push({ n: (Math.random() * N) | 0, ph: Math.random() * 10, sp: 0.3 + Math.random() * 0.7 });
  }

  function size() {
    const b = c.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    w = b.width; h = b.height;
    c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    if (reduce) frame(0);
  }

  function frame(ms) {
    const t = ms * 0.001;
    ctx.clearRect(0, 0, w, h);
    const cx = w * (w < 760 ? 0.5 : 0.56);
    const cy = h * 0.52;
    const scale = Math.min(w, h) * (w < 760 ? 0.42 : 0.48);

    const ay = t * 0.12, ax = -0.34 + Math.sin(t * 0.13) * 0.08, az = Math.sin(t * 0.09) * 0.07;
    const cay = Math.cos(ay), say = Math.sin(ay), cax = Math.cos(ax), sax = Math.sin(ax), caz = Math.cos(az), saz = Math.sin(az);

    const P = new Array(nodes.length);
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const wob = 1 + Math.sin(t * 0.7 + n.ph) * 0.03;
      let x = n.x * wob, y = n.y * wob, z = n.z * wob;
      let x1 = x * cay - z * say, z1 = x * say + z * cay;
      let y1 = y * cax - z1 * sax; z1 = y * sax + z1 * cax;
      let x2 = x1 * caz - y1 * saz, y2 = x1 * saz + y1 * caz;
      const persp = 1.12 / (1.55 - z1 * 0.32);
      P[i] = { x: cx + x2 * scale * persp, y: cy + y2 * scale * persp, z: z1, i };
    }

    // warm aura
    const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.15);
    aura.addColorStop(0, 'rgba(226,170,86,0.13)');
    aura.addColorStop(0.42, 'rgba(183,139,70,0.06)');
    aura.addColorStop(1, 'rgba(239,237,232,0)');
    ctx.fillStyle = aura; ctx.fillRect(0, 0, w, h);

    // edges (with firing pulses)
    ctx.lineWidth = 0.85;
    for (let e = 0; e < edges.length; e++) {
      const p = P[edges[e][0]], q = P[edges[e][1]], ph = edges[e][2];
      const pulse = Math.max(0, Math.sin(t * 0.8 + ph * 6) - 0.74) * 3.4;
      if (pulse > 0) {
        ctx.strokeStyle = 'rgba(' + WARM[0] + ',' + WARM[1] + ',' + WARM[2] + ',' + Math.min(0.9, 0.25 + pulse * 0.5).toFixed(3) + ')';
      } else {
        const f = ((p.z + q.z) * 0.5) * 0.5 + 0.5;
        const col = [Math.round(GOLD[0]+(DEEP[0]-GOLD[0])*f), Math.round(GOLD[1]+(DEEP[1]-GOLD[1])*f), Math.round(GOLD[2]+(DEEP[2]-GOLD[2])*f)];
        ctx.strokeStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + (0.08 + 0.42 * f).toFixed(3) + ')';
      }
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
    }

    // nodes (depth-sorted; occasional flare)
    P.slice().sort((a, b) => a.z - b.z).forEach(p => {
      const glow = Math.max(0, Math.sin(t * 1.1 + nodes[p.i].ph) - 0.72) * 3;
      const f = p.z * 0.5 + 0.5;
      if (glow > 0) { ctx.shadowBlur = 16; ctx.shadowColor = 'rgba(230,176,92,0.9)'; }
      ctx.fillStyle = glow > 0
        ? 'rgba(240,196,118,' + (0.6 + glow * 0.2).toFixed(3) + ')'
        : 'rgba(' + DEEP[0] + ',' + DEEP[1] + ',' + DEEP[2] + ',' + (0.25 + 0.55 * f).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, glow > 0 ? 1.8 + glow : 0.8 + 1.5 * f, 0, 6.283); ctx.fill();
      ctx.shadowBlur = 0;
    });

    // ember sparks (warm gold flares)
    for (let s = 0; s < sparks.length; s++) {
      const p = P[sparks[s].n]; if (!p) continue;
      const a = 0.5 + 0.5 * Math.sin(t * sparks[s].sp * 2 + sparks[s].ph);
      if (a > 0.7) {
        const rad = 4 + a * 8;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
        g.addColorStop(0, 'rgba(255,240,205,' + a.toFixed(3) + ')');
        g.addColorStop(0.3, 'rgba(224,168,84,' + (a * 0.8).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(214,150,66,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, rad, 0, 6.283); ctx.fill();
      }
    }
  }

  function loop(ms) {
    requestAnimationFrame(loop);
    if (!on || ms - last < 33) return;
    last = ms; frame(ms);
  }

  new ResizeObserver(size).observe(c);
  new IntersectionObserver(([e]) => { on = e.isIntersecting; }).observe(c);
  size();
  if (!reduce) requestAnimationFrame(loop);
})();
