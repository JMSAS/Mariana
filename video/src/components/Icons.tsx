import React from "react";
import { C } from "../theme";

type P = { size?: number; color?: string };

export const TruckIcon: React.FC<P> = ({ size = 80, color = C.cream }) => (
  <svg width={size * 1.8} height={size} viewBox="0 0 180 100">
    <rect x={2} y={14} width={104} height={58} rx={4} fill={color} />
    <path d="M110 30 h36 q8 0 12 8 l16 24 v10 h-64 z" fill={color} />
    <rect x={124} y={36} width={22} height={18} rx={3} fill={C.navy} opacity={0.6} />
    <circle cx={30} cy={80} r={13} fill={color} stroke={C.navy} strokeWidth={5} />
    <circle cx={62} cy={80} r={13} fill={color} stroke={C.navy} strokeWidth={5} />
    <circle cx={150} cy={80} r={13} fill={color} stroke={C.navy} strokeWidth={5} />
  </svg>
);

export const Bulb: React.FC<P & { glow?: number }> = ({ size = 120, color = C.cream, glow = 0 }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 100 130">
    <circle cx={50} cy={48} r={46} fill={C.pink} opacity={0.25 * glow} />
    <path d="M50 8 a36 36 0 0 1 22 64 q-6 6 -6 14 h-32 q0 -8 -6 -14 a36 36 0 0 1 22 -64 z" fill={color} />
    <rect x={34} y={92} width={32} height={10} rx={3} fill={C.grey} />
    <rect x={37} y={106} width={26} height={10} rx={3} fill={C.grey} />
    <path d="M42 60 q8 -14 16 0" stroke={C.red} strokeWidth={4} fill="none" opacity={0.4 + 0.6 * glow} />
  </svg>
);

export const PhoneIcon: React.FC<P & { crossed?: number }> = ({ size = 120, color = C.cream, crossed = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M28 10 q6 -2 9 4 l8 16 q2 5 -2 9 l-6 6 q8 16 22 24 l6 -6 q4 -4 9 -2 l16 8 q6 3 4 9 l-3 10 q-3 8 -12 8 q-36 -4 -60 -40 q-8 -16 -4 -36 z"
      fill={color}
    />
    {crossed > 0 ? (
      <line x1={10} y1={90} x2={10 + 80 * crossed} y2={90 - 80 * crossed} stroke={C.red} strokeWidth={8} strokeLinecap="round" />
    ) : null}
  </svg>
);

/** Burbuja de chat simbólica (no imita la interfaz de WhatsApp). */
export const ChatBubble: React.FC<P> = ({ size = 140, color = C.cream }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 8 a42 38 0 1 1 -24 70 l-16 8 l6 -16 a42 38 0 0 1 34 -62 z" fill={color} />
    <rect x={28} y={36} width={44} height={6} rx={3} fill={C.red} />
    <rect x={28} y={50} width={30} height={6} rx={3} fill={C.red} opacity={0.6} />
  </svg>
);

export const BoxIcon: React.FC<P> = ({ size = 140, color = C.cream }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path d="M10 34 L50 18 L90 34 L90 80 L50 96 L10 80 Z" fill={C.creamDark} />
    <path d="M10 34 L50 50 L90 34 L50 18 Z" fill={color} />
    <path d="M50 50 L50 96" stroke={C.navy} strokeWidth={2} opacity={0.3} />
    <rect x={20} y={56} width={22} height={8} fill={C.red} transform="skewY(22)" />
  </svg>
);

export const VanIcon: React.FC<P> = ({ size = 90, color = C.cream }) => (
  <svg width={size * 1.6} height={size} viewBox="0 0 160 100">
    <path d="M4 20 h96 v56 h-96 z" fill={color} />
    <path d="M100 36 h28 q8 0 12 8 l14 18 v14 h-54 z" fill={color} />
    <rect x={4} y={50} width={96} height={8} fill={C.red} />
    <circle cx={32} cy={80} r={13} fill={color} stroke={C.navy} strokeWidth={5} />
    <circle cx={128} cy={80} r={13} fill={color} stroke={C.navy} strokeWidth={5} />
  </svg>
);

export const WarehouseIcon: React.FC<P> = ({ size = 260, color = C.cream }) => (
  <svg width={size * 1.5} height={size} viewBox="0 0 150 100">
    <path d="M6 40 L75 8 L144 40 V96 H6 Z" fill={color} />
    <rect x={20} y={52} width={36} height={44} fill={C.creamDark} />
    {[58, 66, 74, 82, 90].map((y) => (
      <line key={y} x1={20} y1={y} x2={56} y2={y} stroke={C.grey} strokeWidth={1.5} />
    ))}
    <rect x={70} y={52} width={60} height={14} fill={C.red} />
    <rect x={92} y={72} width={20} height={24} fill={C.navyGround} />
  </svg>
);

export const PersonIcon: React.FC<P> = ({ size = 70, color = C.cream }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx={50} cy={30} r={18} fill={color} />
    <path d="M16 96 q0 -40 34 -40 q34 0 34 40 z" fill={color} />
  </svg>
);

export const CalendarIcon: React.FC<P & { label?: string }> = ({ size = 160, color = C.cream, label }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect x={6} y={14} width={88} height={80} rx={6} fill={color} />
    <rect x={6} y={14} width={88} height={22} rx={6} fill={C.red} />
    {label ? (
      <text x={50} y={74} textAnchor="middle" fontFamily="Poppins" fontWeight={800} fontSize={28} fill={C.charcoal}>
        {label}
      </text>
    ) : null}
  </svg>
);

export const DoorIcon: React.FC<P & { open?: number }> = ({ size = 180, color = C.cream, open = 0 }) => (
  <svg width={size * 0.75} height={size} viewBox="0 0 75 100">
    <rect x={4} y={4} width={67} height={94} fill={C.navyDeep} stroke={color} strokeWidth={4} />
    <rect x={8} y={8} width={59 * (1 - open * 0.7)} height={86} fill={color} />
    <circle cx={8 + 59 * (1 - open * 0.7) - 8} cy={54} r={3} fill={C.red} />
  </svg>
);
