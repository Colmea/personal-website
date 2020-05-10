import React, { PureComponent, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import * as THREE from 'three';
import PostProcessing from './PostProcessing';

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

    return (
        <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

export default class TestComponent extends PureComponent {
    render() {
        return (
            <div style={{ padding: 10, width: '100%', height: 400, borderRadius: 2, backgroundColor: '#EEE' }}>
                <Canvas>
                    <ambientLight intensity={1.1} />
                    <pointLight position={[100, 100, 100]} intensity={2.2} />
                    <pointLight position={[-100, -100, -100]} intensity={5} color="red" />
                    <Box position={[-1.2, 0, 0]} />
                    <Box position={[1.2, 0, 0]} />
                    <Suspense fallback={null}>
                        <PostProcessing />
                    </Suspense>
                </Canvas>
            </div>
        );
    }
}