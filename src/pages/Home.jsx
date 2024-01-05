import { Canvas,useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Sky } from "../models";
import my from '../assets/images/my.jpg'
// Import necessary modules and components...
import { motion } from 'framer-motion';
import { socialLinks } from "../constants";

// Import necessary modules and components...
import { Html } from "@react-three/drei";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };
 
  
  
  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen flex justify-center items-center relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {/* Additional content can be added here */}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />

          {/* Existing model components... */}
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />

          {/* Use the Html component for the image */}
          <Html>
            <div
              style={{
                position: 'absolute',
                top: '0%', // Adjust this value to center the image vertically
                left: '50%', // Adjust this value to center the image horizontally
                transform: 'translate(-50%, -50%)',
                width: '300px', // Adjust this value to set the width of the image
                height: '300px', // Adjust this value to set the height of the image
              }}
            >
              <img
                src={my}
                alt="Your Image Alt Text"
                className="your-img-class"
                style={{
                  position: "relative",
                  top: "200px",
                  left: "100px",
                  borderRadius: "60px",

                  width: '40%',
                  height: '40%',
                  objectFit: 'cover', // Adjust this value to control how the image is scaled
                }}
              />

            </div>
          </Html>

        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />

        <motion.div
          className="flex items-center  justify-center relative"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
           
          <HomeInfo currentStage={currentStage} />
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
