import { createClient } from '@/lib/supabase/server'
import { AIUtilityPage } from '@/components/shared/AIUtilityPage'
import { Smartphone, Zap, Tv, Droplets, Flame } from 'lucide-react'

// Map slugs to display names and icons
const typeMap: Record<string, { label: string; icon: any; color: string; gradient: string }> = {
    'mobile': {
        label: 'Mobile Recharge',
        icon: Smartphone,
        color: 'text-blue-500',
        gradient: 'from-blue-500 to-indigo-600'
    },
    'electricity': {
        label: 'Electricity Bill',
        icon: Zap,
        color: 'text-yellow-500',
        gradient: 'from-yellow-400 to-orange-500'
    },
    'dth': {
        label: 'DTH Recharge',
        icon: Tv,
        color: 'text-purple-500',
        gradient: 'from-purple-500 to-fuchsia-600'
    },
    'water': {
        label: 'Water Bill',
        icon: Droplets,
        color: 'text-cyan-500',
        gradient: 'from-cyan-400 to-blue-500'
    },
    'gas': {
        label: 'Gas Booking',
        icon: Flame,
        color: 'text-orange-500',
        gradient: 'from-orange-500 to-red-600'
    },
}

export default async function RechargePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()
    let userData = null
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data } = await supabase.from('users').select('name, email, role').eq('id', user.id).single()
            userData = data
        }
    } catch (error) {
        console.error('Supabase auth error:', error)
    }

    const type = typeMap[slug] || {
        label: 'Utility Payment',
        icon: Zap,
        color: 'text-gray-500',
        gradient: 'from-[#FF5200] to-orange-600'
    }

    const inputs: {
        id: string
        label: string
        placeholder: string
        type?: string
        options?: string[]
    }[] = [
            {
                id: 'id',
                label: slug === 'mobile' ? 'Mobile Number' : 'Consumer Number / ID',
                placeholder: slug === 'mobile' ? 'e.g. 98765 43210' : 'Your Consumer ID'
            }
        ]

    if (slug === 'mobile') {
        inputs.push({
            id: 'operator',
            label: 'Operator',
            placeholder: 'Select Operator',
            options: ['Airtel', 'Jio', 'Vi', 'BSNL'],
            type: 'select'
        })
    }

    return (
        <AIUtilityPage
            title={type.label}
            subtitle={`Experience the fastest way to pay your ${type.label.toLowerCase()}.`}
            icon={<type.icon className={`w-10 h-10 ${type.color}`} />}
            color={type.color}
            gradientClass={type.gradient}
            inputs={inputs}
            user={userData}
        />
    )
}
