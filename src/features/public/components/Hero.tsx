// import { useEffect, useRef } from "react";

// const Hero = () => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       draw();
//     };

//     const draw = () => {
//       const w = canvas.width;
//       const h = canvas.height;
//       ctx.clearRect(0, 0, w, h);

//       // ── Background fill ──────────────────────────────────────────────────
//       ctx.fillStyle = "#0a0a0a";
//       ctx.fillRect(0, 0, w, h);

//       // ── Grid squares ─────────────────────────────────────────────────────
//       const CELL = 68;
//       const cols = Math.ceil(w / CELL) + 1;
//       const rows = Math.ceil(h / CELL) + 1;

//       ctx.strokeStyle = "hsla(0, 0%, 100%, 0.1)";
//       ctx.lineWidth = 1;

//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           const x = c * CELL;
//           const y = r * CELL;
//           ctx.strokeRect(x + 0.5, y + 0.5, CELL, CELL);
//         }
//       }

//       // ── Helper: radial yellow glow ───────────────────────────────────────
//       const addGlow = (
//         cx: number,
//         cy: number,
//         r0: number,
//         r1: number,
//         alpha: number
//       ) => {
//         const g = ctx.createRadialGradient(cx, cy, r0, cx, cy, r1);
//         g.addColorStop(0, `rgba(255,200,40,${alpha})`);
//         g.addColorStop(0.35, `rgba(255,160,20,${alpha * 0.4})`);
//         g.addColorStop(1, "rgba(255,140,0,0)");
//         ctx.fillStyle = g;
//         ctx.fillRect(0, 0, w, h);
//       };

//       // ── Glow 1 — Navbar top-right (behind login / CTA buttons) ───────────
//       // Sits at ~80% across, ~4% down — tight and compact
//       addGlow(w * 1, h * 0.8, 0, w * 0.22, 0.28);

//       // ── Glow 2 — Hero center (behind "Manage CSR & Accountability" line) ─
//       // Large dramatic spread, roughly mid-height, slightly left of center
//       addGlow(w * 0.3, h * 0.48, 0, w * 0.55, 0.2);

//       // ── Glow 3 — Bottom-left (near 100% icon / dashboard edge) ───────────
//       // Anchored bottom-left, soft upward bloom
//       addGlow(w * 0.12, h * 0.88, 0, w * 0.30, 0.24);

//       // ── Vignette ─────────────────────────────────────────────────────────
//       const vig = ctx.createRadialGradient(
//         w / 2, h / 2, h * 0.15,
//         w / 2, h / 2, h * 0.9
//       );
//       vig.addColorStop(0, "rgba(0,0,0,0)");
//       vig.addColorStop(1, "rgba(0,0,0,0.65)");
//       ctx.fillStyle = vig;
//       ctx.fillRect(0, 0, w, h);
//     };

//     const ro = new ResizeObserver(resize);
//     ro.observe(canvas);
//     resize();

//     return () => ro.disconnect();
//   }, []);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//         overflow: "hidden",
//         background: "#0a0a0a",
//       }}
//     >
//       {/* Canvas background */}
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//         }}
//       />

//       {/* CSS pulse overlays — one per glow zone so each breathes independently */}

//       {/* Glow 1 – navbar top-right */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           right: "10%",
//           width: "28%",
//           height: "22%",
//           background:
//             "radial-gradient(ellipse at 70% 10%, rgba(255,195,30,0.18) 0%, transparent 70%)",
//           animation: "pulse1 4s ease-in-out infinite",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Glow 2 – center hero text */}
//       <div
//         style={{
//           position: "absolute",
//           top: "28%",
//           left: "10%",
//           width: "65%",
//           height: "45%",
//           background:
//             "radial-gradient(ellipse at 45% 55%, rgba(255,185,20,0.13) 0%, transparent 65%)",
//           animation: "pulse2 6s ease-in-out infinite",
//           pointerEvents: "none",
//         }}
//       />

//       {/* Glow 3 – bottom-left dashboard corner */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "32%",
//           height: "30%",
//           background:
//             "radial-gradient(ellipse at 15% 85%, rgba(255,195,30,0.18) 0%, transparent 65%)",
//           animation: "pulse3 5s ease-in-out infinite",
//           pointerEvents: "none",
//         }}
//       />

//       <style>{`
//         @keyframes pulse1 {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.55; }
//         }
//         @keyframes pulse2 {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.6; }
//         }
//         @keyframes pulse3 {
//           0%, 100% { opacity: 1; }
//           50%       { opacity: 0.5; }
//         }
//       `}</style>

//       {/* Your existing content goes here */}
//       {/* <Navbar /> */}
//       {/* <HeroText /> */}
//       {/* <DashboardImage /> */}
//     </div>
//   );
// };

// export default Hero;
import HeroImage from '@/assets/images/BG.png'
const Hero = () => {
  return (
    <div className='bg-bg-dark'>
        <div
        className="bg-no-repeat"
        style={{
          backgroundImage: `url(${HeroImage})`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          minHeight: '100vh',
        }}
      >
        </div>
 
    </div>
      )
}

export default Hero
