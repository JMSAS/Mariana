import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Chapter, Cutout, In, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { TruckIcon, WarehouseIcon } from "../components/Icons";
import { Truck } from "../components/Truck";
import { C, clamp, easeInOut, easeOut } from "../theme";

/** 0:24–0:35 · ubicación (mapa esquemático) → bodega. */
const Ubicacion: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = sec(4.7); // "Importa y comercializa repuestos…"
  const w = interpolate(f, [wipe, wipe + 18], [0, 100], { ...clamp, easing: easeInOut });
  const pin = interpolate(f, [sec(2.4), sec(2.4) + 14], [-120, 0], { ...clamp, easing: easeOut });
  const pinMoving = f > sec(2.4) && f < sec(2.4) + 14;
  const tx = interpolate(f, [wipe + 10, wipe + 70], [-1100, 120], {
    ...clamp,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  return (
    <AbsoluteFill>
      <Background ground={0.72} />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${w}%)` }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={150 + i * 100} y1={60} x2={150 + i * 100} y2={760} stroke={C.navyLine} strokeWidth={1} opacity={0.5} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1={100} y1={90 + i * 95} x2={1340} y2={90 + i * 95} stroke={C.navyLine} strokeWidth={1} opacity={0.5} />
          ))}
          <path
            d="M420 150 L590 105 L700 180 L840 150 L960 250 L930 350 L1020 450 L980 570 L860 610 L810 700 L670 735 L580 665 L470 690 L390 600 L420 500 L340 420 L360 310 L320 230 Z"
            fill={C.navyGround}
            stroke={C.cream}
            strokeWidth={4}
            strokeLinejoin="round"
            opacity={interpolate(f, [0, 14], [0, 1], { ...clamp, easing: easeInOut })}
          />
          <circle cx={760} cy={440} r={11} fill={C.cream} opacity={0.85} />
          <text x={782} y={449} fontFamily="Poppins" fontWeight={700} fontSize={28} fill={C.cream} opacity={0.85}>
            Bogotá
          </text>
          <g style={{ translate: `0px ${pin}px`, filter: pinMoving ? "blur(1.5px)" : undefined }}>
            <path d="M650 425 c-18 -30 -30 -44 -30 -60 a30 30 0 0 1 60 0 c0 16 -12 30 -30 60 z" fill={C.red} stroke={C.cream} strokeWidth={4} />
            <circle cx={650} cy={366} r={10} fill={C.cream} />
          </g>
          <text x={600} y={770} fontFamily="Poppins" fontWeight={500} fontSize={20} fill={C.cream} opacity={0.6}>
            mapa esquemático
          </text>
        </svg>
        <PaperLabel start={sec(2.8)} style={{ left: 1080, top: 300 }} fontSize={52}>
          Mosquera, Cundinamarca
        </PaperLabel>
        <In at={sec(1)} dy={20} style={{ left: 1085, top: 160 }}>
          <Text size={34} weight={800}>
            Max Trailer S.A.S.
          </Text>
          <Text size={28} weight={500} color={C.pink}>
            empresa colombiana
          </Text>
        </In>
      </div>
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - w}% 0 0)` }}>
        <Spotlight x={560} width={900} opacity={0.6} height={780} />
        <In at={wipe} dy={30} style={{ left: 260, top: 170 }}>
          <WarehouseIcon size={400} />
        </In>
        <div style={{ position: "absolute", left: tx, top: 520, scale: 0.75, transformOrigin: "0 100%" }}>
          <Truck wheelAngle={(tx / 32) * 57} headlight={0} />
        </div>
      </div>
      <Strip text="importa y comercializa" start={wipe + 6} end={sec(10.8)} style={{ left: 110, top: 840 }} />
      <Strip
        text="repuestos para tráileres e hidráulica"
        variant="cream"
        start={wipe + 14}
        end={sec(10.8)}
        fontSize={34}
        rotate={1}
        style={{ left: 150, top: 925 }}
      />
      <PaperLabel start={sec(8.6)} style={{ left: 1080, top: 120 }} fontSize={70}>
        Desde 2002
      </PaperLabel>
    </AbsoluteFill>
  );
};

/** 0:35–0:46 · catálogo: fotos reales sin fondo, cada una bajo su luz. */
const Catalogo: React.FC = () => {
  const items = [
    { src: "rodamiento.png", label: "Rodamientos", w: 220 },
    { src: "rin.png", label: "Rines", w: 210 },
    { src: "retenedor.png", label: "Retenedores", w: 170 },
    { src: "eje.png", label: "Ejes", w: 270 },
  ];
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background ground={0.6} />
      {items.map((it, i) => {
        const x = 260 + i * 300;
        const at = 2 + i * 8;
        const lit = interpolate(f, [at, at + 12], [0, 1], { ...clamp, easing: easeInOut });
        return (
          <React.Fragment key={it.src}>
            <Spotlight x={x} width={300} opacity={lit} height={560} />
            <In at={at} dy={30} style={{ left: x - it.w / 2, top: 440 - it.w * 1.05 }}>
              <Cutout src={it.src} w={it.w} />
            </In>
            <PaperLabel start={at + 8} style={{ left: x - 95, top: 485 }} fontSize={26} rotate={i % 2 ? 2 : -2}>
              {it.label}
            </PaperLabel>
          </React.Fragment>
        );
      })}
      <In at={0} dy={0} style={{ left: 100, top: 455 }}>
        <div style={{ width: 1240, height: 14, background: C.creamDark, boxShadow: "0 8px 0 rgba(0,0,0,0.3)" }} />
      </In>
      <In at={sec(0.8)} dy={25} style={{ left: 110, top: 590 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
          <Big size={140}>+20</Big>
          <Text size={46} weight={800}>
            categorías
          </Text>
        </div>
      </In>
      <In at={sec(2.7)} mask="left" dy={0} dx={-30} style={{ left: 720, top: 615 }}>
        <Card style={{ fontSize: 34 }}>Timken · SKF · Wabco · Holland</Card>
      </In>
      <In at={sec(3.6)} dy={15} style={{ left: 740, top: 720 }}>
        <Text size={26} weight={500} style={{ opacity: 0.85 }}>
          …entre otras marcas
        </Text>
      </In>
      <Strip text="En línea · Teléfono · Sedes" start={sec(6)} end={sec(10.3)} style={{ left: 110, top: 840 }} />
      <Strip text="Mosquera y Bogotá" variant="cream" start={sec(7.4)} end={sec(10.3)} fontSize={34} rotate={1} style={{ left: 150, top: 925 }} />
      <In at={sec(6.2)} dx={40} dy={0} style={{ left: 1480, top: 160 }}>
        <TruckIcon size={80} color={C.pink} />
      </In>
    </AbsoluteFill>
  );
};

export const S2_Empresa: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(11)}>
      <Ubicacion />
    </Sequence>
    <Sequence from={sec(11)} durationInFrames={sec(10.5)}>
      <Catalogo />
    </Sequence>
    <Chapter n="02" title="LA EMPRESA" />
  </AbsoluteFill>
);
