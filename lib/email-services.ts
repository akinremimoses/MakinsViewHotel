import { sendEmail } from './nodemailer';
import { generateWelcomeEmailHTML, generateBookingConfirmationHTML } from './email-templates';

export const sendWelcomeEmail = async (userName: string, userEmail: string) => {
  try {
    const html = generateWelcomeEmailHTML(userName, userEmail);
    
    const result = await sendEmail({
      to: userEmail,
      subject: '🎉 Welcome to MakinsViewHotel!',
      html,
    });

    if (!result.success) {
      console.error('Error sending welcome email:', result.error);
      return { success: false, error: result.error };
    }

    console.log('Welcome email sent successfully to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
};

export const sendBookingConfirmationEmail = async (
  userEmail: string,
  userName: string,
  roomTitle: string,
  checkIn: string,
  checkOut: string,
  totalPrice: number,
  nights: number,
  bookingId: string
) => {
  try {
    const html = generateBookingConfirmationHTML(
      userName,
      roomTitle,
      checkIn,
      checkOut,
      totalPrice,
      nights,
      bookingId
    );

    const result = await sendEmail({
      to: userEmail,
      subject: '🎉 Your MakinsViewHotel Booking is Confirmed!',
      html,
    });

    if (!result.success) {
      console.error('Error sending booking confirmation email:', result.error);
      return { success: false, error: result.error };
    }

    console.log('Booking confirmation email sent successfully to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Failed to send booking confirmation email:', error);
    return { success: false, error };
  }
};