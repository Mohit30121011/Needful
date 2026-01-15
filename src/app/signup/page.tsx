'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, ArrowRight, CheckCircle, Heart, Zap, Gift, Headphones, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { AnimatedBackgroundLight, ParticleBackground } from '@/components/auth/AnimatedBackground'

const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
]

export default function SignupPage() {
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [step, setStep] = useState<'form' | 'verify'>('form')

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                    phone: formData.phone,
                    city: formData.city
                }
            }
        })

        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }

        setStep('verify')
        setLoading(false)
    }

    const handleGoogleSignup = async () => {
        setGoogleLoading(true)
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=/complete-profile`
            }
        })

        if (error) {
            toast.error(error.message)
            setGoogleLoading(false)
        }
    }

    // Verification success screen
    if (step === 'verify') {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                <AnimatedBackgroundLight />
                <ParticleBackground />

                <div className={`relative z-10 w-full max-w-md p-4 transform transition-all duration-700 ${mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-green-100/50 border border-white/60 text-center">
                        <div className="relative mb-6 inline-block">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl opacity-30 animate-pulse" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                                <CheckCircle className="h-10 w-10 text-white" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email!</h2>
                        <p className="text-gray-600 mb-6">
                            We've sent a verification link to{' '}
                            <strong className="text-orange-500">{formData.email}</strong>
                        </p>

                        <div className="space-y-3">
                            <Button
                                className="w-full h-11 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-2xl shadow-lg shadow-orange-500/30"
                                onClick={() => router.push('/login')}
                            >
                                Go to Login
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            <AnimatedBackgroundLight />
            <ParticleBackground />

            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10">
                <div className="flex flex-col justify-center items-center w-full p-8">
                    <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link href="/" className="group">
                            <div className="relative">
                                <img
                                    src="/logo.png"
                                    alt="Needful"
                                    className="w-32 h-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform"
                                />
                            </div>
                        </Link>
                    </div>

                    <div className={`text-center mt-6 transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-4xl font-bold text-gray-900 mb-3">
                            Join <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">Needful</span>
                        </h1>
                        <p className="text-gray-600 text-base max-w-sm mx-auto">
                            Create your free account and discover the best local service providers.
                        </p>
                    </div>

                    <div className={`mt-8 space-y-3 transform transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {[
                            { icon: Heart, text: 'Save Favorites' },
                            { icon: Zap, text: 'Instant Quotes' },
                            { icon: Gift, text: 'Exclusive Discounts' },
                            { icon: Headphones, text: '24/7 Support' }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 group cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center shadow-md group-hover:scale-110 transition-all">
                                    <feature.icon className="w-4 h-4 text-orange-500" />
                                </div>
                                <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative z-10">
                <div className={`w-full max-w-md transform transition-all duration-700 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-4">
                        <Link href="/" className="inline-block">
                            <img
                                src="/logo.png"
                                alt="Needful"
                                className="h-12 w-auto object-contain mx-auto"
                            />
                        </Link>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl shadow-orange-100/30 border border-white/60">
                        {/* Header */}
                        <div className="text-center mb-3">
                            <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-500 text-xs mt-0.5">Fill in your details to get started</p>
                        </div>

                        {/* Google Signup Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-10 mb-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-orange-300 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group text-sm"
                            onClick={handleGoogleSignup}
                            disabled={googleLoading}
                        >
                            {googleLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative mb-3">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px]">
                                <span className="px-2 bg-white text-gray-400 font-medium">or</span>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSignup} className="space-y-2.5">
                            {/* Row 1: Name + Email */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="name" className="text-gray-700 font-medium text-xs">Name</Label>
                                    <div className="relative mt-1">
                                        <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="pl-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-gray-700 font-medium text-xs">Email</Label>
                                    <div className="relative mt-1">
                                        <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="pl-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Phone + City */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="phone" className="text-gray-700 font-medium text-xs">Phone</Label>
                                    <div className="relative mt-1">
                                        <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="9876543210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="pl-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label className="text-gray-700 font-medium text-xs">City</Label>
                                    <div className="relative mt-1">
                                        <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 z-10 pointer-events-none" />
                                        <Select
                                            value={formData.city}
                                            onValueChange={(value) => setFormData({ ...formData, city: value })}
                                        >
                                            <SelectTrigger className="pl-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-200 rounded-lg">
                                                {cities.map((city) => (
                                                    <SelectItem key={city} value={city} className="hover:bg-orange-50 text-sm">
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Passwords */}
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label htmlFor="password" className="text-gray-700 font-medium text-xs">Password</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-8 pr-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-xs">Confirm</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-8 h-9 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:border-orange-400 focus:ring-1 focus:ring-orange-100 text-sm"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-10 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:via-orange-600 hover:to-amber-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 group mt-1"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Sign in link */}
                        <p className="mt-3 text-center text-gray-600 text-xs">
                            Already have an account?{' '}
                            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-bold">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="text-[10px] text-center text-gray-400 mt-2">
                        By signing up, you agree to our{' '}
                        <Link href="/terms" className="text-orange-500 hover:underline">Terms</Link>
                        {' '}&{' '}
                        <Link href="/privacy" className="text-orange-500 hover:underline">Privacy</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
