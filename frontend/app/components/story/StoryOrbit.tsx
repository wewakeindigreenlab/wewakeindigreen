"use client";

/**
 * STORY ORBIT
 * --------------------------------------------------------------
 * Desktop  → animated canvas with orbiting nodes (hover + click).
 * Mobile   → stacked card list (touch-friendly, no canvas math).
 *
 * Both render in the same component; visibility is controlled
 * with CSS at the `(max-width: 768px)` breakpoint.
 *
 * ANIMATION MODEL — important
 * --------------------------------------------------------------
 * Earlier version had each node interpolate its own angle and
 * "snap to top" on hover, which made the node run away from the
 * cursor and could overlap other nodes after a few hovers.
 *
 * The new model keeps every node's base angle fixed (evenly
 * distributed around the circle) and uses a single shared
 * `rotation` offset that ticks forward each frame. When a node
 * is hovered the rotation pauses, the hovered node smoothly
 * scales up + a glow ring fades in. On leave, rotation resumes.
 *
 * Net effect:
 *   - nodes are ALWAYS evenly spaced (no overlap, ever)
 *   - hovered node stays exactly under the cursor (easy to click)
 *   - the orbit looks alive but never fights the user
 */

import { useEffect, useRef, useState } from "react";

export type OrbitItem = {
  icon?: string;
  label?: string;
  color?: string;
  title?: string;
  body?: string;
  stat?: string;
};

type Props = { items: OrbitItem[] };

/* ---------- internal constants (canvas-space) ---------- */
const W = 760;
const H = 760;
const CX = W / 2;
const CY = H / 2;
const ORBIT_R = 270;          // distance from centre → node
const CENTER_R = 70;          // central globe radius
const NODE_R = 46;            // node disc radius
const HOVER_SCALE = 1.22;     // how big the hovered node grows
const ROT_SPEED = 0.0022;     // global rotation when idle

