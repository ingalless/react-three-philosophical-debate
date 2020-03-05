import React, { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import { useCamera } from "./CameraProvider";
import box from "./box.jpg";

export default function Box(props) {
  const [state, setState] = useState({ x: 0, y: 0, isMoving: false });
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

  console.log("rerendered");

  const boxScaling = useMemo(() =>
    (function() {
      let _increase = true;
      const _max = 1.2;
      const _min = 0.8;

      const _alterBoxSize = factor => {
        const newScaleFactor = mesh.current.scale.x + factor;
        mesh.current.scale.x = newScaleFactor;
        mesh.current.scale.y = newScaleFactor;
        mesh.current.scale.z = newScaleFactor;
      };

      const increaseBoxSize = _alterBoxSize;
      const decreaseBoxSize = factor => _alterBoxSize(-factor);
      const stopIncreasing = () => (_increase = false);
      const startIncreasing = () => (_increase = true);

      const checkIncreasing = () => {
        if (_increase) {
          increaseBoxSize(0.01);
          if (mesh.current.scale.x > _max) stopIncreasing();
        } else {
          decreaseBoxSize(0.01);
          if (mesh.current.scale.x < _min) startIncreasing();
        }
      };

      return {
        checkIncreasing
      };
    })()
  );

  useFrame(() => {
    boxScaling.checkIncreasing();

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
