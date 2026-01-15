import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    Heart,
    Share2,
    ChevronRight,
    Star,
    CheckCircle,
    Eye,
    ArrowLeft
} from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RatingStars, RatingBadge } from '@/components/shared/RatingStars'
import { TrustBadge, AvailabilityBadge } from '@/components/shared/TrustBadge'
import { ProviderActions } from '@/components/shared/ProviderActions'
import { ReviewActions } from '@/components/shared/ReviewActions'
import { EnquiryForm } from '@/components/shared/EnquiryForm'
import { OpenStreetMap } from '@/components/shared/OpenStreetMap'
import { ProviderTabsContainer } from '@/components/shared/ProviderTabs'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
    params: Promise<{ slug: string }>
}

interface ProviderImage {
    id: string
    url: string
    is_primary: boolean
}

interface Service {
    id: string
    title: string
    description: string | null
    price: number | null
    price_unit: string | null
}

interface Review {
    id: string
    rating: number
    comment: string | null
    created_at: string
    users: { name: string | null } | null
}

interface Category {
    id: string
    name: string
    slug: string
}

interface ProviderData {
    id: string
    business_name: string
    slug: string
    description: string | null
    address: string | null
    city: string
    phone: string | null
    whatsapp: string | null
    email: string | null
    is_verified: boolean
    is_responsive: boolean
    is_available: boolean
    operating_hours: string | null
    rating: number
    review_count: number
    views: number
    category_id: string
    categories: Category | null
    services: Service[]
    provider_images: ProviderImage[]
    reviews: Review[]
}

interface RelatedProvider {
    id: string
    business_name: string
    slug: string
    rating: number
    review_count: number
    provider_images: { url: string; is_primary: boolean }[]
}

