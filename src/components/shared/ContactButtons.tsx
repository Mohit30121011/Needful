'use client'

import { Phone, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContactButtonsProps {
    phone?: string | null
    whatsapp?: string | null
    onEnquiry?: () => void
    variant?: 'full' | 'compact'
    className?: string
}

export function ContactButtons({
    phone,
    whatsapp,
    onEnquiry,
    variant = 'full',
    className
}: ContactButtonsProps) {
    const handleCall = () => {
        if (phone) {
            window.open(`tel:${phone}`, '_self')
        }
    }

    const handleWhatsApp = () => {
        if (whatsapp) {
            window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}`, '_blank')
        }
    }

    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                {phone && (
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                        onClick={handleCall}
                    >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                    </Button>
                )}
                {whatsapp && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-green-600 text-green-600 hover:bg-green-50 gap-1.5"
                        onClick={handleWhatsApp}
                    >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                    </Button>
                )}
                {onEnquiry && (
                    <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-white gap-1.5"
                        onClick={onEnquiry}
                    >
                        <Send className="h-3.5 w-3.5" />
                        Enquiry
                    </Button>
                )}
            </div>
        )
    }

    return (
        <div className={cn('flex flex-wrap items-center gap-3', className)}>
            {phone && (
                <Button
                    className="bg-green-600 hover:bg-green-700 text-white gap-2 px-4"
                    onClick={handleCall}
                >
                    <Phone className="h-4 w-4" />
                    {phone}
                </Button>
            )}
            {whatsapp && (
                <Button
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50 gap-2"
                    onClick={handleWhatsApp}
                >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                </Button>
            )}
            {onEnquiry && (
                <Button
                    className="bg-primary hover:bg-primary/90 text-white gap-2"
                    onClick={onEnquiry}
                >
                    <Send className="h-4 w-4" />
                    Send Enquiry
                    <span className="text-xs opacity-80">Responds in 2 Hours</span>
                </Button>
            )}
        </div>
    )
}
