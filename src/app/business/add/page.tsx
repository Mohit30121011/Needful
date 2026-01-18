import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BusinessFormWizard } from "@/components/business/BusinessFormWizard";
import { createClient } from "@/lib/supabase/server";
import { AnimatedBackgroundLight, ParticleBackground } from "@/components/auth/AnimatedBackground";
import { Briefcase } from 'lucide-react';

export default async function AddBusinessPage() {
    const supabase = await createClient();
    const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            {/* Premium Background Layer */}
            <div className="fixed inset-0 z-0">
                <AnimatedBackgroundLight />
                <ParticleBackground />
            </div>

            <div className="relative z-10">
                <Header />
            </div>

            <main className="flex-1 container mx-auto px-4 pt-32 pb-8 md:pt-36 md:pb-16 max-w-5xl relative z-10">
                <div className="text-center mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 font-bold text-sm border border-orange-200">
                        <Briefcase className="w-4 h-4" />
                        Partner with Us
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Grow your business with <span className="bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 bg-clip-text text-transparent transform hover:scale-105 transition-transform inline-block cursor-default">Needful</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Join <span className="font-semibold text-gray-900">4,000+</span> trusted providers. List your services for free and reach customers in your neighborhood today.
                    </p>
                </div>

                {/* The Wizard Component */}
                <div className="bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-500/10 border border-white/60 overflow-hidden relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100">
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-red-500 to-amber-500" />
                    <BusinessFormWizard categories={categories || []} />
                </div>
            </main>

            <div className="relative z-10 bg-white/50 backdrop-blur-lg border-t border-white/20">
                <Footer />
            </div>
        </div>
    );
}
