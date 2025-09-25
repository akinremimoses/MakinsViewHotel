"use client"

import Image from "next/image"
import React from 'react'





const page = ({ userName = "John Doe" }) => {
  return (
  
   <div className="h-screen flex flex-col max-w-7xl mx-auto">
  {/* Top Navbar */}
  <header className="w-full flex justify-between items-center bg-blue-900 text-white px-6 py-4 shadow rounded">
    <h1 className="text-xl font-bold">Hotel Management Dashboard</h1>
    <span className="font-medium">👤 {userName}</span>
  </header>

  {/* Main Section */}
  <div className="flex flex-1 gap-6 mt-4">
    {/* Sidebar */}
    <aside className="w-1/6 bg-gray-100 border rounded-lg flex flex-col p-6 space-y-4">
      <button className="text-left font-medium text-gray-800 hover:text-blue-700">
        AVAILABLE ROOM
      </button>
      <button className="text-left font-medium text-gray-800 hover:text-blue-700">
        PROFILE
      </button>
      <button className="text-left font-medium text-gray-800 hover:text-blue-700">
        ABOUT US
      </button>
      <button className="text-left font-medium text-gray-800 hover:text-blue-700">
        EVENTS
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded">
        LOGOUT
      </button>
    </aside>

    {/* Content Area */}
    <main className="flex-1 p-8 space-y-8 overflow-y-auto bg-white rounded-lg shadow">
      {/* First Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-lg shadow">
        <Image
          src="/room.jpg"
          alt="Room"
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Our Hotel</h2>
          <p className="text-gray-600">
            Discover comfort and elegance in our premium rooms. Designed with
            modern amenities to make your stay unforgettable.
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-gray-50 p-6 rounded-lg shadow">
        <Image
          src="/event.jpg"
          alt="Events"
          width={400}
          height={300}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Plan Your Events</h2>
          <p className="text-gray-600">
            From weddings to conferences, our event spaces are equipped to
            handle all your needs with style and excellence.
          </p>
        </div>
      </div>
    </main>
  </div>
</div>

      
 
  )
}

export default page



