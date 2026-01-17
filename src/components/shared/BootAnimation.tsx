'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function BootAnimation() {
    const [isBooting, setIsBooting] = useState(true)

    useEffect(() => {
        // Session check - temporarily disabled for development testing to ensure user sees the animation
        // if (typeof window !== 'undefined' && sessionStorage.getItem('needful-booted-corporate-v4')) {
        //     setIsBooting(false)
        //     return
        // }

        const timer = setTimeout(() => {
            setIsBooting(false)
            sessionStorage.setItem('needful-booted-corporate-v4', 'true')
        }, 3800) // Total duration

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isBooting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
                >
                    <div className="relative flex items-center justify-center">
                        {/* 1. Icon Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: [0.8, 1.1, 1], // Pulse effect
                                opacity: 1,
                                x: -60 // Move left to make room for text
                            }}
                            transition={{
                                scale: { duration: 0.8, times: [0, 0.6, 1], ease: "easeOut" },
                                opacity: { duration: 0.5 },
                                x: { delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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

                        {/* 2. Text Reveal */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 10 }} // Position relative to the shifted icon
                            transition={{
                                delay: 1.4, // Start slightly after icon movement begins
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="relative h-16 w-48 ml-2"
                        >
                            <Image
                                src="/assets/logo-text.png"
                                alt="NeedFul Text"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
