// app/admin-room/new/page.tsx
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
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    capacity: "1",
    available: true,
  });

  const [createRoom, { loading }] = useMutation(CREATE_ROOM, { client });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createRoom({
      variables: {
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image,
        capacity: parseInt(form.capacity, 10),
        available: form.available,
      },
    });
    router.push("/admin-room");
    router.refresh();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Room Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={form.available}
            onChange={(e) =>
              setForm({ ...form, available: e.target.checked })
            }
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
