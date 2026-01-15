import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plane, Bus, Train, BedDouble, CarFront, Calendar } from 'lucide-react'

// Map slugs to display names and icons
const typeMap: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    'flights': { label: 'Book Flights', icon: Plane, color: 'text-sky-500', bg: 'bg-sky-50' },
    'bus': { label: 'Bus Tickets', icon: Bus, color: 'text-red-500', bg: 'bg-red-50' },
    'train': { label: 'Train Tickets', icon: Train, color: 'text-blue-700', bg: 'bg-blue-50' },
    'hotels': { label: 'Book Hotels', icon: BedDouble, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    'car-rentals': { label: 'Rent a Car', icon: CarFront, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}

export default async function TravelPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()
    let userData = null
    try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data } = await supabase.from('users').select('name, email, role').eq('id', user.id).single()
            userData = data
        }
    } catch (error) {
        console.error('Supabase auth error:', error)
    }

    const type = typeMap[slug] || { label: 'Travel Booking', icon: Plane, color: 'text-gray-500', bg: 'bg-gray-50' }
    const Icon = type.icon

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header user={userData} />
            <main className="flex-1 pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className={`w-14 h-14 ${type.bg} rounded-2xl flex items-center justify-center`}>
                            <Icon className={`w-7 h-7 ${type.color}`} />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
                            {type.label}
                        </h1>
                    </div>

                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">From</label>
                                <Input placeholder="Origin City" className="h-12 rounded-xl bg-gray-50 border-gray-200" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">To</label>
                                <Input placeholder="Destination City" className="h-12 rounded-xl bg-gray-50 border-gray-200" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                                <div className="relative">
                                    <Input type="date" className="h-12 rounded-xl bg-gray-50 border-gray-200 pl-10" />
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Passengers</label>
                                <select className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
                                    <option>1 Traveller</option>
                                    <option>2 Travellers</option>
                                    <option>3 Travellers</option>
                                    <option>4+ Travellers</option>
                                </select>
                            </div>
                        </div>

                        <Button className="w-full h-14 rounded-xl font-bold bg-[#FF5200] hover:bg-[#E04800] text-lg shadow-lg shadow-orange-500/20">
                            Search {type.label.replace('Book ', '')}
                        </Button>
                    </div>

                    <div className="mt-12 text-center text-gray-500 text-sm">
                        <p>Compare prices from 100+ travel partners. Zero hidden fees.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
