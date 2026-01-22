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
import { Badge } from '@/components/ui/badge'
import { ServiceCard } from '@/components/listing/ServiceCard'
import { WorkerCard } from '@/components/listing/WorkerCard'
import { User, LogOut, Heart, Settings, Shield, Briefcase, Building2, Store, Bell, MessageSquare, CheckCircle, Clock, Reply, LayoutDashboard } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { ProviderWithDetails } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'
import { markFeedbacksAsViewed } from '@/app/actions/contact'

interface Feedback {
    id: string
    name: string
    email: string
    subject: string
    message: string
    type: string
    status: string
    admin_reply: string | null
    admin_replied_at: string | null
    user_viewed?: boolean
    created_at: string
}

interface ProfilePageContentProps {
    favorites: ProviderWithDetails[]
    user: any // Supabase user object
    myBusiness: ProviderWithDetails[] | null
    userFeedbacks?: Feedback[]
    isAdmin?: boolean
}

export function ProfilePageContent({ favorites: initialFavorites, user, myBusiness, userFeedbacks = [], isAdmin = false }: ProfilePageContentProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Determine default tab from URL
    const defaultTab = searchParams.get('tab') || 'profile'

    const [favorites, setFavorites] = useState<ProviderWithDetails[]>(initialFavorites)
    const [isLoading, setIsLoading] = useState(false)
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(userFeedbacks)

    // Mark as read when opening notifications tab
    useEffect(() => {
        const markRead = async () => {
            if (defaultTab === 'notifications') {
                const unreadIds = feedbacks
                    .filter(f => f.admin_reply && !f.user_viewed)
                    .map(f => f.id)

                if (unreadIds.length > 0) {
                    await markFeedbacksAsViewed(unreadIds)
                    // Update local state
                    setFeedbacks(prev => prev.map(f =>
                        unreadIds.includes(f.id) ? { ...f, user_viewed: true } : f
                    ))
                    router.refresh()
                }
            }
        }
        markRead()
    }, [defaultTab, feedbacks])

    const notificationCount = feedbacks.filter(f => f.admin_reply && !f.user_viewed).length

    // Profile form state
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '')
    const [phone, setPhone] = useState(user?.user_metadata?.phone || '')
    const [city, setCity] = useState(user?.user_metadata?.city || 'Mumbai')
    const [isSaving, setIsSaving] = useState(false)

    const isProfileIncomplete = !user?.user_metadata?.profile_completed

    // Count unread notifications (feedbacks with admin replies that might be new)
    const unreadNotifications = userFeedbacks.filter(f => f.admin_reply).length

    // Handle profile save
    const handleSaveProfile = async () => {
        setIsSaving(true)
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    phone: phone,
                    city: city
                }
            })

            if (error) throw error

            toast.success('Profile updated successfully!')
            router.refresh()
        } catch (error: any) {
            console.error('Error updating profile:', error)
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setIsSaving(false)
        }
    }

    // Handle logout
    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.refresh()
        router.push('/')
        toast.success('Logged out successfully')
    }

    // Handle unfavorite
    const handleUnfavorite = (providerId: string) => {
        // Optimistically remove from list
        setFavorites(prev => prev.filter(p => p.id !== providerId))
    }

    const getStatusBadge = (status: string, hasReply: boolean) => {
        if (hasReply) {
            return <Badge className="bg-green-50 text-green-700 border-green-200">Replied</Badge>
        }
        switch (status) {
            case 'resolved': return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Resolved</Badge>
            case 'read': return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Read</Badge>
            case 'pending': return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
            default: return <Badge className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-100/20 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,82,0,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,82,0,0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="container mx-auto px-4 pt-32 pb-8 relative z-10">

                    {/* Incomplete Profile Warning */}
                    {isProfileIncomplete && (
                        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl shadow-sm flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                            <div>
                                <h3 className="font-bold text-amber-800">Complete your profile</h3>
                                <p className="text-sm text-amber-700">Add your phone number and city to get better recommendations.</p>
                            </div>
                            <Button
                                onClick={() => router.push('/complete-profile')}
                                className="bg-amber-500 hover:bg-amber-600 text-white"
                            >
                                Complete Now
                            </Button>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 items-start">

                        {/* Sidebar / User Card */}
                        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
                            <Card className="border-0 shadow-xl shadow-orange-100/50 overflow-hidden bg-white rounded-3xl">
                                {/* Header gradient with patterns */}
                                <div className="bg-gradient-to-br from-[#FF5200] via-orange-500 to-amber-500 h-32 relative">
                                    {/* Decorative patterns */}
                                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]"></div>
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_80%,white_0%,transparent_40%)]"></div>

                                    {/* Animated avatar container */}
                                    <div className="absolute -bottom-14 left-1/2 -translate-x-1/2">
                                        {/* Animated ring */}
                                        <div className="relative">
                                            <div
                                                className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FF5200] via-amber-400 to-[#FF5200] opacity-75"
                                                style={{ animation: 'spin 4s linear infinite' }}
                                            />
                                            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#FF5200] via-amber-400 to-[#FF5200] opacity-50 blur-md" />

                                            {/* Avatar */}
                                            <div className="relative w-28 h-28 rounded-full bg-white p-1 shadow-2xl">
                                                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center overflow-hidden ring-4 ring-white">
                                                    {user?.user_metadata?.avatar_url ? (
                                                        <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="h-12 w-12 text-gray-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* User info */}
                                <div className="pt-20 pb-8 px-6 text-center">
                                    <h1 className="font-bold text-2xl text-gray-900 mb-1">
                                        {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                                    </h1>
                                    <p className="text-sm text-gray-500 mb-4">{user?.email}</p>

                                    {/* Stats row */}
                                    <div className="flex justify-center gap-6 pt-4 border-t border-gray-100">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-[#FF5200]">{favorites.length}</p>
                                            <p className="text-xs text-gray-500">Favorites</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">
                                                {myBusiness?.length || 0}
                                            </p>
                                            <p className="text-xs text-gray-500">Listings</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-100 overflow-hidden">
                                <div className="text-sm font-medium">
                                    <button
                                        onClick={() => router.push('/profile?tab=profile')}
                                        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all cursor-pointer ${defaultTab === 'profile' ? 'text-[#FF5200] bg-orange-50 border-l-4 border-[#FF5200]' : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'}`}
                                    >
                                        <div className={`p-2 rounded-lg ${defaultTab === 'profile' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                            <User className={`h-4 w-4 ${defaultTab === 'profile' ? 'text-[#FF5200]' : 'text-gray-500'}`} />
                                        </div>
                                        Personal Information
                                    </button>

                                    {/* My Business Tab */}
                                    {myBusiness && myBusiness.length > 0 && (
                                        <button
                                            onClick={() => router.push('/profile?tab=business')}
                                            className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all cursor-pointer ${defaultTab === 'business' ? 'text-[#FF5200] bg-orange-50 border-l-4 border-[#FF5200]' : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'}`}
                                        >
                                            <div className={`p-2 rounded-lg ${defaultTab === 'business' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                                <Store className={`h-4 w-4 ${defaultTab === 'business' ? 'text-[#FF5200]' : 'text-gray-500'}`} />
                                            </div>
                                            My Business
                                        </button>
                                    )}

                                    <button
                                        onClick={() => router.push('/profile?tab=favorites')}
                                        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all cursor-pointer ${defaultTab === 'favorites' ? 'text-[#FF5200] bg-orange-50 border-l-4 border-[#FF5200]' : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'}`}
                                    >
                                        <div className={`p-2 rounded-lg ${defaultTab === 'favorites' ? 'bg-orange-100' : 'bg-gray-100'}`}>
                                            <Heart className={`h-4 w-4 ${defaultTab === 'favorites' ? 'text-[#FF5200]' : 'text-gray-500'}`} />
                                        </div>
                                        My Favorites
                                    </button>

                                    {/* Notifications Tab */}
                                    <button
                                        onClick={() => router.push('/profile?tab=notifications')}
                                        className={`w-full text-left px-5 py-4 flex items-center gap-4 transition-all cursor-pointer ${defaultTab === 'notifications' ? 'text-[#FF5200] bg-orange-50 border-l-4 border-[#FF5200]' : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'}`}
                                    >
                                        <div className={`p-2 rounded-lg ${defaultTab === 'notifications' ? 'bg-orange-100' : 'bg-gray-100'} relative`}>
                                            <Bell className={`h-4 w-4 ${defaultTab === 'notifications' ? 'text-[#FF5200]' : 'text-gray-500'}`} />
                                            {notificationCount > 0 && (
                                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                                    {notificationCount}
                                                </span>
                                            )}
                                        </div>
                                        Notifications
                                    </button>

                                    <button
                                        onClick={() => toast.info('Account Settings coming soon!')}
                                        className="w-full text-left px-5 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50 transition-all border-l-4 border-transparent cursor-pointer"
                                    >
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            <Settings className="h-4 w-4 text-gray-500" />
                                        </div>
                                        Account Settings
                                    </button>
                                    <button
                                        onClick={() => toast.info('Privacy & Security settings coming soon!')}
                                        className="w-full text-left px-5 py-4 flex items-center gap-4 text-gray-700 hover:bg-gray-50 transition-all border-l-4 border-transparent cursor-pointer"
                                    >
                                        <div className="p-2 rounded-lg bg-gray-100">
                                            <Shield className="h-4 w-4 text-gray-500" />
                                        </div>
                                        Privacy & Security
                                    </button>
                                    {/* Admin Access - Only visible to admins */}
                                    {isAdmin && (
                                        <button
                                            onClick={() => router.push('/admin/dashboard')}
                                            className="w-full text-left px-5 py-4 flex items-center gap-4 bg-[#FF5200] text-white hover:bg-[#E04800] transition-all border-l-4 border-[#FF5200] cursor-pointer"
                                        >
                                            <div className="p-2 rounded-lg bg-white/20">
                                                <LayoutDashboard className="h-4 w-4 text-white" />
                                            </div>
                                            Admin Access
                                        </button>
                                    )}
                                </div>
                                <div className="h-px bg-gray-100"></div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-5 py-4 flex items-center gap-4 text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                >
                                    <div className="p-2 rounded-lg bg-red-50">
                                        <LogOut className="h-4 w-4 text-red-500" />
                                    </div>
                                    Log Out
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <Tabs value={defaultTab} className="w-full" onValueChange={(val) => router.push(`/profile?tab=${val}`)}>
                                <TabsContent value="profile" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <SectionHeading subtitle="Manage your personal details and preferences.">
                                        Personal Information
                                    </SectionHeading>
                                    <Card className="border-0 shadow-lg shadow-gray-100/50 bg-white rounded-2xl">
                                        <CardContent className="space-y-6 pt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</Label>
                                                    <Input
                                                        id="name"
                                                        value={fullName}
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        placeholder="Rahul Sharma"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                                                    <Input id="email" defaultValue={user?.email || ''} disabled readOnly className="bg-gray-100 cursor-not-allowed opacity-70" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="+91 98765 43210"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700">City</Label>
                                                    <Input
                                                        id="city"
                                                        value={city}
                                                        onChange={(e) => setCity(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="pt-4 flex justify-end border-t border-gray-100">
                                                <Button
                                                    onClick={handleSaveProfile}
                                                    disabled={isSaving}
                                                    className="bg-[#FF5200] hover:bg-[#E04800] text-white px-8 h-11 font-semibold shadow-lg shadow-orange-500/20 disabled:opacity-50"
                                                >
                                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="business" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <SectionHeading subtitle="Manage your business listings and services.">
                                        My Business Listings
                                    </SectionHeading>

                                    {myBusiness && myBusiness.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {myBusiness.map(provider => (
                                                <ServiceCard
                                                    key={provider.id}
                                                    provider={provider}
                                                    isSaved={false} // Can't save your own
                                                    isOwner={true}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="border-0 shadow-sm py-16 text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Store className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">No business listings found</h3>
                                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                                If you are a service provider, complete your profile to get listed.
                                            </p>
                                        </Card>
                                    )}
                                </TabsContent>

                                <TabsContent value="favorites" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <SectionHeading subtitle="Manage your saved service providers.">
                                        My Favorites
                                    </SectionHeading>

                                    {favorites.length > 0 ? (
                                        <div className="space-y-8">
                                            {/* Logic to split favorites */}
                                            {(() => {
                                                const workerCategories = ['plumbers', 'electricians', 'carpenters', 'painters', 'ac-repair', 'cleaning', 'salon', 'massage']
                                                const workers = favorites.filter(p => workerCategories.includes(p.categories?.slug || ''))
                                                const businesses = favorites.filter(p => !workerCategories.includes(p.categories?.slug || ''))

                                                return (
                                                    <>
                                                        {workers.length > 0 && (
                                                            <div>
                                                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                                    <Briefcase className="w-5 h-5 text-[#FF5200]" />
                                                                    Your Favorite Workers
                                                                </h3>
                                                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                                                    {workers.map(provider => (
                                                                        <WorkerCard
                                                                            key={provider.id}
                                                                            provider={provider}
                                                                            isSaved={true}
                                                                            onSave={() => handleUnfavorite(provider.id)}
                                                                            // Generate mock jobs done count (stable per provider ID)
                                                                            jobsDone={50 + (provider.id.charCodeAt(0) % 450)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {businesses.length > 0 && (
                                                            <div>
                                                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                                    <Building2 className="w-5 h-5 text-[#FF5200]" />
                                                                    Favorite Businesses
                                                                </h3>
                                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                                    {businesses.map(provider => (
                                                                        <ServiceCard
                                                                            key={provider.id}
                                                                            provider={provider}
                                                                            isSaved={true}
                                                                            onSave={() => handleUnfavorite(provider.id)}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            })()}
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
                                                className="bg-[#FF5200] hover:bg-[#E04800] text-white px-8"
                                            >
                                                Explore Services
                                            </Button>
                                        </Card>
                                    )}
                                </TabsContent>

                                {/* Notifications Tab */}
                                <TabsContent value="notifications" className="mt-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <SectionHeading subtitle="View your submitted feedback and admin responses.">
                                        Notifications
                                    </SectionHeading>

                                    {userFeedbacks.length > 0 ? (
                                        <div className="space-y-4">
                                            {userFeedbacks.map((feedback) => (
                                                <Card key={feedback.id} className="border-0 shadow-lg shadow-gray-100/50 bg-white rounded-2xl overflow-hidden">
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                                <MessageSquare className="w-5 h-5 text-[#FF5200]" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                    <h3 className="font-semibold text-gray-900">{feedback.subject}</h3>
                                                                    {getStatusBadge(feedback.status, !!feedback.admin_reply)}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">{feedback.message}</p>
                                                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    Submitted {formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })}
                                                                </p>

                                                                {/* Admin Reply Section */}
                                                                {feedback.admin_reply && (
                                                                    <div className="mt-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                                                <Reply className="w-3 h-3 text-white" />
                                                                            </div>
                                                                            <span className="text-sm font-semibold text-green-700">Admin Response</span>
                                                                        </div>
                                                                        <p className="text-sm text-green-900">{feedback.admin_reply}</p>
                                                                        {feedback.admin_replied_at && (
                                                                            <p className="text-xs text-green-600 mt-2">
                                                                                Replied {formatDistanceToNow(new Date(feedback.admin_replied_at), { addSuffix: true })}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {/* Pending Response Message */}
                                                                {!feedback.admin_reply && feedback.status === 'pending' && (
                                                                    <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                                                                        <p className="text-sm text-yellow-700 flex items-center gap-2">
                                                                            <Clock className="w-4 h-4" />
                                                                            Awaiting response from admin
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="border-0 shadow-sm py-16 text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Bell className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">No notifications yet</h3>
                                            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                                                When you submit feedback through our contact form, you'll see responses here.
                                            </p>
                                            <Button
                                                onClick={() => router.push('/contact')}
                                                className="bg-[#FF5200] hover:bg-[#E04800] text-white px-8"
                                            >
                                                Contact Us
                                            </Button>
                                        </Card>
                                    )}
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
