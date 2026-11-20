import { Easing, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// Poppins local (sans serif clara, titulares pesados).
export const fontFamily = "Poppins";
for (const w of ["500", "700", "800"]) {
  for (const sub of ["latin", "latin-ext"]) {
    loadFont({
      family: fontFamily,
      url: staticFile(`fonts/poppins-${sub}-${w}-normal.woff2`),
      weight: w,
    });
  }
}

// Paleta: azul marino de fondo (elegido por el cliente) + rojos/rosa del logo.
export const C = {
  navy: "#222a47",
  navyDeep: "#1a2139",
  navyGround: "#2c3b5a",
  navyLine: "#3b4b6e",
  cream: "#f3e6d3",
  creamDark: "#e2d2ba",
  red: "#d42a22",
  redDeep: "#7d1710",
  pink: "#ebb2b8",
  charcoal: "#1d1d1f",
  grey: "#9aa3b5",
  white: "#ffffff",
};

// Easy In / Easy Out suave, sin rebote.
export const easeInOut = Easing.bezier(0.45, 0, 0.2, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const FPS = 30;
