'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function ModernCursor() {
    // Mouse position state
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the cursor movement
    const smoothX = useSpring(mouseX, { damping: 25, stiffness: 250, mass: 0.5 })
    const smoothY = useSpring(mouseY, { damping: 25, stiffness: 250, mass: 0.5 })

    // Interaction states
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const handleMouseDown = () => setIsClicked(true)
        const handleMouseUp = () => setIsClicked(false)

        const handleMouseOver = (e: MouseEvent) => {
            // Check if the target or its parents are interactive
            const target = e.target as HTMLElement
            // Interactive elements selector
            const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer')
            setIsHovered(!!isInteractive)
        }

        window.addEventListener('mousemove', moveMouse)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', moveMouse)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [mouseX, mouseY, isVisible])

    // Do not render on server or if mouse hasn't moved yet
    if (!isVisible) return null

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-exclusion"
            style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <motion.div
                className="relative flex items-center justify-center p-2"
                animate={{
                    scale: isClicked ? 0.8 : isHovered ? 2.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }}
            >
                {/* Core Orb */}
                <div className="w-4 h-4 bg-[#FF5200] rounded-full shadow-[0_0_20px_rgba(255,82,0,0.6)]" />

                {/* Fluid Background Glow (Visible on hover) */}
                <motion.div
                    className="absolute inset-0 bg-[#FF5200] rounded-full opacity-0 blur-md"
                    animate={{
                        opacity: isHovered ? 0.2 : 0,
                    }}
                />
            </motion.div>
        </motion.div>
    )
}
