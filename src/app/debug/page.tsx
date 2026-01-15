'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'

export default function DebugPage() {
    const [logs, setLogs] = useState<string[]>([])

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])

    const runDiagnostics = async () => {
        setLogs([])
        addLog('Starting Diagnostics...')

        const supabase = createClient()

        // 1. Check Connection & Auth
        addLog('Checking Auth...')
        const { data: { user } } = await supabase.auth.getUser()
        addLog(`User: ${user ? user.email : 'Not Logged In'}`)

        // 2. Check Categories
        addLog('Fetching Categories...')
        const { data: categories, error: catError } = await supabase
            .from('categories')
            .select('*')

        const categoriesData = categories as any[] | null;
        if (catError) addLog('Error fetching categories: ' + JSON.stringify(catError))
        else {
            addLog(`Found ${categoriesData?.length} categories`)
            categoriesData?.forEach(c => addLog(`- ${c.name} (${c.slug})`))
        }

        // 3. Check Providers (Simple)
        addLog('Fetching top 5 providers...')
        const { data: providers, error: provError } = await supabase
            .from('providers')
            .select('id, business_name, city')
            .limit(5)

        const providersData = providers as any[] | null;
        if (provError) addLog('Error fetching providers: ' + JSON.stringify(provError))
        else {
            addLog(`Found ${providersData?.length} providers`)
            providersData?.forEach(p => addLog(`- ${p.business_name}`))
        }

        // 4. Check Join Query (Search Page Logic - Full)
        addLog('Testing FULL Search Query (with Images)...')
        try {
            const { data: joinData, error: joinError } = await supabase
                .from('providers')
                .select(`
                *,
                categories!inner(*),
                provider_images(*)
            `)
                .eq('categories.slug', 'restaurants')

            const joinDataTyped = joinData as any[] | null;
            if (joinError) {
                addLog('FULL QUERY ERROR: ' + JSON.stringify(joinError))
                // Check if it's the images relationship
                addLog('Retrying without images...')
                const { data: retryData, error: retryError } = await supabase
                    .from('providers')
                    .select(`*, categories!inner(*)`)
                    .eq('categories.slug', 'restaurants')
                const retryDataTyped = retryData as any[] | null;
                if (retryError) addLog('RETRY ERROR: ' + JSON.stringify(retryError))
                else addLog(`RETRY SUCCESS: Found ${retryDataTyped?.length} providers (Images relationship is likely the issue)`)

            } else {
                addLog(`FULL QUERY SUCCESS: Found ${joinDataTyped?.length} restaurants with images`)
                if (joinDataTyped && joinDataTyped.length > 0) {
                    addLog('Sample Image: ' + JSON.stringify(joinDataTyped[0].provider_images))
                }
            }
        } catch (e) {
            addLog('EXCEPTION: ' + e)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto p-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">🔍 Debug Menu</h1>
                <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                    <button
                        onClick={runDiagnostics}
                        className="bg-black text-white px-4 py-2 rounded-lg font-bold hover:bg-gray-800"
                    >
                        Run Diagnostics
                    </button>
                </div>

                <div className="bg-black text-green-400 p-6 rounded-xl shadow-lg font-mono text-sm min-h-[400px] overflow-auto">
                    {logs.length === 0 ? 'Click Run Diagnostics to start...' : logs.map((log, i) => (
                        <div key={i} className="mb-1">{log}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}
