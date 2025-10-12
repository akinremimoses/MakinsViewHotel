"use client";

import { useState } from "react";
import {gql} from "@apollo/client"
import { useQuery, useMutation } from "@apollo/client/react";
import { useSearchParams, useRouter  } from "next/navigation";
import Loading from "./loading"


const GET_ROOM = gql`
  query GetRoom($id: ID!) {
    room(_id: $id) {
      _id
      title
      price
      available
    }
  }
`;

const CREATE_BOOKING = gql`
  mutation CreateBooking($roomId: ID!, $checkIn: String!, $checkOut: String!) {
    createBooking(roomId: $roomId, checkIn: $checkIn, checkOut: $checkOut) {
      _id
      room { title }
      checkIn
      checkOut
      totalPrice
    }
  }
`;

const BookingPage = () => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const router = useRouter();

 
  const [form, setForm] = useState({ checkIn: "", checkOut: "" });

  // get or fetch d room
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { id: roomId },
    skip: !roomId,
  });

  const [createBooking, { loading: bookingLoading }] = useMutation(CREATE_BOOKING);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId) return alert("Room ID missing ❌");

    try {
      await createBooking({
        variables: {
          roomId,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
        },
      });
      alert("Booking successful ✅");
      setForm({ checkIn: "", checkOut: "" });
         router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message);
    }
  };

  
  if (loading) return <Loading />;
  if (error) return <p>Error loading room ❌❌</p>;
  if (!roomId) return <p>No room selected ❌</p>;

  const room = data?.room;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Book Room</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{room.title}</h2>
        <p className="text-blue-600 font-bold">${room.price}/night</p>
        <p className={`mt-1 ${room.available ? "text-green-600" : "text-red-600"}`}>
          {room.available ? "Available ✅" : "Not Available ❌"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={form.checkIn}
          onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.checkOut}
          onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          disabled={bookingLoading || !room.available}
          className={`w-full py-2 rounded ${
            room.available
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {bookingLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;


