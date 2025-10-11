"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div>
          <h2 className="text-xl font-bold mb-4">Hotel Booking App</h2>
          <p className="text-gray-400">
            Your trusted platform to book luxury rooms, plan events, and enjoy unforgettable experiences.
          </p>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/rooms" className="hover:text-blue-400">Available Rooms</a></li>
            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="/events" className="hover:text-blue-400">Events</a></li>
            <li><a href="/profile" className="hover:text-blue-400">Profile</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            <li><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-blue-400">Terms & Conditions</a></li>
            <li><a href="/faq" className="hover:text-blue-400">FAQ</a></li>
          </ul>
        </div>
      </div>

    
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Hotel Booking App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
