import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const GROQ_API_KEY = process.env.GROQ_API_KEY

const SYSTEM_PROMPT = `You are Needful AI, a professional and polite local service concierge for Mumbai.

Guidelines:
1. **Tone**: Use polite, professional Hinglish (e.g., "Ji", "Aap").
2. **NEGATIVE CONSTRAINT**: NEVER use words like "Bhai", "Yaar", "Bro", or "Buddy". Use "Sir/Ma'am" or just neutral polite language.
3. **Directness**: Answer the question directly. DO NOT repeat what the user asked.
4. **Context Usage**: You MUST use the provided Context.
5. **RICH DATA MANTRA**:
   - ALWAYS mention the **Rating** (e.g., 4.8⭐) and **Review Count** (e.g., 125 reviews) for EVERY recommendation.
   - Mention the **Location** (e.g., Andheri West).
   - Mention **Prices** if available.
6. **Unavailable Data**: If specific details (like price) are missing, say "Rates available on request" or similar. DO NOT hallucinate.
7. **Brevity**: Keep responses under 100 words. Be crisp and helpful.
8. **Format**: Use bullet points for multiple options.

Example Interaction:
User: "Best plumber in Andheri?"
Bot: "Ye rahe top options Andheri mein:
* **QuickFix Plumbers** (4.8⭐, 210 reviews) - Andheri West. Quick service, ₹500 visiting charge.
* **Mumbai Plumbing Co.** (4.5⭐, 85 reviews) - Azad Nagar. 24/7 available.
Kaunsa book karoon aapke liye?"
`

