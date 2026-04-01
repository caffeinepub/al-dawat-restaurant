import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

// ─── Color constants ──────────────────────────────────────────────────────────
const SAFFRON = "#FF6B00";
const GOLD = "#FFD700";
const GOLD_DARK = "#D4A017";
const MAROON = "#8B0000";
const DEEP_MAROON = "#5A0000";
const ROSE = "#FF69B4";
const CREAM = "#FFF8E7";
// ─── Static decorative arrays (pre-generated for stable keys) ────────────────
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: (i * 17 + i * i * 3) % 100,
  top: (i * 23 + i * 7) % 100,
  w: 1 + (i % 3),
  dur: 2 + (i % 4),
  del: (i * 0.13) % 3,
  op: 0.3 + (i % 5) * 0.14,
}));
const DOT_KEYS = ["d0", "d1", "d2", "d3", "d4"];
const SPARKLE_KEYS = ["s0", "s1", "s2", "s3", "s4", "s5", "s6"];

// ─── Sparkle hook ─────────────────────────────────────────────────────────────
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

function useSparkles(count: number, active: boolean) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  useEffect(() => {
    if (!active) return;
    const colors = [GOLD, SAFFRON, ROSE, "#fff", GOLD_DARK, "#FFB347"];
    const make = (): Sparkle => ({
      id: idRef.current++,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
    setSparkles(Array.from({ length: count }, make));
    const iv = setInterval(() => {
      setSparkles((prev) => [
        ...prev.slice(-(count - 3)),
        make(),
        make(),
        make(),
      ]);
    }, 700);
    return () => clearInterval(iv);
  }, [active, count]);
  return sparkles;
}

// ─── Petal hook ───────────────────────────────────────────────────────────────
interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  spin: number;
  swayAmt: number;
}

function usePetals(count: number, active: boolean) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const idRef = useRef(0);
  useEffect(() => {
    if (!active) return;
    const colors = [ROSE, "#FFB6C1", SAFFRON, "#FFA07A", "#FF8C69", "#FFD700"];
    const make = (): Petal => ({
      id: idRef.current++,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 6 + Math.random() * 6,
      size: 10 + Math.random() * 16,
      color: colors[Math.floor(Math.random() * colors.length)],
      spin: Math.random() * 360,
      swayAmt: 20 + Math.random() * 40,
    });
    setPetals(Array.from({ length: count }, make));
    const iv = setInterval(() => {
      setPetals((prev) => [...prev.slice(-(count - 2)), make(), make()]);
    }, 1200);
    return () => clearInterval(iv);
  }, [active, count]);
  return petals;
}

