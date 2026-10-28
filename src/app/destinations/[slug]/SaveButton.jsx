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
            className={`flex-1 font-semibold py-3 rounded-xl transition-all cursor-pointer
                ${saved
                    ? 'bg-zinc-800 text-white border border-zinc-600 hover:bg-zinc-700'
                    : 'bg-white text-black hover:bg-zinc-200 shadow-md'
                }`}
        >
            {saved ? '♥ Saved' : '♡ Save to Favorites'}
        </button>
    )
}

export default SaveButton
