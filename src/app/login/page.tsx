'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, Zap, Target, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { Suspense } from 'react'
import { AnimatedBackgroundLight, ParticleBackground } from '@/components/auth/AnimatedBackground'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirectTo') || '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [googleLoading, setGoogleLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            toast.error(error.message)
            setLoading(false)
            return
        }

        toast.success('Welcome back!')
        router.push(redirectTo)
        router.refresh()
    }

    const handleGoogleLogin = async () => {
        setGoogleLoading(true)
        const supabase = createClient()

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`
            }
        })

        if (error) {
            toast.error(error.message)
            setGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex relative overflow-hidden">
            {/* Animated Background */}
            <AnimatedBackgroundLight />
            <ParticleBackground />

            {/* Left side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative z-10">
                <div className="flex flex-col justify-center items-center w-full p-12">
                    {/* Animated Logo */}
                    <div className={`transform transition-all duration-1000 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link href="/" className="group">
                            <div className="relative">
                                <img
                                    src="/logo.png"
                                    alt="Needful"
                                    className="w-40 h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Heading */}
                    <div className={`text-center mt-8 transform transition-all duration-1000 delay-200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-5xl font-bold text-gray-900 mb-4">
                            Welcome to{' '}
                            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 bg-clip-text text-transparent">
                                Needful
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
                            Discover trusted local service providers. From electricians to restaurants,
                            we connect you with the best in your area.
                        </p>
                    </div>

                    {/* Features */}
                    <div className={`mt-12 space-y-4 transform transition-all duration-1000 delay-400 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {[
                            { icon: Zap, text: '4000+ Verified Providers' },
                            { icon: Target, text: 'Instant Booking & Enquiry' },
                            { icon: Shield, text: '100% Secure & Trusted' }
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 group cursor-default"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center shadow-lg shadow-orange-100/50 group-hover:scale-110 group-hover:shadow-orange-200/50 transition-all">
                                    <feature.icon className="w-5 h-5 text-orange-500" />
                                </div>
                                <span className="text-gray-700 font-medium text-lg group-hover:text-orange-600 transition-colors">
                                    {feature.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Testimonial */}
                    <div className={`mt-16 max-w-sm transform transition-all duration-1000 delay-600 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl shadow-orange-100/20 border border-white/50">
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-orange-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm italic">
                                "Found an amazing electrician within minutes. The service was professional and the rates were transparent!"
                            </p>
                            <p className="text-gray-800 font-semibold mt-3 text-sm">— Priya S., Mumbai</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
                <div className={`w-full max-w-md transform transition-all duration-700 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <Link href="/" className="inline-block">
                            <img
                                src="/logo.png"
                                alt="Needful"
                                className="h-16 w-auto object-contain mx-auto"
                            />
                        </Link>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-orange-100/30 border border-white/60">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
                            <p className="text-gray-500 mt-2">Enter your credentials to continue</p>
                        </div>

                        {/* Google Login Button */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-14 mb-6 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-orange-300 font-semibold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                            onClick={handleGoogleLogin}
                            disabled={googleLoading}
                        >
                            {googleLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
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
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-400 font-medium">or continue with email</span>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-12 h-14 bg-gray-50/50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-400 rounded-2xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
                                    <Link href="/reset-password" className="text-sm text-orange-500 hover:text-orange-600 font-medium hover:underline underline-offset-2">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-12 pr-12 h-14 bg-gray-50/50 border-2 border-gray-100 text-gray-900 placeholder:text-gray-400 rounded-2xl focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-14 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 hover:from-orange-600 hover:via-orange-600 hover:to-amber-600 text-white font-bold text-lg rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 group"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        {/* Sign up link */}
                        <p className="mt-8 text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-bold hover:underline underline-offset-2">
                                Sign up for free
                            </Link>
                        </p>
                    </div>

                    {/* Back to home */}
                    <div className="text-center mt-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors group">
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                            <span>Back to Needful</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <span className="text-white font-bold text-3xl">N</span>
                    </div>
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto" />
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
