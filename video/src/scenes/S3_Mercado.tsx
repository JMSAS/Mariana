import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Chapter, Draw, In, sec, Source, Text } from "../components/Anim";
import { Background, Spotlight } from "../components/Base";
import { TruckIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** Radar de telemetría (Scania). */
const Radar: React.FC<{ size?: number }> = ({ size = 150 }) => {
  const f = useCurrentFrame();
  const a = (f * 3) % 360;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx={50} cy={50} r={46} fill={C.navyDeep} stroke={C.cream} strokeWidth={3} />
      <circle cx={50} cy={50} r={30} fill="none" stroke={C.navyLine} strokeWidth={2} />
      <circle cx={50} cy={50} r={14} fill="none" stroke={C.navyLine} strokeWidth={2} />
      <path d={`M50 50 L${50 + 46 * Math.cos((a * Math.PI) / 180)} ${50 + 46 * Math.sin((a * Math.PI) / 180)}`} stroke={C.red} strokeWidth={3} />
      <circle cx={68} cy={36} r={4} fill={C.red} />
      <circle cx={34} cy={62} r={3} fill={C.pink} />
    </svg>
  );
};

/** Estantería de inventario (Divemotor). */
const Shelf: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {[20, 50, 80].map((y) => (
      <rect key={y} x={8} y={y} width={84} height={5} fill={C.cream} />
    ))}
    <rect x={8} y={10} width={5} height={78} fill={C.cream} />
    <rect x={87} y={10} width={5} height={78} fill={C.cream} />
    {[14, 30, 46, 62].map((x, i) => (
      <rect key={x} x={x} y={i % 2 ? 34 : 6} width={13} height={14} fill={i % 2 ? C.red : C.pink} />
    ))}
    {[20, 40, 60].map((x) => (
      <rect key={x} x={x} y={64} width={14} height={16} fill={C.red} />
    ))}
  </svg>
);

/** 0:46–0:57 · 96 % y 7 de cada 10. */
const Propietarios: React.FC = () => {
  const f = useCurrentFrame();
  const grid = sec(7.6); // "…reúnen casi siete de cada diez"
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={330} width={800} opacity={0.6} height={900} />
      {[0, 1, 2].map((i) => (
        <In key={i} at={8 + i * 6} dy={20} style={{ left: 120 + i * 180, top: 130 }}>
          <TruckIcon size={84} />
        </In>
      ))}
      <In at={sec(2.4)} dy={25} style={{ left: 110, top: 270 }}>
        <Big size={230}>96 %</Big>
      </In>
      <In at={sec(2.8)} dy={20} style={{ left: 120, top: 520 }}>
        <Text size={40}>de los propietarios tiene</Text>
      </In>
      <In at={sec(5.4)} dy={20} style={{ left: 120, top: 575 }}>
        <Text size={60} weight={800} color={C.pink}>
          hasta 3 vehículos
        </Text>
      </In>
      {Array.from({ length: 10 }).map((_, i) => {
        const at = grid + i * 3;
        const red = i < 7 && f >= grid + 22 + i * 4;
        return (
          <In key={i} at={at} dy={14} style={{ left: 830 + (i % 5) * 200, top: 170 + Math.floor(i / 5) * 140 }}>
            <TruckIcon size={70} color={red ? C.red : C.grey} />
          </In>
        );
      })}
      <In at={grid + 50} dy={20} style={{ left: 840, top: 470 }}>
        <Text size={60} weight={800}>
          Casi 7 de cada 10
        </Text>
        <Text size={32} weight={500}>
          vehículos de carga del país
        </Text>
      </In>
      <Source at={sec(2.4)}>Fedetranscarga, vía La República</Source>
    </AbsoluteFill>
  );
};

