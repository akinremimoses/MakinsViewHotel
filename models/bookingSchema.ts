import mongoose, { Schema, Document, models } from "mongoose";

export interface IBooking extends Document {
  room: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const BookingModel = models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default BookingModel;
