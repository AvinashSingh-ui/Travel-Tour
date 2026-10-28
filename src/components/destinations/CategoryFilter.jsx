'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { categories } from '@/data/destinations'

function CategoryFilter() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category') || 'All'

    const handleCategoryChange = (category) => {
        const params = new URLSearchParams(searchParams.toString())

        if (category === 'All') {
            params.delete('category')
        } else {
            params.set('category', category)
        }

        router.push(`/destinations?${params.toString()}`)
    }

    return (
        <div className='flex flex-wrap gap-2'>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
                        ${currentCategory === category
                            ? 'bg-white text-black font-semibold shadow-md'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
