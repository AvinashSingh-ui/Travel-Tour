import React, { Suspense } from 'react'
import { filterDestinations } from '@/data/destinations'
import DestinationGrid from '@/components/destinations/DestinationGrid'
import SearchBar from '@/components/destinations/SearchBar'
import CategoryFilter from '@/components/destinations/CategoryFilter'

export const metadata = {
    title: 'Destinations',
    description: 'Browse our curated collection of travel destinations around the world.',
}

export const instant = false

export default async function DestinationsPage({ searchParams }) {
    const params = await searchParams
    const category = params?.category || 'All'
    const search = params?.search || ''

    const filtered = filterDestinations(category, search)

    return (
        <div className='max-w-6xl mx-auto px-4 py-10'>
            <div className='mb-8'>
                <h1 className='text-3xl font-extrabold text-white tracking-tight'>Destinations</h1>
                <p className='text-zinc-400 mt-1'>Find your next adventure</p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                <Suspense fallback={<div className='h-10 bg-zinc-800/60 rounded-xl animate-pulse w-full max-w-md' />}>
                    <SearchBar />
                </Suspense>
            </div>

            <div className='mb-8'>
                <Suspense fallback={<div className='h-10 bg-zinc-800/60 rounded-xl animate-pulse w-64' />}>
                    <CategoryFilter />
                </Suspense>
            </div>

            <p className='text-sm text-zinc-500 mb-4'>
                {filtered.length} destination{filtered.length !== 1 ? 's' : ''} found
            </p>

            <DestinationGrid destinations={filtered} />
        </div>
    )
}
