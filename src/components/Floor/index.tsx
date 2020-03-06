import React, { FC } from 'react'

const Floor: FC = () => {
	return (
		<mesh>
			<planeGeometry attach='geometry' args={[10, 10]} />
			<meshStandardMaterial attach='material' color='green' />
		</mesh>
	)
}
export default Floor
