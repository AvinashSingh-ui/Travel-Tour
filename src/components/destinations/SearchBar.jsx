'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentSearch = searchParams.get('search') || ''

    const handleSearch = (e) => {
        const value = e.target.value
        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set('search', value)
        } else {
            params.delete('search')
        }

        router.push(`/destinations?${params.toString()}`)
    }

    return (
        <div className='relative w-full max-w-md'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500'>🔍</span>
            <input
                type='text'
                placeholder='Search destinations...'
                defaultValue={currentSearch}
                onChange={handleSearch}
                className='w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-sm transition-all'
            />
        </div>
    )
}

export default SearchBar
