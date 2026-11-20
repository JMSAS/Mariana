import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, clamp, easeInOut, easeOut, fontFamily } from "../theme";

export const sec = (s: number) => Math.round(s * 30);

type InProps = {
  at: number; // frame de entrada
  out?: number; // frame de salida (opcional)
  dur?: number; // duración de entrada (~0,45 s)
  outDur?: number; // duración de salida (~0,33 s)
  dx?: number;
  dy?: number;
  mask?: "left" | "up" | "none";
  scaleFrom?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

/**
 * Entrada/salida estándar del video: Easy In/Out, desplazamiento corto,
 * máscara de revelado y desenfoque SOLO mientras se mueve.
 */
export const In: React.FC<InProps> = ({
  at,
  out,
  dur = 14,
  outDur = 10,
  dx = 0,
  dy = 30,
  mask = "none",
  scaleFrom = 1,
  style,
  children,
}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  if (out !== undefined && f > out + outDur) return null;
  const p = interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: easeOut });
  const q = out === undefined ? 0 : interpolate(f, [out, out + outDur], [0, 1], { ...clamp, easing: easeInOut });
  const moving = p < 1 || (q > 0 && q < 1);
  const clip =
    mask === "left"
      ? `inset(-20px ${(1 - p) * 100}% -20px -20px)`
      : mask === "up"
        ? `inset(${(1 - p) * 100}% -20px -20px -20px)`
        : undefined;
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        opacity: mask === "none" ? p * (1 - q) : 1 - q,
        translate: `${(1 - p) * dx}px ${(1 - p) * dy + q * 18}px`,
        scale: scaleFrom === 1 ? undefined : String(scaleFrom + (1 - scaleFrom) * p),
        clipPath: clip,
        filter: moving ? `blur(${1.6 * (1 - p) + 1.2 * q}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
};

/** Tarjeta de foto real (catálogo técnico). No se recorta ni se retoca la foto. */
export const PhotoCard: React.FC<{
  src: string;
  label?: string;
  w: number;
  h: number;
  fit?: "contain" | "cover";
  rotate?: number;
}> = ({ src, label, w, h, fit = "contain", rotate = 0 }) => (
  <div
    style={{
      width: w,
      background: "#ffffff",
      padding: 12,
      paddingBottom: label ? 0 : 12,
      boxShadow: "0 10px 0 rgba(0,0,0,0.22), 0 20px 40px rgba(0,0,0,0.25)",
      rotate: `${rotate}deg`,
    }}
  >
    <Img
      src={staticFile(src)}
      style={{ width: w - 24, height: h, objectFit: fit, display: "block" }}
    />
    {label ? (
      <div
        style={{
          fontFamily,
          fontWeight: 700,
          fontSize: 24,
          color: C.charcoal,
          padding: "10px 4px 12px",
          borderTop: `3px solid ${C.red}`,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    ) : null}
  </div>
);

/** Número protagonista. */
export const Big: React.FC<{ children: React.ReactNode; size?: number; color?: string }> = ({
  children,
  size = 190,
  color = C.cream,
}) => (
  <div
    style={{
      fontFamily,
      fontWeight: 800,
      fontSize: size,
      color,
      lineHeight: 1,
      letterSpacing: -2,
      textShadow: "0 8px 0 rgba(0,0,0,0.25)",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

export const Text: React.FC<{
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, size = 40, weight = 700, color = C.cream, style }) => (
  <div style={{ fontFamily, fontWeight: weight, fontSize: size, color, lineHeight: 1.15, ...style }}>
    {children}
  </div>
);

/** Atribución de fuente (pequeña, legible, zona inferior izquierda). */
export const Source: React.FC<{ at: number; out?: number; children: React.ReactNode }> = ({
  at,
  out,
  children,
}) => (
  <In at={at} out={out} dy={10} style={{ left: 110, top: 1012 }}>
    <div
      style={{
        fontFamily,
        fontWeight: 500,
        fontSize: 22,
        color: C.cream,
        opacity: 0.85,
        whiteSpace: "nowrap",
      }}
    >
      Fuente: {children}
    </div>
  </In>
);

/** Línea SVG que se dibuja (trazo). */
export const Draw: React.FC<{
  d: string;
  at: number;
  dur?: number;
  color?: string;
  width?: number;
  dash?: string;
  arrow?: boolean;
}> = ({ d, at, dur = 18, color = C.red, width = 5, arrow }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + dur], [0, 1], { ...clamp, easing: easeInOut });
  if (p <= 0) return null;
  const id = `ah-${d.length}-${at}`;
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
      <defs>
        <marker id={id} viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill={color} />
        </marker>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        markerEnd={arrow && p > 0.97 ? `url(#${id})` : undefined}
      />
    </svg>
  );
};

/** Sello / advertencia de rigor (ficción, hipótesis, proyección). */
export const Stamp: React.FC<{ children: React.ReactNode; size?: number; rotate?: number }> = ({
  children,
  size = 30,
  rotate = -3,
}) => (
  <div
    style={{
      fontFamily,
      fontWeight: 800,
      fontSize: size,
      color: C.pink,
      border: `4px solid ${C.pink}`,
      padding: `${size * 0.2}px ${size * 0.5}px`,
      letterSpacing: 2,
      rotate: `${rotate}deg`,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

/** Tarjeta plana crema con título (fichas, módulos, preguntas). */
export const Card: React.FC<{
  w?: number;
  children: React.ReactNode;
  accent?: boolean;
  style?: React.CSSProperties;
}> = ({ w, children, accent, style }) => (
  <div
    style={{
      width: w,
      background: accent ? C.red : C.cream,
      color: accent ? C.cream : C.charcoal,
      padding: "22px 28px",
      boxShadow: "0 8px 0 rgba(0,0,0,0.22)",
      fontFamily,
      fontWeight: 700,
      fontSize: 34,
      lineHeight: 1.2,
      ...style,
    }}
  >
    {children}
  </div>
);
