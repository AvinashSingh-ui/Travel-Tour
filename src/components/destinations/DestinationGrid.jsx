import React from 'react'
import DestinationCard from './DestinationCard'

function DestinationGrid({ destinations }) {
    if (destinations.length === 0) {
        return (
            <div className='text-center py-16'>
                <p className='text-2xl text-zinc-500'>🌍</p>
                <h3 className='text-lg font-semibold text-zinc-300 mt-2'>No destinations found</h3>
                <p className='text-sm text-zinc-500 mt-1'>Try adjusting your search or filter.</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {destinations.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
            ))}
        </div>
    )
}

export default DestinationGrid
