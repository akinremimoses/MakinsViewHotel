import { Schema, model, models } from "mongoose";

const RoomSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, 
    capacity: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true } 
);

const RoomModel = models.Room || model("Room", RoomSchema);
export default RoomModel;
