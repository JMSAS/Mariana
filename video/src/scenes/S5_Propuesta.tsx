import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Card, Draw, In, PhotoCard, sec, Source, Stamp, Text } from "../components/Anim";
import { Background, Strip } from "../components/Base";
import { BoxIcon, CalendarIcon, ChatBubble, VanIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 2:20–2:35 · Max Ruta: imagen del cliente + eje con 4 módulos. */
const MaxRuta: React.FC = () => {
  const f = useCurrentFrame();
  const eje = sec(5.5); // "Vende kits de mantenimiento…"
  const imgOut = interpolate(f, [eje - 8, eje + 6], [1, 0], { ...clamp, easing: easeInOut });
  const zoom = interpolate(f, [eje, sec(15)], [1, 1.02], { ...clamp, easing: easeInOut });
  const mods = ["Kits", "Hoja de vida", "Avisos", "Despacho"];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {f < eje + 8 ? (
        <In at={0} dy={0} scaleFrom={0.97} style={{ left: 60, top: 50, opacity: imgOut }}>
          <Img
            src={staticFile("max_ruta_kit_concepto.webp")}
            style={{ width: 1290, display: "block", boxShadow: "0 14px 40px rgba(0,0,0,0.4)" }}
          />
        </In>
      ) : null}
      {f >= eje - 4 ? (
        <>
          <In at={eje} mask="left" dy={0} dx={-30} style={{ left: 110, top: 80 }}>
            <div style={{ background: C.red, padding: "10px 30px", boxShadow: "0 8px 0 rgba(0,0,0,0.25)" }}>
              <Text size={70} weight={800}>
                MAX RUTA
              </Text>
            </div>
          </In>
          <In at={eje + 10} dy={10} style={{ left: 560, top: 108 }}>
            <Stamp size={24}>PROPUESTA ACADÉMICA · NO ES UN SERVICIO ACTUAL</Stamp>
          </In>
          <In at={eje + 4} dy={20} style={{ left: 420, top: 250 }}>
            <div style={{ scale: zoom }}>
              <Img src={staticFile("eje.png")} style={{ width: 520 }} />
            </div>
          </In>
          {mods.map((m, i) => (
            <In
              key={m}
              at={eje + sec(1.5) + i * sec(2)}
              mask="left"
              dx={i % 2 ? 40 : -40}
              dy={0}
              style={{ left: i % 2 ? 990 : 110, top: i < 2 ? 300 : 520 }}
            >
              <Card w={300} accent={i === 0} style={{ fontSize: 34, textAlign: "center" }}>
                {m}
              </Card>
            </In>
          ))}
        </>
      ) : null}
      <Strip text="unidad interna de intraemprendimiento" start={sec(1.8)} end={eje - 6} style={{ left: 110, top: 860 }} fontSize={34} />
      <Strip text="piezas que se cambian juntas" start={eje + sec(2)} end={sec(14.6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:35–2:47 · flujo: piezas → ficha → aviso → kit y despacho. */
const Flujo: React.FC = () => {
  const step = (i: number) => 6 + i * sec(2.6);
  const xs = [110, 430, 750, 1040];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <In at={step(0)} dx={-40} dy={0} style={{ left: xs[0], top: 230 }}>
        <div style={{ position: "relative", width: 260, height: 300 }}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <PhotoCard src="rodamiento.webp" w={200} h={170} rotate={-3} />
          </div>
          <div style={{ position: "absolute", left: 80, top: 140 }}>
            <PhotoCard src="retenedor.jpg" w={170} h={140} rotate={3} />
          </div>
        </div>
      </In>
      <In at={step(1)} dx={-40} dy={0} style={{ left: xs[1], top: 240 }}>
        <Card w={260} style={{ fontSize: 22, fontWeight: 500 }}>
          <div style={{ fontWeight: 800, fontSize: 26, color: C.red }}>Hoja de vida</div>
          <div style={{ marginTop: 8 }}>Vehículo: tractocamión</div>
          <div>Última revisión: fecha</div>
          <div>Kilometraje: km</div>
          <div style={{ marginTop: 10 }}>
            <CalendarIcon size={60} />
          </div>
        </Card>
      </In>
      <In at={step(2)} dx={-40} dy={0} style={{ left: xs[2], top: 250 }}>
        <div style={{ textAlign: "center" }}>
          <ChatBubble size={200} />
          <Text size={28} weight={700}>
            aviso antes del viaje
          </Text>
        </div>
      </In>
      <In at={step(3)} dx={-40} dy={0} style={{ left: xs[3], top: 230 }}>
        <div style={{ textAlign: "center" }}>
          <BoxIcon size={150} />
          <VanIcon size={90} />
          <Text size={28} weight={700}>
            kit + despacho
          </Text>
        </div>
      </In>
      {[0, 1, 2].map((i) => (
        <Draw key={i} d={`M${xs[i] + 270} 380 L${xs[i + 1] - 15} 380`} at={step(i + 1) - 8} dur={12} arrow width={5} />
      ))}
      <In at={step(2) + 10} dy={10} style={{ left: 760, top: 520 }}>
        <Text size={22} weight={500} style={{ opacity: 0.8 }}>
          (ícono simbólico, no es una captura real)
        </Text>
      </In>
      <Strip text="hoja de vida por WhatsApp" start={step(1)} end={sec(11.6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:47–3:00 · efectuación: lo que ya existe → piloto. */
const Efectuacion: React.FC = () => {
  const f = useCurrentFrame();
  const merge = sec(8.5); // "Y con una pérdida asumible…"
  const squeeze = interpolate(f, [merge, merge + 16], [1, 0], { ...clamp, easing: easeInOut });
  const cols = [
    { q: "¿Quiénes somos?", a: "Ventas · Bodega · Despacho" },
    { q: "¿Qué sabemos?", a: "Repuestos y marcas" },
    { q: "¿A quién conocemos?", a: "Transportadores que ya escriben por WhatsApp" },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <div style={{ position: "absolute", inset: 0, scale: `${0.4 + 0.6 * squeeze} 1`, opacity: squeeze, transformOrigin: "710px 400px" }}>
        {cols.map((c, i) => (
          <In key={c.q} at={sec(1.5) + i * sec(2)} dy={30} style={{ left: 110 + i * 410, top: 170 }}>
            <Card w={380} style={{ height: 380 }}>
              <div style={{ color: C.red, fontSize: 34, fontWeight: 800 }}>{c.q}</div>
              <div style={{ marginTop: 20, fontSize: 30, fontWeight: 500 }}>{c.a}</div>
            </Card>
          </In>
        ))}
      </div>
      <In at={merge + 10} dy={30} style={{ left: 260, top: 200 }}>
        <Card w={900} style={{ textAlign: "center", padding: "36px 40px" }}>
          <div style={{ fontSize: 30, color: C.red, fontWeight: 800 }}>PILOTO · PÉRDIDA ASUMIBLE</div>
          <div style={{ fontSize: 58, fontWeight: 800, marginTop: 10 }}>3 clientes · 8 semanas</div>
          <div style={{ fontSize: 34, fontWeight: 500, marginTop: 6 }}>sin software nuevo</div>
        </Card>
      </In>
      <Strip text="parte de lo que ya existe" start={6} end={merge - 4} style={{ left: 110, top: 840 }} fontSize={40} />
      <Source at={sec(1)}>Sarasvathy (2001), efectuación</Source>
    </AbsoluteFill>
  );
};

export const S5_Propuesta: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(15)}>
      <MaxRuta />
    </Sequence>
    <Sequence from={sec(15)} durationInFrames={sec(12)}>
      <Flujo />
    </Sequence>
    <Sequence from={sec(27)} durationInFrames={sec(13)}>
      <Efectuacion />
    </Sequence>
  </AbsoluteFill>
);
