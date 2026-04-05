import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, Text, useGLTF, Html, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Mock candidates for the 3D screen
const candidates = [
    { id: 1, name: 'Alice Smith', party: 'Progressive Party' },
    { id: 2, name: 'Bob Jones', party: 'Conservative Party' },
    { id: 3, name: 'Charlie Brown', party: 'Independent' }
];

const ScreenInterface = ({ isVoting, selectedCandidate, voteSuccess }) => {
    return (
        <div className="w-[400px] h-[500px] bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700 p-6 flex flex-col font-sans select-none">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">National Election</h2>
                    <p className="text-sm text-slate-400">Select your candidate</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                    <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-3 relative">
                {candidates.map((candidate) => (
                    <div
                        key={candidate.id}
                        className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${selectedCandidate === candidate.id ? 'bg-primary border-primary shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-800 border-slate-700'} border`}
                    >
                        <div>
                            <p className="font-semibold text-white">{candidate.name}</p>
                            <p className={`text-xs ${selectedCandidate === candidate.id ? 'text-indigo-100' : 'text-slate-400'}`}>{candidate.party}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedCandidate === candidate.id ? 'border-white' : 'border-slate-500'}`}>
                            {selectedCandidate === candidate.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                    </div>
                ))}
                {/* Animated Custom Cursor */}
                {isVoting && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, y: 300 }}
                        animate={{
                            opacity: 1,
                            x: 180,
                            y: 110, // approximate position of Bob Jones
                            scale: voteSuccess ? [1, 0.8, 1] : 1
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute z-20 w-8 h-8 pointer-events-none"
                        style={{ filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.5))" }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4L10.3636 21.1818L13.5455 13.5455L21.1818 10.3636L4 4Z" fill="white" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                )}
            </div>

            {voteSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center gap-3"
                >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-emerald-400 font-bold text-sm">Vote Recorded Successfully</p>
                        <p className="text-emerald-500/80 text-xs">Secured & Encrypted</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const VotingMachine = () => {
    const [isVoting, setIsVoting] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [voteSuccess, setVoteSuccess] = useState(false);

    useEffect(() => {
        // Voting Animation Sequence Loop
        let seq;
        const runSequence = () => {
            setIsVoting(true);
            setSelectedCandidate(null);
            setVoteSuccess(false);

            seq = setTimeout(() => {
                // Cursor reaches candidate
                setSelectedCandidate(2);

                setTimeout(() => {
                    // Vote confirms
                    setVoteSuccess(true);

                    setTimeout(() => {
                        // Reset for next loop
                        setIsVoting(false);
                        setVoteSuccess(false);
                        setSelectedCandidate(null);

                        setTimeout(runSequence, 3000); // Wait before restarting loop
                    }, 4000);
                }, 1000);
            }, 1500);
        };

        const initialDelay = setTimeout(runSequence, 2000);

        return () => {
            clearTimeout(initialDelay);
            clearTimeout(seq);
        };
    }, []);

    return (
        <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
            <mesh receiveShadow castShadow>
                {/* Device Bezel */}
                <boxGeometry args={[4.2, 5.2, 0.2]} />
                <meshPhysicalMaterial
                    color="#1e293b"
                    metalness={0.8}
                    roughness={0.2}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                />
            </mesh>
            <mesh position={[0, 0, 0.11]}>
                {/* Screen Bezel inner */}
                <boxGeometry args={[4, 5, 0.05]} />
                <meshBasicMaterial color="#000" />
            </mesh>
            {/* HTML overlay representing the screen */}
            <Html
                transform
                position={[0, 0, 0.14]}
                scale={0.01}
                occlude="blending"
            >
                <ScreenInterface
                    isVoting={isVoting}
                    selectedCandidate={selectedCandidate}
                    voteSuccess={voteSuccess}
                />
            </Html>
        </Float>
    );
};

export default function HeroScene() {
    return (
        <div className="w-full h-[600px] lg:h-[800px] relative">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
                <color attach="background" args={['transparent']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, -0.1, 0]}
                    polar={[-0.2, 0.2]}
                    azimuth={[-0.5, 0.5]}
                >
                    <VotingMachine />
                </PresentationControls>

                <Environment preset="city">
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                </Environment>

                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </Canvas>
        </div>
    );
}
