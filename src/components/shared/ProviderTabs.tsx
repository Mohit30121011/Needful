'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
    id: string
    label: string
}

interface ProviderTabsProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (tabId: string) => void
}

export function ProviderTabs({ tabs, activeTab, onTabChange }: ProviderTabsProps) {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null)

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="flex items-center gap-1 p-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        onMouseEnter={() => setHoveredTab(tab.id)}
                        onMouseLeave={() => setHoveredTab(null)}
                        className={`relative px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors duration-200 rounded-xl z-20 ${activeTab === tab.id
                            ? 'text-[#FF5200]'
                            : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-orange-50 border-2 border-[#FF5200] rounded-xl -z-10"
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30
                                }}
                            />
                        )}
                        {hoveredTab === tab.id && activeTab !== tab.id && (
                            <motion.div
                                layoutId="hoverTab"
                                className="absolute inset-0 bg-gray-100 rounded-xl -z-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}

// Wrapper component that manages tab state and content
interface ProviderTabsContainerProps {
    description: string | null
    services: any[]
    reviews: any[]
    images: any[]
    operatingHours: string | null
    phone: string | null
    email: string | null
    address: string | null
    city: string
}

export function ProviderTabsContainer({
    description,
    services,
    reviews,
    images,
    operatingHours,
    phone,
    email,
    address,
    city
}: ProviderTabsContainerProps) {
    const [activeTab, setActiveTab] = useState('overview')

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'menu', label: 'Menu' },
        { id: 'quickinfo', label: 'Quick Info' },
        { id: 'reviews', label: 'Reviews' },
        { id: 'photos', label: 'Photos' },
    ]

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ProviderTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="relative min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="p-6"
                    >
                        {activeTab === 'overview' && (
                            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {description || 'No description available.'}
                                </p>
                            </motion.div>
                        )}

                        {activeTab === 'menu' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Services & Menu</h3>
                                {services && services.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {services.map((service: any, idx: number) => (
                                            <motion.div
                                                key={service.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-default"
                                            >
                                                <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                                                {service.description && (
                                                    <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                                                )}
                                                {service.price && (
                                                    <p className="text-lg font-bold text-[#FF5200]">
                                                        ₹{service.price.toLocaleString()}
                                                        <span className="text-sm font-normal text-gray-500">
                                                            /{service.price_unit || 'session'}
                                                        </span>
                                                    </p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No menu items available.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'quickinfo' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Information</h3>
                                <div className="space-y-4">
                                    {operatingHours && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 min-w-[100px]">Hours:</span>
                                            <span className="text-gray-900">{operatingHours}</span>
                                        </div>
                                    )}
                                    {phone && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 min-w-[100px]">Phone:</span>
                                            <a href={`tel:${phone}`} className="text-[#FF5200] hover:underline cursor-pointer">{phone}</a>
                                        </div>
                                    )}
                                    {email && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 min-w-[100px]">Email:</span>
                                            <a href={`mailto:${email}`} className="text-[#FF5200] hover:underline cursor-pointer">{email}</a>
                                        </div>
                                    )}
                                    {(address || city) && (
                                        <div className="flex items-start gap-3">
                                            <span className="text-gray-500 min-w-[100px]">Address:</span>
                                            <span className="text-gray-900">{address}{address ? ', ' : ''}{city}</span>
                                        </div>
                                    )}
                                    {!operatingHours && !phone && !email && !address && !city && (
                                        <p className="text-gray-500 text-center py-8">No specific info available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews ({reviews?.length || 0})</h3>
                                {reviews && reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {reviews.map((review: any, idx: number) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="border-b border-gray-100 pb-4 last:border-0"
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                                                        <span className="text-sm font-bold text-white">
                                                            {review.users?.name?.[0] || 'U'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{review.users?.name || 'Anonymous'}</p>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800">
                                                            {review.rating} ★
                                                        </span>
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-gray-600">{review.comment}</p>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No reviews yet.</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'photos' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Photos ({images?.length || 0})</h3>
                                {images && images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {images.map((img: any, index: number) => (
                                            <motion.div
                                                key={img.id || index}
                                                layoutId={`img-${img.id || index}`}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05, type: 'spring' }}
                                                className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative group cursor-pointer"
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`Photo ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-8">No photos available.</p>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
