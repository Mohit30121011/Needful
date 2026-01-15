import Link from 'next/link'
import {
    Smartphone, Zap, Tv, Droplets, Flame,
    Plane, Bus, Train, BedDouble, CarFront
} from 'lucide-react'

const bills = [
    { name: 'Mobile', slug: 'mobile', icon: Smartphone, color: 'text-blue-600' },
    { name: 'Electricity', slug: 'electricity', icon: Zap, color: 'text-yellow-500' },
    { name: 'DTH', slug: 'dth', icon: Tv, color: 'text-purple-600' },
    { name: 'Water', slug: 'water', icon: Droplets, color: 'text-cyan-500' },
    { name: 'Gas', slug: 'gas', icon: Flame, color: 'text-orange-500' },
]

const travel = [
    { name: 'Flights', slug: 'flights', icon: Plane, color: 'text-sky-500' },
    { name: 'Bus', slug: 'bus', icon: Bus, color: 'text-red-500' },
    { name: 'Train', slug: 'train', icon: Train, color: 'text-blue-700' },
    { name: 'Hotels', slug: 'hotels', icon: BedDouble, color: 'text-indigo-600' },
    { name: 'Car Rentals', slug: 'car-rentals', icon: CarFront, color: 'text-emerald-600' },
]

export function UtilitySections() {
    return (
        <section className="py-8 bg-gray-50 reveal">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
                {/* Bills & Recharge */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6 text-gray-800 flex items-center gap-2">
                        <span className="text-blue-500">Bills & Recharge</span>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">New</span>
                    </h3>
                    <div className="flex justify-between">
                        {bills.map((item, idx) => (
                            <Link key={idx} href={`/recharge/${item.slug}`} className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-gray-100">
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Travel Bookings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-lg mb-6 text-gray-800">Travel Bookings</h3>
                    <div className="flex justify-between">
                        {travel.map((item, idx) => (
                            <Link key={idx} href={`/travel/${item.slug}`} className="flex flex-col items-center gap-2 cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-gray-100">
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{item.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
