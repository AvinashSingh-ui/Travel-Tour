import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='text-center mt-12 py-8 bg-gradient-to-t from-black to-zinc-950 border-t border-white/10 text-white'>
            <ul className='text-xl sm:text-2xl flex justify-center gap-8'>
                <li><Link href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer' className='text-zinc-400 hover:text-white transition-colors'>Instagram</Link></li>
                <li><Link href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer' className='text-zinc-400 hover:text-white transition-colors'>Facebook</Link></li>
                <li><Link href='https://twitter.com/' target='_blank' rel='noopener noreferrer' className='text-zinc-400 hover:text-white transition-colors'>Twitter</Link></li>
                <li><Link href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer' className='text-zinc-400 hover:text-white transition-colors'>Youtube</Link></li>
            </ul>
            <ul className='py-4 text-sm sm:text-base flex justify-center gap-8 text-zinc-400'>
                <li><Link href='/about' className='hover:text-white transition-colors'>About</Link></li>
                <li><Link href='/destinations' className='hover:text-white transition-colors'>Destinations</Link></li>
                <li><Link href='/saved' className='hover:text-white transition-colors'>Saved</Link></li>
                <li><Link href='/contact' className='hover:text-white transition-colors'>Contact</Link></li>
                <li><Link href='/privacypolicy' className='hover:text-white transition-colors'>Privacy Policy</Link></li>
            </ul>
            <p className='text-sm py-2 text-zinc-500' suppressHydrationWarning>
                ©2026 Travel Tour. All Rights Reserved.
            </p>
        </div>
    )
}

export default Footer