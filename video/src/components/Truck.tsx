import React from "react";
import { C } from "../theme";

const Wheel: React.FC<{ cx: number; cy: number; angle: number }> = ({ cx, cy, angle }) => (
  <g transform={`translate(${cx} ${cy})`}>
    <circle r={42} fill={C.charcoal} />
    <circle r={36} fill="none" stroke="#2c2c30" strokeWidth={4} />
    <circle r={21} fill="#b9bfcb" />
    <g transform={`rotate(${angle})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={Math.cos((a * Math.PI) / 180) * 14}
          cy={Math.sin((a * Math.PI) / 180) * 14}
          r={2.8}
          fill="#6d7486"
        />
      ))}
    </g>
    <circle r={7} fill="#6d7486" />
  </g>
);

/**
 * Tractocamión ilustrado 2D (cabina convencional de trompa larga,
 * silueta habitual en Colombia) + semirremolque tipo furgón.
 * Mira hacia la derecha. Caja de 900 x 345.
 */
export const Truck: React.FC<{ wheelAngle: number; headlight?: number }> = ({
  wheelAngle,
  headlight = 1,
}) => {
  return (
    <svg width={1150} height={345} viewBox="0 0 1150 345" style={{ overflow: "visible" }}>
      {/* haz de luz delantero */}
      <polygon points="888,212 1150,170 1150,290" fill="#fff6e6" opacity={0.1 * headlight} />
      {/* sombra */}
      <ellipse cx={450} cy={340} rx={470} ry={10} fill="rgba(0,0,0,0.35)" />

      {/* --- Semirremolque --- */}
      <rect x={0} y={30} width={590} height={220} rx={6} fill={C.cream} />
      {[95, 190, 285, 380, 475].map((x) => (
        <line key={x} x1={x} y1={36} x2={x} y2={244} stroke={C.creamDark} strokeWidth={3} />
      ))}
      <rect x={0} y={198} width={590} height={16} fill={C.red} />
      <rect x={0} y={30} width={590} height={10} fill="#e9dac4" />
      <rect x={-4} y={214} width={12} height={20} rx={2} fill={C.red} />
      <rect x={20} y={250} width={560} height={14} fill={C.charcoal} />
      {/* patas de apoyo */}
      <rect x={470} y={262} width={10} height={50} fill="#5b6275" />
      <rect x={462} y={308} width={26} height={8} fill="#5b6275" />
      {/* guardabarros traseros */}
      <path d="M58 262 h178 v10 h-178 z" fill="#3a3f4d" />

      {/* --- Tractocamión --- */}
      <rect x={585} y={262} width={300} height={16} fill={C.charcoal} />
      {/* dormitorio */}
      <rect x={612} y={70} width={100} height={192} rx={10} fill={C.red} />
      <rect x={612} y={70} width={100} height={18} rx={8} fill={C.redDeep} opacity={0.5} />
      {/* cabina */}
      <path d="M712 62 h70 q10 0 14 10 l18 70 v120 h-102 z" fill={C.red} />
      <path d="M726 78 h52 q6 0 8 7 l15 55 h-75 z" fill="#9fb3cf" opacity={0.85} />
      <path d="M726 78 h52 q6 0 8 7 l4 16 h-64 z" fill="#ffffff" opacity={0.25} />
      <rect x={724} y={160} width={6} height={30} rx={3} fill={C.redDeep} />
      {/* trompa (capó largo) */}
      <path d="M812 150 h48 q20 2 26 22 l6 90 h-80 z" fill={C.red} />
      <path d="M812 150 h48 q20 2 26 22 l2 10 h-76 z" fill={C.redDeep} opacity={0.35} />
      {/* parrilla y farola */}
      <rect x={886} y={182} width={12} height={74} rx={3} fill="#c7ccd6" />
      <rect x={880} y={204} width={12} height={16} rx={3} fill="#fff4d6" />
      {/* parachoques */}
      <rect x={858} y={258} width={46} height={18} rx={4} fill="#c7ccd6" />
      {/* exosto */}
      <rect x={700} y={8} width={11} height={150} rx={4} fill="#b9bfcb" />
      {/* tanque */}
      <rect x={730} y={250} width={70} height={30} rx={14} fill="#c7ccd6" />
      {/* guardabarros */}
      <path d="M795 262 a46 46 0 0 1 92 0" fill="none" stroke={C.redDeep} strokeWidth={10} />

      {/* ruedas */}
      <Wheel cx={95} cy={298} angle={wheelAngle} />
      <Wheel cx={195} cy={298} angle={wheelAngle} />
      <Wheel cx={630} cy={298} angle={wheelAngle} />
      <Wheel cx={722} cy={298} angle={wheelAngle} />
      <Wheel cx={841} cy={298} angle={wheelAngle} />
    </svg>
  );
};
