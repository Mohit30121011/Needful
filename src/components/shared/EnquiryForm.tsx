'use client'

import { useState } from 'react'
import { Send, User, Phone, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface EnquiryFormProps {
    categoryName: string
    providerName: string
}

export function EnquiryForm({ categoryName, providerName }: EnquiryFormProps) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [requirements, setRequirements] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name.trim() || !phone.trim()) {
            toast.error('Please fill in all fields')
            return
        }

        if (phone.length < 10) {
            toast.error('Please enter a valid phone number')
            return
        }

        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSuccess(true)
        toast.success(`Enquiry sent to ${providerName}!`)

        setTimeout(() => {
            setIsSuccess(false)
            setName('')
            setPhone('')
            setRequirements('')
            setIsSubmitting(false)
        }, 3000)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-orange-500/5 overflow-hidden relative"
        >
            {/* Success Overlay */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <CheckCircle2 className="h-10 w-10 text-green-600" />
                            </div>
                        </motion.div>
                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl font-bold text-gray-900 mb-2"
                        >
                            Enquiry Sent!
                        </motion.h3>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-500"
                        >
                            {providerName} will contact you shortly.
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            Connect Instantly <Sparkles className="h-4 w-4 text-[#FF5200] animate-pulse" />
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Get best quotes from top {categoryName || 'experts'}
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-4">
                    {/* Name Input */}
                    <motion.div
                        className="relative group"
                        animate={{ scale: focusedField === 'name' ? 1.02 : 1 }}
                    >
                        <div className={`absolute left-4 top-3.5 transition-colors ${focusedField === 'name' ? 'text-[#FF5200]' : 'text-gray-400'}`}>
                            <User className="h-5 w-5" />
                        </div>
                        <Input
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-11 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all duration-300"
                        />
                    </motion.div>

                    {/* Phone Input */}
                    <motion.div
                        className="relative group"
                        animate={{ scale: focusedField === 'phone' ? 1.02 : 1 }}
                    >
                        <div className={`absolute left-4 top-3.5 transition-colors ${focusedField === 'phone' ? 'text-[#FF5200]' : 'text-gray-400'}`}>
                            <Phone className="h-5 w-5" />
                        </div>
                        <Input
                            placeholder="Mobile Number"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-11 h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:bg-white focus:border-[#FF5200] focus:ring-[#FF5200]/20 transition-all duration-300"
                        />
                    </motion.div>

                    {/* Requirements Input (Optional) */}
                    <motion.div
                        className="relative group"
                        animate={{ scale: focusedField === 'req' ? 1.02 : 1 }}
                    >
                        <textarea
                            placeholder="Describe your requirements (Optional)..."
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            onFocus={() => setFocusedField('req')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full min-h-[80px] p-3 pl-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#FF5200] focus:ring-4 focus:ring-[#FF5200]/10 transition-all duration-300 resize-none text-sm outline-none"
                        />
                    </motion.div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-gradient-to-r from-[#FF5200] via-[#FF6B2C] to-[#FF8F50] hover:from-[#E04800] hover:to-[#FF6B2C] text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 text-base"
                    >
                        {isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Sending...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>Get Callback</span>
                                <Send className="h-4 w-4" />
                            </div>
                        )}
                    </Button>
                </motion.div>

                <p className="text-xs text-center text-gray-400">
                    By submitting, you agree to our Terms & Privacy Policy
                </p>
            </form>
        </motion.div>
    )
}
