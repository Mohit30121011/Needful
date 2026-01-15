import { Badge } from '@/components/ui/badge'
import { Check, Clock, MapPin, ShieldCheck, Zap } from 'lucide-react'

export function QuickInfo({ provider }: { provider: any }) {
    // Derive amenities from available data
    const amenities = [
        { label: 'Verified Listing', available: provider.is_verified, icon: ShieldCheck },
        { label: 'Responsive', available: provider.is_responsive, icon: Zap },
        { label: 'Active Business', available: provider.is_available, icon: Check },
        { label: 'Indoor Seating', available: true, icon: Check }, // Mock for now as schema lacks it
    ].filter(a => a.available)

    // Use services as "Cuisines" or "Offerings" preview
    const offerings = provider.services?.slice(0, 8).map((s: any) => s.title) || []

    return (
        <div className="space-y-6">
            {/* Category/Cuisines replacement */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Category & Offerings</h3>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-100 px-3 py-1 text-base">
                        {provider.categories?.name}
                    </Badge>
                    {offerings.map((item: string) => (
                        <Badge key={item} variant="outline" className="text-gray-700 border-gray-200 bg-gray-50 px-3 py-1 font-medium">
                            {item}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Location & Hours */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Location & Hours</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                            <span className="font-semibold block text-gray-900 mb-1">Address</span>
                            <span>{provider.address}, {provider.city}</span>
                        </div>
                    </div>
                    {provider.operating_hours && (
                        <div className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                            <div>
                                <span className="font-semibold block text-gray-900 mb-1">Operating Hours</span>
                                <span>{provider.operating_hours}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Amenities Grid */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                    {amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                            <item.icon className="w-4 h-4 text-green-600" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                    {/* Add some standard ones if list is too short just for visual fullness in this demo */}
                    {amenities.length < 4 && (
                        <>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-4 h-4 text-green-600" />
                                <span>Family Friendly</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Check className="w-4 h-4 text-green-600" />
                                <span>Parking Available</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
