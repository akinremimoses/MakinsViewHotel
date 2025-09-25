// app/admin-room/[id]/page.tsx
"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const GET_ROOM = gql`
  query Room($id: ID!) {
    room(id: $id) {
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

const UPDATE_ROOM = gql`
  mutation UpdateRoom(
    $id: ID!
    $title: String!
    $description: String!
    $price: Float!
    $image: String!
    $capacity: Int!
    $available: Boolean!
  ) {
    updateRoom(
      id: $id
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

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, loading } = useQuery(GET_ROOM, { variables: { id }, client });
  const [updateRoom, { loading: saving }] = useMutation(UPDATE_ROOM, { client });

  const [form, setForm] = useState({  
    title: "",
    description: "",
    price: "",
    image: "",
    capacity: "1",
    available: true,
  });  //dont use this if you want the form to capture the previous inputdata



  useEffect(() => {
    if (data?.room) {
      setForm({
        title: data.room.title,
        description: data.room.description,
        price: data.room.price.toString(),
        image: data.room.image,
        capacity: data.room.capacity.toString(),
        available: data.room.available,
      });
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRoom({
      variables: {
        id,
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image,
        capacity: parseInt(form.capacity, 10),
        available: form.available,
      },
    });
    router.push("/admin-room");
  };

  if (loading) return <p>Loading room...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Room</h1>
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
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}


