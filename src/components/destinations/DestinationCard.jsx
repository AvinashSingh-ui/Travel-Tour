'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function DestinationCard({ destination }) {
    return (
        <Link href={`/destinations/${destination.slug}`} className='group'>
            <div className='bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>

                <div className='relative h-52 w-full overflow-hidden'>
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />

                    <span className='absolute top-3 left-3 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md'>
                        {destination.category}
                    </span>
                </div>

                <div className='p-4'>
                    <h3 className='text-lg font-bold text-white group-hover:text-zinc-300 transition-colors'>
                        {destination.name}
                    </h3>
                    <p className='text-sm text-zinc-400 mt-1 line-clamp-2'>
                        {destination.shortDescription}
                    </p>

                    <div className='flex items-center justify-between mt-3'>
                        <div className='flex items-center gap-1 text-sm text-zinc-300'>
                            <span>⭐</span>
                            <span className='font-medium'>{destination.rating}</span>
                        </div>
                        <div className='text-sm text-zinc-500'>
                            {destination.duration}
                        </div>
                    </div>

                    <div className='mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between'>
                        <p className='text-white font-bold text-lg'>
                            ${destination.price}
                        </p>
                        <span className='text-xs text-zinc-500'>per person</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default DestinationCard
