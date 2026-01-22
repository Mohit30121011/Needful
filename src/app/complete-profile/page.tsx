'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, MapPin, Loader2, ArrowRight, User, Store, Briefcase, Star, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import Link from 'next/link'

const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
]

export default function CompleteProfilePage() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checkingAuth, setCheckingAuth] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        accountType: 'user',
        businessName: '',
        name: '',
        phone: '',
        city: ''
    })

    useEffect(() => {
        setMounted(true)
        checkUser()
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY, currentTarget } = e
        const { left, top, width, height } = currentTarget.getBoundingClientRect()
        const x = (clientX - left) / width - 0.5
        const y = (clientY - top) / height - 0.5
        setMousePosition({ x, y })
    }

    const checkUser = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            router.push('/login')
            return
        }

        setUser(user)

        // Pre-fill name from Google if available
        if (user.user_metadata?.full_name) {
            setFormData(prev => ({ ...prev, name: user.user_metadata.full_name }))
        } else if (user.user_metadata?.name) {
            setFormData(prev => ({ ...prev, name: user.user_metadata.name }))
        }

        // Check if profile is already complete
        if (user.user_metadata?.phone && user.user_metadata?.city) {
            router.push('/')
            return
        }

        setCheckingAuth(false)
    }

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '') +
            '-' + Math.floor(Math.random() * 1000)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.phone || !formData.city) {
            toast.error('Please fill in all fields')
            return
        }

        if (formData.accountType === 'business' && !formData.businessName) {
            toast.error('Please enter your business name')
            return
        }

        setLoading(true)

        const supabase = createClient()

        try {
            // 1. Update User Profile
            const { error: userError } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.name, // Ensure consistency with key names
                    name: formData.name,     // Store as 'name' too for backup
                    phone: formData.phone,
                    city: formData.city,
                    profile_completed: true,
                    business_name: formData.accountType === 'business' ? formData.businessName : undefined,
                    account_type: formData.accountType
                }
            })

            if (userError) throw userError

            // 2. If Business, Create Provider Record
            if (formData.accountType === 'business') {
                const slug = generateSlug(formData.businessName)

                const { error: roleError } = await supabase
                    .from('users')
                    // @ts-ignore
                    .update({ role: 'provider' } as any)
                    .eq('id', user.id)

                if (roleError) console.error('Error updating role:', roleError)

                const { error: providerError } = await supabase
                    .from('providers')
                    // @ts-ignore
                    .insert({
                        user_id: user.id,
                        business_name: formData.businessName,
                        slug: slug,
                        city: formData.city,
                        phone: formData.phone,
                        email: user.email,
                        is_available: true
                    } as any)

                if (providerError) throw providerError
            }

            toast.success('Profile completed! Welcome to NeedFul.')
            router.push('/')

        } catch (error: any) {
            console.error('Signup error:', error)
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <Loader2 className="h-8 w-8 animate-spin text-[#FF5200]" />
            </div>
        )
    }

    return (
        <section
            className="min-h-screen flex relative overflow-hidden bg-[#FFFBF7]"
            onMouseMove={handleMouseMove}
        >
            {/* Background Gradients - Matching Login Theme */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/60 via-orange-200/40 to-amber-100/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 will-change-transform" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-orange-50/50 via-amber-50/30 to-blue-50/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 will-change-transform" />

            {/* Left side - Animation */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10">
                <div className="flex flex-col justify-center items-center w-full p-12">

                    {/* Header */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                            Complete Your <span className="text-[#FF5200]">Profile</span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-md mx-auto">
                            Join our community to access reliable local services or list your business.
                        </p>
                    </motion.div>

                    {/* Orbital Animation */}
                    <div className="relative w-[500px] h-[500px] mt-12 flex items-center justify-center perspective-[1000px]">
                        <div
                            className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-200 ease-out"
                            style={{
                                transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`
                            }}
                        >
                            {/* Center Core */}
                            <div className="relative z-20 w-32 h-32 bg-white rounded-full shadow-[0_0_50px_-12px_rgba(255,82,0,0.2)] flex items-center justify-center border border-orange-50">
                                <div className="absolute inset-2 border border-orange-200 rounded-full animate-ping-slow" />
                                {user?.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                                ) : (
                                    <User className="w-12 h-12 text-[#FF5200]" />
                                )}
                            </div>

                            {/* Rings */}
                            {/* Inner Ring */}
                            <div className="absolute w-[280px] h-[280px] rounded-full animate-spin-slow border border-orange-200/40" style={{ animationDuration: '30s' }}>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-orange-100 p-3 rounded-full shadow-lg shadow-orange-500/10 animate-counter-spin" style={{ animationDuration: '30s' }}>
                                    <MapPin className="w-5 h-5 text-red-500" />
                                </div>
                            </div>

                            {/* Outer Ring */}
                            <div className="absolute w-[420px] h-[420px] rounded-full animate-spin-reverse-slow border border-orange-200/30" style={{ animationDuration: '40s' }}>
                                <div className="absolute bottom-[15%] right-[10%] bg-white/90 backdrop-blur-md border border-orange-100 p-3 rounded-full shadow-lg shadow-orange-500/10 animate-counter-spin-reverse" style={{ animationDuration: '40s' }}>
                                    <Phone className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="absolute top-[15%] left-[10%] bg-white/90 backdrop-blur-md border border-orange-100 p-3 rounded-full shadow-lg shadow-orange-500/10 animate-counter-spin-reverse" style={{ animationDuration: '40s' }}>
                                    <Store className="w-5 h-5 text-[#FF5200]" />
                                </div>
                            </div>

                            {/* Floating Sparkles */}
                            <div className="absolute -top-10 right-[20%] animate-bounce-slow">
                                <Sparkles className="w-8 h-8 text-yellow-500 drop-shadow-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 relative z-10">
                <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="w-full max-w-md"
                >
                    <div className="relative group">
                        {/* Glow Border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-[2rem] opacity-30 blur-lg transition-opacity duration-500" />

                        <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl shadow-orange-100/40 border border-white/60">

                            {/* Mobile Header (visible only on small screens) */}
                            <div className="lg:hidden text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Complete Profile</h2>
                            </div>

                            {/* User Info Bar */}
                            {user?.email && (
                                <div className="bg-orange-50/50 rounded-xl p-3 mb-8 flex items-center gap-3 border border-orange-100">
                                    {user.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt="Profile" className="w-10 h-10 rounded-full ring-2 ring-white" />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center ring-2 ring-orange-50">
                                            <User className="w-5 h-5 text-orange-500" />
                                        </div>
                                    )}
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-900 text-sm truncate">{user.email}</p>
                                        <p className="text-xs text-orange-600 font-medium">Verified Account</p>
                                    </div>
                                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                                </div>
                            )}

                            {/* Account Type Switcher */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-gray-100/80 p-1.5 rounded-2xl flex relative w-full border border-gray-200">
                                    <motion.div
                                        className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-xl shadow-sm border border-orange-100"
                                        initial={false}
                                        animate={{
                                            x: formData.accountType === 'user' ? 0 : '100%'
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, accountType: 'user' })}
                                        className={`flex-1 relative z-10 text-sm font-bold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${formData.accountType === 'user' ? 'text-[#FF5200]' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <User className="w-4 h-4" />
                                        User
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, accountType: 'business' })}
                                        className={`flex-1 relative z-10 text-sm font-bold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${formData.accountType === 'business' ? 'text-[#FF5200]' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Store className="w-4 h-4" />
                                        Business
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Business Name */}
                                {formData.accountType === 'business' && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Label htmlFor="businessName" className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Business Name</Label>
                                        <div className={`relative group transition-all duration-300 ${focusedField === 'businessName' ? 'scale-[1.01]' : ''}`}>
                                            <div className={`absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl blur opacity-0 transition-opacity duration-300 ${focusedField === 'businessName' ? 'opacity-40' : ''}`} />
                                            <div className="relative">
                                                <Store className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'businessName' ? 'text-[#FF5200]' : 'text-gray-400'}`} />
                                                <Input
                                                    id="businessName"
                                                    value={formData.businessName}
                                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                                    onFocus={() => setFocusedField('businessName')}
                                                    onBlur={() => setFocusedField(null)}
                                                    className="pl-12 h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all font-medium"
                                                    placeholder="Awesome Service Co."
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Full Name</Label>
                                    <div className={`relative group transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.01]' : ''}`}>
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl blur opacity-0 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-40' : ''}`} />
                                        <div className="relative">
                                            <User className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'name' ? 'text-[#FF5200]' : 'text-gray-400'}`} />
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                className="pl-12 h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all font-medium"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Phone Number</Label>
                                    <div className={`relative group transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.01]' : ''}`}>
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl blur opacity-0 transition-opacity duration-300 ${focusedField === 'phone' ? 'opacity-40' : ''}`} />
                                        <div className="relative">
                                            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${focusedField === 'phone' ? 'text-[#FF5200]' : 'text-gray-400'}`} />
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                onFocus={() => setFocusedField('phone')}
                                                onBlur={() => setFocusedField(null)}
                                                className="pl-12 h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all font-medium"
                                                placeholder="9876543210"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* City */}
                                <div className="space-y-2">
                                    <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">City</Label>
                                    <Select
                                        value={formData.city}
                                        onValueChange={(value) => setFormData({ ...formData, city: value })}
                                    >
                                        <SelectTrigger className="h-12 bg-white border-gray-200 text-gray-900 rounded-xl focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all font-medium pl-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-5 w-5 text-gray-400" />
                                                <SelectValue placeholder="Select your city" />
                                            </div>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-200 rounded-xl max-h-60">
                                            {cities.map((city) => (
                                                <SelectItem key={city} value={city} className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer py-3">
                                                    {city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 mt-6 bg-gradient-to-r from-[#FF5200] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] hover:shadow-orange-500/40 transition-all duration-300"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Profile'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse-slow {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes counter-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes counter-spin-reverse {
                    from { transform: rotate(-360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes ping-slow {
                     0% { transform: scale(1); opacity: 1; }
                     75%, 100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-spin-slow { animation: spin-slow 30s linear infinite; }
                .animate-spin-reverse-slow { animation: spin-reverse-slow 30s linear infinite; }
                .animate-counter-spin { animation: counter-spin 30s linear infinite; }
                .animate-counter-spin-reverse { animation: counter-spin-reverse 30s linear infinite; }
                .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
                .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                .perspective-\[1000px\] { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
            `}</style>
        </section>
    )
}
