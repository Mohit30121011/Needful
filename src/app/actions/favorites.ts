'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleFavorite(providerId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in to favorite items.' }
    }

    // Check if already favorited
    const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('provider_id', providerId)
        .single()

    const existingData = existing as any;

    if (existingData) {
        // Remove
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('id', existingData.id)

        if (error) return { error: error.message }

        revalidatePath('/search')
        revalidatePath('/profile')
        return { isFavorited: false }
    } else {
        // Add
        // FIRST: Ensure user exists in public.users table to satisfy FK constraint
        const { error: userError } = await supabase
            .from('users')
            .upsert({
                id: user.id,
                email: user.email!,
                role: 'customer',
            } as any, { onConflict: 'id' })

        if (userError) {
            console.error('Error syncing user profile:', userError)
        }

        const { error } = await supabase
            .from('favorites')
            .insert({
                user_id: user.id,
                provider_id: providerId
            } as any)

        if (error) return { error: error.message }

        revalidatePath('/search')
        revalidatePath('/profile')
        return { isFavorited: true }
    }
}

export async function getFavorites() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data } = await supabase
        .from('favorites')
        .select(`
      id,
      provider:providers (
        *,
        categories(*),
        provider_images(*)
      )
    `)
        .eq('user_id', user.id)

    // @ts-ignore - Supabase type inference for joined tables can be tricky
    return data?.map(f => f.provider) || []
}
