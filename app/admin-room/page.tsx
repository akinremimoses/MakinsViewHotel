"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import Link from "next/link";
import Image from "next/image";

const GET_ROOMS = gql`
  query {
    rooms {
      _id
      title
      price
      image
      capacity
      available
    }
  }
`;

const DELETE_ROOM = gql`
  mutation DeleteRoom($id: ID!) {
    deleteRoom(id: $id)
  }
`;

export default function AdminRoomListPage() {
  const { loading, error, data, refetch } = useQuery(GET_ROOMS, { client });
  const [deleteRoom] = useMutation(DELETE_ROOM, { client });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    await deleteRoom({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Loading rooms...</p>;
  if (error) return <p>Error fetching rooms ❌</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Rooms</h1>
        <Link
          href="/admin-room/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add New Room
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.rooms.map((room: any) => (
          <div key={room._id} className="bg-white shadow rounded-lg p-4">
            <Image
              src={room.image}
              alt={room.title}
              width={400}
              height={250}
              className="rounded-lg object-cover w-full h-40"
            />
            <h2 className="text-xl font-semibold mt-2">{room.title}</h2>
            <p>${room.price} / night</p>
            <p>Capacity: {room.capacity}</p>
            <p>
              Status:{" "}
              {room.available ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-red-600">Unavailable</span>
              )}
            </p>
            <div className="flex justify-between mt-4">
              <Link
                href={`/admin-room/${room._id}`}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(room._id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
