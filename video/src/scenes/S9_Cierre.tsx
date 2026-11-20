import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { In, sec, Text } from "../components/Anim";
import { Background, Spotlight } from "../components/Base";
import { C, clamp, easeInOut } from "../theme";

/** 3:37–3:42 · cierre. La ventana de presentadores se amplía desde Main. */
export const S9_Cierre: React.FC = () => {
  const f = useCurrentFrame();
  const logo = interpolate(f, [sec(0.5), sec(0.5) + 14], [0, 1], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={1450} width={900} opacity={0.6} height={900} />
      <div style={{ position: "absolute", left: 1110, top: 200, width: 720, opacity: logo }}>
        <Img src={staticFile("logo_negativo.png")} style={{ width: "100%", display: "block" }} />
      </div>
      <In at={sec(0.8)} dy={25} style={{ left: 1130, top: 480 }}>
        <Text size={130} weight={800}>
          Gracias
        </Text>
      </In>
      <In at={sec(1.3)} dy={15} style={{ left: 1134, top: 650 }}>
        <Text size={32} weight={500} color={C.pink}>
          El eje que no se rompió
          <br />
          Gerencia de Emprendimiento
        </Text>
      </In>
    </AbsoluteFill>
  );
};
