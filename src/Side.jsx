import { Environment, MeshPortalMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) {
    const shape = useRef()
    const { nodes } = useGLTF('/aobox-transformed.glb')

    useFrame((state, delta) => {
        shape.current.rotation.x = shape.current.rotation.y += delta
    })

    return (
        <MeshPortalMaterial worldUnits={false} attach={`material-${index}`}>

            {/* Everything here is inside the portal and isolated from the canvas */}
            <ambientLight intensity={0.5} />
            <Environment preset="city" />

            {/** A box with baked AO */}
            <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
                <meshStandardMaterial
                    aoMapIntensity={1}
                    aoMap={nodes.Cube.material.aoMap}
                    color={bg} />
                <spotLight castShadow color={bg} intensity={2} position={[10, 10, 10]} angle={0.15}  shadow-normalBias={0.05} shadow-bias={0.0001} />

            </mesh>

            {/* The Shape */}
            <mesh castShadow receiveShadow ref={shape}>
                {children}
                <meshLambertMaterial color={bg} />
            </mesh>
        </MeshPortalMaterial>

    )
}