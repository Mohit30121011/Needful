'use client'

import React from 'react'
import Image from 'next/image'

const stories = [
    { name: 'Tech News', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=250&fit=crop', viewed: false },
    { name: 'Local Events', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=150&h=250&fit=crop', viewed: false },
    { name: 'Offers', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&h=250&fit=crop', viewed: false },
    { name: 'Food Fest', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&h=250&fit=crop', viewed: true },
    { name: 'New Movies', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=150&h=250&fit=crop', viewed: false },
    { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=150&h=250&fit=crop', viewed: true },
    { name: 'Travel', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=150&h=250&fit=crop', viewed: false },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&h=250&fit=crop', viewed: false },
]

export function VisualStories() {
    return (
        <section className="py-4 bg-white border-b border-gray-100 reveal">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">Trending Stories</h3>
                    <span className="text-xs font-semibold text-primary cursor-pointer hover:underline">View All</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {stories.map((story, idx) => (
                        <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group snap-start">
                            <div className={`w-[70px] h-[70px] md:w-[85px] md:h-[85px] rounded-full p-[2px] ${story.viewed ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-primary'}`}>
                                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-700 w-20 text-center truncate group-hover:text-primary transition-colors">
                                {story.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
