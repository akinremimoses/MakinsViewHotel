// /* eslint-disable @typescript-eslint/no-explicit-any */
// import gql from "graphql-tag";
// import dbConnect from "@/lib/dbConnect";
// import RoomModel from "@/models/roomSchema";
// import BookingModel from "@/models/bookingSchema";
// import UserModel from "@/models/usersSchema";
// import { verifyUser } from "@/actions/verifyuser";
// import { sendBookingConfirmationEmail } from "@/lib/email-services";

// export const typeDefs = gql`
//   type Room {
//     _id: ID!
//     title: String!
//     description: String!
//     price: Float!
//     image: String!
//     capacity: Int!
//     available: Boolean!
//   }

//   type User {
//     _id: ID!
//     surname: String!
//     middlename: String
//     email: String!
//     bookings: [Booking!]! 
//   }

//   type Booking {
//     _id: ID!
//     room: Room!
//     user: User!
//     checkIn: String!
//     checkOut: String!
//     totalPrice: Float!
//     createdAt: String!
//   }

//   type Query {
//     rooms: [Room!]!
//     room(_id: ID!): Room
//     bookings: [Booking!]!
//     booking(_id: ID!): Booking
//     me: User
//   }

//   type Mutation {
//     createRoom(
//       title: String!
//       description: String!
//       price: Float!
//       image: String!
//       capacity: Int!
//       available: Boolean!
//     ): Room!

//     updateRoom(
//       _id: ID!
//       title: String
//       description: String
//       price: Float
//       image: String
//       capacity: Int
//       available: Boolean
//     ): Room!

//     deleteRoom(_id: ID!): Boolean!

//     createBooking(
//       roomId: ID!
//       checkIn: String!
//       checkOut: String!
//     ): Booking!
//   }
// `;

// export const resolvers = {
//   Query: {
//     rooms: async () => {
//       try {
//         await dbConnect();
//         console.log("Fetching all rooms...");
//         const rooms = await RoomModel.find();
//         console.log(`Found ${rooms.length} rooms`);
//         return rooms;
//       } catch (error) {
//         console.error("Error fetching rooms:", error);
//         throw new Error("Failed to fetch rooms");
//       }
//     },

//     room: async (_parent: unknown, { _id }: { _id: string }) => {
//       try {
//         await dbConnect();
//         console.log(`Fetching room with ID: ${_id}`);
//         const room = await RoomModel.findById(_id);
//         if (!room) {
//           console.log("Room not found");
//           throw new Error("Room not found");
//         }
//         return room;
//       } catch (error) {
//         console.error("Error fetching room:", error);
//         throw new Error("Failed to fetch room");
//       }
//     },

//     bookings: async () => {
//       await dbConnect();
//       return await BookingModel.find().populate("room").populate("user");
//     },

//     booking: async (_parent: unknown, { _id }: { _id: string }) => {
//       await dbConnect();
//       return await BookingModel.findById(_id).populate("room").populate("user");
//     },

//     me: async (_parent: unknown, _args: any, _context: any) => {
//       await dbConnect();
//       const { id: userId, success } = await verifyUser();
//       if (!success || !userId) return null;

//       const user = await UserModel.findById(userId).lean();
//       if (!user) return null;

//       const bookings = await BookingModel.find({ user: userId })
//         .populate("room")
//         .populate("user");

//       return { ...user, bookings };
//     },
//   },

//   Mutation: {
//     updateRoom: async (
//       _parent: unknown,
//       { _id, title, description, price, image, capacity, available }: {
//         _id: string;
//         title?: string;
//         description?: string;
//         price?: number;
//         image?: string;
//         capacity?: number;
//         available?: boolean;
//       }
//     ) => {
//       try {
//         await dbConnect();

//         const updatedRoom = await RoomModel.findByIdAndUpdate(
//           _id,
//           { title, description, price, image, capacity, available },
//           { new: true, runValidators: true }
//         );

//         if (!updatedRoom) throw new Error("Room not found ❌");

//         return updatedRoom;
//       } catch (error) {
//         console.error("Update room error:", error);
//         throw new Error(`Failed to update room`);
//       }
//     },

//     createRoom: async (
//       _parent: unknown,
//       { 
//         title, 
//         description, 
//         price, 
//         image, 
//         capacity, 
//         available 
//       }: { 
//         title: string;
//         description: string;
//         price: number;
//         image: string;
//         capacity: number;
//         available: boolean;
//       }
//     ) => {
//       try {
//         await dbConnect();
        
//         const newRoom = new RoomModel({
//           title,
//           description,
//           price,
//           image,
//           capacity,
//           available
//         });

//         const savedRoom = await newRoom.save();
//         return savedRoom;
//       } catch (error) {
//         console.error("Create room error:", error);
//         throw new Error(`Failed to create room:❌`);
//       }
//     },

//     deleteRoom: async (_parent: unknown, { _id }: { _id: string }) => {
//       try {
//         await dbConnect();
        
//         const deletedRoom = await RoomModel.findByIdAndDelete(_id);
        
//         return !!deletedRoom;
//       } catch (error) {
//         console.error("Delete room error:", error);
//         throw new Error(`Failed to delete room`);
//       }
//     },

//     createBooking: async (
//       _parent: unknown,
//       { roomId, checkIn, checkOut }: { roomId: string; checkIn: string; checkOut: string },
//       _context: any
//     ) => {
//       await dbConnect();

