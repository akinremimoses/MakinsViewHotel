
"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CREATE_ROOM = gql`
  mutation CreateRoom(
    $title: String!
    $description: String!
    $price: Float!
    $image: String!
    $capacity: Int!
    $available: Boolean!
  ) {
    createRoom(
      title: $title
      description: $description
      price: $price
      image: $image
      capacity: $capacity
      available: $available
    ) {
      _id
      title
    }
  }
`;

export default function NewRoomPage() {
  const router = useRouter();

  const [newRoom, setNewRoom] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    capacity: "1",
    available: true,
  });

  const [createRoom, { loading }] = useMutation(CREATE_ROOM, { client });


  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;

  setNewRoom((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
  }));
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRoom({
      variables: {
        title: newRoom.title,
        description: newRoom.description,
        price: parseFloat(newRoom.price),
        image: newRoom.image,
        capacity: parseInt(newRoom.capacity, 10),
        available: newRoom.available,
      },
    });
    router.push("/admin-room");
    router.refresh();
  };

  return (
    <div className="relative max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
          <p className="text-2xl font-bold text-blue-600 animate-pulse">
            MAKINSHOTEL
          </p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Add New Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Room Title"
          value={newRoom.title}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newRoom.description}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newRoom.price}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newRoom.image}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newRoom.capacity}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={newRoom.available}
            onChange={handleInputChange}
          />
          <span>Available</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Room"}
        </button>
      </form>
    </div>
  );
}
