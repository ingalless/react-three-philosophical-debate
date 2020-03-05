import React from "react";
import { Canvas } from "react-three-fiber";
import OurScene from "./OurScene";
import { CameraProvider } from "./CameraProvider";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>CultureGo is not your friend</h1>
      <Canvas style={{ height: "90vh", width: "100vw" }}>
        <CameraProvider>
          <OurScene />
        </CameraProvider>
      </Canvas>
    </>
  );
}

export default App;
