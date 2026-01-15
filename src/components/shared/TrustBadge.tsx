import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Zap, Clock, TrendingUp } from 'lucide-react'

interface TrustBadgeProps {
    type: 'verified' | 'responsive' | 'trusted' | 'trending'
    className?: string
}

const badgeConfig = {
    verified: {
        icon: CheckCircle,
        label: 'Verified',
        className: 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200'
    },
    responsive: {
        icon: Zap,
        label: 'Responsive',
        className: 'bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200'
    },
    trusted: {
        icon: CheckCircle,
        label: 'Trust',
        className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200'
    },
    trending: {
        icon: TrendingUp,
        label: 'Trending',
        className: 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200'
    }
}

export function TrustBadge({ type, className }: TrustBadgeProps) {
    const config = badgeConfig[type]
    const Icon = config.icon

    return (
        <Badge
            variant="outline"
            className={cn('gap-1 font-medium', config.className, className)}
        >
            <Icon className="h-3 w-3" />
            {config.label}
        </Badge>
    )
}

interface AvailabilityBadgeProps {
    isOpen: boolean
    hours?: string
    className?: string
}

export function AvailabilityBadge({ isOpen, hours, className }: AvailabilityBadgeProps) {
    return (
        <div className={cn('flex items-center gap-1.5 text-sm', className)}>
            <Clock className={cn('h-4 w-4', isOpen ? 'text-green-600' : 'text-red-500')} />
            <span className={cn('font-medium', isOpen ? 'text-green-600' : 'text-red-500')}>
                {isOpen ? 'Open Now' : 'Closed'}
            </span>
            {hours && (
                <span className="text-gray-500">• {hours}</span>
            )}
        </div>
    )
}
