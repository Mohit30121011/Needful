'use client'

import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
    rating: number
    reviewCount?: number
    size?: 'sm' | 'md' | 'lg'
    showCount?: boolean
    className?: string
}

export function RatingStars({
    rating,
    reviewCount,
    size = 'md',
    showCount = true,
    className
}: RatingStarsProps) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    const sizeClasses = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    }

    const textSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base'
    }

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return (
                            <Star
                                key={i}
                                className={cn(sizeClasses[size], 'fill-yellow-400 text-yellow-400')}
                            />
                        )
                    }
                    if (i === fullStars && hasHalfStar) {
                        return (
                            <StarHalf
                                key={i}
                                className={cn(sizeClasses[size], 'fill-yellow-400 text-yellow-400')}
                            />
                        )
                    }
                    return (
                        <Star
                            key={i}
                            className={cn(sizeClasses[size], 'text-gray-300')}
                        />
                    )
                })}
            </div>
            <span className={cn('font-semibold text-gray-900', textSizes[size])}>
                {rating.toFixed(1)}
            </span>
            {showCount && reviewCount !== undefined && (
                <span className={cn('text-gray-500', textSizes[size])}>
                    ({reviewCount.toLocaleString()} Ratings)
                </span>
            )}
        </div>
    )
}

// Compact rating badge (like JustDial's green badge)
export function RatingBadge({
    rating,
    reviewCount,
    className
}: {
    rating: number
    reviewCount?: number
    className?: string
}) {
    const bgColor = rating >= 4 ? 'bg-green-600' : rating >= 3 ? 'bg-yellow-500' : 'bg-orange-500'

    return (
        <div className={cn('flex items-center gap-2', className)}>
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded text-white text-sm font-semibold', bgColor)}>
                {rating.toFixed(1)}
                <Star className="h-3 w-3 fill-white text-white" />
            </span>
            {reviewCount !== undefined && (
                <span className="text-sm text-gray-600">
                    {reviewCount.toLocaleString()} Ratings
                </span>
            )}
        </div>
    )
}
