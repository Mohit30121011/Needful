'use client'

import React from 'react'
import { Plane, Hotel, Clapperboard, Train, AppWindow, TrendingUp, Newspaper, CircleDollarSign, Bus, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
    { name: 'B2B', icon: AppWindow, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Flights', icon: Plane, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Hotels', icon: Hotel, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Movies', icon: Clapperboard, color: 'text-purple-500', bg: 'bg-purple-50' },
    { name: 'Train', icon: Train, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Stocks', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'News', icon: Newspaper, color: 'text-gray-700', bg: 'bg-gray-50' },
    { name: 'Loans', icon: CircleDollarSign, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Bus', icon: Bus, color: 'text-red-500', bg: 'bg-red-50' },
    { name: 'Shop', icon: ShoppingBag, color: 'text-pink-500', bg: 'bg-pink-50' },
]

export function QuickLinks() {
    return (
        <section className="py-8 bg-white border-b border-gray-100 reveal">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-start justify-center md:justify-between gap-4 md:gap-8">
                    {quickLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href="#"
                            className="flex flex-col items-center gap-2 group min-w-[60px] cursor-pointer"
                        >
                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${link.bg} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-lg shadow-sm border border-gray-100`}>
                                <link.icon className={`w-5 h-5 md:w-6 md:h-6 ${link.color}`} />
                            </div>
                            <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">
                                {link.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
