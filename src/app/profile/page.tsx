import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getFavorites } from '@/app/actions/favorites'
import { ProfilePageContent } from '@/components/profile/ProfilePageContent'
import type { ProviderWithDetails } from '@/types/database'

export default async function ProfilePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/')
    }

    const favorites = await getFavorites() as ProviderWithDetails[]

    return (
        <ProfilePageContent
            user={user}
            favorites={favorites}
        />
    )
}
