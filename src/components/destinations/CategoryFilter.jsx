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
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                        ${currentCategory === category
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}

export default CategoryFilter