// ─── Rakhi SVG ────────────────────────────────────────────────────────────────
function RakhiSVG({
  size = 80,
  spin = false,
}: { size?: number; spin?: boolean }) {
  return (
    <svg
      role="img"
      aria-label="Rakhi"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        animation: spin ? "rakhiSpin 8s linear infinite" : undefined,
        filter: `drop-shadow(0 0 8px ${GOLD})`,
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke={SAFFRON}
        strokeWidth="3"
        strokeDasharray="6 4"
      />
      <circle
        cx="50"
        cy="50"
        r="36"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.5"
        opacity="0.6"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse
          key={a}
          cx={50 + 26 * Math.cos((a * Math.PI) / 180)}
          cy={50 + 26 * Math.sin((a * Math.PI) / 180)}
          rx="9"
          ry="6"
          fill={a % 90 === 0 ? SAFFRON : ROSE}
          opacity="0.85"
          transform={`rotate(${a + 90} ${50 + 26 * Math.cos((a * Math.PI) / 180)} ${50 + 26 * Math.sin((a * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="50" cy="50" r="16" fill={GOLD_DARK} />
      <circle cx="50" cy="50" r="12" fill={GOLD} />
      <circle cx="50" cy="50" r="8" fill={SAFFRON} />
      <circle cx="50" cy="50" r="4" fill={CREAM} />
      <circle cx="50" cy="50" r="2" fill={GOLD} />
      <line
        x1="50"
        y1="92"
        x2="44"
        y2="106"
        stroke={SAFFRON}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="92"
        x2="50"
        y2="108"
        stroke={GOLD}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="92"
        x2="56"
        y2="106"
        stroke={SAFFRON}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Diya SVG ─────────────────────────────────────────────────────────────────
function DiyaSVG({ size = 60 }: { size?: number }) {
  return (
    <svg
      role="img"
      aria-label="Diya lamp"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 12px ${GOLD}) drop-shadow(0 0 24px ${SAFFRON})`,
      }}
    >
      <ellipse cx="50" cy="68" rx="32" ry="14" fill="#C45A00" />
      <ellipse cx="50" cy="64" rx="32" ry="14" fill="#E07020" />
      <ellipse cx="50" cy="62" rx="28" ry="11" fill="#FF8C30" />
      <ellipse cx="50" cy="60" rx="20" ry="7" fill="#FFD580" opacity="0.6" />
      <path d="M 78 62 Q 90 58 88 52 Q 82 50 78 56" fill="#C45A00" />
      <line
        x1="80"
        y1="56"
        x2="80"
        y2="44"
        stroke="#8B6914"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="80"
        cy="38"
        rx="5"
        ry="8"
        fill={GOLD}
        opacity="0.95"
        style={{
          animation: "flameFlicker 0.8s ease-in-out infinite alternate",
        }}
      />
      <ellipse
        cx="80"
        cy="40"
        rx="3"
        ry="5"
        fill={SAFFRON}
        opacity="0.9"
        style={{
          animation: "flameFlicker 0.6s ease-in-out infinite alternate-reverse",
        }}
      />
      <ellipse cx="80" cy="42" rx="2" ry="3" fill="#fff" opacity="0.8" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
        <line
          key={a}
          x1={80 + 8 * Math.cos((a * Math.PI) / 180)}
          y1={38 + 8 * Math.sin((a * Math.PI) / 180)}
          x2={80 + 14 * Math.cos((a * Math.PI) / 180)}
          y2={38 + 14 * Math.sin((a * Math.PI) / 180)}
          stroke={GOLD}
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      {[190, 210, 230, 250, 270, 290, 310, 330, 350].map((a) => (
        <circle
          key={a}
          cx={50 + 24 * Math.cos((a * Math.PI) / 180)}
          cy={64 + 10 * Math.sin((a * Math.PI) / 180)}
          r="1.5"
          fill={GOLD}
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

// ─── Lotus SVG ────────────────────────────────────────────────────────────────
function LotusSVG({ size = 60 }: { size?: number }) {
  return (
    <svg
      role="img"
      aria-label="Lotus flower"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
    >
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse
          key={a}
          cx={50 + 22 * Math.cos((a * Math.PI) / 180)}
          cy={50 + 22 * Math.sin((a * Math.PI) / 180)}
          rx="10"
          ry="16"
          fill={a % 90 === 0 ? ROSE : "#FFB6C1"}
          opacity="0.75"
          transform={`rotate(${a} ${50 + 22 * Math.cos((a * Math.PI) / 180)} ${50 + 22 * Math.sin((a * Math.PI) / 180)})`}
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx={50 + 12 * Math.cos((a * Math.PI) / 180)}
          cy={50 + 12 * Math.sin((a * Math.PI) / 180)}
          rx="7"
          ry="12"
          fill={ROSE}
          opacity="0.9"
          transform={`rotate(${a} ${50 + 12 * Math.cos((a * Math.PI) / 180)} ${50 + 12 * Math.sin((a * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="50" cy="50" r="8" fill={GOLD} />
      <circle cx="50" cy="50" r="5" fill={SAFFRON} />
      <circle cx="50" cy="50" r="2.5" fill={CREAM} />
    </svg>
  );
}

// ─── Door component ───────────────────────────────────────────────────────────
function Door({ side, open }: { side: "left" | "right"; open: boolean }) {
  const isLeft = side === "left";
  const angle = open ? (isLeft ? -108 : 108) : 0;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: isLeft ? 0 : "50%",
        width: "50%",
        height: "100%",
        transformOrigin: isLeft ? "left center" : "right center",
        transform: `perspective(1400px) rotateY(${angle}deg)`,
        transition: "transform 2.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        transformStyle: "preserve-3d",
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isLeft
            ? `linear-gradient(to right, ${DEEP_MAROON}, ${MAROON}, #A00000, ${MAROON})`
            : `linear-gradient(to left, ${DEEP_MAROON}, ${MAROON}, #A00000, ${MAROON})`,
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: isLeft ? "5%" : "3%",
            right: isLeft ? "3%" : "5%",
            bottom: "6%",
            border: `3px solid ${GOLD}`,
            boxShadow:
              "inset 0 0 20px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "8%",
              right: "8%",
              height: "40%",
              border: `2px solid ${GOLD_DARK}`,
              background: "rgba(139,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 80 80"
              style={{ width: 50, height: 50, opacity: 0.7 }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <ellipse
                  key={a}
                  cx={40 + 20 * Math.cos((a * Math.PI) / 180)}
                  cy={40 + 20 * Math.sin((a * Math.PI) / 180)}
                  rx="7"
                  ry="5"
                  fill={a % 90 === 0 ? SAFFRON : GOLD}
                  opacity="0.8"
                  transform={`rotate(${a + 90} ${40 + 20 * Math.cos((a * Math.PI) / 180)} ${40 + 20 * Math.sin((a * Math.PI) / 180)})`}
                />
              ))}
              <circle cx="40" cy="40" r="12" fill={GOLD_DARK} />
              <circle cx="40" cy="40" r="8" fill={GOLD} />
              <circle cx="40" cy="40" r="4" fill={SAFFRON} opacity="0.9" />
            </svg>
          </div>
          {!isLeft && (
            <div
              style={{
                position: "absolute",
                top: "48%",
                left: "8%",
                transform: "translateY(-50%)",
                width: 14,
                height: 36,
                background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_DARK}, ${GOLD})`,
                borderRadius: 7,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.5), 0 0 12px rgba(255,215,0,0.5)",
              }}
            />
          )}
          {isLeft && (
            <div
              style={{
                position: "absolute",
                top: "48%",
                right: "8%",
                transform: "translateY(-50%)",
                width: 14,
                height: 36,
                background: `linear-gradient(to bottom, ${GOLD}, ${GOLD_DARK}, ${GOLD})`,
                borderRadius: 7,
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.5), 0 0 12px rgba(255,215,0,0.5)",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "8%",
              right: "8%",
              height: "30%",
              border: `2px solid ${GOLD_DARK}`,
              background: "rgba(139,0,0,0.15)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 5,
            background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            [isLeft ? "right" : "left"]: 0,
            width: 5,
            background: `linear-gradient(to bottom, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK})`,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: DEEP_MAROON,
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

// ─── Fade-in helper ───────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  style,
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 1s ease, transform 1s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Gold decorative border SVG ───────────────────────────────────────────────
function GoldBorder() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="rakhi-border"
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="16" cy="16" r="2" fill={GOLD} opacity="0.3" />
          <circle cx="0" cy="0" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="32" cy="0" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="0" cy="32" r="1.5" fill={SAFFRON} opacity="0.3" />
          <circle cx="32" cy="32" r="1.5" fill={SAFFRON} opacity="0.3" />
          <path
            d="M16 2 L18 14 L30 16 L18 18 L16 30 L14 18 L2 16 L14 14 Z"
            fill={GOLD}
            opacity="0.15"
          />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="72" fill="url(#rakhi-border)" />
      <rect
        x="0"
        y="calc(100% - 72px)"
        width="100%"
        height="72"
        fill="url(#rakhi-border)"
      />
      <rect x="0" y="0" width="72" height="100%" fill="url(#rakhi-border)" />
      <rect
        x="calc(100% - 72px)"
        y="0"
        width="72"
        height="100%"
        fill="url(#rakhi-border)"
      />
      <rect
        x="8"
        y="8"
        width="calc(100% - 16px)"
        height="calc(100% - 16px)"
        fill="none"
        stroke={GOLD}
        strokeWidth="2"
        opacity="0.6"
      />
      <rect
        x="14"
        y="14"
        width="calc(100% - 28px)"
        height="calc(100% - 28px)"
        fill="none"
        stroke={GOLD_DARK}
        strokeWidth="1"
        opacity="0.4"
      />
      {[
        "8 8",
        "calc(100% - 40px) 8",
        "8 calc(100% - 40px)",
        "calc(100% - 40px) calc(100% - 40px)",
      ].map((pos) => (
        <g key={pos} transform={`translate(${pos})`}>
          <circle
            cx="16"
            cy="16"
            r="6"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx="16" cy="16" r="3" fill={GOLD} opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState<"door" | "reveal">("door");
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const sparkles = useSparkles(45, showContent);
  const petals = usePetals(30, showContent);

  useEffect(() => {
    const t1 = setTimeout(() => setDoorsOpen(true), 900);
    const t2 = setTimeout(() => setPhase("reveal"), 3400);
    const t3 = setTimeout(() => setShowContent(true), 3700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#1a0000",
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "Rakshabandhan-Invitation-Chhablani.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Serif+Devanagari:wght@400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow-x: hidden; background: #1a0000; }

        .rb-root {
          min-height: 100dvh;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          position: relative;
          font-family: 'Playfair Display', serif;
          overflow: hidden;
          background: linear-gradient(160deg, #1a0000 0%, #3d0a00 40%, #1a0000 100%);
        }

        @keyframes rakhiSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes flameFlicker {
          0% { transform: scaleX(1) scaleY(1); opacity: 0.95; }
          50% { transform: scaleX(1.15) scaleY(0.9); opacity: 1; }
          100% { transform: scaleX(0.9) scaleY(1.1); opacity: 0.85; }
        }
        @keyframes goldenGlow {
          0%, 100% { text-shadow: 0 0 20px ${GOLD}, 0 0 40px ${SAFFRON}, 0 0 80px ${GOLD}; }
          50% { text-shadow: 0 0 40px ${GOLD}, 0 0 80px #fff, 0 0 120px ${SAFFRON}, 0 0 160px ${GOLD}; }
        }
        @keyframes sparkleAnim {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          35% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        @keyframes petalFall {
          0% { top: -6%; opacity: 1; }
          85% { opacity: 0.7; }
          100% { top: 108%; opacity: 0; }
        }
        @keyframes petalSway {
          0%, 100% { margin-left: 0px; }
          25% { margin-left: 20px; }
          75% { margin-left: -20px; }
        }
        @keyframes pulseRing { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
        @keyframes floatBob { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes doorGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes omPulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.05); } }
        @keyframes dlPulse { 0%, 100% { box-shadow: 0 0 12px ${GOLD}, 0 0 24px ${SAFFRON}; } 50% { box-shadow: 0 0 24px ${GOLD}, 0 0 48px ${SAFFRON}; } }

        .golden-glow { animation: goldenGlow 2.5s ease-in-out infinite; }
        .float-bob { animation: floatBob 3s ease-in-out infinite; }
        .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
        .om-pulse { animation: omPulse 2.5s ease-in-out infinite; }
        .dl-btn { animation: dlPulse 2s ease-in-out infinite; }
        .dl-btn:hover { opacity: 0.85; transform: scale(1.04); }
        .dl-btn:active { transform: scale(0.97); }

        .door-scene {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(160deg, #0d0000 0%, #2a0600 50%, #0d0000 100%);
        }
      `}</style>

      {/* ── DOOR SCENE ── */}
      {phase === "door" && (
        <div className="door-scene" data-ocid="door.panel">
          {STARS.map((star) => (
            <div
              key={star.id}
              style={{
                position: "absolute",
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.w,
                height: star.w,
                borderRadius: "50%",
                background: GOLD,
                opacity: star.op,
                animation: `sparkleAnim ${star.dur}s ease-in-out ${star.del}s infinite`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `5px solid ${GOLD}`,
              boxShadow:
                "inset 0 0 60px rgba(255,107,0,0.15), 0 0 40px rgba(255,215,0,0.3)",
              pointerEvents: "none",
              zIndex: 30,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "13%",
              background: `linear-gradient(to bottom, ${DEEP_MAROON}, ${MAROON})`,
              zIndex: 25,
              borderBottom: `3px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.2rem,4vw,1.8rem)",
                filter: `drop-shadow(0 0 8px ${GOLD})`,
              }}
            >
              🪢
            </span>
            <div
              style={{
                color: GOLD,
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1rem,3.5vw,1.6rem)",
                letterSpacing: "0.08em",
                textShadow: `0 0 20px ${GOLD}`,
                animation: "doorGlow 2s ease-in-out infinite",
              }}
            >
              Raksha Bandhan
            </div>
            <span
              style={{
                fontSize: "clamp(1.2rem,4vw,1.8rem)",
                filter: `drop-shadow(0 0 8px ${GOLD})`,
              }}
            >
              🪢
            </span>
          </div>
          {doorsOpen && (
            <div
              style={{
                position: "absolute",
                top: "13%",
                bottom: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                background: `linear-gradient(to bottom, transparent, ${GOLD}, #fffde0, ${GOLD}, transparent)`,
                filter: "blur(10px)",
                zIndex: 18,
                animation: "doorGlow 1s ease-in-out infinite",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,215,0,0.18) 0%, rgba(255,107,0,0.08) 40%, transparent 70%)",
              opacity: doorsOpen ? 1 : 0,
              transition: "opacity 1.2s ease 0.5s",
              zIndex: 18,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12%",
              left: 0,
              right: 0,
              bottom: "5%",
              perspective: 1400,
            }}
          >
            <Door side="left" open={doorsOpen} />
            <Door side="right" open={doorsOpen} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "5%",
              background: `linear-gradient(to top, ${DEEP_MAROON}, ${MAROON})`,
              borderTop: `2px solid ${GOLD}`,
              zIndex: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {DOT_KEYS.map((dk) => (
              <span
                key={dk}
                style={{ color: SAFFRON, fontSize: "0.7rem", opacity: 0.7 }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── REVEAL SCENE ── */}
      <div
        ref={cardRef}
        className="rb-root"
        style={{
          opacity: phase === "reveal" ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
        data-ocid="rakshabandhan.panel"
      >
        <GoldBorder />

        {petals.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: "-6%",
              width: p.size,
              height: p.size * 0.65,
              zIndex: 6,
              pointerEvents: "none",
              borderRadius: "50% 0 50% 0",
              background: p.color,
              opacity: 0.8,
              animation: `petalFall ${p.duration}s linear ${p.delay}s forwards, petalSway ${p.duration * 0.6}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {sparkles.map((s) => (
          <div
            key={s.id}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              zIndex: 8,
              pointerEvents: "none",
              animation: `sparkleAnim ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
                fill={s.color}
              />
            </svg>
          </div>
        ))}

        <div
          style={{
            position: "relative",
            zIndex: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "4.5rem 2rem 3.5rem",
            minHeight: "100dvh",
            textAlign: "center",
          }}
        >
          <FadeIn
            delay={3.8}
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div className="float-bob" style={{ animationDelay: "0s" }}>
              <DiyaSVG size={52} />
            </div>
            <div className="float-bob" style={{ animationDelay: "0.5s" }}>
              <DiyaSVG size={52} />
            </div>
            <div className="float-bob" style={{ animationDelay: "1s" }}>
              <DiyaSVG size={52} />
            </div>
          </FadeIn>

          <FadeIn delay={4.0}>
            <div
              className="om-pulse"
              style={{
                fontSize: "clamp(2rem,7vw,2.8rem)",
                color: GOLD,
                textShadow: `0 0 20px ${GOLD}, 0 0 40px ${SAFFRON}`,
                marginBottom: "0.3rem",
              }}
            >
              ॐ
            </div>
          </FadeIn>

          <FadeIn delay={4.3} style={{ marginBottom: "0.6rem" }}>
            <div className="pulse-ring">
              <RakhiSVG size={96} spin />
            </div>
          </FadeIn>

          <FadeIn delay={4.7}>
            <div
              className="golden-glow"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2.6rem,9vw,4rem)",
                color: GOLD,
                lineHeight: 1.1,
                letterSpacing: "0.05em",
              }}
            >
              Raksha Bandhan
            </div>
          </FadeIn>

          <FadeIn
            delay={5.0}
            style={{ marginTop: "0.3rem", marginBottom: "0.8rem" }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(0.75rem,2.5vw,0.95rem)",
                color: SAFFRON,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              रक्षा बंधन · Sacred Bond of Love
            </div>
          </FadeIn>

          <FadeIn delay={5.2} style={{ width: "100%", marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${GOLD})`,
                  maxWidth: 80,
                }}
              />
              <span style={{ color: GOLD, fontSize: "1.2rem" }}>✦</span>
              <span style={{ color: SAFFRON, fontSize: "1rem" }}>🪢</span>
              <span style={{ color: GOLD, fontSize: "1.2rem" }}>✦</span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(to left, transparent, ${GOLD})`,
                  maxWidth: 80,
                }}
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={5.5}
            style={{ width: "100%", maxWidth: 400, marginBottom: "1.2rem" }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(90,0,0,0.85) 0%, rgba(139,0,0,0.9) 50%, rgba(90,0,0,0.85) 100%)",
                border: `2px solid ${GOLD}`,
                borderRadius: 4,
                padding: "1.4rem 1.6rem",
                boxShadow:
                  "0 0 30px rgba(255,107,0,0.2), inset 0 0 30px rgba(0,0,0,0.3)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(0.9rem,3vw,1.05rem)",
                  color: CREAM,
                  lineHeight: 1.9,
                }}
              >
                <span
                  style={{ color: GOLD, fontWeight: 700, fontSize: "1.1em" }}
                >
                  Chhablani Parivar
                </span>{" "}
                ko heartily welcome hai
                <br />
                <span
                  style={{ color: GOLD, fontStyle: "italic", fontWeight: 700 }}
                >
                  the sacred bond of Raksha Bandhan
                </span>
                <br />
                <br />
                <span style={{ color: SAFFRON, fontSize: "0.85em" }}>
                  📅 03 September 2025 (Wednesday)
                </span>
                <br />
                <span style={{ color: SAFFRON, fontSize: "0.85em" }}>
                  🕙 10:00 AM onwards
                </span>
                <br />
                <span
                  style={{ color: GOLD, fontWeight: 700, fontSize: "1.05em" }}
                >
                  🌸 Heartily Welcoming 🌸
                </span>
                <br />
                <span
                  style={{
                    color: CREAM,
                    fontSize: "1.1em",
                    fontFamily: "'Dancing Script', cursive",
                    letterSpacing: "0.05em",
                  }}
                >
                  Princy &nbsp;✦&nbsp; Shivani &nbsp;✦&nbsp; Ayush
                </span>
                <br />
                <span style={{ color: SAFFRON, fontSize: "0.85em" }}>
                  📍 Laharwani Sant Karwara Ram Ward
                </span>
                <br />
                <br />
                Join us for puja, rituals &amp; celebration
                <br />
                with sweets and blessings
              </p>
            </div>
          </FadeIn>

          <FadeIn
            delay={6.0}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: "1rem",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(2rem,7vw,3rem)" }}>🧑</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: GOLD,
                  letterSpacing: "0.1em",
                  marginTop: 4,
                }}
              >
                BHAIYA
              </div>
            </div>
            <div
              style={{
                flex: 1,
                position: "relative",
                height: 40,
                maxWidth: 120,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(to right, ${SAFFRON}, ${GOLD}, ${ROSE}, ${GOLD}, ${SAFFRON})`,
                  transform: "translateY(-50%)",
                  boxShadow: `0 0 8px ${GOLD}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <RakhiSVG size={36} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(2rem,7vw,3rem)" }}>👩</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: ROSE,
                  letterSpacing: "0.1em",
                  marginTop: 4,
                }}
              >
                DIDI
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={6.5} style={{ marginBottom: "0.8rem" }}>
            <div
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1.4rem,5vw,2rem)",
                color: CREAM,
                textShadow: "0 0 20px rgba(255,215,0,0.4)",
                lineHeight: 1.4,
              }}
            >
              With Love &amp; Blessings
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(0.9rem,3vw,1.1rem)",
                color: GOLD,
                letterSpacing: "0.15em",
                marginTop: 4,
              }}
            >
              — Chhablani Parivar
            </div>
          </FadeIn>

          <FadeIn
            delay={7.0}
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <div className="float-bob" style={{ animationDelay: "0s" }}>
              <LotusSVG size={44} />
            </div>
            <div className="float-bob" style={{ animationDelay: "0.7s" }}>
              <div
                style={{
                  fontSize: "2rem",
                  filter: `drop-shadow(0 0 8px ${GOLD})`,
                }}
              >
                🌸
              </div>
            </div>
            <div className="float-bob" style={{ animationDelay: "1.4s" }}>
              <LotusSVG size={44} />
            </div>
          </FadeIn>

          <FadeIn delay={7.3} style={{ width: "100%", marginBottom: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${GOLD})`,
                  maxWidth: 60,
                }}
              />
              {SPARKLE_KEYS.map((sk, si) => (
                <span
                  key={sk}
                  style={{
                    color: si % 2 === 0 ? GOLD : SAFFRON,
                    fontSize: "0.75rem",
                  }}
                >
                  ✦
                </span>
              ))}
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(to left, transparent, ${GOLD})`,
                  maxWidth: 60,
                }}
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={7.5}
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
              marginBottom: "1.2rem",
            }}
          >
            <div className="float-bob" style={{ animationDelay: "0.3s" }}>
              <DiyaSVG size={44} />
            </div>
            <div className="float-bob" style={{ animationDelay: "0.9s" }}>
              <DiyaSVG size={44} />
            </div>
            <div className="float-bob" style={{ animationDelay: "1.5s" }}>
              <DiyaSVG size={44} />
            </div>
          </FadeIn>

          {/* ── DOWNLOAD BUTTON ── */}
          <FadeIn delay={8.0} style={{ marginBottom: "1.2rem" }}>
            <button
              type="button"
              className="dl-btn"
              onClick={handleDownload}
              disabled={downloading}
              style={{
                background: `linear-gradient(135deg, ${DEEP_MAROON}, ${MAROON}, ${DEEP_MAROON})`,
                border: `2px solid ${GOLD}`,
                borderRadius: 6,
                color: GOLD,
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(1rem,3.5vw,1.3rem)",
                letterSpacing: "0.08em",
                padding: "0.65rem 1.8rem",
                cursor: downloading ? "wait" : "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ fontSize: "1.2em" }}>⬇</span>
              {downloading ? "Saving..." : "Download Card"}
            </button>
          </FadeIn>

          <FadeIn delay={7.8}>
            <p
              style={{
                color: "rgba(255,215,0,0.5)",
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
              }}
            >
              © {new Date().getFullYear()} · Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                style={{ color: GOLD, textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
