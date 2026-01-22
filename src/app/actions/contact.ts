'use server'

import { createClient } from '@/lib/supabase/server'

interface ContactFormData {
    name: string
    email: string
    subject: string
    message: string
}

interface FeedbackInsert {
    user_id: string | null
    name: string
    email: string
    subject: string
    message: string
    type: string
    status: string
}

export async function submitContactForm(formData: ContactFormData) {
    try {
        const supabase = await createClient()

        // Get current user if logged in
        const { data: { user } } = await supabase.auth.getUser()

        // Insert feedback into database
        // Using type assertion since feedbacks table is not in generated types yet
        const { error } = await (supabase as any)
            .from('feedbacks')
            .insert({
                user_id: user?.id || null,
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
                type: 'general',
                status: 'pending'
            } as FeedbackInsert)

        if (error) {
            console.error('Error submitting feedback:', error)
            return { error: 'Failed to submit feedback. Please try again.' }
        }

        return { success: true }
    } catch (error) {
        console.error('Error in submitContactForm:', error)
        return { error: 'Something went wrong. Please try again.' }
    }
}

export async function getUserFeedbacks() {
    try {
        const supabase = await createClient()

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return { feedbacks: [] }
        }

        // Fetch user's feedbacks
        // Using type assertion since feedbacks table is not in generated types yet
        const { data, error } = await (supabase as any)
            .from('feedbacks')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching feedbacks:', error)
            return { feedbacks: [] }
        }

        return { feedbacks: data || [] }
    } catch (error) {
        console.error('Error in getUserFeedbacks:', error)
        return { feedbacks: [] }
    }
}

export async function markFeedbacksAsViewed(feedbackIds: string[]) {
    try {
        const supabase = await createClient()

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { error: 'Not authenticated' }

        const { error } = await (supabase as any)
            .from('feedbacks')
            .update({ user_viewed: true })
            .in('id', feedbackIds)
            .eq('user_id', user.id) // Security check

        if (error) throw error

        return { success: true }
    } catch (error) {
        console.error('Error marking feedbacks as viewed:', error)
        return { error: 'Failed to update' }
    }
}
