'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Loader2, Eye, Trash2, CheckCircle, XCircle, MapPin, Phone } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'
import Link from 'next/link'

interface Business {
    id: string
    business_name: string
    city: string
    phone: string
    is_verified: boolean
    created_at: string
    slug: string
}

export default function BusinessesPage() {
    const [businesses, setBusinesses] = useState<Business[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const supabase = createClient()

    useEffect(() => {
        fetchBusinesses()
    }, [])

    const fetchBusinesses = async () => {
        setLoading(true)
        const { data, error } = await (supabase as any)
            .from('providers')
            .select('id, business_name, city, phone, is_verified, created_at, slug')
            .order('created_at', { ascending: false })

        if (error) {
            toast.error('Failed to load businesses')
        } else {
            setBusinesses(data || [])
        }
        setLoading(false)
    }

    const toggleVerification = async (id: string, currentStatus: boolean) => {
        const { error } = await (supabase as any)
            .from('providers')
            .update({ is_verified: !currentStatus })
            .eq('id', id)

        if (error) {
            toast.error('Failed to update status')
        } else {
            toast.success(`Business ${!currentStatus ? 'verified' : 'unverified'}`)
            fetchBusinesses()
        }
    }

    const filteredBusinesses = businesses.filter(b =>
        b.business_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Businesses</h1>
                        <p className="text-muted-foreground mt-1">Manage all registered businesses on the platform.</p>
                    </div>
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search businesses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]/30 rounded-xl bg-white"
                        />
                    </div>
                </div>

                <div className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow className="hover:bg-transparent border-gray-100">
                                <TableHead className="w-[300px]">Business</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-[#FF5200] mx-auto" />
                                    </TableCell>
                                </TableRow>
                            ) : filteredBusinesses.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                                        No businesses found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBusinesses.map((business) => (
                                    <TableRow key={business.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                        <TableCell>
                                            <span className="font-semibold text-gray-900 group-hover:text-[#FF5200] transition-colors">
                                                {business.business_name}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                                                <span className="text-sm">{business.city || '-'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <Phone className="h-3.5 w-3.5 text-gray-400" />
                                                <span className="text-sm">{business.phone || '-'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    business.is_verified
                                                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border-0'
                                                        : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-0'
                                                }
                                            >
                                                {business.is_verified ? 'Verified' : 'Pending'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-gray-500">
                                                {new Date(business.created_at).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/business/${business.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className={`h-8 w-8 rounded-lg ${business.is_verified ? 'text-yellow-500 hover:bg-yellow-50' : 'text-green-500 hover:bg-green-50'}`}
                                                    onClick={() => toggleVerification(business.id, business.is_verified)}
                                                >
                                                    {business.is_verified ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                    <span>Showing {filteredBusinesses.length} businesses</span>
                    <span>Sorted by newest first</span>
                </div>
            </div>
        </AdminPageTransition>
    )
}
