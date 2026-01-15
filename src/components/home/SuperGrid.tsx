'use client'

import {
    Utensils, Building2, Stethoscope, Plane, Car, Truck,
    Home, GraduationCap, Briefcase, Film, Heart, Scissors,
    Smartphone, Zap, Tv, Ticket, LineChart, Shield, Gift,
    Hammer, ShoppingBag, Music, Palette
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const superCategories = [
    { name: 'Restaurants', slug: 'restaurants', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Hotels', slug: 'hotels', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Doctors', slug: 'doctors', icon: Stethoscope, color: 'text-green-500', bg: 'bg-green-50' },
    { name: 'Travel', slug: 'travel', icon: Plane, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Auto Care', slug: 'auto-care', icon: Car, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Movers', slug: 'movers', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Home Decor', slug: 'home-decor', icon: Home, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Education', slug: 'education', icon: GraduationCap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Jobs', slug: 'jobs', icon: Briefcase, color: 'text-gray-700', bg: 'bg-gray-100' },
    { name: 'Movies', slug: 'movies', icon: Film, color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Wedding', slug: 'wedding', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Salons', slug: 'salons', icon: Scissors, color: 'text-teal-500', bg: 'bg-teal-50' },
    { name: 'Gym', slug: 'gym', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { name: 'Loans', slug: 'loans', icon: LineChart, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Insurance', slug: 'insurance', icon: Shield, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { name: 'Repairs', slug: 'repairs', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Shopping', slug: 'shopping', icon: ShoppingBag, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50' },
    { name: 'Events', slug: 'events', icon: Music, color: 'text-violet-500', bg: 'bg-violet-50' },
    { name: 'Beauty', slug: 'beauty', icon: Palette, color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Gifts', slug: 'gifts', icon: Gift, color: 'text-red-400', bg: 'bg-red-50' },
]

export function SuperGrid() {
    return (
        <section className="py-12 bg-white relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-[#FF5200] rounded-full"></span>
                        Explore Categories
                    </h2>
                    <Link href="/categories" className="text-sm font-bold text-[#FF5200] hover:underline">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
                    {superCategories.map((cat, idx) => (
                        <Link
                            key={idx}
                            href={`/search?category=${cat.slug}`}
                            className="flex flex-col items-center gap-3 group cursor-pointer"
                        >
                            <motion.div
                                whileHover={{
                                    y: -8,
                                    scale: 1.05,
                                    rotateX: 10,
                                    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
                                }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className={`w-16 h-16 rounded-2xl ${cat.bg} border border-transparent group-hover:border-gray-200 flex items-center justify-center relative overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                                <cat.icon className={`w-7 h-7 ${cat.color} transition-transform group-hover:scale-110`} strokeWidth={2} />
                            </motion.div>
                            <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide group-hover:text-[#FF5200] transition-colors text-center w-full truncate px-1">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
