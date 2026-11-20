import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Big, Card, Chapter, Draw, In, sec, Source, Stamp, Text } from "../components/Anim";
import { Background, PaperLabel, Spotlight, Strip } from "../components/Base";
import { Bulb, CalendarIcon, PersonIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 2:22–2:36 · Kuratko (entorno) + Shimizu (riesgos) → piloto cercado. */
const Permiso: React.FC = () => {
  const f = useCurrentFrame();
  const bx = interpolate(f, [sec(0.8), sec(2.3)], [130, 560], { ...clamp, easing: easeInOut });
  const moving = f > sec(0.8) && f < sec(2.3);
  const fence = sec(9.1); // "…y según Shimizu…"
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={820} width={1100} opacity={0.5} height={900} />
      <In at={6} dy={0} style={{ left: 460, top: 130 }}>
        <div style={{ width: 800, height: 540, border: `5px solid ${C.cream}`, opacity: 0.9 }} />
      </In>
      <In at={10} dy={10} style={{ left: 480, top: 80 }}>
        <Text size={30} weight={700}>
          Organización
        </Text>
      </In>
      {/* mandos medios */}
      {[0, 1, 2].map((i) => (
        <In key={i} at={sec(4) + i * 5} dy={14} style={{ left: 520 + i * 70, top: 560 }}>
          <PersonIcon size={60} color={C.pink} />
        </In>
      ))}
      <In at={sec(4.4)} dy={10} style={{ left: 740, top: 580 }}>
        <Text size={24} weight={500}>
          mandos medios
        </Text>
      </In>
      <div style={{ position: "absolute", left: bx, top: 250, filter: moving ? "blur(1.5px)" : undefined }}>
        <In at={2} dy={20}>
          <Bulb size={150} glow={interpolate(f, [sec(2.3), sec(3.4)], [0, 1], { ...clamp })} />
        </In>
      </div>
      {["Apoyo", "Autonomía", "Tiempo"].map((w, i) => (
        <In key={w} at={sec(4) + i * 10} mask="left" dy={0} dx={30} style={{ left: 870, top: 190 + i * 115 }}>
          <Card accent={i === 1} style={{ fontSize: 36, padding: "14px 28px" }}>
            {w}
          </Card>
        </In>
      ))}
      <PaperLabel start={sec(2.3)} style={{ left: 1310, top: 140 }} fontSize={34}>
        Kuratko et al. (2005)
      </PaperLabel>
      <Draw d="M520 220 L770 220 L770 520 L520 520 Z" at={fence + 6} dur={30} color={C.red} width={6} />
      <In at={fence + 30} dy={15} style={{ left: 300, top: 470 }}>
        <Text size={30} weight={800} color={C.pink}>
          piloto cercado
        </Text>
      </In>
      <In at={fence} mask="left" dy={0} dx={-30} style={{ left: 110, top: 715 }}>
        <Card style={{ fontSize: 28, padding: "10px 22px" }}>Shimizu (2012): riesgos de la autonomía</Card>
      </In>
      <Strip text="una idea nueva necesita permiso" start={sec(0.3)} end={fence - 4} style={{ left: 110, top: 860 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:36–2:53 · hipótesis + margen neto. */
const Hipotesis: React.FC = () => {
  const f = useCurrentFrame();
  const opt1 = sec(5.4);
  const opt2 = sec(8.1);
  const margin = sec(11.8); // "Además, su margen neto…"
  const wipe = interpolate(f, [margin, margin + 16], [0, 100], { ...clamp, easing: easeInOut });
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={710} width={1400} opacity={0.4} height={900} />
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${wipe}%)` }}>
        <In at={sec(2.4)} dy={0} scaleFrom={1.08} style={{ left: 250, top: 90 }}>
          <Stamp size={56} rotate={-4}>
            HIPÓTESIS, NO HECHO INTERNO
          </Stamp>
        </In>
        <In at={opt1} dy={30} style={{ left: 140, top: 300 }}>
          <Card w={520}>
            <CalendarIcon size={100} label="30" />
            <div style={{ marginTop: 10, fontSize: 38 }}>Metas mensuales</div>
            <div style={{ fontSize: 28, fontWeight: 500 }}>podrían limitar la idea</div>
          </Card>
        </In>
        <In at={opt2} dy={30} style={{ left: 740, top: 300 }}>
          <Card w={540} accent>
            <CalendarIcon size={100} label="1 h" />
            <div style={{ marginTop: 10, fontSize: 38 }}>1 hora semanal protegida</div>
            <div style={{ fontSize: 28, fontWeight: 500 }}>podría favorecerla</div>
          </Card>
        </In>
      </div>
      <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - wipe}% 0 0)` }}>
        <In at={margin + 10} dy={25} style={{ left: 140, top: 150 }}>
          <Text size={46} weight={700}>
            Margen neto 2025
          </Text>
          <Big size={190}>−1,02 %</Big>
          <Text size={38} weight={500} color={C.pink}>
            disminución del margen neto
          </Text>
        </In>
        {/* línea sobria descendente, sin escala inventada */}
        <Draw d="M900 260 Q1050 300 1300 470" at={margin + 20} dur={24} color={C.pink} width={5} arrow />
      </div>
      <Strip text="Max Trailer no publica sus prácticas internas" start={sec(0.2)} end={opt1 - 2} style={{ left: 110, top: 860 }} fontSize={34} />
      <Source at={margin + 12}>EMIS (2026)</Source>
    </AbsoluteFill>
  );
};

export const S6_Condiciones: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(13.9)}>
      <Permiso />
    </Sequence>
    <Sequence from={sec(13.9)} durationInFrames={sec(17.4)}>
      <Hipotesis />
    </Sequence>
    <Chapter n="06" title="CONDICIONES" />
  </AbsoluteFill>
);
