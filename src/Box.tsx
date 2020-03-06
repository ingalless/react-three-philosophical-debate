import React, { useRef, useState, useMemo, FC } from 'react'
import {
	useFrame,
	useLoader,
	PointerEvent,
	ReactThreeFiber
} from 'react-three-fiber'
import { TextureLoader, Mesh } from 'three'
import { useOrbitControls } from './OrbitControlsProvider'
import box from './box.jpg'

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

	const boxScaling = useMemo(
		() =>
			(function() {
				let _increase = true
				const _max = 1.2
				const _min = 0.8

				const _alterBoxSize = (factor: number) => {
					const newScaleFactor = mesh.current.scale.x + factor
					mesh.current.scale.x = newScaleFactor
					mesh.current.scale.y = newScaleFactor
					mesh.current.scale.z = newScaleFactor
				}

				const _increaseBoxSize = _alterBoxSize
				const _decreaseBoxSize = (factor: number) =>
					_alterBoxSize(-factor)
				const _startDecreasing = () => (_increase = false)
				const _startIncreasing = () => (_increase = true)

				const checkIncreasing = () => {
					if (_increase) {
						_increaseBoxSize(0.01)
						if (mesh.current.scale.x > _max) _startDecreasing()
					} else {
						_decreaseBoxSize(0.01)
						if (mesh.current.scale.x < _min) _startIncreasing()
					}
				}

				return {
					checkIncreasing
				}
			})(),
		[]
	)

	useFrame(() => {
		boxScaling.checkIncreasing()

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
		<mesh position={props.position} ref={mesh} onPointerDown={mouseDown}>
			<boxGeometry attach='geometry' args={[1, 1, 1]} />
			<meshStandardMaterial attach='material' map={texture} />
		</mesh>
	)
}

export default Box
