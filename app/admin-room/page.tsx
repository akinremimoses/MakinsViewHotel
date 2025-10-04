// "use client";

// import client from "@/lib/graphql-client";
// import { gql } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client/react";
// import Link from "next/link";
// import Image from "next/image";

// const GET_ROOMS = gql`
//   query {
//     rooms {
//       _id
//       title
//       price
//       image
//       capacity
//       available
//     }
//   }
// `;

// const DELETE_ROOM = gql`
//   mutation DeleteRoom($id: ID!) {
//     deleteRoom(id: $id)
//   }
// `;

// export default function AdminRoomListPage() {
//   const { loading, error, data, refetch } = useQuery(GET_ROOMS, { client });
//   const [deleteRoom] = useMutation(DELETE_ROOM, { client });

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this room?")) return;
//     await deleteRoom({ variables: { id } });
//     refetch();
//   };

//   // if (loading) return <p>loading...</p>;
//   if (error) return <p>Error fetching rooms ❌</p>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Manage Rooms</h1>
//         <Link
//           href="/admin-room/new"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           + Add New Room
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data?.rooms?.map((room: any) => (
//           <div key={room._id} className="bg-white shadow rounded-lg p-4">
//             <Image
//               src={room.image}
//               alt={room.title}
//               width={400}
//               height={250}
//               className="rounded-lg object-cover w-full h-40"
//             />
//             <h2 className="text-xl font-semibold mt-2">{room.title}</h2>
//             <p>${room.price} / night</p>
//             <p>Capacity: {room.capacity}</p>
//             <p>
//               Status:{" "}
//               {room.available ? (
//                 <span className="text-green-600">Available</span>
//               ) : (
//                 <span className="text-red-600">Unavailable</span>
//               )}
//             </p>
//             <div className="flex justify-between mt-4">
//               <Link
//                 href={`/admin-room/${room._id}`}
//                 className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </Link>
//               <button
//                 onClick={() => handleDelete(room._id)}
//                 className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";

// import client from "@/lib/graphql-client";
// import { gql } from "@apollo/client";
// import { useQuery, useMutation } from "@apollo/client/react";
// import Link from "next/link";
// import Image from "next/image";

// const GET_ROOMS = gql`
//   query {
//     rooms {
//       _id
//       title
//       price
//       image
//       capacity
//       available
//     }
//   }
// `;

// const DELETE_ROOM = gql`
//   mutation DeleteRoom($id: ID!) {
//     deleteRoom(id: $id)
//   }
// `;

// export default function AdminRoomListPage() {
//   const { loading, error, data, refetch } = useQuery(GET_ROOMS, { client });
//   const [deleteRoom] = useMutation(DELETE_ROOM, { client });

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this room?")) return;
//     await deleteRoom({ variables: { id } });
//     refetch();
//   };

//   if (loading) return <p className="text-center text-gray-600 mt-10">Loading rooms...</p>;
//   if (error) return <p className="text-center text-red-600 mt-10">Error fetching rooms ❌</p>;

//   const rooms = data?.rooms || [];

//   // Calculate statistics
//   const totalRooms = rooms.length;
//   const totalRevenue = rooms.reduce((sum, room) => sum + room.price, 0);
//   const bookedRooms = rooms.filter((room) => !room.available).length;

//   return (
//     <div className="max-w-7xl mx-auto p-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-10">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">🏨 MKH Admin-Rooms</h1>
//         <Link
//           href="/admin-room/new"
//           className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition"
//         >
//           + Add New Room
//         </Link>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white  rounded-lg p-6 text-center border-2 border-blue-800">
//           <h2 className="text-gray-500 text-sm font-medium">Total Rooms</h2>
//           <p className="text-3xl font-bold text-blue-600">{totalRooms}</p>
//         </div>
//         <div className="bg-white  rounded-lg p-6 text-center border-2 border-blue-800">
//           <h2 className="text-gray-500 text-sm font-medium">Total Booked</h2>
//           <p className="text-3xl font-bold text-red-500">{bookedRooms}</p>
//         </div>
//         <div className="bg-white shadow-md rounded-lg p-6 text-center border-2 border-blue-800">
//           <h2 className="text-gray-500 text-sm font-medium">Total Price</h2>
//           <p className="text-3xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Room Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {rooms.map((room) => (
//           <div
//             key={room._id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100 hover:shadow-xl transition"
//           >
//             <Image
//               src={room.image}
//               alt={room.title}
//               width={400}
//               height={250}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-5">
//               <h2 className="text-xl font-semibold text-gray-800">{room.title}</h2>
//               <p className="text-gray-600 mt-1">${room.price} / night</p>
//               <p className="text-gray-600">Capacity: {room.capacity}</p>
//               <p className="mt-1">
//                 Status:{" "}
//                 {room.available ? (
//                   <span className="text-green-600 font-semibold">Available</span>
//                 ) : (
//                   <span className="text-red-600 font-semibold">Booked</span>
//                 )}
//               </p>

//               <div className="flex justify-between mt-5">
//                 <Link
//                   href={`/admin-room/${room._id}`}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-md text-sm font-medium transition"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(room._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md text-sm font-medium transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty state */}
//       {rooms.length === 0 && (
//         <p className="text-center text-gray-500 mt-10">No rooms found. Add a new one above 👆</p>
//       )}
//     </div>
//   );
// }


import { redirect } from "next/navigation";
import { verifyUser } from "@/actions/verifyuser";
import AdminRoomList from "@/components/AdminRoomList";

const AdminRoomPage = async () => {
  const user = await verifyUser();

  // Check authentication + role
  if (!user.success || user.role !== "admin") {
    redirect("/login");
  }
  

  return <AdminRoomList />;
};

export default AdminRoomPage;


