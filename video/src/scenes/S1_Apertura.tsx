import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { In, PhotoCard, sec, Stamp, Text } from "../components/Anim";
import { Background, PaperLabel, Strip } from "../components/Base";
import { TruckIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";
import { Noche } from "./Apertura";

/** 0:11–0:25 · rueda recalentada → rodamiento. */
const Rueda: React.FC = () => {
  const f = useCurrentFrame();
  const push = interpolate(f, [0, sec(14)], [1, 1.03], { ...clamp, easing: easeInOut });
  const cut = sec(7); // "El eje no se rompió"
  const circ = interpolate(f, [cut, cut + 16], [0, 75], { ...clamp, easing: easeInOut });
  const rings = interpolate(f, [sec(0.6), sec(1.6)], [0, 1], { ...clamp, easing: easeInOut });
  const cx = 720;
  const cy = 390;
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <AbsoluteFill style={{ scale: push, transformOrigin: `${cx}px ${cy}px` }}>
        {/* Anillos de calor (sin fuego, sin sacudidas) */}
        <svg width={1920} height={1080} style={{ position: "absolute", opacity: rings * (f < cut ? 1 : 0.5) }}>
          {[230, 290, 350].map((r, i) => {
            const s = 1 + 0.05 * (0.5 + 0.5 * Math.sin((f / 30) * 1.4 - i * 0.9));
            return (
              <circle
                key={r}
                cx={cx}
                cy={cy}
                r={r * s}
                fill="none"
                stroke={C.red}
                strokeWidth={10 - i * 2}
                opacity={0.45 - i * 0.1}
              />
            );
          })}
        </svg>
        <In at={0} dy={0} scaleFrom={0.97} style={{ left: cx - 330, top: cy - 200 }}>
          <PhotoCard src="rin.jpg" w={660} h={370} fit="cover" />
        </In>
        {/* Corte de detalle al rodamiento real, por forma circular */}
        <div
          style={{
            position: "absolute",
            left: cx - 330,
            top: cy - 200,
            clipPath: `circle(${circ}% at 50% 50%)`,
          }}
        >
          <PhotoCard src="rodamiento.webp" w={660} h={370} />
        </div>
      </AbsoluteFill>

      <Strip text="RUEDA RECALENTADA" start={sec(0.5)} end={cut - 4} style={{ left: 110, top: 820 }} />
      <Strip text="EJE EN RIESGO" start={cut + 6} end={sec(13.6)} style={{ left: 110, top: 820 }} />
      <Strip
        text="aviso hace 3 meses: cambiar rodamientos"
        variant="cream"
        start={sec(9.5)}
        end={sec(13.6)}
        fontSize={34}
        rotate={1}
        style={{ left: 150, top: 905 }}
      />
      <PaperLabel start={4} style={{ left: 110, top: 90 }} fontSize={44}>
        2:47 A. M.
      </PaperLabel>
    </AbsoluteFill>
  );
};

/** 0:25–0:35 · tarjeta de cuento → marca y título. */
const Presentacion: React.FC = () => {
  const f = useCurrentFrame();
  const swap = sec(4.6); // "Somos Mariana Ramírez y Juan Diego Murcia…"
  const cardX = interpolate(f, [swap, swap + 12], [0, -1500], { ...clamp, easing: easeInOut });
  const cardO = interpolate(f, [swap, swap + 12], [1, 0], { ...clamp, easing: easeInOut });
  const logo = interpolate(f, [swap + 6, swap + 20], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {/* Tarjeta de cuento */}
      <div style={{ position: "absolute", left: 0, top: 0, translate: `${cardX}px 0px`, opacity: cardO }}>
        <In at={4} dy={40} style={{ left: 330, top: 190 }}>
          <div
            style={{
              width: 760,
              background: C.cream,
              padding: "40px 50px",
              boxShadow: "0 12px 0 rgba(0,0,0,0.25)",
              rotate: "-1.5deg",
              display: "flex",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div style={{ background: C.navy, padding: 18 }}>
              <TruckIcon size={70} />
            </div>
            <div>
              <Text size={58} weight={800} color={C.charcoal}>
                Don Gustavo
              </Text>
              <Text size={30} weight={500} color={C.charcoal} style={{ marginTop: 6 }}>
                personaje de ficción
              </Text>
            </div>
          </div>
        </In>
        <In at={sec(1.2)} dy={20} style={{ left: 560, top: 470 }}>
          <Stamp size={30}>CUENTO · NO ES UNA PERSONA REAL</Stamp>
        </In>
      </div>
      <Strip text="su problema es real" start={sec(2.3)} end={swap - 2} style={{ left: 110, top: 820 }} />

      {/* Marca (logo oficial sobre placa clara, sin alterarlo) y título */}
      {f >= swap + 6 ? (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, opacity: logo }}>
          <div
            style={{
              position: "absolute",
              left: 290,
              top: 130,
              background: "#ffffff",
              padding: "34px 50px",
              boxShadow: "0 12px 0 rgba(0,0,0,0.25)",
            }}
          >
            <Img src={staticFile("logo.png")} style={{ width: 760, display: "block" }} />
          </div>
        </div>
      ) : null}
      <In at={swap + 16} mask="left" dy={0} dx={-30} style={{ left: 290, top: 470 }}>
        <Text size={84} weight={800}>
          EL EJE QUE NO SE ROMPIÓ
        </Text>
      </In>
      <Strip text="Mariana Ramírez" start={swap + 4} end={sec(9.6)} style={{ left: 110, top: 820 }} fontSize={40} />
      <Strip
        text="Juan Diego Murcia"
        start={swap + 10}
        end={sec(9.6)}
        fontSize={40}
        style={{ left: 545, top: 820 }}
        rotate={1}
      />
    </AbsoluteFill>
  );
};

export const S1_Apertura: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(11)}>
      <Noche />
    </Sequence>
    <Sequence from={sec(11)} durationInFrames={sec(14)}>
      <Rueda />
    </Sequence>
    <Sequence from={sec(25)} durationInFrames={sec(10)}>
      <Presentacion />
    </Sequence>
  </AbsoluteFill>
);
