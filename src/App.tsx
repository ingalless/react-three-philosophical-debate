import React, { FC } from 'react'
import { Canvas, CanvasContext } from 'react-three-fiber'
import OurScene from './components/Scene'
import { OrbitControlsProvider } from './providers/OrbitControlsProvider'
import * as THREE from 'three'

const App: FC = () => {
	const onCreated = ({ gl }: CanvasContext) => {
		gl.shadowMap.enabled = true
		gl.shadowMap.type = THREE.PCFSoftShadowMap
	}
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>CultureGo is not your friend</h1>
			<Canvas style={{ height: '90vh', width: '100vw' }} onCreated={onCreated}>
				<OrbitControlsProvider>
					<OurScene />
				</OrbitControlsProvider>
			</Canvas>
		</>
	)
}

export default App
