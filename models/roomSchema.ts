import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // store image URL
    capacity: { type: Number, required: true }, // number of guests allowed
    available: { type: Boolean, default: true }, // availability status
  },
  { timestamps: true } // adds createdAt & updatedAt
);

const RoomModel = models.Room || model("Room", RoomSchema);
export default RoomModel;
