import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Draw, In, PhotoCard, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Strip } from "../components/Base";
import { Bulb, PersonIcon, PhoneIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut, easeOut } from "../theme";

/** 1:45–2:02 · Shane: conocimiento previo. */
const Shane: React.FC = () => {
  const f = useCurrentFrame();
  const morph = sec(5); // "…las oportunidades que se parecen a lo que ya saben"
  const phone = interpolate(f, [morph, morph + 16], [1, 0], { ...clamp, easing: easeInOut });
  const glow = interpolate(f, [sec(9), sec(10.5)], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {/* llamada entrante → rodamiento */}
      <div style={{ position: "absolute", left: 200, top: 180, opacity: phone, scale: String(0.9 + 0.1 * phone) }}>
        <In at={6} dy={20}>
          <div style={{ background: C.navyGround, borderRadius: 40, padding: 50 }}>
            <PhoneIcon size={220} />
          </div>
        </In>
      </div>
      <In at={morph + 4} dy={0} scaleFrom={0.92} style={{ left: 170, top: 150 }}>
        <PhotoCard src="rodamiento.webp" w={400} h={380} />
      </In>
      <In at={sec(1.5)} dy={20} style={{ left: 700, top: 420 }}>
        <PersonIcon size={150} />
      </In>
      <In at={sec(9)} dy={0} style={{ left: 880, top: 160 }}>
        <Bulb size={150} glow={glow} />
      </In>
      <PaperLabel start={sec(3)} style={{ left: 1080, top: 210 }} fontSize={46}>
        Shane (2000)
      </PaperLabel>
      <In at={sec(6)} mask="left" dy={0} dx={-30} style={{ left: 1080, top: 320 }}>
        <Card accent>Conocimiento previo</Card>
      </In>
      <In at={sec(7.5)} dy={15} style={{ left: 1085, top: 440 }}>
        <Text size={28} weight={500}>
          problemas de sus clientes · sus mercados
        </Text>
      </In>
      <Strip text="esa distancia es una oportunidad" start={sec(0.8)} end={sec(16.6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:02–2:12 · Fletcher: se construye entre varios actores. */
const Fletcher: React.FC = () => {
  const f = useCurrentFrame();
  const close = interpolate(f, [sec(1.6), sec(1.6) + 15], [0, 1], { ...clamp, easing: easeOut });
  const nodes = [
    { x: 420, y: 230, label: "Cliente", icon: <PersonIcon size={80} color={C.charcoal} /> },
    { x: 1000, y: 230, label: "Ventas", icon: <PersonIcon size={80} color={C.charcoal} /> },
    { x: 710, y: 560, label: "Bodega", icon: <WarehouseIcon size={60} color={C.charcoal} /> },
  ];
  const cx = 710;
  const cy = 340;
  const pos = nodes.map((n) => ({
    ...n,
    x: n.x + (cx - n.x) * 0.12 * close,
    y: n.y + (cy - n.y) * 0.12 * close,
  }));
  const path = `M${pos[0].x} ${pos[0].y} L${pos[1].x} ${pos[1].y} L${pos[2].x} ${pos[2].y} Z`;
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Draw d={path} at={sec(2.2)} dur={26} color={C.red} width={6} />
      {pos.map((n, i) => (
        <In key={n.label} at={4 + i * 8} dy={20} style={{ left: n.x - 90, top: n.y - 90 }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              background: C.cream,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 0 rgba(0,0,0,0.25)",
            }}
          >
            {n.icon}
            <Text size={28} weight={800} color={C.charcoal}>
              {n.label}
            </Text>
          </div>
        </In>
      ))}
      <PaperLabel start={sec(1)} style={{ left: 110, top: 90 }} fontSize={38}>
        Fletcher (2006) · interacción
      </PaperLabel>
      <Strip text="se construye en la conversación" start={sec(3.5)} end={sec(9.6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:12–2:20 · mover la venta al momento ANTES de la avería. */
const Antes: React.FC = () => {
  const f = useCurrentFrame();
  const move = sec(3.2);
  const x = interpolate(f, [move, move + 36], [1080, 420], { ...clamp, easing: easeInOut });
  const v = Math.abs(
    interpolate(f + 1, [move, move + 36], [1080, 420], { ...clamp, easing: easeInOut }) - x,
  );
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        <rect x={100} y={430} width={1230} height={70} fill={C.navyGround} />
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={120 + i * 90} y={462} width={46} height={5} fill={C.cream} opacity={0.35} />
        ))}
      </svg>
      <In at={6} dy={20} style={{ left: 380, top: 520 }}>
        <Card style={{ fontSize: 30 }}>MANTENIMIENTO</Card>
      </In>
      <In at={12} dy={20} style={{ left: 1040, top: 520 }}>
        <Card accent style={{ fontSize: 30 }}>
          AVERÍA
        </Card>
      </In>
      <Draw d="M1120 400 Q770 330 470 400" at={move - 10} dur={30} arrow width={6} />
      <In at={sec(1)} dy={20} style={{ left: 0, top: 0 }}>
        <div
          style={{
            position: "absolute",
            left: x,
            top: 330,
            filter: v > 1 ? "blur(2px)" : undefined,
          }}
        >
          <Card style={{ fontSize: 26, padding: "12px 20px" }}>VENTA</Card>
        </div>
      </In>
      <In at={move + 38} dy={30} style={{ left: 390, top: 130 }}>
        <Big size={150} color={C.red}>
          ANTES
        </Big>
      </In>
      <Strip text="hoy: se compra y se vende cuando ya falló" start={4} end={move + 30} style={{ left: 110, top: 840 }} fontSize={36} />
    </AbsoluteFill>
  );
};

export const S4_Oportunidad: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(17)}>
      <Shane />
    </Sequence>
    <Sequence from={sec(17)} durationInFrames={sec(10)}>
      <Fletcher />
    </Sequence>
    <Sequence from={sec(27)} durationInFrames={sec(8)}>
      <Antes />
    </Sequence>
  </AbsoluteFill>
);

