import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { destinations } from '@/data/destinations'

export default function HomePage() {
    const featured = destinations.slice(0, 3)

    return (
        <div>

            <section className='relative h-[500px] flex items-center justify-center overflow-hidden'>
                <Image
                    src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop'
                    alt='Travel the world'
                    fill
                    priority
                    className='object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30' />
                <div className='relative z-10 text-center text-white px-4'>
                    <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight mb-4'>
                        Explore the World
                    </h1>
                    <p className='text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto'>
                        Discover breathtaking destinations and plan your next unforgettable adventure with Travel Tour.
                    </p>
                    <Link
                        href='/destinations'
                        className='inline-block bg-white hover:bg-zinc-200 text-black font-semibold px-8 py-3 rounded-full shadow-lg shadow-white/10 transition-all duration-200'
                    >
                        Browse Destinations
                    </Link>
                </div>
            </section>


            <section className='max-w-6xl mx-auto px-4 py-16'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-extrabold text-white tracking-tight'>Featured Destinations</h2>
                    <p className='text-zinc-400 mt-2'>Handpicked places you will love</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {featured.map((dest) => (
                        <Link key={dest.slug} href={`/destinations/${dest.slug}`} className='group'>
                            <div className='bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1'>
                                <div className='relative h-52'>
                                    <Image
                                        src={dest.image}
                                        alt={dest.name}
                                        fill
                                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-lg font-bold text-white group-hover:text-zinc-300 transition-colors'>
                                        {dest.name}
                                    </h3>
                                    <p className='text-sm text-zinc-400 mt-1'>{dest.shortDescription}</p>
                                    <div className='mt-3 flex items-center justify-between'>
                                        <span className='text-white font-bold'>${dest.price}</span>
                                        <span className='text-sm text-zinc-500'>{dest.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='text-center mt-10'>
                    <Link
                        href='/destinations'
                        className='inline-block border border-zinc-600 text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-full transition-all'
                    >
                        View All Destinations →
                    </Link>
                </div>
            </section>


            <section className='bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-y border-zinc-800 text-white py-12'>
                <div className='max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                    <div>
                        <p className='text-3xl font-extrabold text-white'>50+</p>
                        <p className='text-zinc-400 text-xs uppercase tracking-wider mt-1'>Destinations</p>
                    </div>
                    <div>
                        <p className='text-3xl font-extrabold text-white'>10K+</p>
                        <p className='text-zinc-400 text-xs uppercase tracking-wider mt-1'>Happy Travelers</p>
                    </div>
                    <div>
                        <p className='text-3xl font-extrabold text-white'>4.8</p>
                        <p className='text-zinc-400 text-xs uppercase tracking-wider mt-1'>Average Rating</p>
                    </div>
                    <div>
                        <p className='text-3xl font-extrabold text-white'>24/7</p>
                        <p className='text-zinc-400 text-xs uppercase tracking-wider mt-1'>Support</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
