import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { Truck } from "../components/Truck";
import { C, clamp, easeInOut, easeOut } from "../theme";

// Tiempos en frames (30 fps). Se reajustan al audio real cuando llegue la grabación.
const T = {
  roadDraw: [4, 40],
  clock: 15,
  truckIn: [45, 170], // entra despacio y desacelera
  toShoulder: [140, 178], // se orilla al arcén ("detiene")
  spot: [176, 205],
};

const TRUCK_SCALE = 1.05;
const TRUCK_FROM = -1250;
const TRUCK_TO = 250;

const truckX = (f: number) =>
  interpolate(f, T.truckIn, [TRUCK_FROM, TRUCK_TO], {
    ...clamp,
    easing: (t) => 1 - Math.pow(1 - t, 3), // velocidad baja al final, sin rebote
  });

export const Noche: React.FC = () => {
  const frame = useCurrentFrame();

  const x = truckX(frame);
  const v = Math.abs(truckX(frame + 1) - x);
  const blur = v > 0.8 ? Math.min(v * 0.22, 7) : 0; // blur direccional solo en movimiento
  const y = interpolate(frame, T.toShoulder, [0, 26], { ...clamp, easing: easeInOut });
  const wheelAngle = (x / (42 * TRUCK_SCALE)) * (180 / Math.PI);

  const road = interpolate(frame, T.roadDraw, [1, 0], { ...clamp, easing: easeInOut });
  const sky = interpolate(frame, [8, 30], [0, 1], { ...clamp, easing: easeOut });
  const spot = interpolate(frame, T.spot, [0, 1], { ...clamp, easing: easeInOut });
  const zoom = interpolate(frame, [170, 345], [1, 1.03], { ...clamp, easing: easeInOut });

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: zoom, transformOrigin: "40% 65%" }}>
        <Background ground={0.66} />

        {/* Luna y estrellas */}
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", opacity: sky, translate: `0px ${(1 - sky) * -12}px` }}
        >
          <defs>
            <mask id="crescent">
              <circle cx={1500} cy={170} r={56} fill="white" />
              <circle cx={1525} cy={150} r={50} fill="black" />
            </mask>
          </defs>
          <circle cx={1500} cy={170} r={56} fill={C.cream} mask="url(#crescent)" />
          {[
            [300, 90],
            [520, 210],
            [880, 120],
            [1120, 260],
            [1310, 80],
            [1700, 300],
            [1760, 110],
            [690, 330],
          ].map(([sx, sy], i) => (
            <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 3 : 2} fill={C.cream} opacity={0.7} />
          ))}
        </svg>

        <Spotlight x={740} width={900} opacity={spot * 0.9} height={800} />

        {/* Montañas lejanas (sabana / cordillera) */}
        <svg width={1920} height={1080} style={{ position: "absolute", opacity: sky }}>
          <path
            d="M0 713 L0 560 L160 470 L300 540 L470 430 L640 520 L820 450 L1010 540 L1180 460 L1360 530 L1550 440 L1740 520 L1920 470 L1920 713 Z"
            fill="#283255"
          />
          <path
            d="M0 713 L0 620 L220 570 L420 630 L650 575 L900 640 L1150 590 L1400 640 L1650 585 L1920 630 L1920 713 Z"
            fill="#2f3a60"
          />
        </svg>

        {/* Ruta nocturna: bordes y línea central que se dibujan */}
        <svg width={1920} height={1080} style={{ position: "absolute" }}>
          <rect x={0} y={700} width={1920} height={95} fill={C.navyGround} opacity={0.9} />
          <line
            x1={0}
            y1={700}
            x2={1920}
            y2={700}
            stroke={C.cream}
            strokeOpacity={0.55}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={road}
          />
          <line
            x1={0}
            y1={795}
            x2={1920}
            y2={795}
            stroke={C.cream}
            strokeOpacity={0.55}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={road}
          />
          <g
            style={{
              clipPath: `inset(0 ${road * 100}% 0 0)`,
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <rect key={i} x={i * 90} y={746} width={46} height={5} fill={C.cream} opacity={0.35} />
            ))}
          </g>
        </svg>

        {/* Tractocamión */}
        <svg width={0} height={0} style={{ position: "absolute" }}>
          <filter id="mblur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={`${blur} 0`} />
          </filter>
        </svg>
        <div
          style={{
            position: "absolute",
            left: x,
            top: 445 + y,
            scale: TRUCK_SCALE,
            transformOrigin: "0 100%",
            filter: blur > 0 ? "url(#mblur)" : undefined,
          }}
        >
          <Truck wheelAngle={wheelAngle} />
        </div>

        <PaperLabel start={T.clock} style={{ left: 110, top: 100 }} fontSize={86}>
          2:47 A. M.
        </PaperLabel>
      </AbsoluteFill>

      {/* Palabras clave (no se transcribe todo el diálogo) */}
      <Strip text="Don Gustavo" start={72} end={168} style={{ left: 110, top: 850 }} />
      <Strip
        text="transportista"
        variant="cream"
        start={80}
        end={168}
        fontSize={36}
        rotate={1}
        style={{ left: 150, top: 935 }}
      />
      <Strip text="se detiene" start={182} end={330} style={{ left: 110, top: 850 }} />
      <Strip
        text="a la orilla de la vía"
        variant="cream"
        start={190}
        end={330}
        fontSize={36}
        rotate={1}
        style={{ left: 150, top: 935 }}
      />

    </AbsoluteFill>
  );
};
