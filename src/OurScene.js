import React, { Suspense, useEffect } from "react";
import { useThree } from "react-three-fiber";
import Box from "./Box";

export default function OurScene(props) {
  return (
    <scene>
      <ambientLight />

      <pointLight position={[16, 7, 5]} />
      <Suspense fallback="loading...">
        <Box position={[0, 0, 0]} />
        <Box position={[0, 0.5, 1.5]} />
        <Box position={[1.5, 0, 0]} />
      </Suspense>
    </scene>
  );
}
