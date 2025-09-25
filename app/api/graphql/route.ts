import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import gql from "graphql-tag";
import { NextRequest } from "next/server";
import RoomModel from "@/models/roomSchema";
import BookingModel from "@/models/bookingSchema";
import dbConnect from "@/lib/dbConnect";

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
    name: String!
    email: String!
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
  }

  type Mutation {
    createRoom(
      title: String!
      description: String!
      price: Float!
      image: String!
      capacity: Int!
      available: Boolean!
    ): Room

    updateRoom(
      id: ID!
      title: String
      description: String
      price: Float
      image: String
      capacity: Int
      available: Boolean
    ): Room

    deleteRoom(id: ID!): Boolean!

    createBooking(
      roomId: ID!
      userId: ID!
      checkIn: String!
      checkOut: String!
    ): Booking!
  }
`;

// export const resolvers = {
//   Query: {
//     rooms: async () => {
//       await dbConnect();
//       return await RoomModel.find();
//     },
//     room: async (_parent: unknown, { _id }: { _id: string }) => {
//       await dbConnect();
//       return await RoomModel.findById(_id);
//     },
//   },
//   Mutation: {
//     createRoom: async (
//       _parent: unknown,
//       { title, description, price, image, capacity, available }: any
//     ) => {
//       await dbConnect(); // ✅ ensure DB is connected
//       const newRoom = new RoomModel({
//         title,
//         description,
//         price,
//         image,
//         capacity,
//         available,
//       });
//       return await newRoom.save();
//     },
//   },
// };

export const resolvers = {
  Query: {
    rooms: async () => {
      await dbConnect();
      return await RoomModel.find();
    },
    room: async (_: any, { _id }: { _id: string }) => {
      await dbConnect();
      return await RoomModel.findById(_id);
    },
    bookings: async () => {
      await dbConnect();
      return await BookingModel.find().populate("room").populate("user");
    },
    booking: async (_: any, { _id }: { _id: string }) => {
      await dbConnect();
      return await BookingModel.findById(_id).populate("room").populate("user");
    },
  },

  Mutation: {
    createRoom: async (
      _: any,
      { title, description, price, image, capacity, available }: any
    ) => {
      await dbConnect();
      const newRoom = new RoomModel({
        title,
        description,
        price,
        image,
        capacity,
        available,
      });
      return await newRoom.save();
    },

    updateRoom: async (_, { id, ...updates }) => {
      await dbConnect();
      const updatedRoom = await RoomModel.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!updatedRoom) throw new Error("Room not found ❌");
      return updatedRoom;
    },

    deleteRoom: async (_, { id }) => {
      await dbConnect();
      const deleted = await RoomModel.findByIdAndDelete(id);
      return !!deleted;
    },


    createBooking: async (
      _: any,
      { roomId, userId, checkIn, checkOut }: any
    ) => {
      await dbConnect();

      const room = await RoomModel.findById(roomId);
      if (!room) throw new Error("Room not found ❌");
      if (!room.available) throw new Error("Room is not available ❌");

      const nights =
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24);

      if (nights <= 0) throw new Error("Invalid booking dates ❌");

      const totalPrice = nights * room.price;

      const booking = new BookingModel({
        room: roomId,
        user: userId,
        checkIn,
        checkOut,
        totalPrice,
      });

      await booking.save();

      // Optionally mark room unavailable
      room.available = false;
      await room.save();

      return await booking.populate("room").populate("user");
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req: NextRequest) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
