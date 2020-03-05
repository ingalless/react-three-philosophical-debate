import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import { useCamera } from "./CameraProvider";
import box from "./box.jpg";

export default function Box(props) {
  const controls = useCamera();
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

  const maxScale = 2;
  const minScale = 0.5;
  useFrame(() => {
    console.log(mesh.current.scale);
    if (mesh.current.scale.x < maxScale) {
      const increaseScale = mesh.current.scale.x + 0.1;
      mesh.current.scale.x = increaseScale;
      mesh.current.scale.y = increaseScale;
      mesh.current.scale.z = increaseScale;
    } else if (mesh.current.scale.x > minScale) {
      const decreaseScale = mesh.current.scale.x - 0.1;
      mesh.current.scale.x = decreaseScale;
      mesh.current.scale.y = decreaseScale;
      mesh.current.scale.z = decreaseScale;
    }
    const currentState = state;
    if (state.isMoving) {
      mesh.current.rotation.x += currentState.y /= 1.1;
      mesh.current.rotation.y += currentState.x /= 1.1;

      if (Math.abs(currentState.x) + Math.abs(currentState.y) < 0) {
        setState({ x: 0, y: 0, isMoving: false });
      }
    }
  });

  const mouseUp = e => {
    setState({
      x: lastKnownMovement.x / scaleFactor,
      y: lastKnownMovement.y / scaleFactor,
      isMoving: true
    });
    controls.enableRotate = true;

    window.removeEventListener("mousemove", moveCube);
    window.removeEventListener("mouseup", mouseUp);
  };

  const mouseDown = e => {
    if (e.button !== 0) return;
    controls.enableRotate = false;

    window.addEventListener("mousemove", moveCube);
    window.addEventListener("mouseup", mouseUp);
  };

  return (
    <mesh {...props} ref={mesh} onPointerDown={mouseDown}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
}
