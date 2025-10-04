


// 'use client'

// import Link from 'next/link';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side - Empty for balance */}
//           <div className="flex items-center md:w-1/3"></div>

//           {/* Center - Logo/Brand Name */}
//           <div className="flex items-center justify-center md:w-1/3">
//             <Link href="/" className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
//                 MakinsViewHotel
//               </h1>
//             </Link>
//           </div>

//           {/* Right side - Navigation Links (Desktop) */}
//           <div className="hidden md:flex items-center justify-end space-x-6 md:w-1/3">
//             {/* CHECK ROOMS Link */}
//             <Link
//               href="/rooms"
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//             >
//               CHECK ROOMS
//             </Link>

//             {/* BOOK Button */}
//             <Link
//               href="/booking"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
//             >
//               BOOK
//             </Link>

//             {/* Authentication Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
//                 className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
//               >
//                 Login/Sign Up
//                 <svg
//                   className={`ml-1 h-4 w-4 transition-transform ${
//                     isAuthDropdownOpen ? 'rotate-180' : ''
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {/* Dropdown Menu */}
//               {isAuthDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
//                   <Link
//                     href="/login"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                     onClick={() => setIsAuthDropdownOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     href="/signup"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                     onClick={() => setIsAuthDropdownOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
//             >
//               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-200">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               {/* CHECK ROOMS Link */}
//               <Link
//                 href="/rooms"
//                 className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 CHECK ROOMS
//               </Link>

//               {/* BOOK Button */}
//               <Link
//                 href="/booking"
//                 className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors text-center"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 BOOK
//               </Link>

//               {/* Authentication Links */}
//               <div className="border-t border-gray-200 pt-2">
//                 <Link
//                   href="/login"
//                   className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Overlay to close dropdowns when clicking outside */}
//       {(isMenuOpen || isAuthDropdownOpen) && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => {
//             setIsMenuOpen(false);
//             setIsAuthDropdownOpen(false);
//           }}
//         ></div>
//       )}
//     </nav>
//   );
// }


'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  // Separate function for toggling dropdown
  const handleAuthDropdownToggle = () => {
    setIsAuthDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
        >
          MakinsViewHotel
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            href="/rooms"
            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            CHECK ROOMS
          </Link>

          <Link
            href="/booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
          >
            BOOK
          </Link>

          {/* Auth Dropdown */}
          <div className="relative">
            <button
              onClick={handleAuthDropdownToggle}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              Login / Sign Up
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${
                  isAuthDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isAuthDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