export async function POST(request: Request) {
    try {
        const { messages, userLocation } = await request.json()

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
        }

        const lastMessage = messages[messages.length - 1]
        const message = lastMessage.content
        const messageHistory = messages.slice(0, -1).map((m: any) => ({
            role: m.role,
            content: m.content
        }))

        const supabase = await createClient()
        const lowerMessage = message.toLowerCase()

        // Enhanced keyword mapping
        const categoryKeywords: Record<string, string> = {
            'electrician': 'electrician',
            'plumber': 'plumber',
            'carpenter': 'carpenter',
            'clean': 'cleaning',
            'pest': 'pest-control',
            'ac': 'ac-repair',
            'cool': 'ac-repair',
            'fridge': 'appliance-repair',
            'washing': 'appliance-repair',
            'repair': 'appliance-repair', // fallback
            'food': 'restaurants',
            'restaurant': 'restaurants',
            'restraunt': 'restaurants', // typo
            'eat': 'restaurants',
            'hotel': 'restaurants',
            'cafe': 'restaurants',
            'mechanic': 'mechanics',
            'car': 'mechanics',
            'bike': 'mechanics',
            'salon': 'salon',
            'beauty': 'salon',
            'hair': 'salon',
            'massage': 'massage',
            'tiffin': 'tiffin-service'
        }

        let targetSlug: string | null = null
        for (const [key, slug] of Object.entries(categoryKeywords)) {
            if (lowerMessage.includes(key)) {
                targetSlug = slug
                break
            }
        }

        const isAskingForClosest = lowerMessage.includes('closest') || lowerMessage.includes('near') || lowerMessage.includes('distance')

        // 1. Search for providers in DB (regardless of API Key)
        let providers: any[] = []
        try {
            let query = supabase
                .from('providers')
                .select(`
                    id, 
                    business_name, 
                    description,
                    rating, 
                    review_count,
                    city, 
                    address,
                    phone,
                    latitude,
                    longitude,
                    operating_hours,
                    categories!inner(name, slug),
                    services(title, price, price_unit),
                    status
                `)

            // Filter for Approved businesses ONLY
            // We use .or to handle cases where status might be missing or explicitly approved
            // But since we want strict approval flow now:
            query = query.eq('status', 'approved')

            // If checking closest, we grab more candidates to sort in JS
            if (isAskingForClosest && userLocation) {
                query = query.limit(20)
            } else {
                query = query.order('rating', { ascending: false }).limit(5)
            }

            if (targetSlug) {
                query = query.eq('categories.slug', targetSlug)
            } else {
                if (message.length > 3) {
                    query = query.ilike('business_name', `%${message.split(' ')[0]}%`)
                }
            }

            const { data, error } = await query

            if (error) {
                console.error('Supabase error:', error)
            } else if (data) {
                providers = data
            }
        } catch (dbError) {
            console.error('DB error:', dbError)
        }

        // Calculate distances if location provided
        if (userLocation && userLocation.lat && userLocation.lon) {
            providers = providers.map(p => {
                let distance = 999
                if (p.latitude && p.longitude) {
                    distance = calculateDistance(userLocation.lat, userLocation.lon, p.latitude, p.longitude)
                }
                return { ...p, distance }
            })

            if (isAskingForClosest) {
                // Sort by distance
                providers.sort((a, b) => a.distance - b.distance)
                providers = providers.slice(0, 5) // Take top 5 closest
            }
        }

        // Build RICH context
        let context = ''
        if (providers.length > 0) {
            context = '\n\n=== RELEVANT PROVIDERS (Use this data to answer) ===\n' + providers.map((p, i) => {
                const servicesList = p.services?.map((s: any) => `${s.title} (${s.price ? '₹' + s.price : 'Inquire'})`).join(', ') || 'General Services'
                const distInfo = p.distance && p.distance < 100 ? ` (${p.distance.toFixed(1)} km away)` : ''

                return `
${i + 1}. **${p.business_name}**${distInfo}
   - Rating: ${p.rating}⭐ (${p.review_count} reviews)
   - Category: ${p.categories?.name}
   - Location: ${p.address}, ${p.city}
   - Timings: ${p.operating_hours || 'Not specified'}
   - Description: ${p.description || 'No description'}
   - Key Services: ${servicesList}
   - Contact: ${p.phone || 'N/A'}
`
            }).join('\n')

            if (isAskingForClosest && !userLocation) {
                context += '\n\n[System Note: User asked for "closest" providers, but their Location was NOT provided. Displaying Top Rated instead. Please politely inform the user to enable location for distance features.]'
            }
        } else {
            if (messageHistory.length > 0) {
                context = '\n\n[System Note: No NEW providers found for this specific query. The user might be asking a follow-up question about the providers mentioned in the Conversation History. Please answer based on the history if applicable.]'
            } else if (message.length > 3) {
                context = '\n\n[System Note: No specific local providers found in database matching the LATEST query keywords.]'
            }
        }

        // 2. CHECK API KEY - MOCK MODE FALLBACK
        if (!GROQ_API_KEY) {
            // Mock Mode: Construct a basic helpful response using the provider data directly
            if (providers.length > 0) {
                let mockResponse = `Mujhe details mil gayi hain! Ye rahe kuch best options:\n\n`
                providers.slice(0, 3).forEach((p, i) => {
                    const stars = '⭐'.repeat(Math.round(p.rating))
                    mockResponse += `**${i + 1}. ${p.business_name}**\n`
                    mockResponse += `   ${stars} (${p.rating})\n`
                    mockResponse += `   📍 ${p.area || p.city}\n`
                    if (p.phone) mockResponse += `   📞 ${p.phone}\n`
                    mockResponse += `\n`
                })
                mockResponse += `Kya aap kisi ko call karna chahenge?`

                return NextResponse.json({ response: mockResponse })
            } else {
                return NextResponse.json({
                    response: "Maaf kijiye, mujhe koi services nahi mili. Aap 'Search' page par try kar sakte hain ya kuch aur search karein! 🔍"
                })
            }
        }

        // 3. Call Groq API (Only if Key exists)
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messageHistory, // Inject history
                    { role: 'user', content: `User Query: "${message}"\n\nContext:${context}` }
                ],
                temperature: 0.5, // Lower temperature for more factual answers based on context
                max_tokens: 250
            })
        })

        if (!groqResponse.ok) {
            // Fallback if API fails but we have data
            if (providers.length > 0) {
                let response = `Groq server busy hai, lekin ye options mile hain:\n\n`
                providers.slice(0, 3).forEach((p, i) => {
                    response += `**${p.business_name}** (${p.rating}⭐)\n📍 ${p.city}\n\n`
                })
                return NextResponse.json({ response })
            }
            return NextResponse.json({ response: 'Abhi server busy hai, thodi der baad try karein!' })
        }

        const groqData = await groqResponse.json()
        const aiResponse = groqData.choices?.[0]?.message?.content || 'Maaf kijiye, main samajh nahi paaya.'

        return NextResponse.json({ response: aiResponse })

    } catch (error) {
        console.error('Chat error:', error)
        return NextResponse.json({ response: 'Technical error aaya hai. Search page try karein.' })
    }
}

// Haversine Distance Helper (km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}
