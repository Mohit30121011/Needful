'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { submitContactForm } from '@/app/actions/contact'
import { toast } from 'sonner'

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required'
        } else if (formData.subject.trim().length < 3) {
            newErrors.subject = 'Subject must be at least 3 characters'
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required'
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error('Please fix the errors in the form')
            return
        }

        setIsLoading(true)

        try {
            const result = await submitContactForm(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                setIsSuccess(true)
                toast.success('Message sent successfully! We\'ll get back to you soon.')
                setFormData({ name: '', email: '', subject: '', message: '' })
                setErrors({})
                setTimeout(() => setIsSuccess(false), 3000)
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value })
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' })
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1 bg-[#FFFBF7] relative overflow-hidden">
                {/* Background Gradients - contained within main */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                                We'd Love to <span className="relative inline-block"><span className="text-[#FF5200]">Hear From You</span>
                                    <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#FF5200]/80" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="none" />
                                    </svg></span>
                            </h1>
                            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-wider mt-4 mb-4">Get in Touch</span>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Have a question about a service? Want to join as a pro? Or just want to say hi? Drop us a message.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contact Info Cards */}
                            <div className="space-y-6">
                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                                    <p className="text-gray-500 mb-4">For general inquiries and support.</p>
                                    <a href="mailto:hello@needful.com" className="text-[#FF5200] font-bold hover:underline">hello@needful.com</a>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                                    <p className="text-gray-500 mb-4">Mon-Fri from 9am to 6pm.</p>
                                    <a href="tel:+919876543210" className="text-[#FF5200] font-bold hover:underline">+91 98765 43210</a>
                                </div>

                                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-6">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                                    <p className="text-gray-500 mb-4">Come say hello at our office.</p>
                                    <span className="text-gray-700 font-medium">123 Startup Hub, Tech Park,<br />Mumbai, India</span>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2 relative">
                                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                                    <h2 className="text-2xl font-black text-gray-900 mb-2">Send a Message</h2>
                                    <p className="text-gray-500 text-sm mb-8">We'll get back to you within 24 hours</p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Your Name *</label>
                                                <input
                                                    type="text"
                                                    placeholder="Rahul Sharma"
                                                    value={formData.name}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                    className={`w-full h-14 px-6 rounded-xl bg-gray-50 border-2 ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#FF5200]/30'} focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 ml-1">Your Email *</label>
                                                <input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    className={`w-full h-14 px-6 rounded-xl bg-gray-50 border-2 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#FF5200]/30'} focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                                                        <AlertCircle className="w-3 h-3" /> {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Subject *</label>
                                            <input
                                                type="text"
                                                placeholder="How can we help?"
                                                value={formData.subject}
                                                onChange={(e) => handleChange('subject', e.target.value)}
                                                className={`w-full h-14 px-6 rounded-xl bg-gray-50 border-2 ${errors.subject ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#FF5200]/30'} focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400`}
                                            />
                                            {errors.subject && (
                                                <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                                                    <AlertCircle className="w-3 h-3" /> {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 ml-1">Message *</label>
                                            <textarea
                                                rows={5}
                                                placeholder="Tell us more about your query..."
                                                value={formData.message}
                                                onChange={(e) => handleChange('message', e.target.value)}
                                                className={`w-full p-6 rounded-xl bg-gray-50 border-2 ${errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-[#FF5200]/30'} focus:bg-white focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-medium text-gray-900 resize-none placeholder:text-gray-400`}
                                            ></textarea>
                                            {errors.message && (
                                                <p className="text-red-500 text-xs flex items-center gap-1 ml-1">
                                                    <AlertCircle className="w-3 h-3" /> {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isLoading || isSuccess}
                                            className="w-full h-14 bg-gradient-to-r from-[#FF5200] via-orange-500 to-amber-500 hover:from-[#E04800] hover:via-orange-600 hover:to-amber-600 text-white rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 transform hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : isSuccess ? (
                                                <>
                                                    <CheckCircle className="w-5 h-5 mr-2" />
                                                    Message Sent!
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
