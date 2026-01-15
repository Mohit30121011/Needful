'use client'

import { useState, useEffect } from 'react'
import { ThumbsUp, MessageCircle, Share2, Send, Check } from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { addReviewComment, getReviewComments, type ReviewComment } from '@/app/actions/reviews'

interface ReviewActionsProps {
    reviewId: string
    initialHelpfulCount?: number
    initialComments?: ReviewComment[]
}

export function ReviewActions({ reviewId, initialHelpfulCount = 0, initialComments = [] }: ReviewActionsProps) {
    const [helpfulCount, setHelpfulCount] = useState(initialHelpfulCount)
    const [hasMarkedHelpful, setHasMarkedHelpful] = useState(false)
    const [showCommentInput, setShowCommentInput] = useState(false)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [comments, setComments] = useState<ReviewComment[]>(initialComments)

    useEffect(() => {
        const loadComments = async () => {
            const { comments: fetched } = await getReviewComments(reviewId)
            if (fetched && fetched.length > 0) {
                setComments(prev => {
                    const existingIds = new Set(prev.map(c => c.id))
                    const uniqueNew = fetched.filter(c => !existingIds.has(c.id))
                    return [...prev, ...uniqueNew]
                })
            }
        }
        loadComments()
    }, [reviewId])

    const checkAuth = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        return user
    }

    const handleHelpful = async () => {
        const user = await checkAuth()
        if (!user) {
            toast.error('Please sign in to mark reviews as helpful')
            return
        }

        if (hasMarkedHelpful) {
            setHelpfulCount(prev => prev - 1)
            setHasMarkedHelpful(false)
            toast('Removed helpful vote', {
                icon: <Check className="w-4 h-4 text-gray-500" />
            })
        } else {
            setHelpfulCount(prev => prev + 1)
            setHasMarkedHelpful(true)
            toast.success('Marked as helpful')
        }
    }

    const handleComment = async () => {
        const user = await checkAuth()
        if (!user) {
            toast.error('Please sign in to comment on reviews')
            return
        }
        setShowCommentInput(!showCommentInput)
    }

    const submitComment = async () => {
        if (!comment.trim()) return

        const user = await checkAuth()
        if (!user) {
            toast.error('Please sign in to comment')
            return
        }

        setIsSubmitting(true)

        try {
            const result = await addReviewComment(reviewId, comment.trim())

            if ('error' in result) {
                toast.error(result.error)
            } else if (result.comment) {
                // Add to local state
                setComments(prev => [...prev, result.comment as ReviewComment])
                setComment('')
                setShowCommentInput(false)
                toast.success('Comment posted!')
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
            toast.error('Failed to post comment')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleShare = async () => {
        const url = window.location.href
        if (navigator.share) {
            try {
                await navigator.share({ url })
            } catch (error) {
                // User cancelled
            }
        } else {
            await navigator.clipboard.writeText(url)
            toast.success('Link copied!')
        }
    }

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr)
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return date.toLocaleDateString()
    }

    return (
        <div className="pt-3 mt-3">
            {/* Action buttons */}
            <div className="flex items-center gap-1">
                <button
                    onClick={handleHelpful}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${hasMarkedHelpful
                        ? 'text-blue-600 bg-blue-50 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <ThumbsUp className={`h-4 w-4 ${hasMarkedHelpful ? 'fill-current' : ''}`} />
                    <span>Helpful{helpfulCount > 0 ? ` (${helpfulCount})` : ''}</span>
                </button>

                <button
                    onClick={handleComment}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${showCommentInput
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <MessageCircle className="h-4 w-4" />
                    <span>Comment{comments.length > 0 ? ` (${comments.length})` : ''}</span>
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </button>
            </div>

            {/* Comment input */}
            <AnimatePresence>
                {showCommentInput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center gap-2 mt-3">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a reply..."
                                className="flex-1 px-4 py-2.5 bg-white border border-[#FF5200]/50 rounded-full text-sm focus:outline-none focus:border-[#FF5200] focus:ring-2 focus:ring-[#FF5200]/20 transition-all placeholder:text-gray-400"
                                onKeyDown={(e) => e.key === 'Enter' && !isSubmitting && submitComment()}
                            />
                            <button
                                onClick={submitComment}
                                disabled={!comment.trim() || isSubmitting}
                                className="w-10 h-10 bg-[#FF5200] hover:bg-[#E04800] text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Display submitted comments */}
            <AnimatePresence>
                {comments.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                    >
                        {comments.map((c) => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-6 h-6 bg-[#FF5200] rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">
                                            {c.user_name[0].toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{c.user_name}</span>
                                    <span className="text-xs text-gray-400">
                                        {formatTime(c.created_at)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 pl-8">{c.comment}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
