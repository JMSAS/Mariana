import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Chapter, In, sec, Stamp, Text } from "../components/Anim";
import { Background, Strip } from "../components/Base";
import { BoxIcon, PersonIcon, TruckIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 2:53–3:09 · escenarios posibles (en la grabación no hay bloque de preguntas abiertas). */
export const S7_Efectos: React.FC = () => {
  const f = useCurrentFrame();
  const bad = sec(8); // "Si no funciona…"
  const proj = sec(13.4); // "Son proyecciones, no resultados"
  const rightOn = interpolate(f, [bad, bad + 14], [0.3, 1], { ...clamp, easing: easeInOut });
  const leftDim = interpolate(f, [bad, bad + 14], [1, 0.55], { ...clamp, easing: easeInOut });
  const stampBig = interpolate(f, [proj, proj + 14], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <In at={4} dy={-20} style={{ left: 110, top: 70 }}>
        <Text size={40} weight={800}>
          ¿QUÉ PODRÍA PASAR?
        </Text>
      </In>
      <In at={14} dy={0} style={{ left: 640, top: 66 }}>
        <div style={{ scale: String(1 + 0.25 * stampBig), transformOrigin: "left center" }}>
          <Stamp size={28}>PROYECCIONES, NO RESULTADOS</Stamp>
        </div>
      </In>

      <div style={{ opacity: leftDim }}>
        <In at={sec(1.4)} mask="up" dy={0} style={{ left: 110, top: 170 }}>
          <div style={{ width: 590, height: 600, background: C.red, padding: 34, boxSizing: "border-box" }}>
            <Text size={48} weight={800}>
              SI FUNCIONA
            </Text>
            <Text size={30} weight={500} style={{ marginTop: 6 }}>
              recompra y anticipación
            </Text>
          </div>
        </In>
        <In at={sec(2.6)} dy={20} style={{ left: 150, top: 370 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <PersonIcon size={90} />
            <Text size={30} style={{ width: 380 }}>
              los clientes podrían volver por el kit, no por el precio
            </Text>
          </div>
        </In>
        <In at={sec(5.2)} dy={20} style={{ left: 150, top: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <WarehouseIcon size={70} />
            <Text size={30} style={{ width: 360 }}>
              la bodega podría anticipar los pedidos
            </Text>
          </div>
        </In>
      </div>
      <div style={{ opacity: rightOn }}>
        <In at={sec(1.8)} mask="up" dy={0} style={{ left: 730, top: 170 }}>
          <div style={{ width: 600, height: 600, background: C.cream, padding: 34, boxSizing: "border-box" }}>
            <Text size={48} weight={800} color={C.charcoal}>
              SI NO FUNCIONA
            </Text>
          </div>
        </In>
        <In at={bad + 8} dy={20} style={{ left: 770, top: 330 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <BoxIcon size={90} color={C.creamDark} />
            <Text size={30} color={C.charcoal} style={{ width: 400 }}>
              el margen podría no cubrir la asesoría
            </Text>
          </div>
        </In>
        <In at={sec(11.2)} dy={20} style={{ left: 770, top: 520 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <TruckIcon size={56} color={C.red} />
            <Text size={30} color={C.charcoal} style={{ width: 360 }}>
              los grandes podrían llegar primero
            </Text>
          </div>
        </In>
      </div>
      <Strip text="son proyecciones, no resultados" start={proj} end={sec(15.6)} style={{ left: 110, top: 860 }} fontSize={40} />
      <Chapter n="07" title="EFECTOS POSIBLES" />
    </AbsoluteFill>
  );
};
