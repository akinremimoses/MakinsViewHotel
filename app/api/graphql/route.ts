/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import RoomModel from "@/models/roomSchema";
import BookingModel from "@/models/bookingSchema";
import UserModel from "@/models/usersSchema";
import { verifyUser } from "@/actions/verifyuser";
import { sendBookingConfirmationEmail } from '@/lib/email-services';


export const typeDefs = gql`
  type Room {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    image: String!
    capacity: Int!
    available: Boolean!
  }

  type User {
    _id: ID!
    surname: String!
    middlename: String
    email: String!
     bookings: [Booking!]! 
  }

  type Booking {
    _id: ID!
    room: Room!
    user: User!
    checkIn: String!
    checkOut: String!
    totalPrice: Float!
    createdAt: String!
  }

  type Query {
    rooms: [Room!]!
    room(_id: ID!): Room
    bookings: [Booking!]!
    booking(_id: ID!): Booking
    me: User
  }

  type Mutation {
    createRoom(
      title: String!
      description: String!
      price: Float!
      image: String!
      capacity: Int!
      available: Boolean!
    ): Room!

    updateRoom(
      _id: ID!
      title: String
      description: String
      price: Float
      image: String
      capacity: Int
      available: Boolean
    ): Room!

    deleteRoom(_id: ID!): Boolean!

    createBooking(
      roomId: ID!
      checkIn: String!
      checkOut: String!
    ): Booking!
  }
`;

//Resolvers
export const resolvers = {
  Query: {
    rooms: async () => {
      await dbConnect();
      return await RoomModel.find();
    },

    room: async (_parent: unknown, { _id }: { _id: string }) => {
      await dbConnect();
      return await RoomModel.findById(_id);
    },

    bookings: async () => {
      await dbConnect();
      return await BookingModel.find().populate("room").populate("user");
    },

    booking: async (_parent: unknown, { _id }: { _id: string }) => {
      await dbConnect();
      return await BookingModel.findById(_id).populate("room").populate("user");
    },

    me: async (_parent: unknown, _args: any, _context: any) => {
      await dbConnect();
      const { id: userId, success } = await verifyUser(_context.req);
      if (!success || !userId) return null;

      const user = await UserModel.findById(userId).lean();
      if (!user) return null;

   
      const bookings = await BookingModel.find({ user: userId })
        .populate("room")
        .populate("user");

      return { ...user, bookings };
    },
  },

  Mutation: {
    
      updateRoom: async (
  _parent: unknown,
  { _id, title, description, price, image, capacity, available }: {
    _id: string;
    title?: string;
    description?: string;
    price?: number;
    image?: string;
    capacity?: number;
    available?: boolean;
  }
) => {
  try {
    await dbConnect();

    const updatedRoom = await RoomModel.findByIdAndUpdate(
      _id,
      { title, description, price, image, capacity, available },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) throw new Error("Room not found ❌");

    return updatedRoom;
  } catch (error) {
    console.error("Update room error:", error);
    throw new Error(`Failed to update room`);
  }
},

  
    createRoom: async (
      _parent: unknown,
      { 
        title, 
        description, 
        price, 
        image, 
        capacity, 
        available 
      }: { 
        title: string;
        description: string;
        price: number;
        image: string;
        capacity: number;
        available: boolean;
      }
    ) => {
      try {
        await dbConnect();
        
        const newRoom = new RoomModel({
          title,
          description,
          price,
          image,
          capacity,
          available
        });

        const savedRoom = await newRoom.save();
        return savedRoom;
      } catch (error) {
        console.error("Create room error:", error);
        throw new Error(`Failed to create room:❌`);
      }
    },

 
    deleteRoom: async (_parent: unknown, { _id }: { _id: string }) => {
      try {
        await dbConnect();
        
        const deletedRoom = await RoomModel.findByIdAndDelete(_id);
        
     
        return !!deletedRoom;
      } catch (error) {
        console.error("Delete room error:", error);
     
      }
    },

   

    createBooking: async (
      _parent: unknown,
      { roomId, checkIn, checkOut }: { roomId: string; checkIn: string; checkOut: string },
      _context: any
    ) => {
      await dbConnect();

      // Verify user
      const { id: userId, success } = await verifyUser(_context.req);
      if (!success || !userId) throw new Error("Not authenticated ❌");

      // Find d available room
      const room = await RoomModel.findById(roomId);
      if (!room) throw new Error("Room not found ❌");
      if (!room.available) throw new Error("Room is not available ❌");

      // Find d user with email
      const user = await UserModel.findById(userId);
      if (!user) throw new Error("User not found ❌");

      // Calculate nights & totalPrice
      const nights = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (nights <= 0) throw new Error("Invalid booking dates ❌");

      const totalPrice = nights * room.price;

      // Create booking
      const booking = new BookingModel({
        room: roomId,
        user: userId,
        checkIn,
        checkOut,
        totalPrice,
      });
      await booking.save();

      // Mark room unavailable
      room.available = false;
      await room.save();

      // Populate room & user
      await booking.populate(["room", "user"]);

      //  booking confirmation email
      sendBookingConfirmationEmail(
        user.email,
        `${user.surname} ${user.middlename || ''}`.trim(),
        room.title,
        checkIn,
        checkOut,
        totalPrice,
        nights,
        booking._id.toString()
      )
        .then(result => {
          if (result.success) {
            console.log("✅ Booking confirmation email sent successfully");
          } else {
            console.error("❌ Failed to send booking confirmation email:", result.error);
          }
        })
        .catch(emailError => {
          console.error("❌ Booking email sending error:", emailError);
        });

      return booking;
    },
  },
};


const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextRequest) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}