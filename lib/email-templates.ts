

export const generateWelcomeEmailHTML = (userName: string, userEmail: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background-color: #f6f9fc; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          padding: 40px 20px; 
          text-align: center; 
          color: white; 
        }
        .content { 
          padding: 40px; 
        }
        h1 { 
          color: #333; 
          margin-bottom: 20px; 
        }
        p { 
          color: #666; 
          line-height: 1.6; 
          margin-bottom: 16px; 
        }
        .features { 
          background: #f8fafc; 
          border-radius: 8px; 
          padding: 20px; 
          margin: 24px 0; 
        }
        .feature-item { 
          display: flex; 
          align-items: center; 
          margin-bottom: 12px; 
          color: #555; 
        }
        .button { 
          display: inline-block; 
          background: #2563eb; 
          color: white; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 14px; 
          margin-top: 32px; 
          padding-top: 20px; 
          border-top: 1px solid #e2e8f0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to MakinsViewHotel!</h1>
        </div>
        
        <div class="content">
          <p>Dear <strong>${userName}</strong>,</p>
          
          <p>Thank you for registering with MakinsViewHotel! We're thrilled to have you as part of our family.</p>
          
          <p>Your account has been successfully created with the email: <strong>${userEmail}</strong></p>
          
          <div class="features">
            <p style="margin-top: 0; font-weight: 600;">With your account, you can:</p>
            <div class="feature-item">📖 Browse and book our luxurious rooms</div>
            <div class="feature-item">👀 View your booking history</div>
            <div class="feature-item">💼 Manage your profile information</div>
            <div class="feature-item">🎯 Receive exclusive offers and promotions</div>
          </div>
          
          <p>Ready to plan your stay? Start exploring our available rooms and book your perfect getaway!</p>
          
        //   <div style="text-align: center;">
        //     <a href="http://localhost:3000/rooms" class="button">Explore Our Rooms</a>
        //   </div>
          
          <div class="footer">
            <p>Warm regards,<br><strong>The MakinsViewHotel Team</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateBookingConfirmationHTML = (
  userName: string,
  roomTitle: string,
  checkIn: string,
  checkOut: string,
  totalPrice: number,
  nights: number,
  bookingId: string
) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          background-color: #f6f9fc; 
          margin: 0; 
          padding: 0; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background-color: #ffffff; 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        }
        .header { 
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
          padding: 40px 20px; 
          text-align: center; 
          color: white; 
        }
        .content { 
          padding: 40px; 
        }
        h1 { 
          color: #333; 
          margin-bottom: 20px; 
        }
        p { 
          color: #666; 
          line-height: 1.6; 
          margin-bottom: 16px; 
        }
        .booking-details { 
          background: #f0fdf4; 
          border: 1px solid #bbf7d0; 
          border-radius: 8px; 
          padding: 24px; 
          margin: 24px 0; 
        }
        .detail-row { 
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 12px; 
          padding-bottom: 12px; 
          border-bottom: 1px solid #dcfce7; 
        }
        .detail-row:last-child { 
          border-bottom: none; 
          margin-bottom: 0; 
        }
        .detail-label { 
          color: #555; 
          font-weight: 500; 
        }
        .detail-value { 
          color: #333; 
          font-weight: 600; 
        }
        .button { 
          display: inline-block; 
          background: #10b981; 
          color: white; 
          padding: 14px 28px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 14px; 
          margin-top: 32px; 
          padding-top: 20px; 
          border-top: 1px solid #e2e8f0; 
        }
        .total-amount { 
          background: #10b981; 
          color: white; 
          padding: 16px; 
          border-radius: 8px; 
          text-align: center; 
          font-size: 24px; 
          font-weight: bold; 
          margin: 20px 0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
        </div>
        
        <div class="content">
          <p>Dear <strong>${userName}</strong>,</p>
          
          <p>Congratulations! Your booking has been successfully confirmed. We're excited to welcome you to MakinsViewHotel!</p>
          
          <div class="booking-details">
            <h2 style="color: #065f46; margin-top: 0;">Booking Details</h2>
            
            <div class="detail-row">
              <span class="detail-label">Booking ID:</span>
              <span class="detail-value">${bookingId}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Room:</span>
              <span class="detail-value">${roomTitle}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-in:</span>
              <span class="detail-value">${formatDate(checkIn)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Check-out:</span>
              <span class="detail-value">${formatDate(checkOut)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Duration:</span>
              <span class="detail-value">${nights} night${nights > 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div class="total-amount">
            Total Amount: $${totalPrice.toFixed(2)}
          </div>
          
          <p>We're preparing everything for your arrival. If you have any special requests or need to modify your booking, please don't hesitate to contact us.</p>
          
          <p>We look forward to providing you with an unforgettable experience!</p>
          
          <div style="text-align: center;">
            <a href="https://your-hotel-domain.com/dashboard" class="button">View My Bookings</a>
          </div>
          
          <div class="footer">
            <p>Need help? Contact us at support@makinsviewhotel.com<br>
            Warm regards,<br><strong>The MakinsViewHotel Team</strong></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};