"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";
import RoomLoading from "./loading";
import type { Room } from "@/models/roomSchema";


const GET_ROOMS = gql`
  query {
    rooms {
      _id
      title
      description
      price
      image
      capacity
      available
    }
  }
`;

const RoomsPage = () => {
  
  const { loading, error, data } = useQuery<{ rooms: Room[] }>(GET_ROOMS, {
    client,
  });

  if (loading) return <RoomLoading />;

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">Error loading rooms</p>
      </div>
    );

  
  if (!data?.rooms || data.rooms.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No rooms available at the moment.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        🏨 Available Rooms
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
          >
            <Link href={`/rooms/${room._id}`}>
              <Image
                src={room.image}
                alt={room.title}
                width={500}
                height={300}
                className="w-full h-80 object-cover cursor-pointer hover:opacity-90 transition duration-300"
              />
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {room.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-blue-600">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500">
                      /night
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Capacity: {room.capacity} guest
                    {room.capacity > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      room.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.available ? "Available ✅" : "Booked ❌"}
                  </span>
                </div>
              </div>

              <Link
                href={`/booking?roomId=${room._id}`}
                className={`mt-6 w-full text-center py-3 px-6 rounded-xl font-semibold text-white transition duration-300 ${
                  room.available
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !room.available && e.preventDefault()}
              >
                {room.available ? "Book Now" : "Not Available"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
