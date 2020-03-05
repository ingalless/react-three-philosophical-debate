import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import Box from "./Box";

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight />
      <pointLight position={[16, 7, 5]} />
      <perspectiveCamera fov={75} aspect={2} near={0.1} far={5} />
      <Suspense fallback="loading..."><Box position={[0, 0, 0]} /></Suspense>
    </Canvas>
  );
}

export default App;
