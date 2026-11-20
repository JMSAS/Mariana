import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Card, Chapter, Cutout, Draw, In, sec, Source, Stamp, Text } from "../components/Anim";
import { Background, Spotlight, Strip } from "../components/Base";
import { BoxIcon, CalendarIcon, ChatBubble, PersonIcon, TruckIcon, VanIcon, WarehouseIcon } from "../components/Icons";
import { C, clamp, easeInOut } from "../theme";

/** 1:45–1:56 · Max Ruta: imagen del cliente → eje con 4 módulos. */
const MaxRuta: React.FC = () => {
  const f = useCurrentFrame();
  const eje = sec(5.1); // "Vende kits de mantenimiento…"
  const imgOut = interpolate(f, [eje - 8, eje + 6], [1, 0], { ...clamp, easing: easeInOut });
  const zoom = interpolate(f, [0, eje], [1, 1.03], { ...clamp, easing: easeInOut });
  const ejeZoom = interpolate(f, [eje, sec(11)], [1, 1.02], { ...clamp, easing: easeInOut });
  const mods = [
    { t: "Kits", x: 110, y: 250 },
    { t: "Hoja de vida", x: 1010, y: 250 },
    { t: "Avisos", x: 110, y: 520 },
    { t: "Despacho", x: 1010, y: 520 },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      {f < eje + 8 ? (
        <div style={{ position: "absolute", left: 50, top: 40, opacity: imgOut }}>
          <In at={0} dy={0} scaleFrom={0.96}>
            <Img
              src={staticFile("max_ruta_kit_concepto.webp")}
              style={{ width: 1300, display: "block", scale: zoom, boxShadow: "0 14px 40px rgba(0,0,0,0.4)" }}
            />
          </In>
        </div>
      ) : null}
      {f >= eje - 4 ? (
        <>
          <Spotlight x={720} width={1000} opacity={0.7} height={900} />
          <In at={eje} mask="left" dy={0} dx={-30} style={{ left: 110, top: 70 }}>
            <div style={{ background: C.red, padding: "10px 30px", boxShadow: "0 8px 0 rgba(0,0,0,0.25)" }}>
              <Text size={70} weight={800}>
                MAX RUTA
              </Text>
            </div>
          </In>
          <In at={eje + 10} dy={10} style={{ left: 560, top: 98 }}>
            <Stamp size={24}>PROPUESTA ACADÉMICA · NO ES UN SERVICIO ACTUAL</Stamp>
          </In>
          <In at={eje + 4} dy={20} style={{ left: 430, top: 230 }}>
            <div style={{ scale: ejeZoom }}>
              <Cutout src="eje.png" w={560} />
            </div>
          </In>
          {mods.map((m, i) => (
            <React.Fragment key={m.t}>
              <Draw
                d={`M${m.x < 500 ? m.x + 320 : m.x - 10} ${m.y + 40} L${m.x < 500 ? 560 : 860} ${m.y < 400 ? 380 : 500}`}
                at={eje + sec(0.9) + i * 18 + 6}
                dur={12}
                color={C.cream}
                width={3}
              />
              <In at={eje + sec(0.9) + i * 18} mask="left" dx={i % 2 ? 40 : -40} dy={0} style={{ left: m.x, top: m.y }}>
                <Card w={320} accent={i === 0} style={{ fontSize: 36, textAlign: "center" }}>
                  {m.t}
                </Card>
              </In>
            </React.Fragment>
          ))}
        </>
      ) : null}
      <Strip text="unidad interna de intraemprendimiento" start={sec(2.6)} end={eje - 6} style={{ left: 110, top: 850 }} fontSize={40} />
      <Strip text="piezas que se cambian juntas" start={sec(8.2)} end={sec(10.8)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 1:56–2:02 · flujo: piezas → hoja de vida → aviso → kit y despacho. */
const Flujo: React.FC = () => {
  const steps = [0, sec(0.6), sec(2.3), sec(4.3)];
  const xs = [110, 450, 790, 1080];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={710} width={1500} opacity={0.4} height={900} />
      <In at={steps[0]} dx={-40} dy={0} style={{ left: xs[0], top: 200 }}>
        <div style={{ position: "relative", width: 290, height: 330 }}>
          <div style={{ position: "absolute", left: 0, top: 0 }}>
            <Cutout src="rodamiento.png" w={210} rotate={-4} />
          </div>
          <div style={{ position: "absolute", left: 110, top: 170 }}>
            <Cutout src="retenedor.png" w={150} rotate={4} />
          </div>
        </div>
      </In>
      <In at={steps[1]} dx={-40} dy={0} style={{ left: xs[1], top: 220 }}>
        <Card w={280} style={{ fontSize: 22, fontWeight: 500 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 28, color: C.red }}>Hoja de vida</div>
            <CalendarIcon size={50} />
          </div>
          <div style={{ marginTop: 8 }}>Vehículo: tractocamión</div>
          <div>Última revisión: fecha</div>
          <div>Kilometraje: km</div>
          <div>Próximo cambio: rodamientos</div>
        </Card>
      </In>
      <In at={steps[2]} dx={-40} dy={0} style={{ left: xs[2], top: 220 }}>
        <div style={{ textAlign: "center", width: 230 }}>
          <ChatBubble size={200} />
          <Text size={28} weight={700}>
            aviso antes del viaje
          </Text>
        </div>
      </In>
      <In at={steps[3]} dx={-40} dy={0} style={{ left: xs[3], top: 200 }}>
        <div style={{ textAlign: "center", width: 250 }}>
          <BoxIcon size={150} />
          <VanIcon size={90} />
          <Text size={28} weight={700}>
            kit + despacho
          </Text>
        </div>
      </In>
      {[0, 1, 2].map((i) => (
        <Draw key={i} d={`M${xs[i] + 300} 380 L${xs[i + 1] - 15} 380`} at={steps[i + 1] - 8} dur={10} arrow width={5} />
      ))}
      <In at={steps[2] + 10} dy={10} style={{ left: 790, top: 560 }}>
        <Text size={22} weight={500} style={{ opacity: 0.8 }}>
          (ícono simbólico, no es una captura real)
        </Text>
      </In>
      <Strip text="hoja de vida por WhatsApp" start={steps[1]} end={sec(6)} style={{ left: 110, top: 840 }} fontSize={40} />
    </AbsoluteFill>
  );
};

/** 2:02–2:22 · efectuación: lo que ya existe → piloto. */
const Efectuacion: React.FC = () => {
  const f = useCurrentFrame();
  const merge = sec(14.5); // "…y con una pérdida asumible"
  const squeeze = interpolate(f, [merge, merge + 16], [1, 0], { ...clamp, easing: easeInOut });
  const cols = [
    { at: sec(4.5), q: "¿Quiénes somos?", a: "Ventas · Bodega · Despacho", icon: <WarehouseIcon size={80} color={C.charcoal} /> },
    { at: sec(7.2), q: "¿Qué sabemos?", a: "Repuestos y marcas", icon: <Cutout src="rodamiento.png" w={110} style={{ filter: "none" }} /> },
    {
      at: sec(10.1),
      q: "¿A quién conocemos?",
      a: "Transportadores que ya escriben por WhatsApp",
      icon: (
        <div style={{ display: "flex", gap: 6 }}>
          <PersonIcon size={60} color={C.charcoal} />
          <TruckIcon size={50} color={C.charcoal} />
        </div>
      ),
    },
  ];
  return (
    <AbsoluteFill>
      <Background ground={0.86} />
      <Spotlight x={710} width={1500} opacity={0.4} height={900} />
      <In at={sec(0.4)} mask="left" dy={0} dx={-30} style={{ left: 110, top: 80 }}>
        <Text size={50} weight={800}>
          No parte de lo que falta, sino de lo que ya existe
        </Text>
      </In>
      <div style={{ position: "absolute", inset: 0, scale: `${0.4 + 0.6 * squeeze} 1`, opacity: squeeze, transformOrigin: "710px 450px" }}>
        {cols.map((c, i) => (
          <In key={c.q} at={c.at} dy={30} style={{ left: 110 + i * 410, top: 200 }}>
            <Card w={380} style={{ height: 420, boxSizing: "border-box" }}>
              <div style={{ height: 120, display: "flex", alignItems: "center" }}>{c.icon}</div>
              <div style={{ color: C.red, fontSize: 34, fontWeight: 800 }}>{c.q}</div>
              <div style={{ marginTop: 16, fontSize: 28, fontWeight: 500 }}>{c.a}</div>
            </Card>
          </In>
        ))}
      </div>
      <In at={merge + 10} dy={30} style={{ left: 230, top: 230 }}>
        <Card w={960} style={{ textAlign: "center", padding: "40px 40px" }}>
          <div style={{ fontSize: 30, color: C.red, fontWeight: 800 }}>PILOTO · PÉRDIDA ASUMIBLE</div>
          <div style={{ fontSize: 66, fontWeight: 800, marginTop: 10 }}>3 clientes · 8 semanas</div>
          <div style={{ fontSize: 36, fontWeight: 500, marginTop: 6 }}>sin software nuevo</div>
        </Card>
      </In>
      <Source at={sec(3.2)}>Sarasvathy (2001), efectuación</Source>
    </AbsoluteFill>
  );
};

export const S5_Propuesta: React.FC = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={sec(11)}>
      <MaxRuta />
    </Sequence>
    <Sequence from={sec(11)} durationInFrames={sec(6.2)}>
      <Flujo />
    </Sequence>
    <Sequence from={sec(17.2)} durationInFrames={sec(19.7)}>
      <Efectuacion />
    </Sequence>
    <Sequence from={sec(5)}>
      <Chapter n="05" title="LA PROPUESTA" />
    </Sequence>
  </AbsoluteFill>
);