export default async function ProviderDetailPage({ params }: PageProps) {
    const { slug } = await params
    const supabase = await createClient()

    // Fetch provider with related data
    const { data: rawProvider, error } = await supabase
        .from('providers')
        .select(`
      id,
      business_name,
      slug,
      description,
      address,
      city,
      phone,
      whatsapp,
      email,
      is_verified,
      is_responsive,
      is_available,
      operating_hours,
      rating,
      review_count,
      views,
      category_id,
      categories (id, name, slug),
      services (id, title, description, price, price_unit),
      provider_images (id, url, is_primary),
      reviews (
        id,
        rating,
        comment,
        created_at,
        users (name)
      )
    `)
        .eq('slug', slug)
        .single()

    if (error || !rawProvider) {
        notFound()
    }

    const provider = rawProvider as unknown as ProviderData

    // Note: View count increment should be done via server action or RPC for type safety

    // Get related providers
    const { data: rawRelatedProviders } = await supabase
        .from('providers')
        .select(`
      id,
      business_name,
      slug,
      rating,
      review_count,
      provider_images (url, is_primary)
    `)
        .eq('category_id', provider.category_id)
        .neq('id', provider.id)
        .limit(4)

    const relatedProviders = (rawRelatedProviders || []) as unknown as RelatedProvider[]

    const primaryImage = provider.provider_images?.find((img) => img.is_primary)?.url
        || provider.provider_images?.[0]?.url
        || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800'

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 pt-20">
                {/* Breadcrumb */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center text-sm text-gray-600">
                            <Link href="/" className="hover:text-primary">Home</Link>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <Link href={`/search?category=${provider.categories?.slug || ''}`} className="hover:text-primary">
                                {provider.categories?.name || 'Services'}
                            </Link>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <Link href={`/search?city=${provider.city}`} className="hover:text-primary">
                                {provider.city}
                            </Link>
                            <ChevronRight className="h-4 w-4 mx-1" />
                            <span className="text-gray-900 truncate">{provider.business_name}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6">
                    {/* Back Button */}
                    <Link href="/search" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-4">
                        <ArrowLeft className="h-4 w-4" />
                        Back to results
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Provider Header Card */}
                            <Card className="overflow-hidden">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Image Gallery */}
                                        <div className="relative w-full md:w-64 h-48 md:h-64 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                            <Image
                                                src={primaryImage}
                                                alt={provider.business_name}
                                                fill
                                                className="object-cover"
                                            />
                                            {provider.provider_images && provider.provider_images.length > 1 && (
                                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                                    +{provider.provider_images.length - 1} photos
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-4 mb-3">
                                                <div>
                                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                                                        {provider.is_verified && (
                                                            <CheckCircle className="inline h-5 w-5 text-blue-600 mr-1" />
                                                        )}
                                                        {provider.business_name}
                                                    </h1>
                                                    <p className="text-gray-600">{provider.categories?.name || 'Service Provider'}</p>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <RatingBadge rating={provider.rating} reviewCount={provider.review_count} />
                                                {provider.is_verified && <TrustBadge type="verified" />}
                                                {provider.is_responsive && <TrustBadge type="responsive" />}
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-start gap-2 text-gray-600 mb-3">
                                                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <span>{provider.address || ''}{provider.address ? ', ' : ''}{provider.city}</span>
                                            </div>

                                            {/* Availability */}
                                            <AvailabilityBadge
                                                isOpen={provider.is_available}
                                                hours={provider.operating_hours || undefined}
                                                className="mb-4"
                                            />

                                            {/* Views */}
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Eye className="h-4 w-4" />
                                                <span>{provider.views?.toLocaleString() || 0} views</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Actions */}
                                    <Separator className="my-4" />
                                    <div className="flex flex-wrap gap-3">
                                        {provider.phone && (
                                            <Button asChild className="bg-green-600 hover:bg-green-700 gap-2">
                                                <a href={`tel:${provider.phone}`}>
                                                    <Phone className="h-4 w-4" />
                                                    {provider.phone}
                                                </a>
                                            </Button>
                                        )}
                                        {provider.whatsapp && (
                                            <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 gap-2">
                                                <a href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                                                    <MessageCircle className="h-4 w-4" />
                                                    WhatsApp
                                                </a>
                                            </Button>
                                        )}
                                        {provider.email && (
                                            <Button asChild variant="outline" className="gap-2">
                                                <a href={`mailto:${provider.email}`}>
                                                    <Mail className="h-4 w-4" />
                                                    Email
                                                </a>
                                            </Button>
                                        )}
                                        <ProviderActions
                                            providerId={provider.id}
                                            providerName={provider.business_name}
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* Tabbed Content Section */}
                            <ProviderTabsContainer
                                description={provider.description}
                                services={provider.services}
                                reviews={provider.reviews}
                                images={provider.provider_images}
                                operatingHours={provider.operating_hours}
                                phone={provider.phone}
                                email={provider.email}
                                address={provider.address}
                                city={provider.city}
                            />
                        </div>

                        {/* Enquiry Form */}
                        <div className="lg:sticky lg:top-20 space-y-4">
                            <EnquiryForm
                                categoryName={provider.categories?.name || 'Service'}
                                providerName={provider.business_name}
                            />

                            {/* Map View */}
                            <OpenStreetMap
                                address={provider.address || ''}
                                city={provider.city}
                            />

                            {/* Contact Card */}
                            <Card className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                                <div className="space-y-3">
                                    {provider.phone && (
                                        <a
                                            href={`tel:${provider.phone}`}
                                            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                                        >
                                            <Phone className="h-5 w-5" />
                                            <span className="font-medium">{provider.phone}</span>
                                        </a>
                                    )}
                                    {provider.whatsapp && (
                                        <a
                                            href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg text-green-700 hover:bg-green-100 transition-colors"
                                        >
                                            <MessageCircle className="h-5 w-5" />
                                            <span className="font-medium">WhatsApp</span>
                                        </a>
                                    )}
                                    {provider.email && (
                                        <a
                                            href={`mailto:${provider.email}`}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <Mail className="h-5 w-5" />
                                            <span className="font-medium">{provider.email}</span>
                                        </a>
                                    )}
                                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-gray-700">
                                        <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-500" />
                                        <span>{provider.address || ''}{provider.address ? ', ' : ''}{provider.city}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Related Providers */}
                            {relatedProviders && relatedProviders.length > 0 && (
                                <Card className="p-4 mt-4">
                                    <h3 className="font-semibold text-gray-900 mb-4">Similar Providers</h3>
                                    <div className="space-y-3">
                                        {relatedProviders.map((related) => {
                                            const relatedImage = related.provider_images?.find(
                                                (img) => img.is_primary
                                            )?.url || related.provider_images?.[0]?.url

                                            return (
                                                <Link
                                                    key={related.id}
                                                    href={`/provider/${related.slug}`}
                                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        {relatedImage && (
                                                            <Image
                                                                src={relatedImage}
                                                                alt={related.business_name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 truncate">
                                                            {related.business_name}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            {related.rating} ({related.review_count})
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
