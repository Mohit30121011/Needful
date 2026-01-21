"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring for the trailing ring
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.getAttribute("role") === "button" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT" ||
                target.classList.contains("cursor-pointer");

            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Precision Dot - Follows mouse instantly (High Performance) */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[#FF5200] rounded-full pointer-events-none z-[9999]"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: -4, // Center align (width/2)
                    y: -4, // Center align (height/2)
                }}
            />

            {/* Interaction Ring - Follows with physics */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-gray-400/50"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -16, // Center align
                    y: -16,
                }}
                animate={{
                    scale: isHovering ? 2 : 1, // Expands on hover
                    borderColor: isHovering ? "#FF5200" : "rgba(156, 163, 175, 0.3)", // Turns orange on hover
                    backgroundColor: isHovering ? "rgba(255, 82, 0, 0.05)" : "transparent", // Slight tint on hover
                    borderWidth: isHovering ? "1px" : "1px",
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    borderColor: { duration: 0.2 }
                }}
            />
        </>
    );
};
