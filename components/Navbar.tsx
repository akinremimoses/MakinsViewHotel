
// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

//   // Separate function for toggling dropdown
//   const handleAuthDropdownToggle = () => {
//     setIsAuthDropdownOpen((prev) => !prev);
//   };

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
//         {/* Logo / Brand */}
//         <Link
//           href="/"
//           className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
//         >
//           MakinsViewHotel
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-6">
//           <Link
//             href="/rooms"
//             className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
//           >
//             CHECK ROOMS
//           </Link>

//           <Link
//             href="/booking"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors"
//           >
//             BOOK
//           </Link>

//           {/* Auth Dropdown */}
//           <div className="relative">
//             <button
//               onClick={handleAuthDropdownToggle}
//               className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
//             >
//               Login / Sign Up
//               <svg
//                 className={`ml-1 h-4 w-4 transition-transform ${
//                   isAuthDropdownOpen ? 'rotate-180' : ''
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {isAuthDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-50">
//                 <Link
//                   href="/login"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                   onClick={() => setIsAuthDropdownOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/signup"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                   onClick={() => setIsAuthDropdownOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Separate function for toggling dropdown
  const handleAuthDropdownToggle = () => {
    setIsAuthDropdownOpen((prev) => !prev);
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsAuthDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
          onClick={closeAllMenus}
        >
          MakinsViewHotel
        </Link>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/rooms"
            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            CHECK ROOMS
          </Link>

          {/* BOOK button - hidden on mobile, visible on desktop */}
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

        {/* Mobile menu button - visible on mobile */}
        <div className="flex md:hidden items-center space-x-4">
          {/* Auth dropdown for mobile */}
          <div className="relative">
            <button
              onClick={handleAuthDropdownToggle}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
            >
              Account
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
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={closeAllMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu - shown when hamburger is clicked */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2 px-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/rooms"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeAllMenus}
            >
              CHECK ROOMS
            </Link>
            {/* BOOK link for mobile - as regular link instead of button */}
            <Link
              href="/booking"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeAllMenus}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}