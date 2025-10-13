// "use client";

// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client/react";
// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// <<<<<<< HEAD
// import Loading from "../loading";
// import { ArrowLeft } from "lucide-react";
// =======
// import Loading from "../loading"
// >>>>>>> 836eaa3a7abc855440c4537ace3a64ac916a90ca

// interface Room {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   capacity: number;
//   available: boolean;
// }

// interface RoomData {
//   room: Room;
// }

// const GET_ROOM = gql`
//   query GetRoom($id: ID!) {
//     room(_id: $id) {
//       _id
//       title
//       description
//       price
//       image
//       capacity
//       available
//     }
//   }
// `;

// const RoomDetailPage = () => {
//   const params = useParams(); 
//   const roomId = params.id as string;

//   const { loading, error, data } = useQuery<RoomData>(GET_ROOM, { 
//     variables: { id: roomId },
// <<<<<<< HEAD
//     skip: !roomId, 
// =======
    
// >>>>>>> 836eaa3a7abc855440c4537ace3a64ac916a90ca
//   });

//   if (loading) return <Loading />;
  
//   if (error) return (
//     <div className="max-w-3xl mx-auto p-6">
//       <p className="text-red-600">Error fetching room: {error.message}</p>
// <<<<<<< HEAD
//       <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to Rooms
// =======
//       <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block">
//         ← Back to Rooms
// >>>>>>> 836eaa3a7abc855440c4537ace3a64ac916a90ca
//       </Link>
//     </div>
//   );
  
// <<<<<<< HEAD
//   if (!roomId) return (
//     <div className="max-w-3xl mx-auto p-6">
//       <p>No room ID provided</p>
//       <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to Rooms
//       </Link>
//     </div>
//   );

//   if (!data?.room) return (
//     <div className="max-w-3xl mx-auto p-6">
//       <p>Room not found</p>
//       <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to Rooms
//       </Link>
//     </div>
//   );
// =======
//   // if (!data?.room) return (
//   //   <div className="max-w-3xl mx-auto p-6">
//   //     <p>Room not found</p>
//   //     <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block">
//   //       ← Back to Rooms
//   //     </Link>
//   //   </div>
//   // );
// >>>>>>> 836eaa3a7abc855440c4537ace3a64ac916a90ca

//   const room = data.room;

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <Link href="/rooms" className="text-blue-600 hover:underline flex items-center">
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to Rooms
//       </Link>

//       <div className="bg-white rounded-lg shadow p-6">
//         <Image
//           src={room.image}
//           alt={room.title}
//           width={800}
//           height={600}
//           className="rounded-lg object-cover w-full h-96"
//         />

//         <h1 className="text-3xl font-bold mt-4">{room.title}</h1>
//         <p className="text-gray-600 mt-2">{room.description}</p>
//         <p className="font-bold text-blue-600 mt-4 text-xl">
//           ${room.price}/night
//         </p>
//         <p className="text-gray-500">
//           Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
//         </p>
//         <p
//           className={`mt-2 font-medium ${
//             room.available ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {room.available ? "Available ✅" : "Not Available ❌"}
//         </p>

//         {room.available ? (
//           <Link
//             href={`/booking?roomId=${room._id}`}
//             className="mt-6 inline-block text-center py-3 px-6 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
//           >
//             Book Now
//           </Link>
//         ) : (
//           <button
//             disabled
//             className="mt-6 inline-block text-center py-3 px-6 rounded font-semibold text-white bg-gray-400 cursor-not-allowed transition"
//           >
//             Not Available
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default RoomDetailPage;


"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";
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

interface RoomData {
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

const RoomDetailPage = () => {
  const params = useParams(); 
  const roomId = params.id as string;

  const { loading, error, data } = useQuery<RoomData>(GET_ROOM, { 
    variables: { id: roomId },
    skip: !roomId,
  });

  if (loading) return <Loading />;
  
  if (error) return (
    <div className="max-w-3xl mx-auto p-6">
      <p className="text-red-600">Error fetching room: {error.message}</p>
      <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rooms
      </Link>
    </div>
  );
  
  if (!roomId) return (
    <div className="max-w-3xl mx-auto p-6">
      <p>No room ID provided</p>
      <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rooms
      </Link>
    </div>
  );

  if (!data?.room) return (
    <div className="max-w-3xl mx-auto p-6">
      <p>Room not found</p>
      <Link href="/rooms" className="text-blue-600 hover:underline mt-4 inline-block flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rooms
      </Link>
    </div>
  );

  const room = data.room;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Link href="/rooms" className="text-blue-600 hover:underline flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rooms
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <Image
          src={room.image}
          alt={room.title}
          width={800}
          height={600}
          className="rounded-lg object-cover w-full h-96"
        />

        <h1 className="text-3xl font-bold mt-4">{room.title}</h1>
        <p className="text-gray-600 mt-2">{room.description}</p>
        <p className="font-bold text-blue-600 mt-4 text-xl">
          ${room.price}/night
        </p>
        <p className="text-gray-500">
          Capacity: {room.capacity} guest{room.capacity > 1 ? "s" : ""}
        </p>
        <p
          className={`mt-2 font-medium ${
            room.available ? "text-green-600" : "text-red-600"
          }`}
        >
          {room.available ? "Available ✅" : "Not Available ❌"}
        </p>

        {room.available ? (
          <Link
            href={`/booking?roomId=${room._id}`}
            className="mt-6 inline-block text-center py-3 px-6 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        ) : (
          <button
            disabled
            className="mt-6 inline-block text-center py-3 px-6 rounded font-semibold text-white bg-gray-400 cursor-not-allowed transition"
          >
            Not Available
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomDetailPage;