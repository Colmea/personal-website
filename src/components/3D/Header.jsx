import React, { Suspense } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import lerp from "lerp";
import Screen2 from './Screen-2';

const BootScene = () => {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.z = lerp(camera.position.z, 9, 0.05);
        camera.position.y = lerp(camera.position.y, 3, 0.05);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 3, 0);
    })

    return null;
}

export default function Header(props) {
    return (
        <Canvas colorManagement  camera={{ position: [0, 10, 20], fov: 50, near: 0.1, far: 100 }}>
            <pointLight color="lightblue" position={[0, 5, 10]} intensity={4} />
            <pointLight position={[10, 10, -10]} color="orange" intensity={4} />
            <pointLight position={[-10, -10, 10]} color="indianred" intensity={3} />
            <ambientLight />
            <Suspense fallback={null}>
                <BootScene />
                <Screen2 position={[0, -0.2, 0]} scale={[2, 2, 2]}  />
            </Suspense>
        </Canvas>
    );
}