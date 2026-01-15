'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Star, MapPin, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// Popular localities - Zomato style
const popularLocalities = [
    { name: 'Andheri West', count: 350 },
    { name: 'Bandra West', count: 280 },
    { name: 'Lower Parel', count: 180 },
    { name: 'Powai', count: 220 },
    { name: 'Juhu', count: 150 },
    { name: 'Malad West', count: 310 },
    { name: 'Borivali West', count: 260 },
    { name: 'Thane West', count: 420 },
    { name: 'Vashi', count: 190 },
]

// Collections data
const collections = [
    {
        title: 'Trending Restaurants',
        subtitle: 'The best dining spots this week',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
        count: '30 Places',
        href: '/search?category=restaurants'
    },
    {
        title: 'Best Spas',
        subtitle: 'Relax and rejuvenate',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400',
        count: '15 Places',
        href: '/search?category=beauty-spa'
    },
    {
        title: 'Top Rated Plumbers',
        subtitle: 'Verified professionals',
        image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
        count: '45 Pros',
        href: '/search?category=plumbers'
    },
    {
        title: 'Electricians Near You',
        subtitle: 'Quick and reliable service',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400',
        count: '50 Pros',
        href: '/search?category=electricians'
    }
]

export function FeaturedCarousel() {
    return (
        <div className="space-y-16 py-12">
            {/* Collections Section */}
            <section className="container mx-auto px-4 reveal">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Collections</h2>
                    <div className="flex justify-between items-end">
                        <p className="text-gray-500 text-lg">
                            Explore curated lists of top-rated service providers
                        </p>
                        <Link href="/collections" className="text-primary hover:text-primary/80 flex items-center gap-1 font-medium">
                            All collections <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {collections.map((collection, idx) => (
                        <Link key={idx} href={collection.href} className="group cursor-pointer">
                            <div className="relative h-[320px] rounded-xl overflow-hidden mb-2">
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                                    <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm opacity-90">{collection.count}</span>
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Popular Localities Section - Zomato Style */}
            <section className="container mx-auto px-4 reveal">
                <div className="mb-8 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Popular localities in and around <span className="text-primary">Mumbai</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {popularLocalities.map((locality, idx) => (
                        <Link
                            key={idx}
                            href={`/search?city=Mumbai&area=${encodeURIComponent(locality.name)}`}
                            className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                    {locality.name}
                                </h3>
                                <p className="text-gray-500 text-sm mt-0.5">
                                    {locality.count} places
                                </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                        </Link>
                    ))}
                    <Link
                        href="/locations"
                        className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-center gap-2 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group cursor-pointer"
                    >
                        <span className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                            See more
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    </Link>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-gray-50 py-16 reveal">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                                Why choose Needful?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-md">
                                We connect you with verified professionals for all your home and lifestyle needs.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                                <span className="text-4xl font-bold text-primary mb-2">50K+</span>
                                <span className="text-gray-600 font-medium">Verified Providers</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                                <span className="text-4xl font-bold text-primary mb-2">5L+</span>
                                <span className="text-gray-600 font-medium">Happy Customers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
