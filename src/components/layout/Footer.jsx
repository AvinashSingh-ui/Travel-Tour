import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='text-center mt-8 py-5 bg-orange-600 text-white'>
            <ul className='text-2xl flex justify-center gap-8'>
                <li><Link href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>Instagram</Link></li>
                <li><Link href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>Facebook</Link></li>
                <li><Link href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>Twitter</Link></li>
                <li><Link href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>Youtube</Link></li>
            </ul>
            <ul className='py-3 text-lg flex justify-center gap-8'>
                <li><Link href='/about'>About</Link></li>
                <li><Link href='/destinations'>Destinations</Link></li>
                <li><Link href='/saved'>Saved</Link></li>
                <li><Link href='/contact'>Contact</Link></li>
                <li><Link href='/privacypolicy'>Privacy Policy</Link></li>
            </ul>
            <p className='text-xl py-2' suppressHydrationWarning>
                ©2026 Travel Tour. All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer