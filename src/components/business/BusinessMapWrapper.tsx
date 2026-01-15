'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const BusinessMapContent = dynamic(() => import('./BusinessMap'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[250px] rounded-xl bg-gray-100" />
})

export function BusinessMapWrapper(props: any) {
    return <BusinessMapContent {...props} />
}
