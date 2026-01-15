'use client'

import { Search, Shield, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HowItWorks() {
    return (
        <section className="py-24 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Feature 1: Search & Discovery */}
                <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
                    {/* Visual */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[2rem] shadow-2xl shadow-orange-500/10 border border-gray-100 p-8 flex items-center justify-center overflow-hidden group">
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/2" />

                            {/* Floating Elements */}
                            <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-lg border border-gray-50 animate-float z-10">
                                <Search className="w-8 h-8 text-orange-500" />
                            </div>

                            <div className="relative z-0 w-full h-full bg-gray-50 rounded-xl border border-gray-100 flex flex-col p-4 gap-3 overflow-hidden">
                                {/* Search Input */}
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                    <Search className="w-4 h-4 text-gray-400" />
                                    <div className="text-sm text-gray-400">Electrician in Mumbai...</div>
                                </div>
                                {/* Result Cards */}
                                <div className="space-y-3">
                                    {/* Card 1 */}
                                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden relative">
                                            <img src="https://i.pravatar.cc/150?img=11" alt="Pro" className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold text-gray-900">Rajesh Electric</h4>
                                                <div className="flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                                                    ★ 4.9
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-0.5">Andheri West • 150+ Jobs</p>
                                        </div>
                                    </div>
                                    {/* Card 2 */}
                                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 opacity-90">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden relative">
                                            <img src="https://i.pravatar.cc/150?img=33" alt="Pro" className="object-cover w-full h-full" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-sm font-bold text-gray-900">SuperFix Pros</h4>
                                                <div className="flex items-center gap-1 text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded-full font-bold">
                                                    ★ 4.8
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-500 mt-0.5">Bandra • Verified</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Instant Found Badge */}
                                <div className="mt-auto bg-gray-900 text-white p-3 rounded-xl flex items-center justify-between shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs font-bold">Pro Arriving in 15m</span>
                                    </div>
                                    <span className="text-xs text-gray-300">Track</span>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 bg-black text-white px-5 py-3 rounded-xl shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Results</div>
                                <div className="text-lg font-bold">Instantly Found!</div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
                            <Search className="w-4 h-4" />
                            Smart Discovery
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Find Exactly What <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                                You Need.
                            </span>
                        </h2>
                        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                            Our advanced search filters help you connect with the perfect professional for your specific requirements, budget, and location relative to you.
                        </p>
                        <ul className="space-y-4 mb-8 text-left max-w-sm mx-auto lg:mx-0">
                            {[
                                'Verified Professionals Only',
                                'Real-time Availability',
                                'Transparent Pricing'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Feature 2: Booking & Payment (Reversed) */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    {/* Visual */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                        <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-[2rem] shadow-2xl shadow-blue-500/10 border border-gray-100 p-8 flex items-center justify-center overflow-hidden group">
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 -translate-x-1/2" />
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60 translate-y-1/2 translate-x-1/2" />

                            {/* Background Element: Real Schedule List */}
                            <div className="absolute inset-0 p-8 flex flex-col gap-4 scale-95 origin-center opacity-40 blur-[1px] select-none pointer-events-none">
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">24</div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">Home Cleaning</div>
                                        <div className="text-xs text-gray-500">Tommorrow, 10:00 AM</div>
                                    </div>
                                    <div className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Confirmed</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">28</div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">AC Repair</div>
                                        <div className="text-xs text-gray-500">Mon, 2:00 PM</div>
                                    </div>
                                    <div className="ml-auto text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Pending</div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">02</div>
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">Salon at Home</div>
                                        <div className="text-xs text-gray-500">Fri, 4:00 PM</div>
                                    </div>
                                </div>
                            </div>

                            {/* Center Card: Payment Success */}
                            <div className="relative bg-white p-4 md:p-5 rounded-2xl shadow-2xl border border-gray-50 w-64 md:w-72 animate-float z-20 scale-90 md:scale-100 origin-center">
                                <div className="flex items-center gap-4 mb-4 md:mb-5">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                        <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-base md:text-lg">Payment Success</div>
                                        <div className="text-[10px] md:text-xs text-gray-500">Transaction ID: #839210</div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 text-xs md:text-sm">Amount Paid</span>
                                        <span className="font-bold text-gray-900 text-base md:text-lg">₹499.00</span>
                                    </div>
                                    <div className="h-px bg-gray-100 w-full" />
                                    <div className="flex justify-between items-center text-[10px] md:text-xs text-gray-500">
                                        <span>Payment via UPI</span>
                                        <div className="flex items-center gap-1 text-green-600 font-medium"><Shield className="w-3 h-3" /> Secure</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Notification */}
                            <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-white p-2 md:p-3 rounded-2xl shadow-xl border border-gray-100 animate-float z-30 flex items-center gap-3 scale-90 md:scale-100 origin-top-right" style={{ animationDelay: '1.2s' }}>
                                <div className="relative">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 overflow-hidden">
                                        <img src="https://i.pravatar.cc/150?img=5" alt="Pro" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div className="text-[10px] md:text-xs font-bold text-gray-900">Amit Kumar</div>
                                    <div className="text-[8px] md:text-[10px] text-gray-500">Verified Professional</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-bold mb-6">
                            <Shield className="w-4 h-4" />
                            Secure & Safe
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                            Book with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                Confidence.
                            </span>
                        </h2>
                        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                            Secure payment gateways, verified reviews, and a satisfaction guarantee ensure your peace of mind with every booking.
                        </p>
                        <Link href="/categories">
                            <Button className="h-12 px-8 rounded-full bg-gray-900 text-white hover:bg-black font-bold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                                Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    )
}
