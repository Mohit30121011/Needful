'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Banner {
    title: string;
    subtitle: string;
    bg: string;
    bg_alt?: string;
    image: string;
    cta: string;
    link: string;
}

const banners: Banner[] = [
    {
        title: "Summer Readiness Sale",
        subtitle: "Flat 50% OFF on AC Service & Repair",
        bg: "bg-gradient-to-br from-[#0F2027]/90 via-[#203A43]/90 to-[#2C5364]/90", // Deep premium teal/blue with opacity
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=600",
        cta: "Book Now",
        link: "/search?q=ac service"
    },
    {
        title: "Wedding Season Special",
        subtitle: "Top Rated Makeup Artists & Venues",
        bg: "bg-gradient-to-br from-[#5f2c82]/90 to-[#49a09d]/90", // Modern purple/teal gradient with opacity
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
        cta: "Explore",
        link: "/search?category=wedding"
    },
    {
        title: "Home Renovation",
        subtitle: "Get free quotes from verified contractors",
        bg: "bg-gradient-to-br from-[#dd3e54]/90 to-[#6be585]/90", // Vibrant Salmon to Green (Unique) -> Changed to cleaner modern orange
        bg_alt: "bg-gradient-to-br from-[#f12711]/90 to-[#f5af19]/90", // Premium Fire gradient with opacity
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600",
        cta: "Get Quotes",
        link: "/search?q=contractors"
    }
]

export function PromoBanners() {
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide snap-x pt-2">
                    {banners.map((banner, idx) => (
                        <Link
                            key={idx}
                            href={banner.link}
                            className={`relative flex-shrink-0 w-[85vw] md:w-[480px] h-[300px] rounded-[32px] overflow-hidden snap-center group cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 ease-out ${banner.bg_alt || banner.bg}`}
                        >
                            {/* Decorative Glass Reflection */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10 opacity-50" />

                            {/* Image with Gradient Mask */}
                            <div
                                className="absolute top-0 right-0 w-[65%] h-full transition-transform duration-700 group-hover:scale-110"
                                style={{
                                    maskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
                                }}
                            >
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-20 h-full flex flex-col justify-between p-6 text-white w-[65%]">
                                <div>
                                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md mb-4 border border-white/20">
                                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    </div>
                                    <h3 className="text-3xl font-extrabold leading-tight tracking-tight mb-2 text-white drop-shadow-md">
                                        {banner.title.split(' ').map((word, i) => (
                                            <span key={i} className="block">{word}</span>
                                        ))}
                                    </h3>
                                    <p className="text-white/80 text-sm font-medium line-clamp-2 mt-2 leading-relaxed">
                                        {banner.subtitle}
                                    </p>
                                </div>

                                <button className="self-start px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-full text-sm font-bold flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-sm mt-4">
                                    {banner.cta}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
