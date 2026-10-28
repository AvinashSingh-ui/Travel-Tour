import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='flex items-center justify-between px-6 py-4 bg-white shadow-sm'>
        <Link href='/' className='text-xl font-bold text-orange-600'>
            Travel Tour
        </Link>
        <div className='flex items-center space-x-6 text-sm font-medium text-gray-600'>
            <Link href='/' className='hover:text-orange-600 transition-colors'>Home</Link>
            <Link href='/destinations' className='hover:text-orange-600 transition-colors'>Destinations</Link>
            <Link href='/saved' className='hover:text-orange-600 transition-colors'>Saved</Link>
            <Link href='/contact' className='hover:text-orange-600 transition-colors'>Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar
