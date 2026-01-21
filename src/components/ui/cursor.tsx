"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if the target or its parents are clickable
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.getAttribute("role") === "button" ||
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.tagName === "SELECT";

            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Dot - Orange */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-[#FF5200] rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 35,
                }}
            />

            {/* Trailing Ring - White/Black Theme */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border-2 border-white bg-black/10 backdrop-blur-[1px] shadow-sm shadow-black/20"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 2 : 1,
                    opacity: isHovering ? 0.8 : 0.5,
                    borderColor: isHovering ? "#FF5200" : "#ffffff", // Optional: Ring turns orange on hover
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                }}
            />
        </>
    );
};
