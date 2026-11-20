import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Card, Chapter, Cutout, Draw, In, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { DoorIcon, PersonIcon, PhoneIcon } from "../components/Icons";
import { Truck } from "../components/Truck";
import { C, clamp, easeInOut } from "../theme";

/** 3:09–3:22 · tres aprendizajes. */
const Tres: React.FC = () => {
  const f = useCurrentFrame();
  const at = [sec(1.5), sec(5.3), sec(9.9)];
  const door = interpolate(f, [at[2] + 14, at[2] + 40], [0, 1], { ...clamp, easing: easeInOut });
  const items = [
    {
      n: 1,
      title: "La oportunidad está en el momento de compra",
      art: (
        <svg width={320} height={170}>
          <line x1={10} y1={90} x2={310} y2={90} stroke={C.cream} strokeWidth={5} />
          <circle cx={120} cy={90} r={18} fill={C.red} />
          <text x={120} y={50} textAnchor="middle" fontFamily="Poppins" fontWeight={800} fontSize={22} fill={C.cream}>
            compra
          </text>
          <circle cx={260} cy={90} r={12} fill={C.grey} />
          <text x={260} y={140} textAnchor="middle" fontFamily="Poppins" fontWeight={500} fontSize={20} fill={C.grey}>
            catálogo
          </text>
        </svg>
      ),
    },
    {
      n: 2,
      title: "Los medios ya estaban",
      art: (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 170 }}>
          <Cutout src="rodamiento.png" w={130} />
          <PersonIcon size={70} />
          <PersonIcon size={70} />
        </div>
      ),
    },
    {
      n: 3,
      title: "Permiso antes que presupuesto",
      art: (
        <div style={{ height: 170 }}>
          <DoorIcon size={170} open={door} />
        </div>
      ),
    },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {items.map((it, i) => {
        const lit = interpolate(f, [at[i], at[i] + 12], [0, 1], { ...clamp, easing: easeInOut });
        return (
          <React.Fragment key={it.n}>
            <Spotlight x={300 + i * 410} width={420} opacity={lit * 0.8} height={760} />
            <In at={at[i]} dy={26} style={{ left: 120 + i * 410, top: 120 }}>
              <div style={{ width: 380 }}>
                <Text size={120} weight={800} color={C.red}>
                  {it.n}
                </Text>
                <div style={{ marginTop: 6 }}>{it.art}</div>
                <Text size={34} weight={800} style={{ marginTop: 18 }}>
                  {it.title}
                </Text>
              </div>
            </In>
          </React.Fragment>
        );
      })}
      <Strip text="aprendimos tres cosas" start={4} end={at[0] + 30} style={{ left: 110, top: 860 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 3:22–3:37 · regreso a la noche: el camión llega, el teléfono no suena. */
const Llega: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, sec(9)], [-300, 420], { ...clamp, easing: easeInOut });
  const wheelAngle = (x / 44) * (180 / Math.PI);
  const phoneAt = sec(6.9); // "…un jueves a las 2:47…"
  const crossed = interpolate(f, [sec(9.5), sec(10.2)], [0, 1], { ...clamp, easing: easeInOut });
  const title = sec(11);
  return (
    <AbsoluteFill>
      <Background ground={0.66} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <defs>
          <mask id="cr2">
            <circle cx={1500} cy={170} r={56} fill="white" />
            <circle cx={1525} cy={150} r={50} fill="black" />
          </mask>
        </defs>
        <circle cx={1500} cy={170} r={56} fill={C.cream} mask="url(#cr2)" />
        <path
          d="M0 713 L0 560 L160 470 L300 540 L470 430 L640 520 L820 450 L1010 540 L1180 460 L1360 530 L1550 440 L1740 520 L1920 470 L1920 713 Z"
          fill="#283255"
        />
        <rect x={0} y={700} width={1920} height={95} fill={C.navyGround} opacity={0.9} />
      </svg>
      <Spotlight x={900} width={1000} opacity={0.5} height={800} />
      <Draw d="M0 748 L1920 748" at={4} dur={sec(8)} color={C.red} width={5} />
      <div style={{ position: "absolute", left: x, top: 445, scale: 1.05, transformOrigin: "0 100%" }}>
        <Truck wheelAngle={wheelAngle} />
      </div>
      <PaperLabel start={phoneAt} style={{ left: 110, top: 90 }} fontSize={54}>
        jueves · 2:47 A. M.
      </PaperLabel>
      <In at={phoneAt + 8} dy={20} style={{ left: 1240, top: 110 }}>
        <div style={{ background: C.navyDeep, borderRadius: 90, padding: 26 }}>
          <PhoneIcon size={120} crossed={crossed} />
        </div>
      </In>
      <In at={title} mask="left" dy={0} dx={-30} style={{ left: 110, top: 230 }}>
        <Card accent style={{ fontSize: 76, padding: "14px 34px" }}>
          LLEGAR A TIEMPO
        </Card>
      </In>
      <Strip text="no deja factura ni grúa" start={sec(0.4)} end={phoneAt - 4} style={{ left: 110, top: 850 }} fontSize={40} />
      <Strip text="deja un conductor que llega" variant="cream" start={sec(3.9)} end={phoneAt - 4} fontSize={34} rotate={1} style={{ left: 150, top: 935 }} />
      <Strip text="el teléfono no suena" start={sec(9.6)} end={sec(15)} style={{ left: 110, top: 850 }} fontSize={40} />
    </AbsoluteFill>
  );
};

export const S8_Aprendizajes: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(12.9)}>
      <Tres />
      <Chapter n="08" title="APRENDIZAJES" />
    </Sequence>
    <Sequence from={sec(12.9)} durationInFrames={sec(15.1)}>
      <Llega />
    </Sequence>
  </AbsoluteFill>
);
