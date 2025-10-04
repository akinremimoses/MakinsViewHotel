import React from 'react'
import Image from 'next/image'

const Events = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      {/* Background Image */}
      <Image
        src="/homepage3.jpg" 
        alt="Hotel Events Background"
        fill
        className="object-cover opacity-80" 
        priority
      />
      
      {/* Centered Content */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-8'>
            🎉 Hotel Events & Celebrations
          </h1>
          <p className='text-lg text-gray-600 text-center mb-12'>
            Make your special moments unforgettable with our premium event services
          </p>
          
        
          <div className='space-y-6'>
            <div className='bg-white border border-gray-200 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='flex items-start space-x-4'>
                <div className='text-4xl'>💒</div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    Wedding Ceremonies
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Elegant wedding celebrations happening 0n the 20th of oct. 2025.
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='flex items-start space-x-4'>
                <div className='text-4xl'>💼</div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    SQI Educational Summit
                  </h3>
                  <p className='text-gray-800 leading-relaxed'>
                    Learn new tech skills using a world-class curriculum happening 0n the 25th of oct. 2025.
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='flex items-start space-x-4'>
                <div className='text-4xl'>🎂</div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    Birthday Parties
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Memorable birthday celebrations happening 0n the 1st of Nov. 2025..
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-white border border-gray-200 rounded-xl p-2 shadow-lg hover:shadow-xl transition-all duration-300'>
              <div className='flex items-start space-x-4'>
                <div className='text-4xl'>🏢</div>
                <div>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    Business Conferences 
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Team building events happening 0n the 20th of Nov. 2025..
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        
          <div className='text-center mt-12'>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105'>
              Book Your Event Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events