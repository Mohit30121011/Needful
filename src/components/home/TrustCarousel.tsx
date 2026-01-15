
"use client";

import { useState, useEffect } from 'react';
import { Shield, CheckCircle, Star } from 'lucide-react';

const trustItems = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
        title: "Kitchen Cleaning",
        location: "Mumbai",
        verified: true,
        rating: 5
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800",
        title: "AC Repair & Servicing",
        location: "Delhi",
        verified: true,
        rating: 5
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
        title: "Home Salon Makeover",
        location: "Bangalore",
        verified: true,
        rating: 5
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1581578731117-104f8a338e56?auto=format&fit=crop&q=80&w=800",
        title: "Electrical Rewiring",
        location: "Pune",
        verified: true,
        rating: 5
    }
];

export default function TrustCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % trustItems.length);
        }, 4000); // 4 seconds interval

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold text-xs border border-green-100 uppercase tracking-wider mb-2">
                        <Shield className="w-3 h-3" />
                        100% Verified & Secure
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                        Trusted by <span className="text-[#FF5200]">50,000+</span> Customers
                    </h3>
                </div>

                {/* Carousel Container */}
                <div className="relative w-full max-w-4xl mx-auto h-[300px] md:h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
                    {trustItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Background Image */}
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Content Badge */}
                            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                <div className="text-white">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                            Role Model Work
                                        </span>
                                        {item.verified && (
                                            <span className="flex items-center gap-1 text-green-400 text-xs font-bold">
                                                <CheckCircle className="w-3 h-3" /> Verified
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-2xl font-bold mb-1">{item.title}</h4>
                                    <p className="text-sm text-gray-300">{item.location} • Just Completed</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 border border-white/20 text-center">
                                    <div className="text-2xl font-black text-white">{item.rating}.0</div>
                                    <div className="flex text-yellow-400 text-xs">
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Progress Indicators */}
                    <div className="absolute top-4 right-4 flex gap-1 z-20">
                        {trustItems.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-8 bg-[#FF5200]' : 'w-2 bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
