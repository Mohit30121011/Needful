'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const banners = [
    {
        title: "Summer Readiness Sale",
        subtitle: "Flat 50% OFF on AC Service & Repair",
        bg: "bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400",
        cta: "Book Now",
        link: "/search?q=ac service"
    },
    {
        title: "Wedding Season Special",
        subtitle: "Top Rated Makeup Artists & Venues",
        bg: "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
        cta: "Explore",
        link: "/search?category=wedding"
    },
    {
        title: "Home Renovation",
        subtitle: "Get free quotes from verified contractors",
        bg: "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=400",
        cta: "Get Quotes",
        link: "/search?q=contractors"
    }
]

export function PromoBanners() {
    return (
        <section className="py-8 bg-gray-50 reveal">
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide snap-x">
                    {banners.map((banner, idx) => (
                        <Link
                            key={idx}
                            href={banner.link}
                            className={`flex-shrink-0 w-[85vw] md:w-[450px] h-[200px] rounded-2xl relative overflow-hidden snap-center group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ${banner.bg}`}
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                            <div className="absolute top-0 right-0 w-[60%] h-full">
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    fill
                                    className="object-cover opacity-80 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/60" /> {/* Inner shadow for text readability */}
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-center p-8 text-white max-w-[70%]">
                                <h3 className="text-2xl font-bold mb-2 leading-tight drop-shadow-md">{banner.title}</h3>
                                <p className="text-white/90 text-sm font-medium mb-6 drop-shadow">{banner.subtitle}</p>
                                <button className="self-start px-5 py-2 bg-white text-gray-900 rounded-full text-sm font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform shadow-lg">
                                    {banner.cta} <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
