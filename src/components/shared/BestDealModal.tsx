'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle } from 'lucide-react'

interface BestDealModalProps {
    isOpen: boolean
    onClose: () => void
    businessName: string
}

export function BestDealModal({ isOpen, onClose, businessName }: BestDealModalProps) {
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[440px] p-0 gap-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl">

                {step === 1 ? (
                    <div className="p-8">
                        {/* Header */}
                        <DialogHeader className="space-y-4 mb-8">
                            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Get Best Deal
                            </DialogTitle>
                            <p className="text-center text-gray-600 text-sm leading-relaxed">
                                Get instant quotes from <span className="font-semibold text-gray-900">{businessName}</span><br />
                                <span className="text-xs text-gray-500">and 3+ verified providers</span>
                            </p>
                        </DialogHeader>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Name Input */}
                            <div className="relative">
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=" "
                                    className="h-14 rounded-2xl border-0 bg-gray-50/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-[#FF5200]/30 focus:shadow-lg focus:shadow-[#FF5200]/10 transition-all duration-300 text-base peer pl-4 pt-6"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#FF5200]"
                                >
                                    Your Name
                                </label>
                            </div>

                            {/* Mobile Input */}
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none z-10">
                                    <span className="text-gray-600 font-bold text-sm">+91</span>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                </div>
                                <Input
                                    id="mobile"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    placeholder=" "
                                    type="tel"
                                    maxLength={10}
                                    className="h-14 rounded-2xl border-0 bg-gray-50/80 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-[#FF5200]/30 focus:shadow-lg focus:shadow-[#FF5200]/10 transition-all duration-300 text-base pl-20 pt-6 peer"
                                />
                                <label
                                    htmlFor="mobile"
                                    className="absolute left-20 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[#FF5200]"
                                >
                                    Mobile Number
                                </label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                className="w-full bg-gradient-to-r from-[#FF5200] to-[#FF6A00] hover:from-[#E04800] hover:to-[#E05800] text-white font-bold h-14 rounded-2xl text-base transition-all duration-300 active:scale-[0.98] hover:shadow-2xl hover:shadow-[#FF5200]/40 shadow-lg shadow-[#FF5200]/20 border-0"
                                onClick={() => setStep(2)}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Get Free Quotes
                                    <span className="text-lg">→</span>
                                </span>
                            </Button>

                            {/* Terms */}
                            <p className="text-xs text-center text-gray-400 leading-relaxed">
                                By continuing, you agree to our{' '}
                                <button className="text-gray-600 font-medium hover:text-[#FF5200] transition-colors underline decoration-dotted">
                                    Terms & Privacy
                                </button>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="p-10 text-center">
                        {/* Success Animation */}
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                            <div className="relative w-28 h-28 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-2xl">
                                <CheckCircle className="h-16 w-16 text-green-600 fill-green-600 animate-bounce" strokeWidth={2.5} />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
                            All Set! 🎉
                        </h3>
                        <p className="text-gray-600 leading-relaxed px-4 mb-8">
                            <span className="font-semibold text-gray-900">{businessName}</span> and 3 top providers<br />
                            will reach out within <span className="font-semibold text-[#FF5200]">15 minutes</span>
                        </p>

                        <Button
                            className="bg-gradient-to-r from-[#FF5200] to-[#FF6A00] hover:from-[#E04800] hover:to-[#E05800] text-white rounded-2xl h-12 px-10 font-bold transition-all duration-300 active:scale-95 shadow-lg shadow-[#FF5200]/20 hover:shadow-2xl hover:shadow-[#FF5200]/40 border-0"
                            onClick={onClose}
                        >
                            Done
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
