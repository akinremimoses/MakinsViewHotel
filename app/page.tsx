"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with background image (half screen) */}
      <div className="relative h-[60vh] w-full">
        <Image
          src="/homepage3.jpg" // place your image in /public folder
          alt="Hotel background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to Luxury Stays
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
            Find and book the best rooms for your next stay. Comfortable,
            modern, and unforgettable experiences await.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href="/rooms"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View Rooms
            </Link>
            <Link
              href="/register"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </div>

      {/* White Background Section for Images */}
      <section className="bg-white py-16 flex-1">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">
            WELCOME TO THE MAKINSVIEW EXPERIENCE
          </h3>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex flex-col items-center">
              <Image
                src="/homepage7.jpg"
                alt="Luxury Rooms"
                width={400}
                height={250}
                className="rounded-lg shadow-lg object-cover"
              />
              <p className="text-gray-700 mt-3 text-lg">Luxury Rooms</p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/homepage5.jpg"
                alt="Fine Dining"
                width={400}
                height={250}
                className="rounded-lg shadow-lg object-cover"
              />
              <p className="text-gray-700 mt-3 text-lg">Fine Dining</p>
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/homepage6.jpg"
                alt="Relax & Enjoy"
                width={400}
                height={250}
                className="rounded-lg shadow-lg object-cover"
              />
              <p className="text-gray-700 mt-3 text-lg">Relax & Enjoy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
