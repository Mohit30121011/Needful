'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
    const [mounted, setMounted] = useState(false)

    // Mouse position state for parallax
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 }
    const springX = useSpring(mouseX, springConfig)
    const springY = useSpring(mouseY, springConfig)

    // Transform values for different layers (parallax effect)
    const moveX1 = useTransform(springX, [0, 1], [-20, 20])
    const moveY1 = useTransform(springY, [0, 1], [-20, 20])

    const moveX2 = useTransform(springX, [0, 1], [30, -30])
    const moveY2 = useTransform(springY, [0, 1], [30, -30])

    const moveX3 = useTransform(springX, [0, 1], [-50, 50])
    const moveY3 = useTransform(springY, [0, 1], [-50, 50])

    const rotateX = useTransform(springY, [0, 1], [5, -5])
    const rotateY = useTransform(springX, [0, 1], [-5, 5])

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position between 0 and 1
            const { innerWidth, innerHeight } = window
            mouseX.set(e.clientX / innerWidth)
            mouseY.set(e.clientY / innerHeight)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 min-h-screen w-full -z-50 overflow-hidden pointer-events-none bg-white perspective-[1000px]">
            {/* Base Gradient Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,247,237,0.8),rgba(255,255,255,1))]" />

            {/* Logical Grid Overlay */}
            <motion.div
                className="absolute inset-0 bg-[linear-gradient(rgba(255,82,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,82,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
                style={{ x: moveX1, y: moveY1, rotateX, rotateY }}
            />

            {/* 3D Floating Cube Suggestion (Top Right) */}
            <motion.div
                className="absolute top-[15%] right-[10%] w-32 h-32 border border-orange-200/40 rounded-3xl bg-orange-50/10 backdrop-blur-sm"
                style={{ x: moveX3, y: moveY3, rotateX: rotateX, rotateY: rotateY, z: 100 }}
                animate={{
                    rotate: [0, 90, 180],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="absolute inset-4 border border-orange-100/30 rounded-2xl" />
            </motion.div>

            {/* Large Orange Orb (Left) */}
            <motion.div
                className="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-orange-200/20 to-amber-100/20 rounded-full blur-[100px]"
                style={{ x: moveX2, y: moveY2 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Blue Contrast Orb (Bottom Right) */}
            <motion.div
                className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/20 to-indigo-100/10 rounded-full blur-[120px]"
                style={{ x: moveX2, y: moveY2 }}
            />

            {/* Geometric Floating Elements */}
            {/* Extra Orange Depth Layer */}
            <motion.div
                className="absolute top-[60%] left-[70%] w-[400px] h-[400px] bg-gradient-to-tl from-orange-300/10 to-transparent rounded-full blur-[80px]"
                style={{ x: moveX2, y: moveY2 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Element 1: Orange Diamond */}
            <motion.div
                className="absolute top-[40%] left-[20%] w-16 h-16 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rotate-45 rounded-lg backdrop-blur-sm border border-orange-200/30 shadow-lg shadow-orange-500/5"
                style={{ x: moveX3, y: moveY3 }}
                animate={{
                    y: [0, -40, 0],
                    rotate: [45, 90, 45]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Element 2: Circle Outline */}
            <motion.div
                className="absolute bottom-[30%] left-[40%] w-24 h-24 border-2 border-orange-200/30 rounded-full"
                style={{ x: moveX1, y: moveY1 }}
                animate={{
                    scale: [1, 1.2, 1],
                    borderColor: ["rgba(255,210,180,0.3)", "rgba(255,82,0,0.1)", "rgba(255,210,180,0.3)"]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Element 3: Logical Nodes */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-400/30 rounded-full blur-[1px]"
                    style={{
                        top: `${20 + i * 15}%`,
                        right: `${30 + (i % 2) * 10}%`,
                        x: moveX3,
                        y: moveY3
                    }}
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                />
            ))}

            {/* 3D Perspective Grid Floor */}
            <motion.div
                className="absolute -bottom-[20%] left-[-50%] w-[200%] h-[100%] bg-[linear-gradient(transparent_0%,rgba(255,82,0,0.06)_1px,transparent_1px),linear-gradient(90deg,transparent_0%,rgba(255,82,0,0.06)_1px,transparent_1px)] bg-[size:40px_40px]"
                style={{
                    rotateX: 60,
                    rotateZ: rotateY,
                    y: moveY1,
                    perspective: 1000
                }}
            />

            {/* Floating Tetrahedrons (Triangles) */}
            <motion.div
                className="absolute top-[30%] left-[10%] w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-orange-200/40 blur-[1px]"
                style={{ x: moveX2, y: moveY2, rotate: rotateX }}
                animate={{ rotateY: 360, rotateZ: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-[60%] right-[15%] w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-orange-400/20"
                style={{ x: moveX3, y: moveY3, rotate: rotateY }}
                animate={{ rotateX: 360, rotateZ: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Data Particles - Random Floating Bits */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-orange-500/40 rounded-full"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                        x: i % 2 === 0 ? moveX1 : moveX2,
                        y: i % 2 === 0 ? moveY1 : moveY2,
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Holographic Scanning Line */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400/5 to-transparent h-[5%]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Shooting Stars / Fast Moving Lines */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute h-[1px] w-[100px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"
                    style={{
                        top: `${Math.random() * 60}%`,
                        left: -100,
                        rotate: 45
                    }}
                    animate={{
                        x: ['0vw', '120vw'],
                        y: ['0vh', '120vh'],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeIn",
                        delay: Math.random() * 5,
                        repeatDelay: Math.random() * 3
                    }}
                />
            ))}

            {/* Drifting Cloud Orbs (Slow Moving across screen) */}
            <motion.div
                className="absolute top-[15%] w-64 h-64 bg-orange-100/10 rounded-full blur-[80px]"
                animate={{
                    x: ["-20vw", "120vw"],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute bottom-[20%] w-96 h-96 bg-blue-50/5 rounded-full blur-[100px]"
                animate={{
                    x: ["120vw", "-20vw"],
                }}
                transition={{
                    duration: 55,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Extra Floating 3D Elements */}
            <motion.div
                className="absolute top-[25%] left-[15%] w-20 h-20 border-2 border-orange-300/20 rounded-xl"
                style={{ x: moveX2, y: moveY2, rotateX: rotateY, rotateY: rotateX }}
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute bottom-[20%] right-[30%] w-12 h-12 bg-gradient-to-tr from-orange-400/10 to-transparent rounded-lg backdrop-blur-sm"
                style={{ x: moveX1, y: moveY1, rotateZ: rotateX }}
                animate={{ y: [-20, 20, -20] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute top-[10%] left-[40%] w-4 h-4 bg-orange-500/30 rounded-full blur-[2px]"
                style={{ x: moveX3, y: moveY3 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </div>
    )
}
