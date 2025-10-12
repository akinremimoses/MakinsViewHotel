"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import client from "@/lib/graphql-client";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  available: boolean;
}

interface RoomData {
  room: Room;
}

const GET_ROOM = gql`
  query Room($_id: ID!) {
    room(_id: $_id) {
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

const RoomDetailPage = () => {
  const params = useParams(); 
  const roomId = params.id as string;

  const { loading, error, data } = useQuery<RoomData>(GET_ROOM, { 
    variables: { _id: roomId }, 
    client,
  });

  if (loading) return (
    <div className="flex justify-center items-center h-screen"> 
      <p className="text-lg font-semibold">Loading...</p>  
    </div>
  );
  
  if (error) return <p>Error fetching room</p>;
  
  
  if (!data?.room) return <p>Room not found</p>;

  const room = data.room;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href="/rooms" className="text-blue-600 hover:underline">
        ← Back to Rooms
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <Image
          src={room.image}
          alt={room.title}
          width={800}
          height={600}
          className="rounded-lg object-cover w-full h-96"
        />

        <h1 className="text-3xl font-bold mt-4">{room.title}</h1>
        <p className="text-gray-600 mt-2">{room.description}</p>
        <p className="font-bold text-blue-600 mt-4 text-xl">
          ${room.price}/night
        </p>
        <p className="text-gray-500">
          Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
        </p>
        <p
          className={`mt-2 font-medium ${
            room.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {room.available ? "Available ✅" : "Not Available ❌"}
        </p>

        <Link
          href={`/booking?roomId=${room._id}`} 
          className={`mt-6 inline-block text-center py-3 px-6 rounded font-semibold text-white transition ${
            room.available 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => !room.available && e.preventDefault()}
        >
          {room.available ? "Book Now" : "Not Available"}
        </Link>
      </div>
    </div>
  );
}

export default RoomDetailPage;