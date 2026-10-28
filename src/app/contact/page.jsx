import React from 'react'

export const metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Travel Tour for personalized trips and inquiries.',
}

export default function ContactPage() {
    return (
        <div className='max-w-4xl mx-auto px-4 py-12'>
            <div className='text-center mb-10'>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3'>
                    Get in Touch
                </h1>
                <p className='text-zinc-400 max-w-xl mx-auto'>
                    Have questions about our destinations or need a custom travel itinerary? We are here to help.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
                <div className='bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg'>
                    <div className='text-3xl mb-3'>📍</div>
                    <h3 className='font-bold text-white mb-1'>Office</h3>
                    <p className='text-sm text-zinc-400'>No: 153, Galle Road</p>
                    <p className='text-sm text-zinc-500'>Karnataka</p>
                </div>
                <div className='bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg'>
                    <div className='text-3xl mb-3'>✉️</div>
                    <h3 className='font-bold text-white mb-1'>Email</h3>
                    <p className='text-sm text-zinc-400'>hello@traveltour.com</p>
                    <p className='text-sm text-zinc-500'>24/7 online support</p>
                </div>
                <div className='bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl text-center shadow-lg'>
                    <div className='text-3xl mb-3'>📞</div>
                    <h3 className='font-bold text-white mb-1'>Phone</h3>
                    <p className='text-sm text-zinc-400'>+91 6361106304</p>
                    <p className='text-sm text-zinc-500'>Mon - Fri, 9am - 6pm IST</p>
                </div>
            </div>

            <div className='bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xl'>
                <h2 className='text-xl font-bold text-white mb-6'>Send Us a Message</h2>
                <form className='space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium'>
                                Name
                            </label>
                            <input
                                type='text'
                                placeholder='John Doe'
                                className='w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white text-sm'
                            />
                        </div>
                        <div>
                            <label className='block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium'>
                                Email
                            </label>
                            <input
                                type='email'
                                placeholder='john@example.com'
                                className='w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white text-sm'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium'>
                            Subject
                        </label>
                        <input
                            type='text'
                            placeholder='Trip Inquiry / Custom Booking'
                            className='w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white text-sm'
                        />
                    </div>
                    <div>
                        <label className='block text-xs uppercase tracking-wider text-zinc-400 mb-1.5 font-medium'>
                            Message
                        </label>
                        <textarea
                            rows={4}
                            placeholder='Tell us about your dream destination...'
                            className='w-full px-4 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white text-sm resize-none'
                        />
                    </div>
                    <button
                        type='button'
                        className='w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-semibold px-8 py-3 rounded-full shadow-md transition-all cursor-pointer'
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    )
}