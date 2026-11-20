import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Draw, In, sec, Source, Stamp, Text } from "../components/Anim";
import { Background, PaperLabel, Strip } from "../components/Base";
import { Bulb, CalendarIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 3:00–3:17 · Kuratko (entorno) + Shimizu (riesgos) → piloto cercado. */
const Permiso: React.FC = () => {
  const f = useCurrentFrame();
  const bx = interpolate(f, [sec(1), sec(2.6)], [160, 560], { ...clamp, easing: easeInOut });
  const moving = f > sec(1) && f < sec(2.6);
  const fence = sec(10); // "…y según Shimizu…"
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {/* Marco institucional */}
      <In at={6} dy={0} style={{ left: 460, top: 130 }}>
        <div style={{ width: 760, height: 520, border: `5px solid ${C.cream}`, opacity: 0.9 }} />
      </In>
      <In at={10} dy={10} style={{ left: 480, top: 80 }}>
        <Text size={30} weight={700}>
          Organización
        </Text>
      </In>
      <div style={{ position: "absolute", left: bx, top: 260, filter: moving ? "blur(1.5px)" : undefined }}>
        <In at={2} dy={20}>
          <Bulb size={140} glow={interpolate(f, [sec(2.6), sec(4)], [0, 1], { ...clamp })} />
        </In>
      </div>
      {["Apoyo", "Autonomía", "Tiempo"].map((w, i) => (
        <In key={w} at={sec(3.6) + i * 12} mask="left" dy={0} dx={30} style={{ left: 820, top: 200 + i * 110 }}>
          <Card accent={i === 1} style={{ fontSize: 34, padding: "14px 26px" }}>
            {w}
          </Card>
        </In>
      ))}
      <PaperLabel start={sec(5)} style={{ left: 1290, top: 140 }} fontSize={34}>
        Kuratko et al. (2005)
      </PaperLabel>
      {/* Cerca del piloto (trazo) */}
      <Draw d="M520 230 L760 230 L760 560 L520 560 Z" at={fence + 6} dur={30} color={C.red} width={6} />
      <In at={fence + 30} dy={15} style={{ left: 500, top: 580 }}>
        <Text size={28} weight={800} color={C.pink}>
          piloto cercado
        </Text>
      </In>
      <In at={fence} mask="left" dy={0} dx={-30} style={{ left: 110, top: 700 }}>
        <Card style={{ fontSize: 26, padding: "10px 20px" }}>Shimizu (2012): riesgos de la autonomía</Card>
      </In>
      <Strip text="una idea nueva necesita permiso" start={sec(0.5)} end={fence - 4} style={{ left: 110, top: 860 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 3:17–3:35 · hipótesis + margen neto. */
const Hipotesis: React.FC = () => {
  const f = useCurrentFrame();
  const opts = sec(4);
  const margin = sec(11.5); // "Además, su margen neto…"
  const wipe = interpolate(f, [margin, margin + 16], [0, 100], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${wipe}%)` }}>
        <In at={8} dy={0} scaleFrom={1.08} style={{ left: 260, top: 90 }}>
          <Stamp size={52} rotate={-4}>
            HIPÓTESIS, NO HECHO INTERNO
          </Stamp>
        </In>
        <In at={opts} dy={30} style={{ left: 140, top: 290 }}>
          <Card w={500}>
            <CalendarIcon size={90} label="30" />
            <div style={{ marginTop: 10 }}>Metas mensuales</div>
            <div style={{ fontSize: 26, fontWeight: 500 }}>podrían limitar la idea</div>
          </Card>
        </In>
        <In at={opts + sec(2.6)} dy={30} style={{ left: 720, top: 290 }}>
          <Card w={520} accent>
            <CalendarIcon size={90} label="1 h" />
            <div style={{ marginTop: 10 }}>1 hora semanal protegida</div>
            <div style={{ fontSize: 26, fontWeight: 500 }}>podría favorecerla</div>
          </Card>
        </In>
      </div>
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - wipe}% 0 0)` }}>
        <In at={margin + 10} dy={25} style={{ left: 140, top: 170 }}>
          <Text size={44} weight={700}>
            Margen neto 2025
          </Text>
          <Big size={170}>−1,02 %</Big>
          <Text size={36} weight={500} color={C.pink}>
            disminución del margen neto
          </Text>
        </In>
      </div>
      <Strip text="Max Trailer no publica sus prácticas internas" start={sec(0.6)} end={opts - 2} style={{ left: 110, top: 860 }} fontSize={34} />
      <Source at={margin + 12}>EMIS (2026)</Source>
    </AbsoluteFill>
  );
};

export const S6_Condiciones: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(17)}>
      <Permiso />
    </Sequence>
    <Sequence from={sec(17)} durationInFrames={sec(18)}>
      <Hipotesis />
    </Sequence>
  </AbsoluteFill>
);
