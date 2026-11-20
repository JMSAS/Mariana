import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Card, Draw, In, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { BoxIcon, DoorIcon, PersonIcon, PhoneIcon } from "../components/Icons";
import { Truck } from "../components/Truck";
import { C, clamp, easeInOut } from "../theme";

/** 4:05–4:22 · tres aprendizajes. */
const Tres: React.FC = () => {
  const f = useCurrentFrame();
  const at = [sec(1.5), sec(6), sec(11)];
  const door = interpolate(f, [at[2] + 14, at[2] + 40], [0, 1], { ...clamp, easing: easeInOut });
  const items = [
    {
      n: 1,
      title: "Momento de compra",
      art: (
        <svg width={300} height={160}>
          <line x1={10} y1={80} x2={290} y2={80} stroke={C.cream} strokeWidth={4} />
          <circle cx={110} cy={80} r={14} fill={C.red} />
          <circle cx={240} cy={80} r={10} fill={C.grey} />
        </svg>
      ),
    },
    {
      n: 2,
      title: "Recursos existentes",
      art: (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 160 }}>
          <BoxIcon size={110} />
          <PersonIcon size={60} />
          <PersonIcon size={60} />
        </div>
      ),
    },
    {
      n: 3,
      title: "Permiso para experimentar",
      art: (
        <div style={{ height: 160 }}>
          <DoorIcon size={160} open={door} />
        </div>
      ),
    },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {items.map((it, i) => (
        <In key={it.n} at={at[i]} dy={26} style={{ left: 110 + i * 410, top: 150 }}>
          <div style={{ width: 380 }}>
            <Text size={110} weight={800} color={C.red}>
              {it.n}
            </Text>
            <div style={{ marginTop: 10 }}>{it.art}</div>
            <Text size={34} weight={800} style={{ marginTop: 20 }}>
              {it.title}
            </Text>
          </div>
        </In>
      ))}
      <Strip text="aprendimos tres cosas" start={6} end={at[1] - 4} style={{ left: 110, top: 860 }} fontSize={40} />
      <Strip text="permiso antes que presupuesto" start={at[2] + 20} end={sec(16.6)} style={{ left: 110, top: 860 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 4:22–4:40 · regreso a la noche: el camión llega, el teléfono no suena. */
const Llega: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, sec(9)], [-200, 420], { ...clamp, easing: easeInOut });
  const wheelAngle = (x / 44) * (180 / Math.PI);
  const phoneAt = sec(6.5); // "…un jueves a las 2:47 de la madrugada el teléfono no suena"
  const crossed = interpolate(f, [phoneAt + 20, phoneAt + 40], [0, 1], { ...clamp, easing: easeInOut });
  const title = sec(13);
  return (
    <AbsoluteFill>
      <Background ground={0.66} />
      <Spotlight x={900} width={1000} opacity={0.6} height={800} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect x={0} y={700} width={1920} height={95} fill={C.navyGround} opacity={0.9} />
      </svg>
      <Draw d="M0 748 L1920 748" at={4} dur={sec(8)} color={C.red} width={5} />
      <div style={{ position: "absolute", left: x, top: 445, scale: 1.05, transformOrigin: "0 100%" }}>
        <Truck wheelAngle={wheelAngle} />
      </div>
      <PaperLabel start={phoneAt} style={{ left: 110, top: 90 }} fontSize={54}>
        jueves · 2:47 A. M.
      </PaperLabel>
      <In at={phoneAt + 8} dy={20} style={{ left: 1500, top: 120 }}>
        <PhoneIcon size={140} crossed={crossed} />
      </In>
      <In at={title} mask="left" dy={0} dx={-30} style={{ left: 110, top: 230 }}>
        <Card accent style={{ fontSize: 72, padding: "14px 34px" }}>
          LLEGAR A TIEMPO
        </Card>
      </In>
      <Strip text="no deja factura ni grúa" start={sec(0.6)} end={phoneAt - 4} style={{ left: 110, top: 850 }} fontSize={40} />
      <Strip
        text="deja un conductor que llega"
        variant="cream"
        start={sec(2.4)}
        end={phoneAt - 4}
        fontSize={34}
        rotate={1}
        style={{ left: 150, top: 935 }}
      />
    </AbsoluteFill>
  );
};

export const S8_Aprendizajes: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(17)}>
      <Tres />
    </Sequence>
    <Sequence from={sec(17)} durationInFrames={sec(18)}>
      <Llega />
    </Sequence>
  </AbsoluteFill>
);
