import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { destinations, getDestinationBySlug } from '@/data/destinations'
import SaveButton from './SaveButton'

export const instant = false

export async function generateStaticParams() {
    return destinations.map((dest) => ({
        slug: dest.slug,
    }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const destination = getDestinationBySlug(slug)

    if (!destination) {
        return { title: 'Not Found' }
    }

    return {
        title: destination.name,
        description: destination.description,
    }
}

export default async function DestinationDetailPage({ params }) {
    const { slug } = await params
    const destination = getDestinationBySlug(slug)

    if (!destination) {
        notFound()
    }

    return (
        <div className='max-w-4xl mx-auto px-4 py-10'>
            <Link
                href='/destinations'
                className='inline-flex items-center text-sm text-zinc-400 hover:text-white mb-6 transition-colors'
            >
                ← Back to Destinations
            </Link>

            <div className='relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800'>
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    priority
                    sizes='(max-width: 768px) 100vw, 800px'
                    className='object-cover'
                />
                <div className='absolute top-4 left-4'>
                    <span className='bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md'>
                        {destination.category}
                    </span>
                </div>
            </div>

            <div className='mt-8'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-extrabold text-white tracking-tight'>{destination.name}</h1>
                        <div className='flex items-center gap-4 mt-2 text-sm text-zinc-400'>
                            <span className='flex items-center gap-1'>
                                ⭐ <strong className='text-zinc-200'>{destination.rating}</strong>
                            </span>
                            <span>🕐 {destination.duration}</span>
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-3xl font-bold text-white'>${destination.price}</p>
                        <p className='text-xs text-zinc-500'>per person</p>
                    </div>
                </div>

                <p className='text-zinc-300 leading-relaxed mt-6'>
                    {destination.description}
                </p>

                <div className='mt-8'>
                    <h2 className='text-xl font-bold text-white mb-4'>Trip Highlights</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {destination.highlights.map((highlight) => (
                            <div
                                key={highlight}
                                className='flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl'
                            >
                                <span className='text-white font-bold'>✓</span>
                                <span className='text-sm text-zinc-300'>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                    <SaveButton slug={destination.slug} />
                    <Link
                        href='/contact'
                        className='flex-1 text-center border border-zinc-600 text-white hover:bg-white hover:text-black font-semibold py-3 rounded-xl transition-all'
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    )
}
