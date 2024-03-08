import './style.css'
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'
import Experience from './Experience'

const root = createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        shadows
        camera={{
            position: [-3, 0.5, 3]
        }}>
        <Experience />
    </Canvas>
)