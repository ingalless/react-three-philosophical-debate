import React, { useRef, useState, FC } from 'react'
import { useFrame, useLoader, PointerEvent, ReactThreeFiber } from 'react-three-fiber'
import { TextureLoader, Mesh } from 'three'
import { useOrbitControls } from '../../providers/OrbitControlsProvider'
import box from '../../assets/images/box.jpg'
import { useSpring, a } from 'react-spring/three'

interface State {
	x: number
	y: number
	isMoving: boolean
}

interface BoxProps {
	position: ReactThreeFiber.Vector3
}

const Box: FC<BoxProps> = props => {
	const [state, setState] = useState<State>({ x: 0, y: 0, isMoving: false })
	const [active, setActive] = useState(false)
	const scaleProps = useSpring({ scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1] })
	const controls = useOrbitControls()
	const mesh = useRef<Mesh>()
	const texture = useLoader(TextureLoader, box)
	const lastKnownMovement = { x: 0, y: 0 }
	const scaleFactor = 250

	const moveCube = (e: MouseEvent) => {
		mesh.current.rotation.x += e.movementY / scaleFactor
		mesh.current.rotation.y += e.movementX / scaleFactor
		lastKnownMovement.x = e.movementX
		lastKnownMovement.y = e.movementY
	}

	console.log('rerendered')

	useFrame(() => {
		const currentState = state
		if (state.isMoving) {
			mesh.current.rotation.x += currentState.y /= 1.1
			mesh.current.rotation.y += currentState.x /= 1.1

			if (Math.abs(currentState.x) + Math.abs(currentState.y) < 0) {
				setState({ x: 0, y: 0, isMoving: false })
			}
		}
	})

	const mouseUp = () => {
		setState({
			x: lastKnownMovement.x / scaleFactor,
			y: lastKnownMovement.y / scaleFactor,
			isMoving: true
		})

		controls.enableRotate = true

		window.removeEventListener('mousemove', moveCube)
		window.removeEventListener('mouseup', mouseUp)
	}

	const mouseDown = (e: PointerEvent) => {
		if (e.button !== 0) return

		controls.enableRotate = false

		window.addEventListener('mousemove', moveCube)
		window.addEventListener('mouseup', mouseUp)
	}

	return (
		<a.mesh ref={mesh} onClick={() => setActive(!active)} position={props.position} scale={scaleProps.scale} onPointerDown={mouseDown}>
			<boxGeometry attach='geometry' args={[1, 1, 1]} />
			<meshStandardMaterial attach='material' map={texture} />
		</a.mesh>
	)
}

export default Box
