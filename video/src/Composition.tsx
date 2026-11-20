import { Composition } from "remotion";
import { Main, TOTAL } from "./Main";
import { Noche } from "./scenes/Apertura";
import { FPS } from "./theme";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="MaxTrailer"
        component={Main}
        durationInFrames={TOTAL * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="PruebaApertura"
        component={Noche}
        durationInFrames={345}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
