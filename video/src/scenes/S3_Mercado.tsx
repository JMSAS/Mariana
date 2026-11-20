import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Draw, In, sec, Source, Text } from "../components/Anim";
import { Background, Strip } from "../components/Base";
import { TruckIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 1:10–1:26 · 96 % y 7 de cada 10. */
const Propietarios: React.FC = () => {
  const f = useCurrentFrame();
  const grid = sec(8); // "…y entre todos reúnen casi siete de cada diez"
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {[0, 1, 2].map((i) => (
        <In key={i} at={6 + i * 6} dy={20} style={{ left: 120 + i * 175, top: 120 }}>
          <TruckIcon size={80} />
        </In>
      ))}
      <In at={sec(3)} dy={25} style={{ left: 110, top: 270 }}>
        <Big size={210}>96 %</Big>
      </In>
      <In at={sec(3.6)} dy={20} style={{ left: 120, top: 500 }}>
        <Text size={40}>de los propietarios tiene</Text>
        <Text size={56} weight={800} color={C.pink}>
          hasta 3 vehículos
        </Text>
      </In>

      {/* 10 siluetas, 7 se rellenan en rojo (revelado secuencial) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const at = grid + i * 4;
        const red = i < 7 && f >= grid + 26 + i * 4;
        return (
          <In key={i} at={at} dy={14} style={{ left: 820 + (i % 5) * 200, top: 170 + Math.floor(i / 5) * 140 }}>
            <TruckIcon size={70} color={red ? C.red : C.grey} />
          </In>
        );
      })}
      <In at={grid + 60} dy={20} style={{ left: 830, top: 470 }}>
        <Text size={58} weight={800}>
          Casi 7 de cada 10
        </Text>
        <Text size={32} weight={500}>
          vehículos de carga del país
        </Text>
      </In>
      <Source at={sec(3)} out={sec(15.6)}>
        Fedetranscarga, vía La República
      </Source>
    </AbsoluteFill>
  );
};

/** 1:26–1:45 · 21 años → Scania / Divemotor → anticipar vs reparar. */
const Grandes: React.FC = () => {
  const f = useCurrentFrame();
  const panels = sec(6); // J: "Mientras tanto, Scania…"
  const split = sec(13.5); // "Los grandes venden disponibilidad…"
  const slide = interpolate(f, [panels, panels + 15], [0, -1920], { ...clamp, easing: easeInOut });
  const slide2 = interpolate(f, [split, split + 15], [0, -1920], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {/* Línea de tiempo */}
      <div style={{ position: "absolute", inset: 0, translate: `${slide}px 0px` }}>
        <Draw d="M120 420 L1300 420" at={4} dur={22} color={C.cream} width={4} />
        {[0, 5, 10, 15, 20, 25].map((y, i) => (
          <In key={y} at={8 + i * 3} dy={10} style={{ left: 120 + y * 47 - 20, top: 440 }}>
            <Text size={24} weight={500}>
              {y}
            </Text>
          </In>
        ))}
        <In at={sec(1.2)} dy={30} style={{ left: 120 + 21 * 47 - 14, top: 330 }}>
          <div style={{ width: 28, height: 90, background: C.red }} />
        </In>
        <In at={sec(1.4)} dy={25} style={{ left: 300, top: 120 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <Big size={170}>21 años</Big>
            <Text size={40} weight={500}>
              (promedio)
            </Text>
          </div>
        </In>
        <In at={sec(3)} dy={20} style={{ left: 300, top: 520 }}>
          <Text size={40} weight={700} color={C.pink}>
            2.º parque de carga más viejo de América Latina
          </Text>
        </In>
      </div>

      {/* Tarjetas de mercado */}
      {f >= panels ? (
        <div style={{ position: "absolute", inset: 0, translate: `${slide + 1920 + slide2}px 0px` }}>
          <In at={panels + 6} dy={30} style={{ left: 120, top: 150 }}>
            <Card w={560} style={{ fontSize: 30 }}>
              <div style={{ fontSize: 26, color: C.red }}>Scania</div>
              <div style={{ fontSize: 76, fontWeight: 800 }}>+3.300</div>
              vehículos a monitorear para anticipar averías
            </Card>
          </In>
          <In at={panels + sec(3.6)} dy={30} style={{ left: 740, top: 150 }}>
            <Card w={560} style={{ fontSize: 30 }}>
              <div style={{ fontSize: 26, color: C.red }}>Divemotor</div>
              <div style={{ fontSize: 76, fontWeight: 800 }}>+USD 20 M</div>
              en inventario de repuestos
            </Card>
          </In>
        </div>
      ) : null}

      {/* Pantalla dividida conceptual */}
      {f >= split ? (
        <div style={{ position: "absolute", inset: 0, translate: `${slide2 + 1920}px 0px` }}>
          <div style={{ position: "absolute", left: 110, top: 140, width: 590, height: 470, background: C.red }} />
          <div style={{ position: "absolute", left: 730, top: 140, width: 590, height: 470, background: C.cream }} />
          <In at={split + 12} dy={20} style={{ left: 150, top: 200 }}>
            <Text size={30} weight={500}>
              los grandes
            </Text>
            <Text size={78} weight={800}>
              ANTICIPAR
            </Text>
            <Text size={32} weight={500}>
              venden disponibilidad
            </Text>
          </In>
          <In at={split + sec(1.8)} dy={20} style={{ left: 770, top: 200 }}>
            <Text size={30} weight={500} color={C.charcoal}>
              los pequeños
            </Text>
            <Text size={62} weight={800} color={C.charcoal}>
              REPARAR TRAS FALLAR
            </Text>
            <Text size={32} weight={500} color={C.charcoal}>
              compran cuando algo ya falló
            </Text>
          </In>
        </div>
      ) : null}

      <Source at={sec(1.4)} out={panels - 2}>
        Colfecar, vía El Colombiano
      </Source>
      <Source at={panels + 8} out={split - 2}>
        Autocosmos y Valora Analitik (nov. 2026) · Portafolio (oct. 2026)
      </Source>
      <Strip text="los grandes venden disponibilidad" start={split + 4} end={sec(18.6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

export const S3_Mercado: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(16)}>
      <Propietarios />
    </Sequence>
    <Sequence from={sec(16)} durationInFrames={sec(19)}>
      <Grandes />
    </Sequence>
  </AbsoluteFill>
);
