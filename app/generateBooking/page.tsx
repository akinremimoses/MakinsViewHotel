// export const generateBookingConfirmationHTML = (
//   userName: string,
//   roomTitle: string,
//   checkIn: string,
//   checkOut: string,
//   totalPrice: number,
//   nights: number,
//   bookingId: string
// ) => {
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return `
//     <div className="max-w-[600px] mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
//   <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-10 px-5 text-center text-white">
//     <h1 className="text-white m-0 text-2xl md:text-3xl">🎉 Booking Confirmed!</h1>
//   </div>
  
//   <div className="p-8 md:p-10 font-sans">
//     <p className="text-gray-600 leading-relaxed mb-4">Dear <strong>{userName}</strong>,</p>
    
//     <p className="text-gray-600 leading-relaxed mb-4">Congratulations! Your booking has been successfully confirmed. We're excited to welcome you to MakinsViewHotel!</p>
    
//     <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-6">
//       <h2 className="text-emerald-800 mt-0 mb-4 text-xl font-semibold">Booking Details</h2>
      
//       <div className="flex justify-between items-center mb-3 pb-3 border-b border-emerald-100">
//         <span className="text-gray-600 font-medium">Booking ID:</span>
//         <span className="text-gray-800 font-semibold">{bookingId}</span>
//       </div>
//       <div className="flex justify-between items-center mb-3 pb-3 border-b border-emerald-100">
//         <span className="text-gray-600 font-medium">Room:</span>
//         <span className="text-gray-800 font-semibold">{roomTitle}</span>
//       </div>
//       <div className="flex justify-between items-center mb-3 pb-3 border-b border-emerald-100">
//         <span className="text-gray-600 font-medium">Check-in:</span>
//         <span className="text-gray-800 font-semibold">{formatDate(checkIn)}</span>
//       </div>
//       <div className="flex justify-between items-center mb-3 pb-3 border-b border-emerald-100">
//         <span className="text-gray-600 font-medium">Check-out:</span>
//         <span className="text-gray-800 font-semibold">{formatDate(checkOut)}</span>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-gray-600 font-medium">Duration:</span>
//         <span className="text-gray-800 font-semibold">{nights} night{nights > 1 ? 's' : ''}</span>
//       </div>
//     </div>
    
//     <div className="bg-emerald-500 text-white py-4 px-6 rounded-xl text-center text-2xl font-bold my-6">
//       Total Amount: ${totalPrice.toFixed(2)}
//     </div>
    
//     <p className="text-gray-600 leading-relaxed mb-4">We're preparing everything for your arrival. If you have any special requests or need to modify your booking, please don't hesitate to contact us.</p>
    
//     <p className="text-gray-600 leading-relaxed mb-6">We look forward to providing you with an unforgettable experience!</p>
    
//     <div className="text-center">
//       <a 
//         href="https://your-hotel-domain.com/dashboard" 
//         className="inline-block bg-emerald-500 text-white py-3 px-7 rounded-lg no-underline font-semibold hover:bg-emerald-600 transition-colors my-5"
//       >
//         View My Bookings
//       </a>
//     </div>
    
//     <div className="text-center text-gray-500 text-sm mt-8 pt-5 border-t border-gray-200">
//       <p className="m-0">
//         Need help? Contact us at support@makinsviewhotel.com<br />
//         Warm regards,<br />
//         <strong>The MakinsViewHotel Team</strong>
//       </p>
//     </div>
//   </div>
// </div>
//   `;
// };