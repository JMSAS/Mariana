import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, clamp, easeInOut, easeOut, fontFamily } from "../theme";

/** Fondo azul marino con viñeta, puntos sutiles y grano de papel. */
export const Background: React.FC<{ ground?: number }> = ({ ground = 0.66 }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.navy }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.navyLine} 1.4px, transparent 1.6px)`,
          backgroundSize: "34px 34px",
          opacity: 0.35,
        }}
      />
      <AbsoluteFill
        style={{
          top: `${ground * 100}%`,
          backgroundColor: C.navyDeep,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.38) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

/** Textura de grano (papel) encima de todo, como en la referencia. */
export const Grain: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.22 }}>
      <svg width="1920" height="1080">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1920" height="1080" filter="url(#grain)" />
      </svg>
    </AbsoluteFill>
  );
};

/** Cono de luz desde arriba. */
export const Spotlight: React.FC<{ x: number; width: number; opacity: number; height?: number }> = ({
  x,
  width,
  opacity,
  height = 900,
}) => {
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", left: 0, top: 0, opacity, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6e6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${x - 40},0 ${x + 40},0 ${x + width / 2},${height} ${x - width / 2},${height}`}
        fill="url(#cone)"
      />
    </svg>
  );
};

/** Rótulo de papel recortado con pin rojo (p. ej. «2:47 A. M.»). */
export const PaperLabel: React.FC<{
  children: React.ReactNode;
  start: number;
  style?: React.CSSProperties;
  fontSize?: number;
  rotate?: number;
}> = ({ children, start, style, fontSize = 40, rotate = -2 }) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [start, start + 14], [100, 0], { ...clamp, easing: easeInOut });
  const moving = frame >= start && frame < start + 14;
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        rotate: `${rotate}deg`,
        clipPath: `inset(-40px ${reveal}% -10px -10px)`,
        filter: moving ? "blur(1.2px)" : undefined,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize,
          color: C.charcoal,
          background: C.cream,
          padding: `${fontSize * 0.18}px ${fontSize * 0.45}px`,
          clipPath:
            "polygon(0 4%, 6% 0, 30% 3%, 55% 0, 80% 2%, 100% 0, 99% 50%, 100% 96%, 75% 100%, 48% 97%, 20% 100%, 0 97%, 1% 50%)",
          boxShadow: "0 6px 0 rgba(0,0,0,0.25)",
          letterSpacing: 1,
          lineHeight: 1.1,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: -9,
          left: "50%",
          width: 16,
          height: 16,
          marginLeft: -8,
          borderRadius: 8,
          background: C.red,
          boxShadow: "0 2px 0 rgba(0,0,0,0.3)",
        }}
      />
    </div>
  );
};

/**
 * Tira de texto (palabra clave) que entra con máscara horizontal,
 * desplazamiento corto y desenfoque solo durante el movimiento.
 */
export const Strip: React.FC<{
  text: string;
  start: number;
  end: number;
  variant?: "red" | "cream";
  fontSize?: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({ text, start, end, variant = "red", fontSize = 46, rotate = -1.5, style }) => {
  const frame = useCurrentFrame();
  const inDur = 14; // ~0,45 s
  const outDur = 10; // ~0,33 s
  if (frame < start || frame > end + outDur) return null;
  const reveal = interpolate(frame, [start, start + inDur], [100, 0], { ...clamp, easing: easeOut });
  const out = interpolate(frame, [end, end + outDur], [0, 1], { ...clamp, easing: easeInOut });
  const dx = interpolate(frame, [start, start + inDur], [-40, 0], { ...clamp, easing: easeOut });
  const moving = (frame >= start && frame < start + inDur) || frame > end;
  const red = variant === "red";
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        rotate: `${rotate}deg`,
        translate: `${dx}px ${out * 20}px`,
        opacity: 1 - out,
        clipPath: `inset(-10px ${reveal}% -10px -10px)`,
        filter: moving ? "blur(1.5px)" : undefined,
      }}
    >
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize,
          color: red ? C.cream : C.charcoal,
          background: red ? C.red : C.cream,
          padding: `${fontSize * 0.14}px ${fontSize * 0.4}px`,
          clipPath:
            "polygon(0 6%, 12% 0, 40% 4%, 70% 0, 100% 3%, 99% 52%, 100% 95%, 66% 100%, 35% 96%, 8% 100%, 0 94%, 1% 50%)",
          boxShadow: "0 5px 0 rgba(0,0,0,0.22)",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};

/**
 * Ventana persistente de presentadores (inferior derecha).
 * De momento es un marcador de posición: cuando lleguen las grabaciones
 * se reemplaza por el <Video> real.
 */
export type Speaker = "M" | "J" | "both";
export const PresenterWindow: React.FC<{
  speaker: Speaker;
  rect?: { x: number; y: number; w: number; h: number };
}> = ({ speaker, rect = { x: 1390, y: 730, w: 470, h: 280 } }) => {
  const frame = useCurrentFrame();
  const appear = interpolate(frame, [6, 22], [0, 1], { ...clamp, easing: easeOut });
  const W = rect.w;
  const H = rect.h;
  const panel = (who: "M" | "J", name: string) => {
    const active = speaker === "both" || speaker === who;
    return (
      <div
        style={{
          flex: 1,
          position: "relative",
          background: "#141a2c",
          border: `3px solid ${active ? C.red : "rgba(243,230,211,0.25)"}`,
          opacity: active ? 1 : 0.72,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 6,
          color: C.grey,
          fontFamily,
          fontWeight: 500,
          fontSize: 18,
        }}
      >
        <svg width="70" height="80" viewBox="0 0 70 80">
          <circle cx="35" cy="26" r="18" fill="#2a3352" />
          <path d="M5 80 Q35 36 65 80 Z" fill="#2a3352" />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 8,
            bottom: 8,
            background: active ? C.red : "rgba(0,0,0,0.5)",
            color: C.cream,
            fontWeight: 700,
            fontSize: 15,
            padding: "3px 10px",
          }}
        >
          {name}
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: W,
        height: H,
        display: "flex",
        gap: 6,
        padding: 6,
        background: C.cream,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        opacity: appear,
        translate: `0px ${(1 - appear) * 20}px`,
      }}
    >
      {panel("M", "Mariana")}
      {panel("J", "Juan Diego")}
    </div>
  );
};
