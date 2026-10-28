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
                <div className='absolute inset-0 bg-black/50' />
                <div className='relative z-10 text-center text-white px-4'>
                    <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                        Explore the World
                    </h1>
                    <p className='text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto'>
                        Discover breathtaking destinations and plan your next unforgettable adventure with Travel Tour.
                    </p>
                    <Link
                        href='/destinations'
                        className='inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-full transition-colors'
                    >
                        Browse Destinations
                    </Link>
                </div>
            </section>


            <section className='max-w-6xl mx-auto px-4 py-16'>
                <div className='text-center mb-10'>
                    <h2 className='text-3xl font-bold text-gray-800'>Featured Destinations</h2>
                    <p className='text-gray-500 mt-2'>Handpicked places you will love</p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {featured.map((dest) => (
                        <Link key={dest.slug} href={`/destinations/${dest.slug}`} className='group'>
                            <div className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow'>
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
                                    <h3 className='text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors'>
                                        {dest.name}
                                    </h3>
                                    <p className='text-sm text-gray-500 mt-1'>{dest.shortDescription}</p>
                                    <div className='mt-3 flex items-center justify-between'>
                                        <span className='text-orange-600 font-bold'>${dest.price}</span>
                                        <span className='text-sm text-gray-400'>{dest.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className='text-center mt-10'>
                    <Link
                        href='/destinations'
                        className='inline-block border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-colors'
                    >
                        View All Destinations →
                    </Link>
                </div>
            </section>


            <section className='bg-orange-600 text-white py-12'>
                <div className='max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
                    <div>
                        <p className='text-3xl font-bold'>50+</p>
                        <p className='text-orange-200 text-sm mt-1'>Destinations</p>
                    </div>
                    <div>
                        <p className='text-3xl font-bold'>10K+</p>
                        <p className='text-orange-200 text-sm mt-1'>Happy Travelers</p>
                    </div>
                    <div>
                        <p className='text-3xl font-bold'>4.8</p>
                        <p className='text-orange-200 text-sm mt-1'>Average Rating</p>
                    </div>
                    <div>
                        <p className='text-3xl font-bold'>24/7</p>
                        <p className='text-orange-200 text-sm mt-1'>Support</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
