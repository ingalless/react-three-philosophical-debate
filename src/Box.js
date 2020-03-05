import React, { useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TextureLoader, MeshBasicMaterial } from "three";
import box from "./box.jpg";

export default function Box(props) {
  const mesh = useRef();
  const texture = useLoader(TextureLoader, box);

  useLayoutEffect(() => {
    function start() {
      let isMoving = false;

      const moveCube = ({ movementX, movementY }) => {
        if (!isMoving) return
        mesh.current.rotation.x += movementY / 250;
        mesh.current.rotation.y += movementX / 250;
      };

      window.addEventListener("mousedown", e => {
        const { movementX, movementY } = e;
        isMoving = true;
        window.addEventListener("mousemove", moveCube);
        window.addEventListener("mouseup", () => {


          window.removeEventListener("mousemove", moveCube)
        })
        console.log(movementX, movementY);
      });
    }

    start()
  }, []);
  return (
    <mesh {...props} ref={mesh} scale={[1, 1, 1]}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" map={texture} metalness={0.5} />
    </mesh>
  );
}
