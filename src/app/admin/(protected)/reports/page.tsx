'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Flag, AlertTriangle, Shield, CheckCircle, XCircle, Eye } from 'lucide-react'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'

// Mock reports
const reports = [
    { id: 1, type: 'review', content: 'This review contains inappropriate language...', reportedBy: 'user@email.com', reason: 'Inappropriate content', status: 'pending', time: '1 hour ago' },
    { id: 2, type: 'business', content: 'Fake business listing - XYZ Services', reportedBy: 'checker@mail.com', reason: 'Spam/Fake', status: 'pending', time: '3 hours ago' },
    { id: 3, type: 'review', content: 'Competitor posting fake negative reviews', reportedBy: 'business@owner.com', reason: 'Competitor sabotage', status: 'investigating', time: '1 day ago' },
    { id: 4, type: 'user', content: 'User harassing businesses via reviews', reportedBy: 'admin@needful.com', reason: 'Harassment', status: 'resolved', time: '2 days ago' },
    { id: 5, type: 'business', content: 'Business selling illegal products', reportedBy: 'concerned@citizen.com', reason: 'Illegal activity', status: 'resolved', time: '3 days ago' },
]

const getTypeBadge = (type: string) => {
    switch (type) {
        case 'review': return <Badge className="bg-yellow-50 text-yellow-700 border-0">Review</Badge>
        case 'business': return <Badge className="bg-orange-50 text-orange-700 border-0">Business</Badge>
        case 'user': return <Badge className="bg-blue-50 text-blue-700 border-0">User</Badge>
        default: return <Badge className="bg-gray-50 text-gray-700 border-0">{type}</Badge>
    }
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'pending': return <Badge className="bg-red-50 text-red-700 border-0">Pending Review</Badge>
        case 'investigating': return <Badge className="bg-yellow-50 text-yellow-700 border-0">Investigating</Badge>
        case 'resolved': return <Badge className="bg-green-50 text-green-700 border-0">Resolved</Badge>
        default: return <Badge className="bg-gray-50 text-gray-700 border-0">{status}</Badge>
    }
}

export default function ReportsPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState('all')

    const filteredReports = reports.filter(r => {
        const matchesSearch = r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.reason.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' || r.status === filter
        return matchesSearch && matchesFilter
    })

    const pendingCount = reports.filter(r => r.status === 'pending').length

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
                        <p className="text-muted-foreground mt-1">Review flagged content and spam reports.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative w-full md:w-60">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search reports..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]/30 rounded-xl bg-white"
                            />
                        </div>
                        <select
                            className="h-10 rounded-xl border border-gray-200 px-3 text-sm bg-white"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Reports</option>
                            <option value="pending">Pending</option>
                            <option value="investigating">Investigating</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* Alert for pending */}
                {pendingCount > 0 && (
                    <Card className="border-none shadow-md bg-red-50 border-l-4 border-l-red-500">
                        <CardContent className="p-4 flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span className="text-red-700 font-medium">{pendingCount} report(s) need your attention</span>
                        </CardContent>
                    </Card>
                )}

                {/* Reports List */}
                <div className="space-y-4">
                    {filteredReports.map((report) => (
                        <Card key={report.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${report.status === 'pending' ? 'bg-red-50' : report.status === 'investigating' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                                        <Flag className={`w-5 h-5 ${report.status === 'pending' ? 'text-red-500' : report.status === 'investigating' ? 'text-yellow-500' : 'text-green-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            {getTypeBadge(report.type)}
                                            {getStatusBadge(report.status)}
                                            <span className="text-xs text-gray-400">{report.time}</span>
                                        </div>
                                        <p className="text-gray-900 font-medium mb-1">{report.reason}</p>
                                        <p className="text-gray-600 text-sm mb-2">{report.content}</p>
                                        <p className="text-xs text-gray-400">Reported by: {report.reportedBy}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="rounded-lg">
                                            <Eye className="w-4 h-4 mr-1" /> View
                                        </Button>
                                        {report.status !== 'resolved' && (
                                            <>
                                                <Button variant="outline" size="sm" className="rounded-lg text-green-600 border-green-200 hover:bg-green-50">
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                                <Button variant="outline" size="sm" className="rounded-lg text-red-600 border-red-200 hover:bg-red-50">
                                                    <XCircle className="w-4 h-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center text-sm text-gray-500">
                    Showing {filteredReports.length} of {reports.length} reports
                </div>
            </div>
        </AdminPageTransition>
    )
}
