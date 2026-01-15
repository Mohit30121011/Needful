import * as z from 'zod';

// --- Shared / Base Schema ---
export const businessBaseSchema = z.object({
    business_name: z.string().min(3, "Business name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"), // e.g. Bandra West
    address: z.string().min(5, "Full address is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid Pincode").optional().or(z.literal('')),

    // Contact
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number"),
    email: z.string().email().optional().or(z.literal('')),
    website: z.string().url().optional().or(z.literal('')),

    // Meta
    category_id: z.string().uuid("Invalid Category"),
    category_slug: z.string(), // Helper for frontend logic
});

// --- Dynamic Details Schemas ---

// 1. Restaurant
export const restaurantDetailsSchema = z.object({
    cuisines: z.array(z.string()).min(1, "Select at least one cuisine"),
    veg_non_veg: z.enum(['Veg', 'Non-Veg', 'Both']),
    avg_cost: z.string().min(1, "Average cost is required"), // e.g. "500 for two"
    amenities: z.array(z.string()).optional(), // AC, Wifi, Parking
});

// 2. Doctor / Medical
export const doctorDetailsSchema = z.object({
    specialization: z.string().min(1, "Specialization is required"),
    qualification: z.string().optional(),
    experience_years: z.coerce.number().min(0).optional(),
    consultation_fee: z.coerce.number().min(0).optional(),
});

// 3. Hotel
export const hotelDetailsSchema = z.object({
    star_rating: z.coerce.number().min(1).max(7).optional(),
    check_in_time: z.string().optional(),
    check_out_time: z.string().optional(),
    amenities: z.array(z.string()).optional(), // Pool, Gym, Spa
});

// 4. Default / Generic Service
export const genericDetailsSchema = z.object({
    services_offered: z.array(z.string()).optional(),
    experience_years: z.coerce.number().optional(),
});

// --- Combined Schema for Form (Discriminated Union could be used, but simple intersection is easier for now) ---
// We will validate 'details' field manually or as a refinement based on 'category_slug'
export const createBusinessSchema = businessBaseSchema.extend({
    // Instead of a strict union, we'll keep details as a flexible record and validate logic layer or custom superRefine
    details: z.record(z.string(), z.any()),

    // Media (MVP: Just URLs for now, validation happens elsewhere)
    images: z.array(z.string().url()).optional(),
});

export type CreateBusinessInput = z.infer<typeof createBusinessSchema>;
