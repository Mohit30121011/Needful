'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false)
    const [isText, setIsText] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics
    const springConfig = { damping: 30, stiffness: 350, mass: 0.5 }
    const cursorX = useSpring(mouseX, springConfig)
    const cursorY = useSpring(mouseY, springConfig)

    // Velocity for deformation (Fluid feel)
    const velocityX = useVelocity(cursorX)
    const velocityY = useVelocity(cursorY)

    // Subtle Stretch on move
    const scaleX = useTransform(velocityX, [-3000, 0, 3000], [0.8, 1, 0.8])
    const scaleY = useTransform(velocityY, [-3000, 0, 3000], [0.8, 1, 0.8])

    const pathname = usePathname()

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement

            // Check for interactive elements
            const isInteractive = target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.classList.contains('cursor-pointer')

            // Check for text inputs
            const isTextInput = target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.getAttribute('contenteditable') === 'true'

            setIsHovered(!!isInteractive)
            setIsText(!!isTextInput)
        }

        window.addEventListener('mousemove', moveMouse)
        window.addEventListener('mouseover', handleMouseOver)

        // Force hide default cursor
        document.body.style.cursor = 'none'

        return () => {
            window.removeEventListener('mousemove', moveMouse)
            window.removeEventListener('mouseover', handleMouseOver)
            document.body.style.cursor = 'auto'
        }
    }, [isVisible])

    // Hide on route change briefly
    useEffect(() => {
        setIsVisible(false)
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [pathname])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
            {/* 1. Fluid Outer Ring - White/Semi-transparent Black Mix */}
            <motion.div
                className="absolute top-0 left-0 border-[1.5px] border-black/80 bg-white/10 backdrop-blur-[1px] rounded-full shadow-sm"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scaleX: isHovered ? 1 : scaleX,
                    scaleY: isHovered ? 1 : scaleY,
                }}
                animate={{
                    width: isHovered ? 50 : 24,
                    height: isHovered ? 50 : 24,
                    borderColor: isHovered ? 'rgba(255, 82, 0, 0.5)' : 'rgba(0, 0, 0, 0.6)',
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)',
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 28
                }}
            />

            {/* 2. Core Dot - Vibrant Orange with White Core */}
            {!isText && (
                <motion.div
                    className="absolute top-0 left-0 rounded-full flex items-center justify-center shadow-sm"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                    animate={{
                        width: isHovered ? 8 : 10,
                        height: isHovered ? 8 : 10,
                    }}
                >
                    {/* Outer Orange Shell */}
                    <div className="w-full h-full bg-[#FF5200] rounded-full relative">
                        {/* Inner White Dot */}
                        <div className="absolute inset-0 m-auto w-[4px] h-[4px] bg-white rounded-full" />
                    </div>
                </motion.div>
            )}

            {/* 3. Text I-Beam Mode */}
            {isText && (
                <motion.div
                    className="absolute top-0 left-0 w-[2px] h-6 bg-[#FF5200] rounded-full"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: '-50%',
                        translateY: '-50%'
                    }}
                />
            )}
        </div>
    )
}
