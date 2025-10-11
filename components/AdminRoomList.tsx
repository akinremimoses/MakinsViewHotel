"use client";

import client from "@/lib/graphql-client";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminRoomLoading from "@/app/admin-room/loading";
import { logout } from "@/actions/user-action"; 


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

const AdminRoomListPage = () => {
  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(GET_ROOMS, { client });
  const [deleteRoom] = useMutation(DELETE_ROOM, { client });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    await deleteRoom({ variables: { id } });
    refetch();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <AdminRoomLoading />;

  if (error) return (<p className="text-center text-red-600 mt-10"> Error fetching rooms ❌</p>);

  const rooms = data?.rooms || [];

  // Room statistics
  const totalRooms = rooms.length;
  const bookedRooms = rooms.filter((room) => !room.available).length;
 
  // array.reduce((accumulator, currentValue) => { ... }, initialValue); 
  const totalRoomPrice = rooms
  .filter((room) => !room.available) 
  .reduce((sum, room) => sum + room.price, 0);

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">🏨 MKH Admin-Rooms</h1>
        
        <div className="flex items-center gap-4">
          {/* Home Button */}
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
          >
            🏠 Home
          </Link>
          
          {/* Add New Room Button */}
          <Link
            href="/admin-room/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
          >
            + Add New Room
          </Link>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-800">
          <h2 className="text-gray-500 text-sm font-medium">Total Rooms</h2>
          <p className="text-3xl font-bold text-blue-600">{totalRooms}</p>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-800">
          <h2 className="text-gray-500 text-sm font-medium">Total Booked</h2>
          <p className="text-3xl font-bold text-red-500">{bookedRooms}</p>
        </div>
        <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-800">
          <h2 className="text-gray-500 text-sm font-medium">Total Price</h2>
          <p className="text-3xl font-bold text-green-600">${totalRoomPrice.toLocaleString()}</p>
        </div>
      </div>

      {/* Rooms mapping */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
          >
            <Image
              src={room.image}
              alt={room.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">{room.title}</h2>
              <p className="text-gray-600 mt-1">${room.price} / night</p>
              <p className="text-gray-600">Capacity: {room.capacity}</p>
              <p className="mt-1">
                Status:{" "}
                {room.available ? (
                  <span className="text-green-600 font-semibold">Available</span>
                ) : (
                  <span className="text-red-600 font-semibold">Booked</span>
                )}
              </p>

              <div className="flex justify-between mt-5">
                <Link
                  href={`/admin-room/${room._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {rooms.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No rooms found. Add a new one above 👆</p>
      )}
    </div>
  );
};

export default AdminRoomListPage;