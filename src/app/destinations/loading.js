import React from 'react'

export default function Loading() {
    return (
        <div className='max-w-6xl mx-auto px-4 py-10'>
            <div className='mb-8'>
                <div className='h-8 w-48 bg-zinc-800 rounded animate-pulse' />
                <div className='h-4 w-64 bg-zinc-800/60 rounded animate-pulse mt-2' />
            </div>

            <div className='h-10 bg-zinc-800/60 rounded-xl animate-pulse w-full max-w-md mb-8' />

            <div className='flex gap-2 mb-8'>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className='h-9 w-20 bg-zinc-800/60 rounded-full animate-pulse' />
                ))}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className='bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-md'>
                        <div className='h-52 bg-zinc-800 animate-pulse' />
                        <div className='p-4 space-y-3'>
                            <div className='h-5 w-3/4 bg-zinc-800 rounded animate-pulse' />
                            <div className='h-4 w-full bg-zinc-800/60 rounded animate-pulse' />
                            <div className='h-4 w-1/2 bg-zinc-800/60 rounded animate-pulse' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
