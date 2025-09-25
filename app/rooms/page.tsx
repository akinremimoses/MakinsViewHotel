"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Link from "next/link";

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

export default function RoomsPage() {
  const { loading, error, data } = useQuery(GET_ROOMS, {client});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading rooms 😢</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.rooms.map((room: any) => (
          <div key={room._id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <Image
              src={room.image}
              alt={room.title}
              width={400}
              height={250}
              className="rounded-lg object-cover w-full h-48"
            />
            <h2 className="text-xl font-semibold mt-2">{room.title}</h2>
            <p className="text-gray-600">{room.description}</p>
            <p className="font-bold text-blue-600 mt-2">${room.price}/night</p>
            <p className="text-sm text-gray-500">
              Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
            </p>
            <p
              className={`mt-1 font-medium ${
                room.available ? "text-green-600" : "text-red-600"
              }`}
            >
              {room.available ? "Available ✅" : "Not Available ❌"}
            </p>

            {/* Book Now Button */}
            <Link
              href={`/booking?roomId=${room._id}`}
              className={`mt-4 block text-center py-2 px-4 rounded ${
                room.available
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed pointer-events-none"
              }`}
            >
              {room.available ? "Book Now" : "Unavailable"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
