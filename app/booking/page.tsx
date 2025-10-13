"use client";

import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "./loading";
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

interface RoomQueryData {
  room: Room;
}

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
      room {
        title
      }
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

  // Fetch the room
  const { loading, error, data } = useQuery<RoomQueryData>(GET_ROOM, {
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
    } catch (err) {
      console.log(err);
      alert("An unknown error occurred ❌");
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 mb-4">Error loading room ❌❌</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
  
  if (!roomId) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="mb-4">No room selected ❌</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );
  
  if (!data?.room) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="mb-4">Room not found ❌</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
      </div>
    </div>
  );

  const room = data.room;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
        {/* Go Back Button */}
        <button
          onClick={handleGoBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">Book Room</h1>

        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold">{room.title}</h2>
          <p className="text-blue-600 font-bold text-lg">${room.price}/night</p>
          <p
            className={`mt-2 font-medium ${
              room.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {room.available ? "Available ✅" : "Not Available ❌"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={bookingLoading || !room.available}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${
              room.available
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {bookingLoading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;