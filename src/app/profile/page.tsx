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

    // Fetch user's own provider listings
    const { data: myBusiness } = await supabase
        .from('providers')
        .select(`
            *,
            categories (*),
            services (*),
            provider_images (*)
        `)
        .eq('user_id', user.id)

    // Fetch user's feedbacks (contact form submissions)
    const { data: userFeedbacks } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <ProfilePageContent
            user={user}
            favorites={favorites}
            myBusiness={myBusiness as ProviderWithDetails[] | null}
            userFeedbacks={userFeedbacks || []}
        />
    )
}
