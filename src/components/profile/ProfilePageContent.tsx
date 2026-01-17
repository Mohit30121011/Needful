'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ServiceCard } from '@/components/listing/ServiceCard'
import { User, LogOut, Heart, Settings, Shield } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import type { ProviderWithDetails } from '@/types/database'

interface ProfilePageContentProps {
    favorites: ProviderWithDetails[]
    user: any // Supabase user object
}

export function ProfilePageContent({ favorites: initialFavorites, user }: ProfilePageContentProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Determine default tab from URL
    const defaultTab = searchParams.get('tab') === 'favorites' ? 'favorites' : 'profile'

    const [favorites, setFavorites] = useState<ProviderWithDetails[]>(initialFavorites)
    const [isLoading, setIsLoading] = useState(false)

    // Handle logout
    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.refresh()
        router.push('/')
        toast.success('Logged out successfully')
    }

    // Pass this to ServiceCard to remove item from list immediately if unfavorited?
    // Or just let ServiceCard handle it and we refresh? 
    // ServiceCard handles the toggle. But on this page, if we unfavorite, we might want it to disappear from the list.
    // However, ServiceCard optimistic update sets isFavorited=false. 
    // If we want it to vanish, we need a callback.
    const handleUnfavorite = (providerId: string) => {
        // Optimistically remove from list
        setFavorites(prev => prev.filter(p => p.id !== providerId))
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Sidebar / User Card */}
                    <div className="w-full md:w-72 flex-shrink-0 space-y-6">
                        <Card className="border-0 shadow-sm overflow-hidden">
                            <div className="bg-[#FF5200] h-24 relative">
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                                    <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md">
                                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {user?.user_metadata?.avatar_url ? (
                                                <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="h-8 w-8 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-12 pb-6 px-6 text-center">
                                <h1 className="font-bold text-xl text-gray-900">
                                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                                </h1>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </Card>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden text-sm font-medium">
                            <button
                                onClick={() => router.push('/profile?tab=profile')}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors ${defaultTab === 'profile' ? 'text-[#FF5200] bg-orange-50' : 'text-gray-700'}`}
                            >
                                <User className="h-4 w-4" />
                                Personal Information
                            </button>
                            <button
                                onClick={() => router.push('/profile?tab=favorites')}
                                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-orange-50 transition-colors ${defaultTab === 'favorites' ? 'text-[#FF5200] bg-orange-50' : 'text-gray-700'}`}
                            >
                                <Heart className="h-4 w-4" />
                                My Favorites
                            </button>
                            <button className="w-full text-left px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-orange-50 transition-colors">
                                <Settings className="h-4 w-4" />
                                Account Settings
                            </button>
                            <button className="w-full text-left px-4 py-3 flex items-center gap-3 text-gray-700 hover:bg-orange-50 transition-colors">
                                <Shield className="h-4 w-4" />
                                Privacy & Security
                            </button>
                            <div className="h-px bg-gray-100 my-1"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <Tabs defaultValue={defaultTab} className="w-full" onValueChange={(val) => router.push(`/profile?tab=${val}`)}>
                            <TabsContent value="profile" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <Card className="border-0 shadow-sm">
                                    <CardHeader>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Manage your personal details and preferences.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" defaultValue={user?.user_metadata?.full_name || ''} placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input id="email" defaultValue={user?.email || ''} disabled readOnly className="bg-gray-50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" placeholder="+91 98765 43210" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" defaultValue="Mumbai" />
                                            </div>
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <Button className="bg-[#FF5200] hover:bg-[#E04800] text-white">Save Changes</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="favorites" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
                                    <p className="text-gray-500">Manage your saved service providers.</p>
                                </div>

                                {favorites.length > 0 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {favorites.map(provider => (
                                            <ServiceCard
                                                key={provider.id}
                                                provider={provider}
                                                isSaved={true}
                                                // Optional: Pass a callback if we want to remove it when toggled off
                                                // For now, ServiceCard toggles state internally. 
                                                // If we want it to vanish:
                                                onSave={() => handleUnfavorite(provider.id)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="border-0 shadow-sm py-16 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Heart className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">No favorites yet</h3>
                                        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                            Start exploring services and click the heart icon to save them here for quick access.
                                        </p>
                                        <Button
                                            onClick={() => router.push('/search')}
                                            className="bg-[#FF5200] hover:bg-[#E04800] text-white"
                                        >
                                            Explore Services
                                        </Button>
                                    </Card>
                                )}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
