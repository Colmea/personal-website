import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import lerp from "lerp";
import Screen2 from './Screen-2';
import Me from './Me';
import useMousePosition from "../hooks/useMousePosition";
import usePageScroll from '../hooks/usePageScroll';


const BootScene = ({ cameraYOffset }) => {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.z = lerp(camera.position.z, 9, 0.05);
        camera.position.y = lerp(camera.position.y, 3 - cameraYOffset, 0.05);
        camera.updateProjectionMatrix();
        camera.lookAt(0, 3, 0);
    });

    return null;
}

export default function Header(props) {
    const mousePosition = useMousePosition();
    const { scrollTop } = usePageScroll();
    const [isCursorOnLink, setIsCursorOnLink] = useState(false);

    // COmpute new camera Y position following page scroll
    const newCameraYOffset = scrollTop ? scrollTop / 75 : 0;

    // Check if user hover a link (used to animate mini-me)
    useEffect(() => {
        const hoveredElement = document.elementFromPoint(mousePosition.x || 0, mousePosition.y || 0);
        setIsCursorOnLink(hoveredElement && hoveredElement.tagName === 'A');
    });

    return (    
        <Canvas colorManagement  camera={{ position: [0, 10, 30], fov: 50, near: 0.1, far: 100 }}>
            <pointLight color="orange" position={[3, 10, 5]} intensity={0.7} />
            <pointLight position={[10, 10, -10]} color="orange" intensity={0.2} />
            <pointLight position={[-10, -10, 10]} color="indianred" intensity={0.1} />
            <ambientLight />
            <Suspense fallback={null}>
                <BootScene cameraYOffset={newCameraYOffset} />
                <Screen2 mousePosition={mousePosition} position={[0, -0.2, 0]} scale={[2, 2, 2]}  />
                <Me
                    isCursorOnLink={isCursorOnLink}
                    mousePosition={mousePosition}
                    position={[-5, -1.4 , 0]}
                    scale={[.9, .9, .9]}
                    rotation={[0, THREE.MathUtils.degToRad(50), 0]}
                    />
            </Suspense>
        </Canvas>
    );
}