import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Advertise', href: '/advertise' },
    ],
    forUsers: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Reviews', href: '/reviews' },
        { label: 'Blog', href: '/blog' },
    ],
    forBusinesses: [
        { label: 'Business Dashboard', href: '/dashboard' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Partner Program', href: '/partners' },
    ],
    categories: [
        { label: 'Electricians', href: '/search?category=electricians' },
        { label: 'Plumbers', href: '/search?category=plumbers' },
        { label: 'AC Repair', href: '/search?category=ac-repair' },
        { label: 'Restaurants', href: '/search?category=restaurants' },
    ]
}

export function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-orange-50 text-gray-700 relative overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF5200] via-orange-400 to-amber-400" />

            {/* Background Decorations */}
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[120px]" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-amber-100/30 rounded-full blur-[120px]" />

            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 mb-6 relative group">
                            <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <img src="/logo.png" alt="Needful" className="w-32 h-auto object-contain relative z-10" />
                        </div>
                        <p className="text-base text-gray-500 leading-relaxed max-w-sm">
                            Needful connects you with verified local professionals for home services, lifestyle needs, and business solutions. Fast, secure, and reliable.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#FF5200] hover:text-white hover:border-[#FF5200] transition-all duration-300 group cursor-pointer">
                                    <Icon className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Company */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Company</h4>
                            <ul className="space-y-4">
                                {footerLinks.company.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-[#FF5200] transition-colors flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Used For */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Explore</h4>
                            <ul className="space-y-4">
                                {footerLinks.forUsers.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-[#FF5200] transition-colors flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-6">Popular</h4>
                            <ul className="space-y-4">
                                {footerLinks.categories.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-gray-500 hover:text-[#FF5200] transition-colors flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5200] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-orange-100 bg-orange-50/50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} Needful Inc. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                            <Link href="/privacy" className="hover:text-[#FF5200] transition-colors cursor-pointer">Privacy</Link>
                            <Link href="/terms" className="hover:text-[#FF5200] transition-colors cursor-pointer">Terms</Link>
                            <Link href="/sitemap" className="hover:text-[#FF5200] transition-colors cursor-pointer">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
