import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "react-three-fiber";
import Box from "./Box";

function Camera(props) {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  // Make the camera known to the system
  useEffect(() => setDefaultCamera(ref.current), [setDefaultCamera]);
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
}

function App() {
  const [scroll, setScroll] = useState(10);
  const zoom = e => {
    e.persist();
    setScroll(prev => prev + e.deltaY / 150);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>CultureGo is not your friend</h1>
      <Canvas style={{ height: "90vh", width: "100vw" }} onWheel={zoom}>
        <Camera position={[0, 0, scroll]} />
        <ambientLight />
        <pointLight position={[16, 7, 5]} />

        <Suspense fallback="loading...">
          <Box position={[0, 0, 0]} />
          <Box position={[1.5, 0, 0]} />
          <Box position={[0, 1.5, 0]} />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
