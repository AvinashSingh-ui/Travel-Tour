'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { destinations } from '@/data/destinations'
import { getSavedSlugs, removeFavorite } from '@/lib/favorites'

export default function SavedPage() {
    const [savedSlugs, setSavedSlugs] = useState([])
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setSavedSlugs(getSavedSlugs())
        setMounted(true)
    }, [])

    const handleRemove = (slug) => {
        const updated = removeFavorite(slug)
        setSavedSlugs(updated)
    }

    const savedDestinations = destinations.filter((d) =>
        savedSlugs.includes(d.slug)
    )

    if (!mounted) {
        return (
            <div className='max-w-6xl mx-auto px-4 py-10'>
                <h1 className='text-3xl font-extrabold text-white tracking-tight mb-8'>Saved Destinations</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className='bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-md'>
                            <div className='h-44 bg-zinc-800 animate-pulse' />
                            <div className='p-4 space-y-2'>
                                <div className='h-5 w-3/4 bg-zinc-800 rounded animate-pulse' />
                                <div className='h-4 w-1/2 bg-zinc-800/60 rounded animate-pulse' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='max-w-6xl mx-auto px-4 py-10'>
            <h1 className='text-3xl font-extrabold text-white tracking-tight mb-2'>Saved Destinations</h1>
            <p className='text-zinc-400 mb-8'>
                {savedDestinations.length} saved destination{savedDestinations.length !== 1 ? 's' : ''}
            </p>

            {savedDestinations.length === 0 ? (
                <div className='text-center py-16'>
                    <p className='text-5xl mb-4'>🤍</p>
                    <h3 className='text-lg font-semibold text-zinc-300'>No saved destinations yet</h3>
                    <p className='text-sm text-zinc-500 mt-1 mb-6'>
                        Browse destinations and tap the save button to add them here.
                    </p>
                    <Link
                        href='/destinations'
                        className='inline-block bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-3 rounded-full shadow-md transition-all'
                    >
                        Explore Destinations
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {savedDestinations.map((dest) => (
                        <div key={dest.slug} className='bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-xl transition-all'>
                            <Link href={`/destinations/${dest.slug}`}>
                                <div className='relative h-44 overflow-hidden'>
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        className='object-cover hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                            </Link>
                            <div className='p-4'>
                                <h3 className='font-bold text-white'>{dest.name}</h3>
                                <p className='text-sm text-zinc-400 mt-1'>{dest.shortDescription}</p>
                                <div className='flex items-center justify-between mt-3'>
                                    <span className='text-white font-bold'>${dest.price}</span>
                                    <button
                                        onClick={() => handleRemove(dest.slug)}
                                        className='text-sm text-zinc-400 hover:text-white transition-colors cursor-pointer'
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
