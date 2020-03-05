import React, { useRef } from "react";

export default function Floor(props) {
  const mesh = useRef();
  return (
    <mesh>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  );
}
