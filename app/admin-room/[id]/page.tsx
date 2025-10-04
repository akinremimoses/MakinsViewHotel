
"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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

const UPDATE_ROOM = gql`
  mutation UpdateRoom(
    $_id: ID!
    $title: String
    $description: String
    $price: Float
    $image: String
    $capacity: Int
    $available: Boolean
  ) {
    updateRoom(
      _id: $_id
      title: $title
      description: $description
      price: $price
      image: $image
      capacity: $capacity
      available: $available
    ) {
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

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: roomData, loading } = useQuery(GET_ROOM, {
    variables: { _id: id },
    client,
  });

  const roomDetails = roomData?.room;

  const [updateRoom, { loading: saving }] = useMutation(UPDATE_ROOM, {
    client,
  });

  const [roomEdit, setRoomEdit] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    capacity: "1",
    available: true,
  });

  useEffect(() => {
    if (roomDetails) {
      const { title, description, price, image, capacity, available } =
        roomDetails;
      setRoomEdit({
        title,
        description,
        price: price.toString(),
        image,
        capacity: capacity.toString(),
        available,
      });
    }
  }, [roomDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setRoomEdit((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateRoom({
      variables: {
        _id: id,
        title: roomEdit.title,
        description: roomEdit.description,
        price: parseFloat(roomEdit.price),
        image: roomEdit.image,
        capacity: parseInt(roomEdit.capacity, 10),
        available: roomEdit.available,
      },
    });
    router.push("/admin-room");
  };

  // Skeleton while loading
  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Room Title"
          value={roomEdit.title}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={roomEdit.description}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={roomEdit.price}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={roomEdit.image}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={roomEdit.capacity}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="available"
            checked={roomEdit.available}
            onChange={handleInputChange}
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
