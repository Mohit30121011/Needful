import { Category, Provider, Service, ProviderImage, ProviderWithDetails } from '@/types/database';

const areas = [
    'Andheri West', 'Andheri East', 'Bandra West', 'Bandra East', 'Juhu',
    'Borivali West', 'Borivali East', 'Kandivali West', 'Kandivali East',
    'Malad West', 'Malad East', 'Goregaon West', 'Goregaon East',
    'Dadar', 'Worli', 'Lower Parel', 'Colaba', 'Fort', 'Marine Lines',
    'Powai', 'Vikhroli', 'Ghatkopar', 'Mulund', 'Thane West', 'Vashi',
    'Nerul', 'Belapur', 'Khar West', 'Santacruz West', 'Chembur'
];

const firstNames = ['Royal', 'Super', 'Best', 'Premium', 'Star', 'Elite', 'Golden', 'Silver', 'Crystal', 'Diamond', 'City', 'Mumbai', 'Urban', 'Metro', 'Rapid', 'Quick', 'Expert', 'Pro', 'Master', 'Top'];
const lastNames = ['Services', 'Solutions', 'Works', 'Hub', 'Point', 'Center', 'Care', 'Clinic', 'Studio', 'Agency', 'Group', 'Enterprises', 'Brothers', 'Partners', 'Tech', 'Zone', 'World', 'Plaza', 'Square', 'Corner'];

const categories: Category[] = [
    { id: 'c1', name: 'Electricians', slug: 'electricians', icon: 'Zap', display_order: 1 },
    { id: 'c2', name: 'Plumbers', slug: 'plumbers', icon: 'Wrench', display_order: 2 },
    { id: 'c3', name: 'AC Repair', slug: 'ac-repair', icon: 'AirVent', display_order: 3 },
    { id: 'c4', name: 'Restaurants', slug: 'restaurants', icon: 'UtensilsCrossed', display_order: 4 },
    { id: 'c5', name: 'Beauty & Spa', slug: 'beauty-spa', icon: 'Sparkles', display_order: 5 },
    { id: 'c6', name: 'Doctors', slug: 'doctors', icon: 'Stethoscope', display_order: 6 },
    { id: 'c7', name: 'Contractors', slug: 'contractors', icon: 'HardHat', display_order: 7 },
    { id: 'c8', name: 'Hotels', slug: 'hotels', icon: 'Hotel', display_order: 8 },
];

const categoryImages: Record<string, string[]> = {
    'electricians': ['https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500', 'https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500'],
    'plumbers': ['https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500', 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=500'],
    'ac-repair': ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500'],
    'restaurants': ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500'],
    'beauty-spa': ['https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500'],
    'doctors': ['https://images.unsplash.com/photo-1537368910025-bc008f3416ef?w=500', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
    'contractors': ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500'],
    'hotels': ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500']
};

function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomRating() {
    return (3.5 + Math.random() * 1.5).toFixed(1);
}

export const generateMockProviders = (): ProviderWithDetails[] => {
    const providers: ProviderWithDetails[] = [];
    let idCounter = 1;

    categories.forEach(category => {
        // Generate 500+ providers per category
        for (let i = 0; i < 500; i++) {
            const area = getRandomElement(areas);
            const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)} ${category.name}`;

            const provider: ProviderWithDetails = {
                id: `mock-p-${idCounter++}`,
                user_id: `user-${idCounter}`,
                business_name: name,
                slug: name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') + `-${idCounter}`,
                description: `Professional ${category.name} services in ${area}. We provide high-quality service with 100% satisfaction guarantee.`,
                address: `Shop No. ${Math.floor(Math.random() * 100) + 1}, Main Road, ${area}, Mumbai`,
                city: 'Mumbai',
                phone: `+91 98${Math.floor(Math.random() * 100000000)}`,
                whatsapp: `+91 98${Math.floor(Math.random() * 100000000)}`,
                email: `contact@${name.split(' ')[0].toLowerCase()}.com`,
                category_id: category.id,
                is_verified: Math.random() > 0.3,
                is_responsive: Math.random() > 0.4,
                is_available: true,
                operating_hours: '9:00 AM - 9:00 PM',
                rating: parseFloat(generateRandomRating()),
                review_count: Math.floor(Math.random() * 5000) + 10,
                views: Math.floor(Math.random() * 10000) + 100,
                created_at: new Date().toISOString(),
                categories: category,
                services: [],
                provider_images: [
                    {
                        id: `img-${idCounter}-1`,
                        provider_id: `mock-p-${idCounter}`,
                        url: getRandomElement(categoryImages[category.slug] || categoryImages['electricians']),
                        display_order: 1,
                        is_primary: true
                    }
                ]
            };

            providers.push(provider);
        }
    });

    return providers;
};
