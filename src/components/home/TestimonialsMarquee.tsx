'use client'

import { Star, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const reviews = [
    { name: 'Priya Sharma', role: 'Homeowner', text: 'Found an amazing electrician in minutes! Very professional service.', rating: 5, time: '2 mins ago' },
    { name: 'Rahul Verma', role: 'Business Owner', text: 'Needful helped me find reliable cleaners for my office. Highly recommended!', rating: 5, time: '5 mins ago' },
    { name: 'Amit Patel', role: 'User', text: 'Great experience booking a plumber. Quick and easy.', rating: 4, time: '12 mins ago' },
    { name: 'Sneha Gupta', role: 'Homeowner', text: 'The salon at home service was fantastic. Will book again.', rating: 5, time: '18 mins ago' },
    { name: 'Vikram Singh', role: 'User', text: 'Finally a platform that works for local services.', rating: 5, time: '25 mins ago' },
    { name: 'Anjali Desai', role: 'Homeowner', text: 'AC repair was done on same day. Life saver!', rating: 5, time: '30 mins ago' },
]

export function TestimonialsMarquee() {
    return (
        <section className="py-12 bg-gray-50 overflow-hidden reveal">
            <div className="container mx-auto px-4 mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <span className="animate-pulse relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-green-600 uppercase tracking-wider">Live Activity</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What our community is saying</h2>
            </div>

            <div className="relative flex">
                <div className="animate-marquee flex gap-6 px-4">
                    {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                        {review.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 leading-tight">{review.name}</h4>
                                        <p className="text-xs text-gray-500">{review.role}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{review.time}</span>
                            </div>

                            <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Gradient Overlays for smooth entry/exit */}
                <div className="absolute top-0 left-0 h-full w-20 md:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10" />
                <div className="absolute top-0 right-0 h-full w-20 md:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10" />
            </div>
        </section>
    )
}
