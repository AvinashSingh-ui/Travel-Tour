'use client'

import React, { useState, useEffect } from 'react'
import { isFavorite, toggleFavorite } from '@/lib/favorites'

function SaveButton({ slug }) {
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        setSaved(isFavorite(slug))
    }, [slug])

    const handleToggle = () => {
        const { added } = toggleFavorite(slug)
        setSaved(added)
    }

    return (
        <button
            onClick={handleToggle}
            className={`flex-1 font-semibold py-3 rounded-xl transition-colors cursor-pointer
                ${saved
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
        >
            {saved ? '♥ Saved' : '♡ Save to Favorites'}
        </button>
    )
}

export default SaveButton
