import { Composition } from "remotion";
import { Apertura } from "./scenes/Apertura";
import { FPS } from "./theme";

export const MyComposition = () => {
  return (
    <>
      <Composition
        id="PruebaApertura"
        component={Apertura}
        durationInFrames={345}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
