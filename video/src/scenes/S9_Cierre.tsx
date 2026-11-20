import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { In, sec, Text } from "../components/Anim";
import { Background } from "../components/Base";
import { C, clamp, easeInOut } from "../theme";

/** 4:40–4:50 · cierre. La ventana de presentadores se amplía desde Main. */
export const S9_Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const logo = interpolate(f, [sec(0.9), sec(0.9) + 14], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <div
        style={{
          position: "absolute",
          left: 1130,
          top: 180,
          width: 700,
          background: "#ffffff",
          padding: "26px 36px",
          opacity: logo,
          boxShadow: "0 12px 0 rgba(0,0,0,0.25)",
          boxSizing: "border-box",
        }}
      >
        <Img src={staticFile("logo.png")} style={{ width: "100%", display: "block" }} />
      </div>
      <In at={sec(1.3)} dy={25} style={{ left: 1130, top: 450 }}>
        <Text size={120} weight={800}>
          Gracias
        </Text>
      </In>
      <In at={sec(2)} dy={15} style={{ left: 1134, top: 610 }}>
        <Text size={30} weight={500} color={C.pink}>
          El eje que no se rompió
          <br />
          Gerencia de Emprendimiento
        </Text>
      </In>
    </AbsoluteFill>
  );
};
