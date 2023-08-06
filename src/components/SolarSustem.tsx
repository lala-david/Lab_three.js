import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Mesh, TextureLoader, EllipseCurve, BufferGeometry, Vector3, Line, LineBasicMaterial, Group } from 'three';
import sunTexture from '../auth/img/sun.jpg';
import mercuryTexture from '../auth/img/mercury.jpg';
import venusTexture from '../auth/img/venus.jpg';
import earthTexture from '../auth/img/earth.jpg';
import marsTexture from '../auth/img/mars.jpg';

type PlanetProps = {
  name: string;
  radius: number;
  distance: number;
  color: string;
  speed: number;
  rotateSpeed: number;
  texture?: string;
};

const planetsInfo: PlanetProps[] = [
  {
    name: "Sun",
    radius: 2,
    distance: 0,
    color: "#ffd700",
    speed: 0,
    rotateSpeed: 0.002,
    texture: sunTexture,
  },
  {
    name: "Mercury",
    radius: 0.2,
    distance: 6,
    color: "#cd7f32",
    speed: 0.1,
    rotateSpeed: 0.25,
    texture: mercuryTexture,
},
{
    name: "Venus",
    radius: 0.4,
    distance: 11,
    color: "#f2aa61",
    speed: 0.09,
    rotateSpeed: 0.25,
    texture: venusTexture,
},
{
    name: "Earth",
    radius: 0.5,
    distance: 16,
    color: "#117a65",
    speed: 0.08,
    rotateSpeed: 0.25,
    texture: earthTexture,
},
{
    name: "Mars",
    radius: 0.3,
    distance: 21,
    color: "#b7410e",
    speed: 0.07,
    rotateSpeed: 0.25,
    texture: marsTexture,
},

];

const Planet: React.FC<PlanetProps> = ({
    name,
    radius,
    distance,
    color,
    speed,
    rotateSpeed,
    texture,
  }) => {
    const planetRef = useRef<Mesh>(null);
    const textGroupRef = useRef<Group>(null);
  
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
      if (planetRef.current && textGroupRef.current) {
        planetRef.current.rotation.y = elapsedTime * rotateSpeed;
  
        const curve = new EllipseCurve(0, 0, distance, distance);
        const point = curve.getPoint(elapsedTime * speed);
        planetRef.current.position.set(point.x, 0, point.y);

        textGroupRef.current.position.set(point.x, radius + textSize + 0.1, point.y);
      }
    });
  
    const textSize = 0.4;
  
    return (
      <group>
        <mesh ref={planetRef}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial
            color={color}
            map={texture ? new TextureLoader().load(texture) : undefined}
          />
        </mesh>
        <group ref={textGroupRef}>
          <Text
            color="#FFFFFF"
            fontSize={textSize}
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        </group>
      </group>
    );
  };
  const SolarSystem: React.FC = () => {
    return (
      <Canvas
        camera={{
          position: [0, 5, 30],
          fov: 60,
        }}
      >
        <color attach="background" args={['black']} />
        <Stars />
        <OrbitControls />
        <ambientLight intensity={8} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        {planetsInfo.map((planet, index) => (
          <Planet key={planet.name} {...planet} />
        ))}
      </Canvas>
    );
  };
  
  export default SolarSystem;
