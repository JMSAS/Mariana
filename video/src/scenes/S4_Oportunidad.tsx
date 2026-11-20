import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Chapter, Cutout, Draw, In, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { Bulb, PersonIcon, PhoneIcon, TruckIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 1:19–1:30 · Shane: conocimiento previo. */
const Shane: React.FC = () => {
  const f = useCurrentFrame();
  const morph = sec(6.2); // "…se parecen a lo que ya saben"
  const phone = interpolate(f, [morph, morph + 16], [1, 0], { ...clamp, easing: easeInOut });
  const glow = interpolate(f, [sec(6.6), sec(7.8)], [0, 1], { ...clamp, easing: easeInOut });
  const ring = (f / 30) * 40;
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={420} width={900} opacity={0.7} height={900} />
      {/* llamada entrante (ondas suaves) → rodamiento */}
      <div style={{ position: "absolute", left: 190, top: 160, opacity: phone, scale: String(0.9 + 0.1 * phone) }}>
        <In at={6} dy={20}>
          <svg width={460} height={460} style={{ position: "absolute", left: -80, top: -80 }}>
            {[0, 1, 2].map((i) => {
              const r = 140 + ((ring + i * 40) % 120);
              return <circle key={i} cx={230} cy={230} r={r} fill="none" stroke={C.cream} strokeWidth={3} opacity={0.35 * (1 - (r - 140) / 120)} />;
            })}
          </svg>
          <div style={{ background: C.red, borderRadius: 150, padding: 50 }}>
            <PhoneIcon size={200} />
          </div>
        </In>
      </div>
      <In at={morph + 4} dy={0} scaleFrom={0.9} style={{ left: 200, top: 150 }}>
        <Cutout src="rodamiento.png" w={420} />
      </In>
      <In at={sec(1)} dy={20} style={{ left: 690, top: 360 }}>
        <PersonIcon size={180} />
        <Text size={24} weight={500} style={{ textAlign: "center" }}>
          asesor
        </Text>
      </In>
      <In at={sec(6.6)} dy={0} style={{ left: 870, top: 150 }}>
        <Bulb size={160} glow={glow} />
      </In>
      <PaperLabel start={sec(3.6)} style={{ left: 1090, top: 200 }} fontSize={50}>
        Shane (2000)
      </PaperLabel>
      <In at={sec(5)} mask="left" dy={0} dx={-30} style={{ left: 1090, top: 320 }}>
        <Card accent style={{ fontSize: 38 }}>
          Conocimiento previo
        </Card>
      </In>
      <In at={sec(8.8)} dy={15} style={{ left: 1095, top: 450 }}>
        <Text size={30} weight={500} style={{ width: 600 }}>
          los problemas de sus clientes, sus mercados
        </Text>
      </In>
      <Strip text="esa distancia es una oportunidad" start={sec(2.4)} end={sec(10.8)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 1:30–1:36 · Fletcher: se construye entre varios actores. */
const Fletcher: React.FC = () => {
  const f = useCurrentFrame();
  const close = interpolate(f, [sec(1.2), sec(1.2) + 15], [0, 1], { ...clamp, easing: easeInOut });
  const nodes = [
    { x: 420, y: 250, label: "Cliente", icon: <TruckIcon size={50} color={C.charcoal} /> },
    { x: 1000, y: 250, label: "Ventas", icon: <PersonIcon size={80} color={C.charcoal} /> },
    { x: 710, y: 590, label: "Bodega", icon: <WarehouseIcon size={60} color={C.charcoal} /> },
  ];
  const cx = 710;
  const cy = 360;
  const pos = nodes.map((n) => ({ ...n, x: n.x + (cx - n.x) * 0.12 * close, y: n.y + (cy - n.y) * 0.12 * close }));
  const path = `M${pos[0].x} ${pos[0].y} L${pos[1].x} ${pos[1].y} L${pos[2].x} ${pos[2].y} Z`;
  // puntos que recorren el circuito (conversación)
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const dots = [0, 0.33, 0.66].map((o) => {
    const t = ((f / 30) * 0.35 + o) % 1;
    const seg = Math.floor(t * 3);
    const lt = t * 3 - seg;
    const A = pos[seg];
    const B = pos[(seg + 1) % 3];
    return { x: lerp(A.x, B.x, lt), y: lerp(A.y, B.y, lt) };
  });
  const dotsOn = interpolate(f, [sec(2.4), sec(2.8)], [0, 1], { ...clamp });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={710} width={1200} opacity={0.5} height={900} />
      <Draw d={path} at={sec(1.4)} dur={24} color={C.red} width={6} />
      <svg width={1920} height={1080} style={{ position: "absolute", opacity: dotsOn }}>
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={9} fill={C.cream} />
        ))}
      </svg>
      {pos.map((n, i) => (
        <In key={n.label} at={2 + i * 6} dy={20} style={{ left: n.x - 100, top: n.y - 100 }}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              background: C.cream,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 0 rgba(0,0,0,0.25)",
              gap: 4,
            }}
          >
            {n.icon}
            <Text size={30} weight={800} color={C.charcoal}>
              {n.label}
            </Text>
          </div>
        </In>
      ))}
      <PaperLabel start={4} style={{ left: 110, top: 90 }} fontSize={38}>
        Fletcher (2006) · interacción
      </PaperLabel>
      <Strip text="se construye en la conversación" start={sec(3.4)} end={sec(5.3)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 1:36–1:45 · mover la venta al momento ANTES de la avería. */
const Antes: React.FC = () => {
  const f = useCurrentFrame();
  const move = sec(6.3);
  const x = interpolate(f, [move, move + 30], [1080, 400], { ...clamp, easing: easeInOut });
  const v = Math.abs(interpolate(f + 1, [move, move + 30], [1080, 400], { ...clamp, easing: easeInOut }) - x);
  const truckX = interpolate(f, [0, sec(5.5)], [80, 980], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect x={100} y={430} width={1230} height={80} fill={C.navyGround} />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={120 + i * 90} y={467} width={46} height={5} fill={C.cream} opacity={0.35} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: truckX, top: 438 }}>
        <TruckIcon size={60} color={C.cream} />
      </div>
      <In at={6} dy={20} style={{ left: 350, top: 540 }}>
        <Card style={{ fontSize: 32 }}>MANTENIMIENTO</Card>
      </In>
      <In at={12} dy={20} style={{ left: 1030, top: 540 }}>
        <Card accent style={{ fontSize: 32 }}>
          AVERÍA
        </Card>
      </In>
      <In at={sec(0.6)} dy={20} style={{ left: 1030, top: 640 }}>
        <Text size={26} weight={500} style={{ width: 300 }}>
          el cliente compra y la empresa vende aquí
        </Text>
      </In>
      <Draw d="M1120 400 Q770 320 450 400" at={move - 10} dur={26} arrow width={6} />
      <In at={sec(4.2)} dy={20} style={{ left: 0, top: 0 }}>
        <div style={{ position: "absolute", left: x, top: 320, filter: v > 1 ? "blur(2px)" : undefined }}>
          <Card style={{ fontSize: 28, padding: "12px 22px" }}>VENTA</Card>
        </div>
      </In>
      <In at={move + 32} dy={30} style={{ left: 370, top: 130 }}>
        <Big size={160} color={C.red}>
          ANTES
        </Big>
      </In>
      <Strip text="la brecha: todos actúan cuando ya falló" start={4} end={move - 4} style={{ left: 110, top: 840 }} fontSize={36} />
      <Strip text="mover la venta al momento anterior" start={move + 6} end={sec(9.3)} style={{ left: 110, top: 840 }} fontSize={36} />
    </AbsoluteFill>
  );
};

export const S4_Oportunidad: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(11.2)}>
      <Shane />
    </Sequence>
    <Sequence from={sec(11.2)} durationInFrames={sec(5.4)}>
      <Fletcher />
    </Sequence>
    <Sequence from={sec(16.6)} durationInFrames={sec(9.4)}>
      <Antes />
    </Sequence>
    <Chapter n="04" title="LA OPORTUNIDAD" />
  </AbsoluteFill>
);
