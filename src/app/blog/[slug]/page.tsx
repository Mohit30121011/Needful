import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { createClient } from '@/lib/supabase/server'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Blog article data
const articles: Record<string, {
    title: string
    category: string
    date: string
    author: string
    readTime: string
    image: string
    content: string[]
}> = {
    "home-maintenance-tips": {
        title: "10 Tips for Home Maintenance",
        category: "Home Care",
        date: "January 12, 2026",
        author: "Needful Team",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop",
        content: [
            "Keeping your home in top condition doesn't have to be overwhelming. With a little regular attention, you can prevent major problems before they start and save thousands in repair costs. Here are 10 essential maintenance tips every homeowner should follow.",
            "**1. Check Your HVAC Filters Monthly** - Dirty air filters force your heating and cooling system to work harder, increasing energy bills and reducing equipment lifespan. Replace filters every 1-3 months depending on usage.",
            "**2. Inspect Your Roof Twice a Year** - Look for missing, cracked, or curling shingles, especially after storms. Early detection of roof problems can prevent costly water damage inside your home.",
            "**3. Clean Gutters and Downspouts** - Clogged gutters cause water to overflow, leading to foundation issues, basement flooding, and landscaping damage. Clean them at least twice yearly.",
            "**4. Test Smoke and Carbon Monoxide Detectors** - Press the test button monthly and replace batteries annually. Replace the entire unit every 10 years for smoke detectors and 5-7 years for CO detectors.",
            "**5. Drain Your Water Heater** - Sediment buildup reduces efficiency. Drain a few gallons from the tank annually to flush out debris and extend the unit's life.",
            "**6. Seal Windows and Doors** - Check weatherstripping and caulking around windows and doors. Proper sealing prevents drafts and lowers heating/cooling costs.",
            "**7. Clean Dryer Vents** - Lint buildup is a serious fire hazard. Clean the lint trap after every load and have the vent professionally cleaned annually.",
            "**8. Check for Leaks** - Inspect under sinks, around toilets, and near appliances for signs of water damage. Small leaks can cause major problems if left unchecked.",
            "**9. Maintain Your Landscaping** - Trim trees and shrubs away from your home's exterior. Overgrown vegetation can damage siding and provide pathways for pests.",
            "**10. Schedule Professional Inspections** - Have your HVAC, plumbing, and electrical systems professionally inspected annually to catch issues early.",
            "Regular home maintenance is an investment in your property's value and your family's comfort. Create a maintenance calendar and stick to it – your future self will thank you!"
        ]
    },
    "choose-right-electrician": {
        title: "How to Choose the Right Electrician",
        category: "Expert Advice",
        date: "January 8, 2026",
        author: "Needful Expert",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
        content: [
            "Hiring the right electrician is crucial for your home's safety and your peace of mind. Electrical work done incorrectly can lead to fires, electrocution, and costly repairs. Here's how to find a qualified professional you can trust.",
            "**Verify Licensing and Insurance** - Always check that your electrician holds a valid license for your area. Licensed electricians have passed examinations proving their knowledge of electrical codes and safety practices. Additionally, ensure they carry liability insurance and workers' compensation to protect you from any on-site accidents.",
            "**Look for Experience** - Ask how long they've been in business and whether they have experience with your specific type of project. An electrician who specializes in residential work may not be the best choice for commercial installations, and vice versa.",
            "**Check Reviews and References** - Read online reviews on platforms like NeedFul, Google, and the Better Business Bureau. Ask the electrician for references from recent clients, and follow up by calling them. Ask about the quality of work, punctuality, and overall experience.",
            "**Get Multiple Quotes** - Don't just go with the first estimate. Get at least three detailed written quotes that itemize labor, materials, and any additional fees. Be wary of quotes that seem unusually low – they may indicate substandard work or hidden charges later.",
            "**Ask About Permits** - Major electrical work typically requires permits and inspections. A reputable electrician will handle the permit process and ensure the work passes inspection. Avoid anyone who suggests skipping this step to save money.",
            "**Understand the Warranty** - Ask about warranties on both labor and materials. Quality electricians stand behind their work with guarantees that protect you if something goes wrong.",
            "**Evaluate Communication** - Note how responsive and communicative the electrician is from your first contact. Do they return calls promptly? Do they explain things clearly? Good communication is essential for a smooth project.",
            "**Look for Professionalism** - A professional electrician arrives on time, keeps the work area clean, and treats your home with respect. Their vehicle and tools should be well-maintained, reflecting their attention to detail.",
            "Remember, electrical work is not the place to cut corners. Investing in a qualified, experienced electrician protects your home, your family, and your investment."
        ]
    },
    "wedding-venues-mumbai": {
        title: "Top Wedding Venues in Mumbai",
        category: "Events",
        date: "January 5, 2026",
        author: "Needful Lifestyle",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        content: [
            "Mumbai, the city of dreams, offers some of India's most spectacular wedding venues. Whether you're planning an intimate ceremony or a grand celebration, the city has options to match every vision and budget. Here are our top picks for unforgettable wedding venues in Mumbai.",
            "**The Taj Mahal Palace** - This iconic 5-star heritage hotel has hosted royalty and celebrities for over a century. The Sea Lounge and Crystal Room offer stunning views of the Gateway of India and the Arabian Sea. Perfect for couples seeking timeless elegance.",
            "**Dome at NSCI** - One of Mumbai's largest wedding venues, the Dome can accommodate up to 10,000 guests. Its grand architecture and modern amenities make it ideal for lavish celebrations. Multiple halls allow for different functions under one roof.",
            "**Turf Club Mumbai** - The Royal Western India Turf Club offers expansive lawns with a charming colonial ambiance. The open-air setting is perfect for evening receptions under the stars, with capacity for up to 2,000 guests.",
            "**ITC Maratha** - This luxury hotel combines Maratha heritage with world-class service. The Grand Central ballroom and Sterling Hall provide sophisticated settings for both traditional and contemporary celebrations.",
            "**Sahara Star** - Known for its unique dome-shaped venue inspired by a lotus, Sahara Star offers a truly distinctive backdrop. The LED-lit ceiling can transform to match any theme or color scheme.",
            "**Hotel Lalit** - Located near the airport, Hotel Lalit offers convenience without compromising on grandeur. The Celebration Lawn and Emerald Hall are popular choices for Mumbai weddings.",
            "**Bayview Lawns, JW Marriott** - The lush seaside lawns at JW Marriott Juhu offer a romantic setting with the Arabian Sea as your backdrop. Perfect for sunset ceremonies and cocktail receptions.",
            "**Tips for Booking Your Venue:**",
            "• Book 12-18 months in advance for popular dates\n• Consider off-peak seasons for better rates\n• Check for parking facilities and guest accommodation\n• Review catering options and restrictions\n• Visit the venue at the same time of day as your planned event",
            "Your wedding venue sets the tone for your entire celebration. Take time to visit multiple locations, ask the right questions, and choose a space that resonates with your personal style and vision for your special day."
        ]
    }
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogArticlePage({ params }: PageProps) {
    const { slug } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    let userData = null
    if (user) {
        const { data } = await supabase.from('users').select('name, email, role').eq('id', user.id).single()
        userData = data
    }

    const article = articles[slug]

    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header user={userData} />
            <main className="flex-1 bg-[#FFFBF7] pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
                {/* Background Gradient Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <article className="container mx-auto px-4 max-w-4xl relative z-10">
                    {/* Back Button */}
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5200] transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Blog</span>
                    </Link>

                    {/* Category Badge */}
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF5200]/10 text-[#FF5200] font-bold text-sm tracking-wide mb-4">
                        {article.category}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-3xl overflow-hidden mb-12 shadow-xl">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg prose-gray max-w-none">
                        {article.content.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className="text-gray-700 leading-relaxed mb-6"
                                dangerouslySetInnerHTML={{
                                    __html: paragraph
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 font-bold">$1</strong>')
                                        .replace(/\n/g, '<br />')
                                }}
                            />
                        ))}
                    </div>

                    {/* Share & CTA */}
                    <div className="mt-16 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Need professional help?</h3>
                        <p className="text-gray-500 mb-6">Find verified local professionals for all your service needs on NeedFul.</p>
                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center px-6 py-3 bg-[#FF5200] text-white font-bold rounded-xl hover:bg-[#e04800] transition-colors"
                        >
                            Find Professionals
                        </Link>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    )
}

export async function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({
        slug,
    }))
}
