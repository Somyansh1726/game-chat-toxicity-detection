import { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const DitherBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={<div className="w-full h-full bg-background" />}>
        <Dithering
          style={{ width: "100%", height: "100%" }}
          colorBack="#0a0f1e"
          colorFront="#1a2742"
          speed={0.3}
        />
      </Suspense>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-background/40" />
    </div>
  );
};

export default DitherBackground;
