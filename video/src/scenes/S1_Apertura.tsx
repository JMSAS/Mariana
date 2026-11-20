import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Chapter, Cutout, In, sec, Stamp, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { TruckIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";
import { Noche } from "./Apertura";

/** 0:06–0:15 · rueda recalentada → rodamiento (tiempos de la voz real). */
const Rueda: React.FC = () => {
  const f = useCurrentFrame();
  const push = interpolate(f, [0, sec(9)], [1, 1.04], { ...clamp, easing: easeInOut });
  const cut = sec(2.9); // "El eje no se rompió"
  const rinOut = interpolate(f, [cut, cut + 14], [1, 0], { ...clamp, easing: easeInOut });
  const rodIn = interpolate(f, [cut + 4, cut + 18], [0, 1], { ...clamp, easing: easeInOut });
  const circ = interpolate(f, [cut, cut + 16], [0, 75], { ...clamp, easing: easeInOut });
  const rings = interpolate(f, [sec(0.2), sec(1)], [0, 1], { ...clamp, easing: easeInOut });
  const cx = 760;
  const cy = 420;
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={cx} width={1100} opacity={0.8} height={900} />
      <AbsoluteFill style={{ scale: push, transformOrigin: `${cx}px ${cy}px` }}>
        <svg width={1920} height={1080} style={{ position: "absolute", opacity: rings * (0.35 + 0.65 * rinOut) }}>
          {[250, 320, 390].map((r, i) => {
            const s = 1 + 0.05 * (0.5 + 0.5 * Math.sin((f / 30) * 1.4 - i * 0.9));
            return (
              <circle key={r} cx={cx} cy={cy} r={r * s} fill="none" stroke={C.red} strokeWidth={12 - i * 3} opacity={0.5 - i * 0.12} />
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: cx - 260, top: cy - 268, opacity: rinOut }}>
          <In at={0} dy={0} scaleFrom={0.95}>
            <Cutout src="rin.png" w={520} />
          </In>
        </div>
        <div
          style={{
            position: "absolute",
            left: cx - 250,
            top: cy - 260,
            clipPath: `circle(${circ}% at 50% 50%)`,
            opacity: rodIn,
          }}
        >
          <Cutout src="rodamiento.png" w={500} />
        </div>
      </AbsoluteFill>

      <Strip text="RUEDA RECALENTADA" start={sec(0.3)} end={cut - 4} style={{ left: 110, top: 820 }} />
      <Strip text="EJE EN RIESGO" start={cut + 6} end={sec(8.5)} style={{ left: 110, top: 820 }} />
      <Strip
        text="aviso hace 3 meses: cambiar rodamientos"
        variant="cream"
        start={sec(4.3)}
        end={sec(8.5)}
        fontSize={34}
        rotate={1}
        style={{ left: 150, top: 905 }}
      />
      <PaperLabel start={4} style={{ left: 110, top: 90 }} fontSize={44}>
        2:47 A. M.
      </PaperLabel>
      <PaperLabel start={sec(7.6)} style={{ left: 1290, top: 300 }} fontSize={36}>
        Rodamientos
      </PaperLabel>
    </AbsoluteFill>
  );
};

/** 0:15–0:24 · tarjeta de cuento → marca y título. */
const Presentacion: React.FC = () => {
  const f = useCurrentFrame();
  const swap = sec(4.5); // "Somos Mariana Ramírez…"
  const cardX = interpolate(f, [swap, swap + 12], [0, -1500], { ...clamp, easing: easeInOut });
  const cardO = interpolate(f, [swap, swap + 12], [1, 0], { ...clamp, easing: easeInOut });
  const logo = interpolate(f, [swap + 6, swap + 20], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={760} width={1200} opacity={0.6} height={900} />
      <div style={{ position: "absolute", left: 0, top: 0, translate: `${cardX}px 0px`, opacity: cardO }}>
        <In at={4} dy={40} style={{ left: 330, top: 190 }}>
          <div
            style={{
              width: 820,
              background: C.cream,
              padding: "44px 54px",
              boxShadow: "0 12px 0 rgba(0,0,0,0.25)",
              rotate: "-1.5deg",
              display: "flex",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div style={{ background: C.navy, padding: 22 }}>
              <TruckIcon size={80} />
            </div>
            <div>
              <Text size={66} weight={800} color={C.charcoal}>
                Don Gustavo
              </Text>
              <Text size={32} weight={500} color={C.charcoal} style={{ marginTop: 6 }}>
                personaje de ficción
              </Text>
            </div>
          </div>
        </In>
        <In at={sec(1.6)} dy={20} style={{ left: 560, top: 500 }}>
          <Stamp size={32}>CUENTO · NO ES UNA PERSONA REAL</Stamp>
        </In>
      </div>
      <Strip text="su problema es real" start={sec(3)} end={swap - 2} style={{ left: 110, top: 820 }} />

      {/* Logo oficial sin fondo (versión en negativo para fondo oscuro) */}
      <div style={{ position: "absolute", left: 250, top: 150, opacity: logo, scale: String(0.97 + 0.03 * logo) }}>
        <Img src={staticFile("logo_negativo.png")} style={{ width: 980, display: "block" }} />
      </div>
      <In at={swap + 16} mask="left" dy={0} dx={-30} style={{ left: 300, top: 520 }}>
        <Text size={84} weight={800}>
          EL EJE QUE NO SE ROMPIÓ
        </Text>
      </In>
      <In at={swap + 26} dy={14} style={{ left: 304, top: 625 }}>
        <Text size={30} weight={500} color={C.pink}>
          El caso Max Trailer
        </Text>
      </In>
      <Strip text="Mariana Ramírez" start={swap + 4} end={sec(8.8)} style={{ left: 110, top: 820 }} fontSize={40} />
      <Strip text="Juan Diego Murcia" start={sec(5.8)} end={sec(8.8)} fontSize={40} style={{ left: 545, top: 820 }} rotate={1} />
    </AbsoluteFill>
  );
};

export const S1_Apertura: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(6.5)}>
      <Noche />
    </Sequence>
    <Sequence from={sec(6.5)} durationInFrames={sec(8.9)}>
      <Rueda />
    </Sequence>
    <Sequence from={sec(15.4)} durationInFrames={sec(9.1)}>
      <Presentacion />
      <Chapter n="01" title="APERTURA" />
    </Sequence>
  </AbsoluteFill>
);
