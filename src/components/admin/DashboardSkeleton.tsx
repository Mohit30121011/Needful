import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex flex-col gap-2">
                <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-64 bg-gray-100 rounded-lg"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="p-6 space-y-4 border-gray-100">
                        <div className="flex justify-between items-start">
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            <div className="h-10 w-10 bg-gray-100 rounded-xl"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-8 w-16 bg-gray-200 rounded"></div>
                            <div className="h-3 w-32 bg-gray-100 rounded"></div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Businesses Section Skeleton */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-6 w-40 bg-gray-200 rounded"></div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="border-b border-gray-100 p-4 grid grid-cols-4 gap-4 bg-gray-50/50">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded w-20"></div>
                        ))}
                    </div>
                    {/* Table Rows */}
                    <div className="divide-y divide-gray-100">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="p-4 grid grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                                    <div className="h-4 w-24 bg-gray-100 rounded"></div>
                                </div>
                                <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 bg-gray-100 rounded-xl"></div>
                                    <div className="h-8 w-8 bg-gray-100 rounded-xl"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
