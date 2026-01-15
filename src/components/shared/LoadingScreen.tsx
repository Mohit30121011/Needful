'use client'

import { motion } from 'framer-motion'

interface LoadingScreenProps {
    message?: string
}

export function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
                {/* Animated logo */}
                <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#FF5200] to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-200"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    <span className="text-2xl font-black text-white">NE</span>
                </motion.div>

                {/* Loading spinner */}
                <div className="relative w-12 h-12 mx-auto mb-4">
                    <motion.div
                        className="absolute inset-0 border-4 border-orange-100 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-transparent border-t-[#FF5200] rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                </div>

                {/* Message */}
                <motion.p
                    className="text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {message}
                </motion.p>
            </div>
        </div>
    )
}

// Page loading indicator for navigation
export function PageLoadingIndicator() {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5200] via-orange-400 to-[#FF5200] z-[100] origin-left"
        />
    )
}

// Skeleton loading components
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
        </div>
    )
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2 py-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    )
}
