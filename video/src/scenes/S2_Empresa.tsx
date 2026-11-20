import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, In, PhotoCard, sec, Text } from "../components/Anim";
import { Background, PaperLabel, Strip } from "../components/Base";
import { TruckIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut, easeOut } from "../theme";

/** 0:35–0:51 · ubicación (mapa esquemático) → bodega. */
const Ubicacion: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = sec(7.5); // "Importa y comercializa repuestos…"
  const w = interpolate(f, [wipe, wipe + 18], [0, 100], { ...clamp, easing: easeInOut });
  const pin = interpolate(f, [sec(1.6), sec(1.6) + 14], [-120, 0], { ...clamp, easing: easeOut });
  const pinMoving = f > sec(1.6) && f < sec(1.6) + 14;
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {/* Mapa esquemático (muy simplificado) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${w}%)` }}>
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <path
            d="M420 170 L560 130 L660 190 L780 160 L880 240 L860 330 L940 420 L900 520 L800 560 L760 650 L640 680 L560 620 L470 640 L400 560 L430 470 L360 400 L380 300 L340 230 Z"
            fill={C.navyGround}
            stroke={C.cream}
            strokeWidth={4}
            strokeLinejoin="round"
            opacity={interpolate(f, [0, 14], [0, 1], { ...clamp, easing: easeInOut })}
          />
          <circle cx={700} cy={420} r={10} fill={C.cream} opacity={0.8} />
          <text x={720} y={428} fontFamily="Poppins" fontWeight={500} fontSize={24} fill={C.cream} opacity={0.8}>
            Bogotá
          </text>
          <g style={{ translate: `0px ${pin}px`, filter: pinMoving ? "blur(1.5px)" : undefined }}>
            <circle cx={610} cy={410} r={16} fill={C.red} stroke={C.cream} strokeWidth={4} />
          </g>
        </svg>
        <PaperLabel start={sec(2.2)} style={{ left: 1000, top: 300 }} fontSize={48}>
          Mosquera, Cundinamarca
        </PaperLabel>
        <In at={sec(3.2)} dy={20} style={{ left: 1000, top: 420 }}>
          <Text size={30} weight={500}>
            Max Trailer S.A.S. · empresa colombiana
          </Text>
        </In>
      </div>
      {/* Bodega + tráiler (después del wipe) */}
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - w}% 0 0)` }}>
        <In at={wipe} dy={30} style={{ left: 200, top: 170 }}>
          <WarehouseIcon size={330} />
        </In>
        <In at={wipe + 10} dx={-60} dy={0} style={{ left: 820, top: 370 }}>
          <TruckIcon size={130} />
        </In>
      </div>
      <Strip text="importa y comercializa" start={wipe + 6} end={sec(16)} style={{ left: 110, top: 820 }} />
      <Strip
        text="repuestos · tráileres · tractocamiones · hidráulica"
        variant="cream"
        start={wipe + 14}
        end={sec(16)}
        fontSize={32}
        rotate={1}
        style={{ left: 150, top: 905 }}
      />
      <PaperLabel start={sec(12.5)} style={{ left: 1040, top: 150 }} fontSize={64}>
        Desde 2002
      </PaperLabel>
    </AbsoluteFill>
  );
};

/** 0:51–1:10 · catálogo técnico con fotos reales. */
const Catalogo: React.FC = () => {
  const items = [
    { src: "rodamiento.webp", label: "Rodamientos" },
    { src: "rin.jpg", label: "Rines", fit: "cover" as const },
    { src: "retenedor.jpg", label: "Retenedores" },
    { src: "eje.png", label: "Ejes" },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {items.map((it, i) => (
        <In key={it.src} at={6 + i * 12} dx={-60} dy={0} style={{ left: 110 + i * 305, top: 110 }}>
          <PhotoCard src={it.src} label={it.label} w={275} h={220} fit={it.fit ?? "contain"} rotate={i % 2 ? 1 : -1} />
        </In>
      ))}
      <In at={sec(2.6)} dy={25} style={{ left: 110, top: 470 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <Big size={150}>+20</Big>
          <Text size={48} weight={800}>
            categorías
          </Text>
        </div>
      </In>
      <In at={sec(5.2)} mask="left" dy={0} dx={-30} style={{ left: 110, top: 660 }}>
        <Card>Parker · SKF · Holland</Card>
      </In>
      <In at={sec(6.4)} dy={15} style={{ left: 545, top: 690 }}>
        <Text size={26} weight={500} style={{ opacity: 0.85 }}>
          …entre otras marcas
        </Text>
      </In>
      <Strip text="Web · Teléfono · Sedes" start={sec(9.5)} end={sec(18.6)} style={{ left: 110, top: 820 }} />
      <Strip
        text="Mosquera y Bogotá"
        variant="cream"
        start={sec(11)}
        end={sec(18.6)}
        fontSize={34}
        rotate={1}
        style={{ left: 150, top: 905 }}
      />
    </AbsoluteFill>
  );
};

export const S2_Empresa: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(16)}>
      <Ubicacion />
    </Sequence>
    <Sequence from={sec(16)} durationInFrames={sec(19)}>
      <Catalogo />
    </Sequence>
  </AbsoluteFill>
);
