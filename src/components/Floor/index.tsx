import React, { FC, useRef, useEffect } from 'react'
import { Mesh, DoubleSide } from 'three'

const Floor: FC = () => {
	const mesh = useRef<Mesh>()
	useEffect(() => {
		if (mesh) {
			mesh.current.rotation.x = Math.PI / 2
		}
	}, [])
	return (
		<mesh position={[0, -1, 0]} ref={mesh}>
			<planeGeometry attach='geometry' args={[10, 10, 0]} />
			<meshStandardMaterial side={DoubleSide} attach='material' color='green' />
		</mesh>
	)
}
export default Floor
