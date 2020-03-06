import React, { FC } from 'react'
import { Canvas } from 'react-three-fiber'
import OurScene from './OurScene'
import { OrbitControlsProvider } from './OrbitControlsProvider'

const App: FC = () => {
	return (
		<>
			<h1 style={{ textAlign: 'center' }}>
				CultureGo is not your friend
			</h1>
			<Canvas style={{ height: '90vh', width: '100vw' }}>
				<OrbitControlsProvider>
					<OurScene />
				</OrbitControlsProvider>
			</Canvas>
		</>
	)
}

export default App
