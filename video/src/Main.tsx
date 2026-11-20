import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { sec } from "./components/Anim";
import { Grain, PresenterWindow, Speaker } from "./components/Base";
import { S1_Apertura } from "./scenes/S1_Apertura";
import { S2_Empresa } from "./scenes/S2_Empresa";
import { S3_Mercado } from "./scenes/S3_Mercado";
import { S4_Oportunidad } from "./scenes/S4_Oportunidad";
import { S5_Propuesta } from "./scenes/S5_Propuesta";
import { S6_Condiciones } from "./scenes/S6_Condiciones";
import { S7_Efectos } from "./scenes/S7_Efectos";
import { S8_Aprendizajes } from "./scenes/S8_Aprendizajes";
import { S9_Cierre } from "./scenes/S9_Cierre";
import { clamp, easeInOut } from "./theme";

/**
 * Inicio de cada bloque en segundos (según el guion).
 * Cuando llegue la grabación se reemplazan por los tiempos reales (Whisper).
 */
export const SCENES: { start: number; C: React.FC }[] = [
  { start: 0, C: S1_Apertura },
  { start: 35, C: S2_Empresa },
  { start: 70, C: S3_Mercado },
  { start: 105, C: S4_Oportunidad },
  { start: 140, C: S5_Propuesta },
  { start: 180, C: S6_Condiciones },
  { start: 215, C: S7_Efectos },
  { start: 245, C: S8_Aprendizajes },
  { start: 280, C: S9_Cierre },
];
export const TOTAL = 290;

/** Quién habla (inicio en segundos). */
const SPEAKERS: [number, Speaker][] = [
  [0, "M"],
  [29.6, "both"],
  [35, "J"],
  [51, "M"],
  [89, "J"],
  [122, "M"],
  [180, "J"],
  [197, "M"],
  [233, "J"],
  [262, "M"],
  [280, "both"],
];

const speakerAt = (t: number): Speaker => {
  let s: Speaker = "M";
  for (const [st, sp] of SPEAKERS) if (t >= st) s = sp;
  return s;
};

export const Main: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  // Cierre: la ventana se amplía (~49 % del ancho) con ease in-out de 0,7 s.
  const grow = interpolate(f, [sec(280.3), sec(281)], [0, 1], { ...clamp, easing: easeInOut });
  const rect = {
    x: 1390 + (110 - 1390) * grow,
    y: 730 + (180 - 730) * grow,
    w: 470 + (940 - 470) * grow,
    h: 280 + (560 - 280) * grow,
  };
  return (
    <AbsoluteFill style={{ backgroundColor: "#222a47" }}>
      {SCENES.map((s, i) => {
        const end = i < SCENES.length - 1 ? SCENES[i + 1].start : TOTAL;
        return (
          <Sequence key={i} from={sec(s.start)} durationInFrames={sec(end - s.start)}>
            <s.C />
          </Sequence>
        );
      })}
      <PresenterWindow speaker={speakerAt(t)} rect={rect} />
      <Grain />
    </AbsoluteFill>
  );
};