/** 0:57–1:19 · 21 años → Scania / Divemotor → anticipar vs reparar. */
const Grandes: React.FC = () => {
  const f = useCurrentFrame();
  const panels = sec(5.5); // "Mientras tanto, Scania…"
  const split = sec(16.7); // "Los grandes venden disponibilidad…"
  const slide = interpolate(f, [panels, panels + 15], [0, -1920], { ...clamp, easing: easeInOut });
  const slide2 = interpolate(f, [split, split + 15], [0, -1920], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <div style={{ position: "absolute", inset: 0, translate: `${slide}px 0px` }}>
        <Draw d="M120 470 L1300 470" at={4} dur={22} color={C.cream} width={4} />
        {[0, 5, 10, 15, 20, 25].map((y, i) => (
          <In key={y} at={8 + i * 3} dy={10} style={{ left: 120 + y * 47 - 10, top: 490 }}>
            <Text size={24} weight={500}>
              {y}
            </Text>
          </In>
        ))}
        {[3, 9, 14, 18].map((y, i) => (
          <In key={y} at={12 + i * 3} dy={14} style={{ left: 120 + y * 47 - 30, top: 410 }}>
            <TruckIcon size={30} color={C.grey} />
          </In>
        ))}
        <In at={sec(1.1)} dy={30} style={{ left: 120 + 21 * 47 - 60, top: 370 }}>
          <TruckIcon size={60} color={C.red} />
        </In>
        <In at={sec(1.1)} dy={25} style={{ left: 300, top: 150 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
            <Big size={170}>21 años</Big>
            <Text size={40} weight={500}>
              (promedio)
            </Text>
          </div>
        </In>
        <In at={sec(2.6)} dy={20} style={{ left: 300, top: 570 }}>
          <Text size={40} weight={700} color={C.pink}>
            2.º parque de carga más viejo de América Latina
          </Text>
        </In>
      </div>

      {f >= panels ? (
        <div style={{ position: "absolute", inset: 0, translate: `${slide + 1920 + slide2}px 0px` }}>
          <In at={panels + 6} dy={30} style={{ left: 120, top: 130 }}>
            <Card w={560} style={{ fontSize: 30, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 30, color: C.red, fontWeight: 800 }}>Scania</div>
                <div style={{ background: C.navy, borderRadius: 80, padding: 4 }}>
                  <Radar size={120} />
                </div>
              </div>
              <div style={{ fontSize: 80, fontWeight: 800 }}>+3.300</div>
              <div>vehículos a monitorear para anticipar averías</div>
            </Card>
          </In>
          <In at={panels + sec(4.5)} dy={30} style={{ left: 740, top: 130 }}>
            <Card w={560} style={{ fontSize: 30, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 30, color: C.red, fontWeight: 800 }}>Divemotor</div>
                <div style={{ background: C.navy, padding: 6 }}>
                  <Shelf size={112} />
                </div>
              </div>
              <div style={{ fontSize: 80, fontWeight: 800 }}>+USD 20 M</div>
              <div>en inventario de repuestos</div>
            </Card>
          </In>
        </div>
      ) : null}

      {f >= split ? (
        <div style={{ position: "absolute", inset: 0, translate: `${slide2 + 1920}px 0px` }}>
          <div style={{ position: "absolute", left: 110, top: 140, width: 590, height: 520, background: C.red }} />
          <div style={{ position: "absolute", left: 730, top: 140, width: 590, height: 520, background: C.cream }} />
          <In at={split + 12} dy={20} style={{ left: 150, top: 190 }}>
            <Text size={30} weight={500}>
              los grandes
            </Text>
            <Text size={72} weight={800}>
              ANTICIPAR
            </Text>
            <Text size={32} weight={500}>
              venden disponibilidad
            </Text>
          </In>
          <In at={split + 16} dy={20} style={{ left: 170, top: 470 }}>
            <Radar size={150} />
          </In>
          <In at={sec(19)} dy={20} style={{ left: 770, top: 190 }}>
            <div style={{ width: 510 }}>
              <Text size={30} weight={500} color={C.charcoal}>
                los pequeños
              </Text>
              <Text size={60} weight={800} color={C.charcoal}>
                REPARAR TRAS FALLAR
              </Text>
              <Text size={32} weight={500} color={C.charcoal}>
                compran cuando algo ya falló
              </Text>
            </div>
          </In>
        </div>
      ) : null}

      <Source at={sec(1.1)} out={panels - 2}>
        Colfecar, vía El Colombiano
      </Source>
      <Source at={panels + 8} out={split - 2}>
        Autocosmos y Valora Analitik (nov. 2026) · Portafolio (oct. 2026)
      </Source>
    </AbsoluteFill>
  );
};

export const S3_Mercado: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(11.1)}>
      <Propietarios />
    </Sequence>
    <Sequence from={sec(11.1)} durationInFrames={sec(22)}>
      <Grandes />
    </Sequence>
    <Chapter n="03" title="EL MERCADO" />
  </AbsoluteFill>
);
