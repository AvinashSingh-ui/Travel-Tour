'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function DestinationCard({ destination }) {
    return (
        <Link href={`/destinations/${destination.slug}`} className='group'>
            <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>

                <div className='relative h-52 w-full overflow-hidden'>
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />

                    <span className='absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full'>
                        {destination.category}
                    </span>
                </div>

                <div className='p-4'>
                    <h3 className='text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors'>
                        {destination.name}
                    </h3>
                    <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
                        {destination.shortDescription}
                    </p>

                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-1 text-sm text-amber-500'>
                            <span>⭐</span>
                            <span className='font-medium'>{destination.rating}</span>
                        </div>
                        <div className='text-sm text-gray-400'>
                            {destination.duration}
                        </div>
                    </div>

                    <div className='mt-3 pt-3 border-t border-gray-100 flex items-center justify-between'>
                        <p className='text-orange-600 font-bold text-lg'>
                            ${destination.price}
                        </p>
                        <span className='text-xs text-gray-400'>per person</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DestinationCard
