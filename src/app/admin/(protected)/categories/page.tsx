'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit2, Trash2, FolderTree, Search } from 'lucide-react'
import { toast } from 'sonner'
import { AdminPageTransition } from '@/components/admin/AdminPageTransition'

interface Category {
    id: string
    name: string
    slug: string
    icon: string
    description: string
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const supabase = createClient()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        const { data, error } = await (supabase as any)
            .from('categories')
            .select('*')
            .order('name')

        if (error) {
            toast.error('Failed to load categories')
        } else {
            setCategories(data || [])
        }
        setLoading(false)
    }

    const filteredCategories = categories.filter(c =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <AdminPageTransition>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Categories</h1>
                        <p className="text-muted-foreground mt-1">Manage business categories on the platform.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative w-full md:w-60">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 border-gray-200 focus:border-[#FF5200] focus:ring-[#FF5200]/30 rounded-xl bg-white"
                            />
                        </div>
                        <Button className="bg-[#FF5200] hover:bg-[#E04800] text-white rounded-xl">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                        <div className="col-span-full text-center py-12 text-gray-500">Loading categories...</div>
                    ) : filteredCategories.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-gray-500">No categories found.</div>
                    ) : (
                        filteredCategories.map((category) => (
                            <Card key={category.id} className="border-none shadow-md hover:shadow-lg transition-shadow group">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl">
                                                {category.icon || '📁'}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                                <p className="text-sm text-gray-500">{category.slug}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#FF5200] hover:bg-orange-50 rounded-lg">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {category.description && (
                                        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{category.description}</p>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                <div className="text-center text-sm text-gray-500">
                    {filteredCategories.length} categories total
                </div>
            </div>
        </AdminPageTransition>
    )
}
