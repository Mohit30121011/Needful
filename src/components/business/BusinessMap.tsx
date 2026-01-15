'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { ExternalLink } from 'lucide-react'

// Fix for default marker icon in Next.js
const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

interface BusinessMapProps {
    lat: number
    lng: number
    businessName: string
    address: string
}

export default function BusinessMap({ lat, lng, businessName, address }: BusinessMapProps) {
    if (!lat || !lng) return null

    const openInGoogleMaps = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank')
    }

    return (
        <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm relative group">
            <div className="h-[250px] w-full z-0">
                <MapContainer
                    center={[lat, lng]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]} icon={customIcon}>
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-sm mb-1">{businessName}</h3>
                                <p className="text-xs text-gray-600 mb-2">{address}</p>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            {/* Overlay Button */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <button
                    onClick={openInGoogleMaps}
                    className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 pointer-events-auto transform translate-y-2 group-hover:translate-y-0 transition-transform shadow-lg hover:bg-gray-50"
                >
                    Open in Google Maps <ExternalLink className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
