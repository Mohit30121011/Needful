'use client'

import { Star, MapPin, Search, Zap, Droplets, Sparkles, Home, Play, Apple } from 'lucide-react';

export function AppDownload() {
    return (
        <section className="py-20 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-16 relative overflow-hidden text-white shadow-2xl">
                    {/* Background Accent Shapes */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5200]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Left: Content */}
                        <div className="flex-1 w-full text-center lg:text-left z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-medium text-xs mb-6 border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Available for iOS & Android
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Book Services <br />
                                <span className="text-orange-500">On The Go</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
                                Find trusted professionals, book instantly, track your service, and chat with providers — all from your mobile device.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <button className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 w-full sm:w-auto justify-center">
                                    <span className="w-6 h-6"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.5 1.3 0 2.18.88 2.86.88.7 0 1.83-.91 3.08-.91 1.28 0 2.43.51 3.11 1.08-2.64 1.6-4.5 5.6-2.6 8.56zm-4.33-15.5c.78-1 1.5-2.02 1.36-3.13-1.16.03-2.64.67-3.4 1.54-.7.78-1.28 2.05-1.12 3.07 1.3.1 2.63-.76 3.16-1.48z" /></svg></span>
                                    <div className="text-left">
                                        <div className="text-[10px] font-medium opacity-60">Download on the</div>
                                        <div className="text-sm leading-none">App Store</div>
                                    </div>
                                </button>
                                <button className="flex items-center gap-3 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95 w-full sm:w-auto justify-center">
                                    <span className="w-6 h-6"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91,3.34,2.39,3.84,2.15L13.69,12L3.84,21.85C3.34,21.6,3,21.09,3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.3,13.08L18.33,16.64L15.39,13.7L20.3,13.08M18.33,7.36L20.3,10.92L15.39,10.3L18.33,7.36M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88M13.69,12L3.84,2.15C3.34,1.91,3,1.4,3,0.81V0.5H21V23.5H3V20.5C3,19.91,3.34,19.39,3.84,19.15L13.69,12Z" /></svg></span>
                                    <div className="text-left">
                                        <div className="text-[10px] font-medium opacity-60">GET IT ON</div>
                                        <div className="text-sm leading-none">Google Play</div>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#1E2028] flex items-center justify-center`} style={{ backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899', '#F97316'][i - 1] }}>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left ml-2">
                                    <div className="text-white font-bold text-sm">Join <span className="text-white">50,000+</span> users</div>
                                    <div className="flex text-yellow-400 text-xs gap-0.5">
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                        <Star className="w-3 h-3 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Mockup Composition */}
                        <div className="flex-1 w-full relative h-[600px] flex items-center justify-center overflow-visible mt-10 lg:mt-0">
                            {/* Desktop/Tablet Mockups - Hidden on Mobile, Visible on LG */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] hidden lg:block opacity-40 scale-75 blur-[1px]">
                                <div className="w-full aspect-video bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                                    {/* Mock Desktop Header */}
                                    <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <div className="w-3 h-3 rounded-full bg-green-400" />
                                    </div>
                                    {/* Mock Content */}
                                    <div className="p-8">
                                        <div className="flex gap-8">
                                            <div className="w-64 h-40 bg-gray-100 rounded-lg" />
                                            <div className="flex-1 space-y-4">
                                                <div className="h-8 bg-gray-100 rounded w-3/4" />
                                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* phone mockup */}
                            <div className="relative w-[280px] md:w-[300px] aspect-[9/19] z-20 mx-auto transform hover:scale-105 transition-transform duration-500">
                                <div className="relative h-full bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-800">
                                    {/* Screen */}
                                    <div className="relative h-full bg-gray-50 rounded-[2.5rem] overflow-hidden flex flex-col">
                                        {/* Status Bar */}
                                        <div className="h-8 bg-white flex items-center justify-between px-6 pt-2 shrink-0 z-10">
                                            <span className="text-[10px] font-bold">9:41</span>
                                            <div className="flex gap-1">
                                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                            </div>
                                        </div>

                                        {/* App Header */}
                                        <div className="bg-white px-4 py-3 shrink-0 shadow-sm z-10">
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin className="w-4 h-4 text-orange-500" />
                                                <span className="text-xs font-bold text-gray-800">Home</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                                                <Search className="w-3 h-3 text-gray-400" />
                                                <span className="text-[10px] text-gray-400">Search for help...</span>
                                            </div>
                                        </div>

                                        {/* Scrollable Content */}
                                        <div className="flex-1 overflow-hidden p-3 space-y-3">
                                            {/* Categories */}
                                            <div className="flex gap-3 overflow-hidden">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Zap className="w-4 h-4 text-orange-600" /></div>
                                                    <span className="text-[8px] font-medium">Electric</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><Droplets className="w-4 h-4 text-blue-600" /></div>
                                                    <span className="text-[8px] font-medium">Plumbing</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"><Sparkles className="w-4 h-4 text-purple-600" /></div>
                                                    <span className="text-[8px] font-medium">Cleaning</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center"><Play className="w-4 h-4 text-pink-600" /></div>
                                                    <span className="text-[8px] font-medium">Salon</span>
                                                </div>
                                            </div>

                                            {/* Banner */}
                                            <div className="w-full h-24 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl relative overflow-hidden flex items-center px-4">
                                                <div className="text-white">
                                                    <div className="text-xs font-bold">20% OFF</div>
                                                    <div className="text-[8px] opacity-90">First Booking</div>
                                                </div>
                                                <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-white/20 rounded-full blur-xl" />
                                            </div>

                                            {/* Top Pros List */}
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-900 mb-2">Recommended Pros</div>
                                                <div className="space-y-2">
                                                    {[1, 2].map(i => (
                                                        <div key={i} className="bg-white p-2 rounded-xl flex gap-2 shadow-sm">
                                                            <div className="w-10 h-10 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                                                                <img src={`https://i.pravatar.cc/150?img=${i + 20}`} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="text-[10px] font-bold truncate">Rahul Sharma</div>
                                                                <div className="text-[8px] text-gray-500">Electrician • 4.9 ★</div>
                                                            </div>
                                                            <div className="w-6 h-6 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-[10px]">
                                                                +
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Nav */}
                                        <div className="h-12 bg-white border-t flex items-center justify-around px-2 shrink-0">
                                            <Home className="w-5 h-5 text-orange-600" />
                                            <Search className="w-5 h-5 text-gray-300" />
                                            <div className="w-5 h-5 bg-gray-200 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Notch */}
                                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-xl z-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
