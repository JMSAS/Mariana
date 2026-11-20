import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Card, In, sec, Stamp, Text } from "../components/Anim";
import { Background } from "../components/Base";
import { BoxIcon, PersonIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 3:35–4:05 · escenarios posibles + preguntas abiertas. */
export const S7_Efectos: React.FC = () => {
  const f = useCurrentFrame();
  const bad = sec(8.5); // "Si no funciona…"
  const questions = sec(17.5); // J: "Y quedan preguntas abiertas…"
  const rightOn = interpolate(f, [bad, bad + 14], [0.3, 1], { ...clamp, easing: easeInOut });
  const leftDim = interpolate(f, [bad, bad + 14], [1, 0.55], { ...clamp, easing: easeInOut });
  const panelsOut = interpolate(f, [questions - 6, questions + 8], [1, 0], { ...clamp, easing: easeInOut });
  const qs = ["¿Pagará el cliente por anticiparse?", "¿Qué margen deja un kit?", "¿De quién son los datos de cada vehículo?"];
  const qStep = sec(3.6);
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <In at={4} dy={-20} style={{ left: 110, top: 70 }}>
        <Text size={40} weight={800}>
          ESCENARIOS POSIBLES
        </Text>
      </In>
      <In at={14} dy={0} style={{ left: 820, top: 66 }}>
        <Stamp size={28}>PROYECCIONES, NO RESULTADOS</Stamp>
      </In>

      {f < questions + 10 ? (
        <div style={{ position: "absolute", inset: 0, opacity: panelsOut }}>
          {/* Si funciona */}
          <div style={{ opacity: leftDim }}>
            <In at={sec(1)} mask="up" dy={0} style={{ left: 110, top: 170 }}>
              <div style={{ width: 590, height: 560, background: C.red, padding: 34, boxSizing: "border-box" }}>
                <Text size={46} weight={800}>
                  SI FUNCIONA
                </Text>
                <Text size={30} weight={500} style={{ marginTop: 6 }}>
                  Recompra / anticipación
                </Text>
              </div>
            </In>
            <In at={sec(2.6)} dy={20} style={{ left: 150, top: 380 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <PersonIcon size={80} />
                <Text size={28} style={{ width: 400 }}>vuelve por el kit, no por el precio</Text>
              </div>
            </In>
            <In at={sec(5)} dy={20} style={{ left: 150, top: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <WarehouseIcon size={60} />
                <Text size={28}>la bodega anticipa pedidos</Text>
              </div>
            </In>
          </div>
          {/* Si no funciona */}
          <div style={{ opacity: rightOn }}>
            <In at={sec(1.4)} mask="up" dy={0} style={{ left: 730, top: 170 }}>
              <div style={{ width: 600, height: 560, background: C.cream, padding: 34, boxSizing: "border-box" }}>
                <Text size={46} weight={800} color={C.charcoal}>
                  SI NO FUNCIONA
                </Text>
              </div>
            </In>
            <In at={bad + 8} dy={20} style={{ left: 770, top: 320 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <BoxIcon size={80} color={C.creamDark} />
                <Text size={28} color={C.charcoal} style={{ width: 400 }}>
                  el margen podría no cubrir la asesoría
                </Text>
              </div>
            </In>
            <In at={bad + sec(2.6)} dy={20} style={{ left: 770, top: 470 }}>
              <Text size={28} color={C.charcoal}>
                los grandes podrían llegar primero
              </Text>
            </In>
          </div>
        </div>
      ) : null}

      {/* Preguntas abiertas: una por concepto, empuje horizontal */}
      {qs.map((q, i) => {
        const at = questions + 6 + i * qStep;
        const out = i < qs.length - 1 ? at + qStep - 10 : undefined;
        return (
          <In key={q} at={at} out={out} dx={80} dy={0} style={{ left: 160, top: 300 }}>
            <Card w={1100} style={{ fontSize: 54, padding: "40px 50px" }}>
              <div style={{ fontSize: 28, color: C.red, fontWeight: 800 }}>PREGUNTA ABIERTA {i + 1}</div>
              {q}
            </Card>
          </In>
        );
      })}
    </AbsoluteFill>
  );
};
