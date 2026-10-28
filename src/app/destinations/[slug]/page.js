import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { destinations, getDestinationBySlug } from '@/data/destinations'
import SaveButton from './SaveButton'

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
                className='inline-flex items-center text-sm text-gray-500 hover:text-orange-600 mb-6 transition-colors'
            >
                ← Back to Destinations
            </Link>

            <div className='relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-lg'>
                <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    priority
                    sizes='(max-width: 768px) 100vw, 800px'
                    className='object-cover'
                />
                <div className='absolute top-4 left-4'>
                    <span className='bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                        {destination.category}
                    </span>
                </div>
            </div>

            <div className='mt-8'>
                <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl font-bold text-gray-800'>{destination.name}</h1>
                        <div className='flex items-center gap-4 mt-2 text-sm text-gray-500'>
                            <span className='flex items-center gap-1'>
                                ⭐ <strong className='text-amber-500'>{destination.rating}</strong>
                            </span>
                            <span>🕐 {destination.duration}</span>
                        </div>
                    </div>
                    <div className='text-right'>
                        <p className='text-3xl font-bold text-orange-600'>${destination.price}</p>
                        <p className='text-xs text-gray-400'>per person</p>
                    </div>
                </div>

                <p className='text-gray-600 leading-relaxed mt-6'>
                    {destination.description}
                </p>

                <div className='mt-8'>
                    <h2 className='text-xl font-bold text-gray-800 mb-4'>Trip Highlights</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {destination.highlights.map((highlight) => (
                            <div
                                key={highlight}
                                className='flex items-center gap-3 bg-orange-50 p-3 rounded-xl'
                            >
                                <span className='text-orange-600'>✓</span>
                                <span className='text-sm text-gray-700'>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                    <SaveButton slug={destination.slug} />
                    <Link
                        href='/contact'
                        className='flex-1 text-center border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-xl transition-colors'
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </div>
    )
}
