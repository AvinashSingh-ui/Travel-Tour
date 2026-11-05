import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50'>
        <Link href='/' className='text-xl font-extrabold tracking-wider text-white hover:text-zinc-300 transition-colors uppercase'>
            Travel Tour
        </Link>
        <div className='flex items-center space-x-6 text-sm font-medium text-zinc-400'>
            <Link href='/' className='hover:text-white transition-colors'>Home</Link>
            <Link href='/destinations' className='hover:text-white transition-colors'>Destinations</Link>
            <Link href='/saved' className='hover:text-white transition-colors'>Saved</Link>
            <Link href='/contact' className='hover:text-white transition-colors'>Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar
  