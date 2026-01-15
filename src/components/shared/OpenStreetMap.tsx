'use client'

import { MapPin } from 'lucide-react'

interface OpenStreetMapProps {
    address: string
    city: string
    className?: string
}

export function OpenStreetMap({ address, city, className = '' }: OpenStreetMapProps) {
    // Create the search query for OpenStreetMap
    const searchQuery = encodeURIComponent(`${address}, ${city}, India`)

    // Using OpenStreetMap embed via iframe
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=72.8%2C18.9%2C73.0%2C19.1&layer=mapnik&marker=19.0%2C72.9`

    // For a more dynamic approach, we'd use a geocoding API
    // For now, showing a placeholder with link to full map
    const fullMapUrl = `https://www.openstreetmap.org/search?query=${searchQuery}`

    return (
        <div className={`rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 ${className}`}>
            <div className="aspect-[4/3] relative">
                <iframe
                    src={mapUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                />

                {/* Overlay with location info */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
                    <a
                        href={fullMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 left-3 right-3 pointer-events-auto"
                    >
                        <div className="bg-white/95 backdrop-blur rounded-xl p-3 shadow-lg flex items-center gap-3 hover:bg-white transition-colors">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{address || city}</p>
                                <p className="text-xs text-blue-600">View on Map →</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