export default function StoryOrbit({ items }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Which item was clicked → popup state.
  const [selected, setSelected] = useState<OrbitItem | null>(null);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Node bookkeeping — base angle is FIXED (no drift). */
    const count = items.length;
    const nodes = items.map((d, i) => ({
      ...d,
      // Base angle: evenly distributed, first node at the top.
      base: ((i * (360 / count) - 90) * Math.PI) / 180,
      // Current rendered scale — eased toward `targetScale` each frame.
      scale: 1,
      // Soft hover glow alpha (0 → 1) — eased toward target.
      glow: 0,
    }));

    // Shared rotation offset. Increments each frame when nothing is hovered.
    let rotation = 0;
    // Which node is hovered (-1 = none).
    let hoveredIdx = -1;
    // Smoothed flag (0–1) used to pause rotation gently.
    let pausedT = 0;

    /* Coordinates for node `i` at current rotation. */
    const nodeXY = (i: number) => {
      const a = nodes[i].base + rotation;
      return {
        x: CX + Math.cos(a) * ORBIT_R,
        y: CY + Math.sin(a) * ORBIT_R,
      };
    };

    /* Draw routine — fully repaints the canvas each frame. */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* OUTER decorative rings (dashed) */
      [330, 290, 250].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(155,125,212,${0.10 - i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      /* SPARKLES — small drifting dots on a faint orbit */
      const t = performance.now() / 1000;
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2 + t * 0.15;
        const r = 220 + Math.sin(t * 0.6 + i) * 18;
        const x = CX + Math.cos(a) * r;
        const y = CY + Math.sin(a) * r;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(192,168,232,${0.25 + 0.25 * Math.sin(t + i)})`;
        ctx.fill();
      }

      /* CONNECTING beams center → node */
      nodes.forEach((_, i) => {
        const { x, y } = nodeXY(i);
        const gradient = ctx.createLinearGradient(CX, CY, x, y);
        gradient.addColorStop(0, "rgba(155,125,212,0.30)");
        gradient.addColorStop(1, "rgba(155,125,212,0)");
        ctx.beginPath();
        ctx.moveTo(CX, CY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = hoveredIdx === i ? 2 : 1;
        ctx.stroke();
      });

      /* CENTER glow + orb */
      const centerGradient = ctx.createRadialGradient(CX, CY, 0, CX, CY, 160);
      centerGradient.addColorStop(0, "rgba(96,64,168,0.40)");
      centerGradient.addColorStop(1, "rgba(96,64,168,0)");
      ctx.beginPath();
      ctx.arc(CX, CY, 160, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(CX, CY, CENTER_R, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(78,47,142,0.70)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.stroke();

      ctx.font = "56px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("🌍", CX, CY + 4);

      /* NODES */
      nodes.forEach((n, i) => {
        const { x, y } = nodeXY(i);

        // Ease scale + glow toward their targets.
        const targetScale = hoveredIdx === i ? HOVER_SCALE : 1;
        const targetGlow = hoveredIdx === i ? 1 : 0;
        n.scale += (targetScale - n.scale) * 0.16;
        n.glow += (targetGlow - n.glow) * 0.12;

        // Outer glow ring (fades in on hover).
        if (n.glow > 0.02) {
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(n.scale, n.scale);
          const glowGrad = ctx.createRadialGradient(
            0,
            0,
            NODE_R * 0.7,
            0,
            0,
            NODE_R * 1.8
          );
          const accent = n.color || "#9b7dd4";
          glowGrad.addColorStop(0, hexToRgba(accent, 0.45 * n.glow));
          glowGrad.addColorStop(1, hexToRgba(accent, 0));
          ctx.beginPath();
          ctx.arc(0, 0, NODE_R * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
          ctx.restore();
        }

        // Node disc.
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(n.scale, n.scale);

        const gradient = ctx.createRadialGradient(-10, -10, 4, 0, 0, NODE_R);
        gradient.addColorStop(0, "rgba(96,64,168,0.78)");
        gradient.addColorStop(1, "rgba(45,106,79,0.42)");

        ctx.beginPath();
        ctx.arc(0, 0, NODE_R, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${0.18 + 0.35 * n.glow})`;
        ctx.lineWidth = 1.5 + n.glow * 1.2;
        ctx.stroke();

        // Icon.
        ctx.font = "36px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.icon ?? "", 0, 2);

        // Label below the node.
        ctx.font = "700 12px Inter";
        ctx.fillStyle = `rgba(255,255,255,${0.65 + 0.3 * n.glow})`;
        ctx.fillText(n.label ?? "", 0, NODE_R + 26);

        ctx.restore();
      });
    };

    /* Animation loop. */
    const animate = () => {
      // Smoothly transition pause factor (1 = paused, 0 = full speed).
      const pauseTarget = hoveredIdx >= 0 ? 1 : 0;
      pausedT += (pauseTarget - pausedT) * 0.18;

      rotation += ROT_SPEED * (1 - pausedT);
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    /* Hit-test: returns the index of the node under (mx, my), or -1. */
    const hitTest = (mx: number, my: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      const cx = (mx - rect.left) * scaleX;
      const cy = (my - rect.top) * scaleY;
      for (let i = 0; i < nodes.length; i++) {
        const { x, y } = nodeXY(i);
        // Use the current rendered scale so the hit area matches the visual.
        if (Math.hypot(cx - x, cy - y) < NODE_R * nodes[i].scale + 10) {
          return i;
        }
      }
      return -1;
    };

    const handleMove = (e: MouseEvent) => {
      const idx = hitTest(e.clientX, e.clientY);
      hoveredIdx = idx;
      canvas.style.cursor = idx >= 0 ? "pointer" : "default";
    };

    const handleLeave = () => {
      hoveredIdx = -1;
    };

    const handleClick = (e: MouseEvent) => {
      const idx = hitTest(e.clientX, e.clientY);
      if (idx >= 0) setSelected(items[idx]);
    };

    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      const idx = hitTest(t.clientX, t.clientY);
      if (idx >= 0) setSelected(items[idx]);
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchstart", handleTouch, { passive: true });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", handleTouch);
    };
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* DESKTOP — canvas orbit (hidden on phones via CSS). */}
      <div className="story-orbit-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="story-orbit-canvas"
          aria-label="Interactive orbit — hover or tap a planet to learn more"
          role="img"
        />

        {/* POPUP shown when a node is clicked. */}
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center z-50 px-4">
            <div className="story-popup-card">
              <button
                type="button"
                className="story-popup-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="story-popup-icon">{selected.icon}</div>
              <h3 className="story-popup-title">{selected.title}</h3>
              <p className="story-popup-body">{selected.body}</p>
              <div
                className="story-popup-stat"
                style={{ color: selected.color }}
              >
                {selected.stat}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Small hint so first-time visitors know it's interactive. */}
      <p className="story-orbit-hint">
        Hover or tap a planet to learn more
      </p>

      {/* MOBILE — stacked card list (visible only on phones via CSS). */}
      <ul className="story-orbit-mobile">
        {items.map((item, i) => (
          <li
            key={`orbit-m-${i}`}
            className="story-orbit-mobile-card"
            style={{
              ["--accent" as any]: item.color || "#9b7dd4",
            }}
          >
            <div className="story-orbit-mobile-icon">{item.icon}</div>
            <div className="story-orbit-mobile-text">
              <div className="story-orbit-mobile-label">{item.label}</div>
              <h3 className="story-orbit-mobile-title">{item.title}</h3>
              <p className="story-orbit-mobile-body">{item.body}</p>
              <div
                className="story-orbit-mobile-stat"
                style={{ color: item.color }}
              >
                {item.stat}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Tiny hex → rgba helper.
 * Accepts "#rrggbb" (or "#rgb"); falls back to a brand purple.
 */
function hexToRgba(hex: string, alpha: number): string {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (h.length !== 6) return `rgba(155,125,212,${alpha})`;
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
