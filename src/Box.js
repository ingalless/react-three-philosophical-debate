import React, { useRef, useLayoutEffect, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import box from "./box.jpg";

export default function Box(props) {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, box);
  const lastKnownMovement = { x: 0, y: 0 };
  const scaleFactor = 250;

  const moveCube = ({ movementX, movementY }) => {
    mesh.current.rotation.x += movementY / scaleFactor;
    mesh.current.rotation.y += movementX / scaleFactor;
    lastKnownMovement.x = movementX;
    lastKnownMovement.y = movementY;
  };
  const [state, setState] = useState({ x: 0, y: 0, isMoving: false });

  useFrame(() => {
    const currentState = state;
    if (state.isMoving) {
      mesh.current.rotation.x += currentState.y /= 1.1;
      mesh.current.rotation.y += currentState.x /= 1.1;

      if (Math.abs(currentState.x) + Math.abs(currentState.y) < 0) {
        setState({ ...currentState, isMoving: false });
      }
    }
  });

  const mouseUp = e => {
    setState({
      x: lastKnownMovement.x / scaleFactor,
      y: lastKnownMovement.y / scaleFactor,
      isMoving: true
    });
    window.removeEventListener("mousemove", moveCube);
  };

  const mouseDown = e => {
    window.addEventListener("mousemove", moveCube);
    window.addEventListener("mouseup", mouseUp);
  };

  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]} onPointerDown={mouseDown}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
}
