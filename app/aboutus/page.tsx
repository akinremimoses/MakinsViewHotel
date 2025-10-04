import React from 'react'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
   
      <Image
        src="/homepage3.jpg" 
        alt="Hotel About Background"
        fill
        className="object-cover opacity-70"
        priority
      />
      
      {/* Centered Content */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
            🏨 About MakinsViewHotel
          </h1>
          
          <div className='space-y-6'>
            <div className='text-center'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Our Story
              </h3>
              <p className='text-gray-900  text-2xl'>
                Founded with a vision to provide exceptional hospitality experiences, 
                MakinsViewHotel has been serving guests with luxury and comfort since our inception.
              </p>
            </div>

            <div className='text-center'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Our Mission
              </h3>
              <p className='text-gray-800 text-2xl'>
                To create unforgettable moments for our guests through personalized service, 
                luxurious accommodations, and attention to every detail.
              </p>
            </div>

            <div className='text-center'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Our Values
              </h3>
              <p className='text-gray-800 text-2xl'>
                Excellence, hospitality, innovation, and sustainability guide everything we do 
                to ensure your stay is nothing short of perfect.
              </p>
            </div>

            <div className='text-center'>
              <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
                Why Choose Us
              </h3>
              <p className='text-gray-800 text-2xl'>
                Prime location, world-class amenities, dedicated staff, and a commitment to 
                making every guest feel at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs