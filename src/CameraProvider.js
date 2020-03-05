import React, { useContext, createContext, useEffect } from "react";
import { useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraProvider = props => {
  const { gl, camera } = useThree();

  const controls = new OrbitControls(camera, gl.domElement);
  controls.minDistance = 3;
  controls.maxDistance = 10;
  console.log(controls);
  return <Camera.Provider value={controls} {...props} />;
};

const Camera = createContext(null);
const useCamera = () => useContext(Camera);

export { useCamera, CameraProvider };
