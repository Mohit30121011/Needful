'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, User, Store, Star, Shield, Trash2, Clock } from 'lucide-react'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'

// Mock activity logs
const activityLogs = [
    { id: 1, action: 'New user registered', user: 'john@example.com', type: 'user', time: '2 minutes ago', icon: User },
    { id: 2, action: 'Business listing created', user: 'Khushi Kulkarni', type: 'business', time: '15 minutes ago', icon: Store },
    { id: 3, action: 'Review submitted', user: 'Anonymous', type: 'review', time: '32 minutes ago', icon: Star },
    { id: 4, action: 'User role changed to admin', user: 'admin@needful.com', type: 'admin', time: '1 hour ago', icon: Shield },
    { id: 5, action: 'Business verified', user: 'Ahmad Khanna', type: 'business', time: '2 hours ago', icon: Store },
    { id: 6, action: 'Review deleted', user: 'admin@needful.com', type: 'admin', time: '3 hours ago', icon: Trash2 },
    { id: 7, action: 'New user registered', user: 'sarah@gmail.com', type: 'user', time: '4 hours ago', icon: User },
    { id: 8, action: 'Business listing updated', user: 'Swati Joshi', type: 'business', time: '5 hours ago', icon: Store },
    { id: 9, action: 'Password reset requested', user: 'user123@mail.com', type: 'user', time: '6 hours ago', icon: User },
    { id: 10, action: 'New review with 5 stars', user: 'happy_customer', type: 'review', time: '7 hours ago', icon: Star },
]

const getTypeColor = (type: string) => {
    switch (type) {
        case 'user': return 'bg-blue-50 text-blue-700 border-blue-200'
        case 'business': return 'bg-orange-50 text-orange-700 border-orange-200'
        case 'review': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
        case 'admin': return 'bg-purple-50 text-purple-700 border-purple-200'
        default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
}

export default function ActivityLogsPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredLogs = activityLogs.filter(log =>
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Activity Logs</h1>
                        <p className="text-muted-foreground mt-1">Track all system events and user actions.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]/30 rounded-xl bg-white"
                        />
                    </div>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-400" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-gray-100">
                            {filteredLogs.map((log) => (
                                <div key={log.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getTypeColor(log.type)}`}>
                                        <log.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{log.action}</p>
                                        <p className="text-sm text-gray-500">{log.user}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={getTypeColor(log.type)}>
                                            {log.type}
                                        </Badge>
                                        <span className="text-xs text-gray-400 whitespace-nowrap">{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center text-sm text-gray-500">
                    Showing {filteredLogs.length} of {activityLogs.length} logs
                </div>
            </div>
        </AdminPageTransition>
    )
}
