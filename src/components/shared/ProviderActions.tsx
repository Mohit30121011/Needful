'use client'

import { useState } from 'react'
import { Heart, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { toggleFavorite } from '@/app/actions/favorites'

interface ProviderActionsProps {
    providerId: string
    providerName: string
    initialIsFavorite?: boolean
}

export function ProviderActions({ providerId, providerName, initialIsFavorite = false }: ProviderActionsProps) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error('Please login to save providers')
            return
        }

        setIsLoading(true)
        try {
            const result = await toggleFavorite(providerId)
            if ('error' in result) {
                toast.error(result.error)
            } else {
                setIsFavorite(result.isFavorited)
                toast.success(result.isFavorited ? 'Added to favorites' : 'Removed from favorites')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleShare = async () => {
        const url = window.location.href

        if (navigator.share) {
            try {
                await navigator.share({
                    title: providerName,
                    text: `Check out ${providerName} on NeedFul`,
                    url: url
                })
            } catch (error) {
                // User cancelled or error
            }
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(url)
            toast.success('Link copied to clipboard!')
        }
    }

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleShare}
            >
                <Share2 className="h-4 w-4" />
                Share
            </Button>
            <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${isFavorite ? 'text-red-500 border-red-200 hover:bg-red-50' : ''}`}
                onClick={handleSave}
                disabled={isLoading}
            >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
            </Button>
        </>
    )
}
