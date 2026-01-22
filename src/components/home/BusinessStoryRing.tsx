'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface BusinessStoryRingProps {
    providerId: string
    providerName: string
    providerLogo?: string
    storyCount: number
    hasUnviewed?: boolean
    onClick: () => void
}

export function BusinessStoryRing({
    providerId,
    providerName,
    providerLogo,
    storyCount,
    hasUnviewed = true,
    onClick,
}: BusinessStoryRingProps) {
    const [imageError, setImageError] = useState(false)

    return (
        <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Story Ring Container */}
            <div className="relative">
                {/* Animated Gradient Ring */}
                {hasUnviewed && (
                    <motion.div
                        className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-[#FF5200] via-orange-400 to-[#FF8F50]"
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-white" />
                    </motion.div>
                )}

                {/* Gray Ring for Viewed Stories */}
                {!hasUnviewed && (
                    <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300">
                        <div className="w-full h-full rounded-full bg-white" />
                    </div>
                )}

                {/* Avatar Container */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-white shadow-md">
                    {providerLogo && !imageError ? (
                        <Image
                            src={providerLogo}
                            alt={providerName}
                            fill
                            unoptimized
                            className="object-cover"
                            onError={() => setImageError(true)}
                            sizes="(max-width: 768px) 80px, 96px"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                            <span className="text-2xl md:text-3xl font-bold text-[#FF5200]">
                                {providerName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Story Count Badge */}
                {storyCount > 1 && (
                    <motion.div
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#FF5200] border-2 border-white flex items-center justify-center shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        <span className="text-white text-xs font-bold">+{storyCount - 1}</span>
                    </motion.div>
                )}
            </div>

            {/* Business Name */}
            <div className="text-center max-w-[80px] md:max-w-[96px]">
                <p className="text-xs md:text-sm font-medium text-gray-700 truncate group-hover:text-[#FF5200] transition-colors">
                    {providerName}
                </p>
            </div>
        </motion.div>
    )
}

// Skeleton Loading State
export function BusinessStoryRingSkeleton() {
    return (
        <div className="flex flex-col items-center gap-2 flex-shrink-0 animate-pulse">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200" />
            <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
    )
}
