'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BootAnimation() {
    const [isBooting, setIsBooting] = useState(true)
    const [loadingStep, setLoadingStep] = useState(0)

    const loadingTexts = [
        "INITIALIZING SYSTEMS...",
        "LOADING 3D ASSETS...",
        "VERIFYING SECURITY...",
        "CONNECTING TO CORE...",
        "PREPARING INTERFACE..."
    ]

    useEffect(() => {
        // Session check
        if (typeof window !== 'undefined' && sessionStorage.getItem('needful-booted-corporate-v4')) {
            setIsBooting(false)
            return
        }

        // Cycle loading texts
        const textInterval = setInterval(() => {
            setLoadingStep(prev => (prev + 1) % loadingTexts.length)
        }, 800)

        const timer = setTimeout(() => {
            setIsBooting(false)
            sessionStorage.setItem('needful-booted-corporate-v4', 'true')
        }, 4500)

        return () => {
            clearTimeout(timer)
            clearInterval(textInterval)
        }
    }, [])

    if (!isBooting) return null

    // Staggered Letter Animation for Title
    const titleText = "NeedFul"
    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 1.2 + (i * 0.1),
                duration: 0.6,
                ease: "easeOut" as const
            }
        })
    }

    // Slogan Variants
    const sloganVariants = {
        hidden: { opacity: 0, width: 0 },
        visible: {
            opacity: 1,
            width: "auto",
            transition: {
                delay: 2.2,
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 0.8, ease: "easeInOut" as const }
                }}
                className="fixed inset-0 z-[9999] bg-[#ffffff] flex items-center justify-center overflow-hidden"
            >
                <div className="relative flex flex-col items-center justify-center w-full max-w-md px-4">

                    {/* 1. Dynamic Logo Construction */}
                    <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            {/* Outer Circle Drawing */}
                            <motion.circle
                                cx="50" cy="50" r="45"
                                fill="none"
                                stroke="#FF5200"
                                strokeWidth="2"
                                initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                                animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            {/* Inner Accent Rings */}
                            <motion.circle
                                cx="50" cy="50" r="38"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="0.5"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.2 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            />
                            <motion.circle
                                cx="50" cy="50" r="30"
                                fill="none"
                                stroke="#000000"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ rotate: 0, opacity: 0 }}
                                animate={{ rotate: 180, opacity: 0.3 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.8 }}
                            />
                        </svg>

                        {/* Logo Mark Reveal */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                            className="text-3xl font-black text-gray-900 tracking-tighter relative z-10"
                        >
                            <span className="text-[#FF5200]">N</span>E
                        </motion.div>
                    </div>

                    {/* 2. Staggered Typography Reveal */}
                    <div className="overflow-hidden h-14 flex items-center justify-center">
                        <motion.h1
                            className="text-5xl font-bold text-gray-900 tracking-tight flex"
                            initial="hidden"
                            animate="visible"
                        >
                            {titleText.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariants}
                                    className={char === "F" ? "text-[#FF5200]" : ""}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </div>

                    {/* 3. Detailed Slogan Animation */}
                    <motion.div
                        className="mt-3 flex flex-col items-center gap-2 overflow-hidden"
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 2, duration: 0.5 }}
                                className="h-[1px] w-8 bg-gray-300"
                            />
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2.1, duration: 0.5 }}
                                className="text-xs uppercase tracking-[0.3em] text-gray-500 font-medium"
                            >
                                Professional Services
                            </motion.span>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 2, duration: 0.5 }}
                                className="h-[1px] w-8 bg-gray-300"
                            />
                        </div>

                        {/* Shimmering "System Ready" Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.8, duration: 0.5 }}
                            className="px-2 py-0.5 rounded bg-green-50 text-[10px] text-green-600 font-semibold border border-green-100 flex items-center gap-1.5"
                        >
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                            </span>
                            SYSTEM READY
                        </motion.div>
                    </motion.div>

                    {/* 4. System Info Loading Text (Added) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="absolute bottom-10 flex flex-col items-center gap-1"
                    >
                        <div className="text-[10px] font-mono text-gray-400 tracking-wider">
                            {loadingTexts[loadingStep]}
                        </div>
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 h-1 rounded-full bg-orange-500"
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}
