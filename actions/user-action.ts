"use server"

import UserModel from "@/models/usersSchema"
import dbConnect from "@/lib/dbConnect"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { sendWelcomeEmail } from "@/lib/email-services";


const encodedSecret = new TextEncoder().encode(process.env.JWT_SECRET!)


// export const registerUser = async (user: { surname: string, middlename?: string, password: string, email: string, phonenumber: string }) => {
// 	try {
// 		await dbConnect()
// 		console.log(" Creating user:", user.email);

// 		 const newUser = await UserModel.create(user);

// 		return {
// 			success: true
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			success: false
// 		}
// 	}
// }
export const registerUser = async (user: {
  surname: string,
  middlename?: string,
  password: string,
  email: string,
  phonenumber: string
}) => {
  try {
    await dbConnect();
    console.log("Creating user:", user.email);

    const newUser = await UserModel.create(user);

    // ✅ Send welcome email (non-blocking)
    sendWelcomeEmail(user.surname, user.email)
      .then(result => {
        if (result.success) {
          console.log("✅ Welcome email sent successfully");
        } else {
          console.error("❌ Failed to send welcome email:", result.error);
        }
      })
      .catch(emailError => {
        console.error("❌ Email sending error:", emailError);
      });

    console.log("✅ User saved:", newUser._id);
    return { success: true };

  } catch (error: any) {
    console.error("❌ Register error:", error.message);
    return { success: false, error: error.message };
  }
};


export const loginAction = async ({ email, password }: { password: string, email: string }) => {
  try {
    await dbConnect()

    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false, // ✅ Changed to false
        message: "User not found"
      }
    }

    const hashedPassword = user.password;
    const validPassword = await bcrypt.compare(password, hashedPassword);

    if (!validPassword) {
      return {
        success: false,
        message: "Invalid Details"
      }
    }

    const token = await new SignJWT({ id: String(user._id), role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return {
      success: true,
      user: { // ✅ Return user info including role
        id: user._id,
        role: user.role
      }
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Server error"
    }
  }
}

export const logout = async () => {
	const cookieStore = await cookies();

	cookieStore.delete("token");
}


// export const verifyUser = async () => {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return { success: false };
//   }

//   try {
//     const { payload } = await jwtVerify(token, encodedSecret, {
//       algorithms: ["HS256"],
//     });

//     return { id: payload.id as string, success: true };
//   } catch (err) {
//     console.error("JWT verify failed:", err);
//     return { success: false };
//   }
// };


// export const getUserWithId = async (id: string) => {
// 	const user = await UserModel.findById(id).lean();

// 	return user;
// }