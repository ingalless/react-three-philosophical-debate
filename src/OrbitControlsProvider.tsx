import React, { useContext, createContext } from 'react'
import { useThree } from 'react-three-fiber'
import { OrbitControls as Controls } from 'three/examples/jsm/controls/OrbitControls'

const OrbitControlsProvider = (props: any) => {
	const { gl, camera } = useThree()
	const controls = new Controls(camera, gl.domElement) // Aliased class @ line 3
	controls.minDistance = 3
	controls.maxDistance = 10
	return <OrbitControls.Provider value={controls} {...props} />
}

const OrbitControls = createContext(null)
const useOrbitControls = () => useContext(OrbitControls)

export { useOrbitControls, OrbitControlsProvider }