//       const { id: userId, success } = await verifyUser();
//       if (!success || !userId) throw new Error("Not authenticated ❌");

//       const room = await RoomModel.findById(roomId);
//       if (!room) throw new Error("Room not found ❌");
//       if (!room.available) throw new Error("Room is not available ❌");

//       const user = await UserModel.findById(userId);
//       if (!user) throw new Error("User not found ❌");

//       const nights = Math.ceil(
//         (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
//       );
//       if (nights <= 0) throw new Error("Invalid booking dates ❌");

//       const totalPrice = nights * room.price;

//       const booking = new BookingModel({
//         room: roomId,
//         user: userId,
//         checkIn,
//         checkOut,
//         totalPrice,
//       });
//       await booking.save();

//       room.available = false;
//       await room.save();

//       await booking.populate(["room", "user"]);

//       sendBookingConfirmationEmail(
//         user.email,
//         `${user.surname} ${user.middlename || ''}`.trim(),
//         room.title,
//         checkIn,
//         checkOut,
//         totalPrice,
//         nights,
//         booking._id.toString()
//       )
//         .then(result => {
//           if (result.success) {
//             console.log("✅ Booking confirmation email sent successfully");
//           } else {
//             console.log("❌ Failed to send booking confirmation email:", result.error);
//           }
//         })
//         .catch(emailError => {
//           console.error("❌ Booking email sending error:", emailError);
//         });

//       return booking;
//     },
//   },
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from "graphql-tag";
import dbConnect from "@/lib/dbConnect";
import RoomModel from "@/models/roomSchema";
import BookingModel from "@/models/bookingSchema";
import UserModel from "@/models/usersSchema";
import { verifyUser } from "@/actions/verifyuser";
import { sendBookingConfirmationEmail } from "@/lib/email-services";

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
    phonenumber: String!
    profileImage: String
    role: String!
    createdAt: String!
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

  input UserProfileInput {
    surname: String
    middlename: String
    phonenumber: String
  }

  type Query {
    rooms: [Room!]!
    room(_id: ID!): Room
    bookings: [Booking!]!
    booking(_id: ID!): Booking
    me: User
  }

  type Mutation {
    # Room Mutations
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

    # Booking Mutations
    createBooking(
      roomId: ID!
      checkIn: String!
      checkOut: String!
    ): Booking!

    # User Profile Mutations
    updateUserProfile(updates: UserProfileInput!): User!
    uploadProfileImage(imageUrl: String!): User!
  }
`;

export const resolvers = {
  Query: {
    rooms: async () => {
      try {
        await dbConnect();
        console.log("Fetching all rooms...");
        const rooms = await RoomModel.find();
        console.log(`Found ${rooms.length} rooms`);
        return rooms;
      } catch (error) {
        console.error("Error fetching rooms:", error);
        throw new Error("Failed to fetch rooms");
      }
    },

    room: async (_parent: unknown, { _id }: { _id: string }) => {
      try {
        await dbConnect();
        console.log(`Fetching room with ID: ${_id}`);
        const room = await RoomModel.findById(_id);
        if (!room) {
          console.log("Room not found");
          throw new Error("Room not found");
        }
        return room;
      } catch (error) {
        console.error("Error fetching room:", error);
        throw new Error("Failed to fetch room");
      }
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
      const { id: userId, success } = await verifyUser();
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
    // Room Mutations
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
        throw new Error(`Failed to delete room`);
      }
    },

    // Booking Mutation
    createBooking: async (
      _parent: unknown,
      { roomId, checkIn, checkOut }: { roomId: string; checkIn: string; checkOut: string },
      _context: any
    ) => {
      await dbConnect();

      const { id: userId, success } = await verifyUser();
      if (!success || !userId) throw new Error("Not authenticated ❌");

      const room = await RoomModel.findById(roomId);
      if (!room) throw new Error("Room not found ❌");
      if (!room.available) throw new Error("Room is not available ❌");

      const user = await UserModel.findById(userId);
      if (!user) throw new Error("User not found ❌");

      const nights = Math.ceil(
        (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
      );
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

      room.available = false;
      await room.save();

      await booking.populate(["room", "user"]);

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

    // NEW: User Profile Mutations
    updateUserProfile: async (
      _parent: unknown,
      { updates }: { updates: { surname?: string; middlename?: string; phonenumber?: string } },
      _context: any
    ) => {
      await dbConnect();
      
      const { id: userId, success } = await verifyUser();
      if (!success || !userId) throw new Error("Not authenticated ❌");

      // Only allow updating specific fields for security
      const allowedUpdates: any = {};
      if (updates.surname) allowedUpdates.surname = updates.surname;
      if (updates.middlename) allowedUpdates.middlename = updates.middlename;
      if (updates.phonenumber) allowedUpdates.phonenumber = updates.phonenumber;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: allowedUpdates },
        { new: true, runValidators: true }
      );

      if (!updatedUser) throw new Error("User not found ❌");
      return updatedUser;
    },

    // NEW: Profile Image Upload Mutation
    uploadProfileImage: async (
      _parent: unknown,
      { imageUrl }: { imageUrl: string },
      _context: any
    ) => {
      await dbConnect();
      
      const { id: userId, success } = await verifyUser();
      if (!success || !userId) throw new Error("Not authenticated ❌");

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { profileImage: imageUrl },
        { new: true }
      );

      if (!updatedUser) throw new Error("User not found ❌");
      return updatedUser;
    },
  },
};