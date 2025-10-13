"use client";

import { gql } from "@apollo/client"; 
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Loading from "../loading";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  available: boolean;
}

interface RoomsQueryData {
  rooms: Room[];
}

const GET_ROOMS = gql`
  query GetRooms {
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
  const { loading, error, data } = useQuery<RoomsQueryData>(GET_ROOMS);

  if (loading) return <Loading />;
  if (error) return <p>Error fetching rooms: {error.message} ❌</p>;
  
  const rooms = data?.rooms || [];

  return (
    <div className="max-w-7xl mx-auto p-6">
    
    
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-center flex-1">Our Rooms</h1>
        <div className="w-32"></div> 
      </div>

      {rooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">No rooms found ❌</p>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center w-fit mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <Image
                src={room.image}
                alt={room.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{room.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <p className="text-blue-600 font-bold text-lg">
                    ${room.price}/night
                  </p>
                  <p className="text-gray-500 text-sm">
                    Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
                  </p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p
                    className={`font-semibold ${
                      room.available ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {room.available ? "Available ✅" : "Booked ❌"}
                  </p>
                  
                  <Link
                    href={`/rooms/${room._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;