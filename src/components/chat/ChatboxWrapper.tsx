'use client'

import { usePathname } from 'next/navigation'
import { AIChatbox } from '@/components/chat/AIChatbox'

// Pages where chatbox should NOT appear
const EXCLUDED_PATHS = [
    '/login',
    '/signup',
    '/auth',
    '/register',
    '/signin',
    '/sign-in',
    '/sign-up',
]

export function ChatboxWrapper() {
    const pathname = usePathname()

    // Check if current path is in excluded list
    const shouldHideChatbox = EXCLUDED_PATHS.some(path =>
        pathname?.startsWith(path) || pathname === path
    )

    if (shouldHideChatbox) {
        return null
    }

    return <AIChatbox />
}
