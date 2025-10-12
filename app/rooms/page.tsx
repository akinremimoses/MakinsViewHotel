"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Image from "next/image";
import Loading from "../loading"; 


interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  capacity: number;
  available: boolean;
}

interface RoomQueryData {
  room: Room;
}


const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(_id: $id) {
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


const RoomDetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  
  const { loading, error, data } = useQuery<RoomQueryData>(GET_ROOM, {
    variables: { id },
  });

  if (loading) return <Loading />;
  if (error) return <p>Error fetching room ❌</p>;
  if (!data?.room) return <p>Room not found ❌</p>; 

  const room = data.room; 

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Image
        src={room.image}
        alt={room.title}
        width={800}
        height={500}
        className="w-full rounded-lg object-cover"
      />
      <h1 className="text-3xl font-bold">{room.title}</h1>
      <p className="text-gray-600">{room.description}</p>
      <p className="text-blue-600 font-bold text-lg">${room.price}/night</p>
      <p>
        Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
      </p>
      <p
        className={`font-semibold ${
          room.available ? "text-green-600" : "text-red-600"
        }`}
      >
        {room.available ? "Available ✅" : "Booked ❌"}
      </p>
    </div>
  );
};

export default RoomDetailsPage;
