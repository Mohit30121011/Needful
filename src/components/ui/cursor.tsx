"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smoother spring for a refined feel
    const springConfig = { damping: 25, stiffness: 200 };
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
            {/* Orange Pointer Dot - Clean and Visible */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[2147483647]"
                style={{
                    translateX: cursorX,
                    translateY: cursorY,
                    x: -6,
                    y: -6,
                    backgroundColor: "#FF5200",
                    boxShadow: "0 0 8px rgba(255, 82, 0, 0.4)",
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[2147483646] border-2"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -16,
                    y: -16,
                    borderColor: "#FF5200",
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    opacity: isHovering ? 0.6 : 0.4,
                }}
                transition={{
                    scale: { type: "spring", stiffness: 300, damping: 25 },
                    opacity: { duration: 0.2 },
                }}
            />
        </>
    );
};
