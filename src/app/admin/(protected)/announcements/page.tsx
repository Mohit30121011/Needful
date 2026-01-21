'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Megaphone, Users, Store, Calendar, Send } from 'lucide-react'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'

// Mock announcements
const announcements = [
    { id: 1, title: 'Platform Maintenance', message: 'Scheduled maintenance on Jan 25, 2026 from 2-4 AM IST.', audience: 'all', status: 'scheduled', date: 'Jan 25, 2026' },
    { id: 2, title: 'New Features Released!', message: 'Check out our new analytics dashboard and admin panel.', audience: 'providers', status: 'sent', date: 'Jan 20, 2026' },
    { id: 3, title: 'Welcome to NeedFul', message: 'Thank you for joining our platform!', audience: 'users', status: 'sent', date: 'Jan 15, 2026' },
]

const getAudienceBadge = (audience: string) => {
    switch (audience) {
        case 'all': return <Badge className="bg-purple-50 text-purple-700 border-0">Everyone</Badge>
        case 'users': return <Badge className="bg-blue-50 text-blue-700 border-0">Users</Badge>
        case 'providers': return <Badge className="bg-orange-50 text-orange-700 border-0">Business Owners</Badge>
        default: return <Badge className="bg-gray-50 text-gray-700 border-0">{audience}</Badge>
    }
}

export default function AnnouncementsPage() {
    const [showCreate, setShowCreate] = useState(false)

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Announcements</h1>
                        <p className="text-muted-foreground mt-1">Send notices and updates to platform users.</p>
                    </div>
                    <Button
                        className="bg-[#FF5200] hover:bg-[#E04800] text-white rounded-xl"
                        onClick={() => setShowCreate(!showCreate)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Announcement
                    </Button>
                </div>

                {/* Create Form */}
                {showCreate && (
                    <Card className="border-none shadow-lg border-l-4 border-l-[#FF5200]">
                        <CardHeader>
                            <CardTitle className="text-lg">Create Announcement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Title</label>
                                <Input placeholder="Announcement title..." className="rounded-xl" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                                <Textarea placeholder="Write your announcement..." className="rounded-xl min-h-[100px]" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Audience</label>
                                    <select className="w-full h-10 rounded-xl border border-gray-200 px-3 text-sm">
                                        <option value="all">Everyone</option>
                                        <option value="users">Users Only</option>
                                        <option value="providers">Business Owners Only</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Schedule</label>
                                    <Input type="datetime-local" className="rounded-xl" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button variant="outline" onClick={() => setShowCreate(false)} className="rounded-xl">
                                    Cancel
                                </Button>
                                <Button className="bg-[#FF5200] hover:bg-[#E04800] text-white rounded-xl">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Announcements List */}
                <div className="space-y-4">
                    {announcements.map((ann) => (
                        <Card key={ann.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                        <Megaphone className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                                            {getAudienceBadge(ann.audience)}
                                            <Badge className={ann.status === 'sent' ? 'bg-green-50 text-green-700 border-0' : 'bg-blue-50 text-blue-700 border-0'}>
                                                {ann.status === 'sent' ? 'Sent' : 'Scheduled'}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-2">{ann.message}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Calendar className="w-3 h-3" /> {ann.date}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminPageTransition>
    )
}
