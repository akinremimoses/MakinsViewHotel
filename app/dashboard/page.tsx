

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import client from "@/lib/graphql-client";
import Loading from "./loading";
import { logout } from "@/actions/user-action";
import Link from "next/link";


const GET_USER_BOOKINGS = gql`
  query GetUserBookings {
    me {
      _id
      surname
      middlename
      bookings {
        _id
        room {
          title
          price
          image
          capacity
        }
        checkIn
        checkOut
        totalPrice
        createdAt
      }
    }
  }
`;

interface Booking {
  _id: string;
  room: {
    title: string;
    price: number;
    image?: string;
    capacity: number;
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  createdAt: string;
}

interface User {
  _id: string;
  surname: string;
  middlename?: string;
  bookings: Booking[];
}

const DashboardPage = () => {
  const router = useRouter();
  const { loading, error, data } = useQuery<{ me: User }>(GET_USER_BOOKINGS, { client });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data?.me) setUser(data.me);
  }, [data]);

   const handleLogout = async () => {
    try {
      await logout(); 
      router.push("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    } 
  };

  // const calculateNights = (checkIn: string, checkOut: string) => {
  //   const start = new Date(checkIn);
  //   const end = new Date(checkOut);
  //   return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  // };

  const calculateNights = (checkIn: string | number, checkOut: string | number) => {
  const start = new Date(Number(checkIn));
  const end = new Date(Number(checkOut));
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};


  
  if (loading) return <Loading />;
  if (error) return <p className="text-center mt-20 text-red-600">Error loading dashboard 😢</p>;
  if (!user) return <p className="text-center mt-20 text-gray-600">No user found ❌</p>;

  const totalBookings = user.bookings.length;
  const totalAmount = user.bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  // const total = array.reduce((sum, item) => sum + item, 0);

  return (
    <div className="min-h-screen flex justify-center p-4 py-25 relative">

      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage3.jpg" 
          alt="Hotel Background"
          fill
          className="object-cover opacity-60" 
          priority
        />
      </div>
      
      <div className="w-full max-w-7xl flex gap-6 relative z-10">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-800/90 backdrop-blur-sm text-white p-6 rounded-lg shadow-lg h-160">
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul className="space-y-2">
              <li><Link href="/rooms" className="block w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-800 rounded transition cursor-pointer"> AVAILABLE ROOMS </Link></li>
              <li> <Link href="/profile" className="block w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-800 rounded transition cursor-pointer"> PROFILE</Link> </li>
              <li> <Link href="/about" className="block w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-800 rounded transition cursor-pointer">ABOUT US </Link> </li>
              <li><Link href="/events" className="block w-full text-left px-4 py-2 bg-blue-500 hover:bg-blue-800 rounded transition cursor-pointer">EVENTS </Link> </li>
            </ul>
        </div>

        {/* Main content */}
        <div className="w-3/4 space-y-6">
          {/* Top navbar */}
          <div className="flex justify-between items-center h-24 mb-6 bg-white/90 backdrop-blur-sm shadow px-6 rounded-lg">
            <h1 className="text-3xl font-bold text-blue-800">MakinsViewHotel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-800">
                Welcome, {user.surname} {user.middlename || ""}
              </span>
              <button
                onClick={handleLogout}
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow text-center">
              <p className="text-gray-500 font-semibold">Total Booked Rooms</p>
              <p className="text-2xl font-bold">{totalBookings}</p>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow text-center">
              <p className="text-gray-500 font-semibold">Total Amount Spent</p>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          {/* Bookings grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.bookings.map(b => (
              <div key={b._id} className="p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow">
                {b.room.image && (
                  <Image
                    src={b.room.image}
                    alt={b.room.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                )}
                {/* <h3 className="text-lg font-semibold mb-1">{b.room.title}</h3>
                <p>Capacity: {b.room.capacity}</p>
                <p>Check-in: {b.checkIn}</p>
                <p>Check-out: {new Date(b.checkOut).getTime()}</p>
                <p>Nights: {calculateNights(b.checkIn, b.checkOut)}</p>
                <p>Total Paid: ${b.totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">
                  Booked At: {new Date(b.createdAt).getTime()}
                </p> */}

                <h3 className="text-lg font-semibold mb-1">{b.room.title}</h3>
                <p>Capacity: {b.room.capacity}</p>
                <p> Check-in:{" "} {b.checkIn ? new Date(Number(b.checkIn)).toLocaleDateString() : "Not available"} </p>
                <p> Check-out:{" "} {b.checkOut ? new Date(Number(b.checkOut)).toLocaleDateString() : "Not available"} </p>
                <p> Nights:{" "} {b.checkIn && b.checkOut  ? calculateNights(Number(b.checkIn), Number(b.checkOut)) : "N/A"} </p>
                <p>Total Paid: ${b.totalPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-500">  Booked At:{" "}  {b.createdAt  ? new Date(Number(b.createdAt)).toLocaleString()  : "Unknown"} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
