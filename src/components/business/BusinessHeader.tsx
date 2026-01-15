'use client'

import { Share2, Heart, Star, MapPin, Clock, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface BusinessHeaderProps {
    provider: any
}

export function BusinessHeader({ provider }: BusinessHeaderProps) {
    const supabase = createClient()
    const [isSaved, setIsSaved] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        checkFavoriteStatus()
    }, [])

    const checkFavoriteStatus = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('provider_id', provider.id)
            .single()

        setIsSaved(!!data)
    }

    const handleSave = async () => {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error("Please login to save businesses")
            return
        }

        if (isSaved) {
            // Remove
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', user.id)
                .eq('provider_id', provider.id)

            if (!error) {
                setIsSaved(false)
                toast.success("Removed from favorites")
            }
        } else {
            // Add
            const { error } = await supabase
                .from('favorites')
                .insert({
                    user_id: user.id,
                    provider_id: provider.id
                } as any)

            if (!error) {
                setIsSaved(true)
                toast.success("Saved to favorites")
            }
        }
        setLoading(false)
    }

    const handleShare = async () => {
        try {
            await navigator.share({
                title: provider.business_name,
                text: `Check out ${provider.business_name} on NeedFul!`,
                url: window.location.href
            })
        } catch (err) {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Link copied to clipboard")
        }
    }

    const handleCall = () => {
        if (provider.phone) {
            window.location.href = `tel:${provider.phone}`
        } else {
            toast.error("Phone number not available")
        }
    }

    const handleWhatsApp = () => {
        if (provider.whatsapp || provider.phone) {
            const num = provider.whatsapp || provider.phone
            window.open(`https://wa.me/${num?.replace(/\D/g, '')}`, '_blank')
        } else {
            toast.error("WhatsApp number not available")
        }
    }

    return (
        <div className="bg-white pb-4">
            {/* Breadcrumb - Simplified */}
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                <span>Mumbai</span>
                <span>/</span>
                <span>{provider.city}</span>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">{provider.business_name}</span>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                                {provider.business_name}
                            </h1>
                            {provider.is_verified && (
                                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 gap-1 h-6">
                                    <CheckCircle2 className="w-3.5 h-3.5 fill-green-100" />
                                    Verified
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                            <span className="line-clamp-1">{provider.address}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-semibold">Open Now</span>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-600">Until 11:30 PM</span>
                            </div>
                        </div>

                        {/* Ratings Mobile View - Inline */}
                        <div className="flex items-center gap-3 md:hidden mb-4">
                            <div className="flex items-center gap-1.5 bg-green-700 text-white px-2 py-1 rounded w-fit font-bold text-sm">
                                <span>{provider.rating}</span>
                                <Star className="w-3 h-3 fill-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold underline decoration-dotted text-gray-900">{provider.review_count} Ratings</span>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Rating Box */}
                    <div className="hidden md:flex flex-col items-end gap-1">
                        <div className="flex items-center gap-2 bg-[#24963F] text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-[#1e8235] transition-colors">
                            <span className="text-xl font-bold">{provider.rating}</span>
                            <div className="flex flex-col items-center">
                                <Star className="w-4 h-4 fill-white" />
                            </div>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{provider.review_count} Ratings</span>
                    </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center gap-3">
                    <Button onClick={handleCall} className="bg-[#FF5200] hover:bg-[#E04800] text-white font-bold h-10 px-6 shadow-sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Show Number
                    </Button>
                    <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-white font-bold h-10 px-6 shadow-sm">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        Chat on WhatsApp
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="border-gray-300 font-semibold h-10 hover:bg-gray-50 text-gray-700">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        variant="outline"
                        className={cn("border-gray-300 font-semibold h-10 hover:bg-gray-50 text-gray-700 transition-all", isSaved && "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100")}
                    >
                        <Heart className={cn("w-4 h-4 mr-2", isSaved && "fill-current")} />
                        {isSaved ? 'Saved' : 'Save'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
