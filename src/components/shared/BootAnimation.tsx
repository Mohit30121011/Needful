'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function BootAnimation() {
    const [isBooting, setIsBooting] = useState(true)
    // Generate random particles only on client to prevent hydration mismatch
    const [particles, setParticles] = useState<Array<{ top: string, left: string }>>([])

    useEffect(() => {
        // Session check - enabled for production
        if (typeof window !== 'undefined' && sessionStorage.getItem('needful-booted-corporate-v4')) {
            setIsBooting(false)
            return
        }

        const timer = setTimeout(() => {
            setIsBooting(false)
            sessionStorage.setItem('needful-booted-corporate-v4', 'true')
        }, 2000) // Total duration

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isBooting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.05,
                        filter: "blur(10px)",
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
                >
                    {/* Floating Particles */}
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: [0, 0.6, 0],
                                y: -40
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                            style={{
                                top: p.top,
                                left: p.left
                            }}
                        />
                    ))}



                    <div className="relative flex flex-col items-center justify-center">
                        <div className="relative flex items-center justify-center">
                            {/* 1. Icon Animation */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: [0.8, 1.1, 1], // Pulse effect
                                    opacity: 1,
                                    x: -50 // Move left less aggressively
                                }}
                                transition={{
                                    // scale: { duration: 0.8, times: [0, 0.6, 1], ease: "easeOut" }, // Removed scale transition to allow x to control timing
                                    opacity: { duration: 0.5 },
                                    x: { delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                                }}
                                className="relative z-10 w-24 h-24"
                            >
                                <Image
                                    src="/assets/logo-icon.png"
                                    alt="NeedFul Icon"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                            {/* 2. Text Reveal with Shimmer */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: 0.7,
                                    duration: 0.4,
                                    ease: "easeOut"
                                }}
                                className="relative h-16 w-48 -ml-20" // Slightly relaxed margin (was -24)
                            >
                                <Image
                                    src="/assets/logo-text.png"
                                    alt="NeedFul Text"
                                    fill
                                    className="object-contain z-10 relative"
                                    priority
                                />
                                {/* Shimmer Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-20"
                                    initial={{ x: '-150%' }}
                                    animate={{ x: '150%' }}
                                    transition={{
                                        delay: 1.2,
                                        duration: 0.6,
                                        ease: "easeInOut"
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* 3. Linear Progress Bar (0% -> 100%) */}
                        <motion.div
                            className="h-1 bg-orange-100 rounded-full mt-3 overflow-hidden w-56 -ml-14" // Moved left (-ml-14) to align with visual center
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <motion.div
                                className="h-full bg-orange-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 1.8, // Faster fill
                                    ease: "linear"
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
