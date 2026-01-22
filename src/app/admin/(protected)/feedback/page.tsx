"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, MessageSquare, CheckCircle, Clock, AlertCircle, Mail, Trash2, Reply, X, Send, User } from 'lucide-react'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

interface Feedback {
    id: string
    user_id: string | null
    name: string
    email: string
    subject: string
    message: string
    type: string
    status: string
    admin_reply: string | null
    admin_replied_at: string | null
    created_at: string
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'read': return <Badge className="bg-green-50 text-green-700 border-green-200">Read</Badge>
        case 'pending': return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
        case 'resolved': return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Resolved</Badge>
        case 'urgent': return <Badge className="bg-red-50 text-red-700 border-red-200">Urgent</Badge>
        default: return <Badge className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>
    }
}

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'bug': return <AlertCircle className="w-5 h-5 text-red-500" />
        case 'feature': return <Clock className="w-5 h-5 text-blue-500" />
        case 'praise': return <CheckCircle className="w-5 h-5 text-green-500" />
        default: return <MessageSquare className="w-5 h-5 text-gray-500" />
    }
}

export default function FeedbackPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [loading, setLoading] = useState(true)
    const [replyModalOpen, setReplyModalOpen] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
    const [replyText, setReplyText] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        fetchFeedbacks()
    }, [])

    const fetchFeedbacks = async () => {
        try {
            const { data, error } = await supabase
                .from('feedbacks')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setFeedbacks(data || []);
        } catch (error) {
            console.error("Error fetching feedbacks:", error);
            setFeedbacks([]);
        } finally {
            setLoading(false);
        }
    }

    const handleOpenReply = (feedback: Feedback) => {
        setSelectedFeedback(feedback)
        setReplyText(feedback.admin_reply || '')
        setReplyModalOpen(true)
    }

    const handleCloseReply = () => {
        setReplyModalOpen(false)
        setSelectedFeedback(null)
        setReplyText('')
    }

    const handleSubmitReply = async () => {
        if (!selectedFeedback || !replyText.trim()) {
            toast.error('Please enter a reply message')
            return
        }

        setIsSubmitting(true)
        try {
            const { error } = await supabase
                .from('feedbacks')
                .update({
                    admin_reply: replyText.trim(),
                    admin_replied_at: new Date().toISOString(),
                    status: 'resolved'
                })
                .eq('id', selectedFeedback.id)

            if (error) throw error

            toast.success('Reply sent successfully!')
            handleCloseReply()
            fetchFeedbacks() // Refresh the list
        } catch (error) {
            console.error('Error submitting reply:', error)
            toast.error('Failed to send reply. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteFeedback = async (feedbackId: string) => {
        if (!confirm('Are you sure you want to delete this feedback?')) return

        try {
            const { error } = await supabase
                .from('feedbacks')
                .delete()
                .eq('id', feedbackId)

            if (error) throw error

            toast.success('Feedback deleted')
            fetchFeedbacks()
        } catch (error) {
            console.error('Error deleting feedback:', error)
            toast.error('Failed to delete feedback')
        }
    }

    const handleMarkAsRead = async (feedbackId: string) => {
        try {
            const { error } = await supabase
                .from('feedbacks')
                .update({ status: 'read' })
                .eq('id', feedbackId)

            if (error) throw error
            fetchFeedbacks()
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const filteredFeedback = feedbacks.filter(f =>
        (f.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.message || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (f.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Stats Logic
    const pendingCount = feedbacks.filter(f => f.status === 'pending').length;
    const resolvedCount = feedbacks.filter(f => f.status === 'read' || f.status === 'resolved').length;

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Feedback</h1>
                        <p className="text-muted-foreground mt-1">User-submitted feedback and support requests.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search feedback..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]/30 rounded-xl bg-white"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="border-none shadow-sm bg-gradient-to-br from-yellow-50 to-white hover:shadow-md transition-all">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
                            <p className="text-sm text-yellow-600">Pending</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-gradient-to-br from-red-50 to-white hover:shadow-md transition-all">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-red-700">{feedbacks.filter(f => f.type === 'bug' || f.status === 'urgent').length}</p>
                            <p className="text-sm text-red-600">Urgent/Bugs</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-all">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-green-700">{resolvedCount}</p>
                            <p className="text-sm text-green-600">Resolved</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition-all">
                        <CardContent className="p-4 text-center">
                            <p className="text-2xl font-bold text-blue-700">{feedbacks.length}</p>
                            <p className="text-sm text-blue-600">Total</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Feedback List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading feedbacks...</div>
                    ) : filteredFeedback.length > 0 ? (
                        filteredFeedback.map((feedback) => (
                            <Card key={feedback.id} className="border-white/60 bg-white/60 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                                            {getTypeIcon(feedback.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h3 className="font-semibold text-gray-900 text-lg">{feedback.subject}</h3>
                                                {getStatusBadge(feedback.status)}
                                                {feedback.admin_reply && (
                                                    <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                                                        <Reply className="w-3 h-3 mr-1" />
                                                        Replied
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{feedback.message}</p>

                                            {/* Show admin reply if exists */}
                                            {feedback.admin_reply && (
                                                <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                                                    <p className="text-xs font-semibold text-purple-700 mb-1 flex items-center gap-1">
                                                        <Reply className="w-3 h-3" /> Admin Reply
                                                    </p>
                                                    <p className="text-sm text-purple-900">{feedback.admin_reply}</p>
                                                    {feedback.admin_replied_at && (
                                                        <p className="text-xs text-purple-500 mt-1">
                                                            {formatDistanceToNow(new Date(feedback.admin_replied_at), { addSuffix: true })}
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" /> {feedback.name}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {feedback.email}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {feedback.created_at ? formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true }) : 'Recently'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleOpenReply(feedback)}
                                            >
                                                <Reply className="w-4 h-4 mr-2" /> Reply
                                            </Button>
                                            {feedback.status === 'pending' && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleMarkAsRead(feedback.id)}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleDeleteFeedback(feedback.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                            No feedbacks found.
                        </div>
                    )}
                </div>
            </div>

            {/* Reply Modal */}
            {replyModalOpen && selectedFeedback && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Reply to Feedback</h2>
                                <button
                                    onClick={handleCloseReply}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Original Message */}
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs font-semibold text-gray-500 mb-1">From: {selectedFeedback.name} ({selectedFeedback.email})</p>
                                <p className="font-semibold text-gray-900 mb-2">{selectedFeedback.subject}</p>
                                <p className="text-sm text-gray-600">{selectedFeedback.message}</p>
                            </div>

                            {/* Reply Input */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Your Reply</label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply here..."
                                    rows={4}
                                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#FF5200] focus:ring-2 focus:ring-[#FF5200]/20 outline-none resize-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
                            <Button
                                variant="ghost"
                                onClick={handleCloseReply}
                                className="rounded-xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmitReply}
                                disabled={isSubmitting || !replyText.trim()}
                                className="bg-[#FF5200] hover:bg-[#E04800] text-white rounded-xl shadow-lg shadow-orange-500/20"
                            >
                                {isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" /> Send Reply
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </AdminPageTransition>
    )
}
