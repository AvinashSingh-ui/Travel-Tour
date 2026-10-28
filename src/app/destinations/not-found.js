import React from 'react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='max-w-6xl mx-auto px-4 py-20 text-center'>
            <p className='text-6xl mb-4'>🗺️</p>
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>Destination Not Found</h2>
            <p className='text-gray-500 mb-6'>
                Sorry, we could not find the destination you are looking for.
            </p>
            <Link
                href='/destinations'
                className='inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition-colors'
            >
                ← Back to Destinations
            </Link>
        </div>
    )
}
