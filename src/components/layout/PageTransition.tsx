'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()
    const [isFirstMount, setIsFirstMount] = useState(true)

    useEffect(() => {
        // Skip animation on first mount
        setIsFirstMount(false)
    }, [])

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={isFirstMount ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                    duration: 0.25,
                    ease: [0.4, 0, 0.2, 1]
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
