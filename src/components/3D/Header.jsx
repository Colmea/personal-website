import React, { Suspense, useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { HTML } from "drei";
import lerp from "lerp";

import Screen from './Screen';
import "./Header.style.css";


function Dodecahedron({ title, ...props }) {
    return (
      <mesh {...props}>
        <dodecahedronBufferGeometry attach="geometry" />
        <meshStandardMaterial attach="material" roughness={0.75} emissive="#404057" />
        <HTML scaleFactor={10}>
          <div className="content">
            {title}
          </div>
        </HTML>
      </mesh>
    )
  }
  
  function Content() {
    const ref = useRef()
    useFrame((state, delta) => {
        ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta * 0.2
    });

    return (
      <group ref={ref}>
        <Dodecahedron title="Javascript" position={[0, 0, -5]} />
        <Dodecahedron title="React.js" position={[-4, -1, 3]} />
        <Dodecahedron title="Three.js" position={[6, 0, -4]} />
      </group>
    )
  }
  
const Startup = () => {
    const { camera } = useThree();
    const ref = useRef();

    useFrame(() => {
        camera.position.z = lerp(camera.position.z, 10, 0.1);
        camera.position.y = lerp(camera.position.y, 4, 0.1);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 2, 0);
    })

    return null;
}

export default function Header(props) {
    return (
        <Canvas  camera={{ position: [0, 30, 30], fov: 50, near: 0.1, far: 100 }}>
            <pointLight color="indianred" position={[0, 0, 30]} />
            <pointLight position={[10, 10, -10]} color="orange" />
            <pointLight position={[-10, -10, 10]} color="lightblue" />
            <Suspense fallback={null}>
                <Startup />
                <Content />
                <Screen position={[0, -0.2, 0]} scale={[10, 10, 10]} />
            </Suspense>
        </Canvas>
    );
}