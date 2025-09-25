import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <Navbar /> 
   
  );
}

<div>

</div>


































// "use client"

// import React, { useState } from "react"
// import Link from "next/link"

// const HomePage = () => {
//   const [showDropdown, setShowDropdown] = useState(false)

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       {/* Background Video */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover"
//       >
//         <source src="https://pixabay.com/videos/pyramid-hotel-building-architecture-204588/" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Overlay for slight dark effect */}
//       <div className="absolute inset-0 bg-black/40 z-10"></div>

//       {/* Navbar */}
//       <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 py-6 bg-transparent">
//         {/* Left: Account */}
//         <div className="relative">
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="text-white font-medium hover:underline"
//           >
//             ACCOUNT
//           </button>
//           {showDropdown && (
//             <div className="absolute left-0 mt-2 w-32 bg-white rounded shadow-lg">
//               <Link
//                 href="/login"
//                 className="block px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 Login
//               </Link>
//               <Link
//                 href="/signup"
//                 className="block px-4 py-2 text-sm hover:bg-gray-100"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Center: Brand */}
//         <h1 className="text-3xl md:text-4xl font-bold text-white">
//           MakinsViewHotel
//         </h1>

//         {/* Right: Book */}
//         <Link
//           href="/book"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
//         >
//           BOOK
//         </Link>
//       </nav>

//       {/* Hero Content */}
//       <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6">
//         <h2 className="text-4xl md:text-6xl font-bold">
//           Welcome to MakinsView Hotel
//         </h2>
//         <p className="mt-4 text-lg md:text-xl max-w-2xl">
//           Experience luxury, comfort, and unforgettable moments with us.
//         </p>
//       </div>
//     </div>
//   )
// }

// export default HomePage
