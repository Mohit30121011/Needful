'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Sparkles, Loader2, CheckCircle2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIUtilityPageProps {
    title: string
    subtitle: string
    icon: React.ReactNode
    color: string
    gradientClass: string
    inputs: Array<{
        id: string
        label: string
        placeholder: string
        type?: string
        options?: string[]
    }>
    onAnalyze?: (data: any) => Promise<any>
    user?: any
}

export function AIUtilityPage({ title, subtitle, icon, color, gradientClass, inputs, user }: AIUtilityPageProps) {
    const [step, setStep] = useState<'input' | 'analyzing' | 'results'>('input')
    const [formData, setFormData] = useState<Record<string, string>>({})

    // Simulate AI Analysis
    const handleAnalyze = async () => {
        setStep('analyzing')

        // Mock analysis steps
        await new Promise(resolve => setTimeout(resolve, 800)) // Analyzing inputs
        await new Promise(resolve => setTimeout(resolve, 800)) // Checking best plans
        await new Promise(resolve => setTimeout(resolve, 800)) // Optimal route found

        setStep('results')
    }

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-orange-200">
            {/* Note: AnimatedBackground is already in layout.tsx, so we just use glass here */}
            <Header user={user} />

            <main className="flex-1 pt-28 pb-20 relative">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side: Content & Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center lg:text-left"
                        >
                            <div className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/40 shadow-sm mb-6", color)}>
                                <Sparkles className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm tracking-wide">AI POWERED BOOKING</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.1]">
                                {title} <br />
                                <span className={cn("bg-clip-text text-transparent bg-gradient-to-r", gradientClass)}>
                                    Simplified.
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                                {subtitle} Let our AI find the best plans and verify details instantly for you.
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-gray-700">
                                    Trusted by <span className="text-[#FF5200]">2M+</span> users
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Glassmorphism AI Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                            className="relative"
                        >
                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className={`absolute -top-10 -right-10 w-24 h-24 rounded-3xl ${color.replace('text-', 'bg-')}/20 backdrop-blur-xl border border-white/30 flex items-center justify-center z-20 shadow-xl hidden md:flex`}
                            >
                                {icon}
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {step === 'input' && (
                                    <motion.div
                                        key="input"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white/60 backdrop-blur-2xl border border-white/60 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

                                        <div className="space-y-6 relative z-10">
                                            {inputs.map((input) => (
                                                <div key={input.id}>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
                                                        {input.label}
                                                    </label>
                                                    {input.options ? (
                                                        <div className="relative">
                                                            <select
                                                                className="w-full h-14 bg-white/70 backdrop-blur-sm border-0 rounded-2xl px-4 text-lg font-medium outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#FF5200] transition-all appearance-none cursor-pointer hover:bg-white/90"
                                                                onChange={(e) => setFormData({ ...formData, [input.id]: e.target.value })}
                                                            >
                                                                {input.options.map(opt => <option key={opt}>{opt}</option>)}
                                                            </select>
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type={input.type || 'text'}
                                                            placeholder={input.placeholder}
                                                            className="w-full h-14 bg-white/70 backdrop-blur-sm border-0 rounded-2xl px-5 text-lg outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#FF5200] transition-all placeholder:text-gray-400 focus:shadow-lg hover:bg-white/90"
                                                            onChange={(e) => setFormData({ ...formData, [input.id]: e.target.value })}
                                                        />
                                                    )}
                                                </div>
                                            ))}

                                            <Button
                                                onClick={handleAnalyze}
                                                className={`w-full h-16 rounded-2xl text-xl font-bold text-white shadow-xl shadow-${color.split('-')[1]}-500/20 hover:scale-[1.02] transition-all active:scale-95 bg-gradient-to-r ${gradientClass.replace('bg-clip-text text-transparent', '').trim()}`}
                                            >
                                                Analyze & Proceed <ArrowRight className="ml-2 w-6 h-6" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'analyzing' && (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="bg-white/80 backdrop-blur-2xl border border-white/60 p-12 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center h-[400px]"
                                    >
                                        <div className="relative w-24 h-24 mb-8">
                                            <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                                            <div className="absolute inset-0 border-4 border-[#FF5200] rounded-full border-t-transparent animate-spin" />
                                            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-[#FF5200] animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">AI is analyzing...</h3>
                                        <div className="h-6 overflow-hidden relative w-full max-w-xs">
                                            <motion.div
                                                animate={{ y: [-24, -48, -72] }}
                                                transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
                                                className="text-gray-500 font-medium space-y-6"
                                            >
                                                <p>Connecting to servers...</p>
                                                <p>Finding best coupons...</p>
                                                <p>Verifying operator status...</p>
                                                <p>Optimizing route...</p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 'results' && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/90 backdrop-blur-2xl border border-white/60 p-8 rounded-[2.5rem] shadow-2xl text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2">Plan Found!</h3>
                                        <p className="text-gray-600 mb-8">We found the best match for your request.</p>
                                        <Button className="w-full h-14 rounded-2xl font-bold bg-black text-white text-lg hover:bg-gray-800">
                                            Continue to Payment
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
