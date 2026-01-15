'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Category {
    name: string
    slug: string
    image: string
    color: string
}

const categories: Category[] = [
    { name: "Women's Salon & Spa", slug: 'beauty-spa', image: '/icons/salon-spa.png', color: 'from-pink-50 to-rose-50 hover:border-pink-200' },
    { name: 'Electrician', slug: 'electricians', image: '/icons/electrician.png', color: 'from-yellow-50 to-amber-50 hover:border-yellow-200' },
    { name: 'Cleaning & Pest Control', slug: 'cleaning', image: '/icons/cleaning.png', color: 'from-blue-50 to-cyan-50 hover:border-blue-200' },
    { name: 'Painting & Waterproofing', slug: 'painters', image: '/icons/painting.png', color: 'from-purple-50 to-violet-50 hover:border-purple-200' },
    { name: 'AC & Appliance Repair', slug: 'ac-repair', image: '/icons/ac-repair.png', color: 'from-orange-50 to-red-50 hover:border-orange-200' },
    { name: 'Plumbers', slug: 'plumbers', image: '/icons/plumber.png', color: 'from-indigo-50 to-blue-50 hover:border-indigo-200' },
    { name: 'Restaurants', slug: 'restaurants', image: '/icons/restaurant.png', color: 'from-red-50 to-orange-50 hover:border-red-200' },
    { name: 'Doctors', slug: 'doctors', image: '/icons/doctor.png', color: 'from-green-50 to-emerald-50 hover:border-green-200' },
]

export function CategoryGrid() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-12 reveal">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Explore by Category
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Everything you need for your home and lifestyle
                        </p>
                    </div>
                    <Link href="/categories" className="hidden md:flex items-center text-primary font-medium hover:underline gap-1">
                        View all <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.slug}
                            href={`/search?category=${category.slug}`}
                            className={cn(
                                "group relative p-6 rounded-3xl transition-all duration-500",
                                "bg-gradient-to-br border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-2 reveal",
                                category.color
                            )}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            {/* Icon Container with Glow */}
                            <div className="relative w-full aspect-square mb-6 flex items-center justify-center">
                                <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-xl">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="text-center relative z-10">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                                <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mt-3 group-hover:w-16 group-hover:bg-primary transition-all duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 text-center md:hidden reveal">
                    <Link href="/categories" className="inline-flex items-center text-primary font-medium">
                        View all categories <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
