import React from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { sec } from "./components/Anim";
import { Grain } from "./components/Base";
import { S1_Apertura } from "./scenes/S1_Apertura";
import { S2_Empresa } from "./scenes/S2_Empresa";
import { S3_Mercado } from "./scenes/S3_Mercado";
import { S4_Oportunidad } from "./scenes/S4_Oportunidad";
import { S5_Propuesta } from "./scenes/S5_Propuesta";
import { S6_Condiciones } from "./scenes/S6_Condiciones";
import { S7_Efectos } from "./scenes/S7_Efectos";
import { S8_Aprendizajes } from "./scenes/S8_Aprendizajes";
import { S9_Cierre } from "./scenes/S9_Cierre";
import { C, clamp, easeInOut, fontFamily } from "./theme";

/** Inicio de cada bloque en segundos, medido sobre la grabación real (Whisper). */
export const SCENES: { start: number; C: React.FC }[] = [
  { start: 0, C: S1_Apertura },
  { start: 24.5, C: S2_Empresa },
  { start: 46.0, C: S3_Mercado },
  { start: 79.1, C: S4_Oportunidad },
  { start: 105.1, C: S5_Propuesta },
  { start: 142.0, C: S6_Condiciones },
  { start: 173.3, C: S7_Efectos },
  { start: 188.9, C: S8_Aprendizajes },
  { start: 216.9, C: S9_Cierre },
];
export const TOTAL = 222;
const REC_END = 218.9; // fin de la grabación

/** Quién está en cámara (detectado en la grabación editada). */
type Who = "M" | "J";
const ON_CAMERA: [number, number, Who][] = [
  [0, 24.9, "M"],
  [24.9, 35.7, "J"],
  [35.7, 62.9, "M"],
  [62.9, 90.3, "J"],
  [90.3, 142.1, "M"],
  [142.1, 156.0, "J"],
  [156.0, 189.0, "M"],
  [189.0, 202.0, "J"],
  [202.0, REC_END, "M"],
];
const whoAt = (t: number): Who => {
  for (const [a, b, w] of ON_CAMERA) if (t >= a && t < b) return w;
  return "M";
};

const Panel: React.FC<{ who: Who; active: boolean; name: string; still: string }> = ({ who, active, name, still }) => {
  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "#141a2c",
        outline: `4px solid ${active ? C.red : "rgba(243,230,211,0.25)"}`,
        outlineOffset: -4,
      }}
    >
      {/* Imagen fija real de la persona cuando no está en cámara */}
      <Img src={staticFile(still)} style={{ position: "absolute", top: 0, left: "50%", height: "100%", width: "auto", aspectRatio: "16 / 9", translate: "-50% 0", filter: active ? undefined : "grayscale(0.6) brightness(0.6)" }} />
      {ON_CAMERA.filter(([, , w]) => w === who).map(([a, b]) => (
        <Sequence key={a} from={sec(a)} durationInFrames={sec(b) - sec(a)} layout="absolute-fill">
          <Video
            src={staticFile("presentadores.mp4")}
            trimBefore={sec(a)}
            muted
            style={{ position: "absolute", top: 0, left: "50%", height: "100%", width: "auto", aspectRatio: "16 / 9", translate: "-50% 0" }}
          />
        </Sequence>
      ))}
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          background: active ? C.red : "rgba(0,0,0,0.55)",
          color: C.cream,
          fontFamily,
          fontWeight: 700,
          fontSize: 16,
          padding: "3px 10px",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const who = whoAt(t);
  const appear = interpolate(f, [4, 18], [0, 1], { ...clamp, easing: easeInOut });
  // Cierre: la ventana se amplía (~49 % del ancho) con ease in-out de 0,7 s.
  const grow = interpolate(f, [sec(217.0), sec(217.7)], [0, 1], { ...clamp, easing: easeInOut });
  const rect = {
    x: 1390 + (90 - 1390) * grow,
    y: 730 + (200 - 730) * grow,
    w: 470 + (960 - 470) * grow,
    h: 280 + (560 - 280) * grow,
  };
  const ended = t >= REC_END;
  return (
    <AbsoluteFill style={{ backgroundColor: C.navy }}>
      {SCENES.map((s, i) => {
        const end = i < SCENES.length - 1 ? SCENES[i + 1].start : TOTAL;
        return (
          <Sequence key={i} from={sec(s.start)} durationInFrames={sec(end) - sec(s.start)}>
            <s.C />
          </Sequence>
        );
      })}

      {/* Ventana persistente de presentadores (material real, sin rostros generados) */}
      <div
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.w,
          height: rect.h,
          display: "flex",
          gap: 6,
          padding: 6,
          boxSizing: "border-box",
          background: C.cream,
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          opacity: appear,
        }}
      >
        <Panel who="M" active={who === "M" || grow > 0} name="Mariana" still={ended ? "still_final.jpg" : "still_mariana.jpg"} />
        <Panel who="J" active={who === "J" || grow > 0} name="Juan Diego" still="still_juandiego.jpg" />
      </div>

      <Audio src={staticFile("voz.m4a")} />
      <Grain />
    </AbsoluteFill>
  );
};
