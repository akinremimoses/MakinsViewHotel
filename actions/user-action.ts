"use server"

import UserModel from "@/models/usersSchema"
import dbConnect from "@/lib/dbConnect"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";


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
    console.log("📥 Creating user:", user.email);

    const newUser = await UserModel.create(user); // ✅ should trigger pre("save")

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
				success: false,
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

		// const token = jwt.sign({ id: String(user._id) }, process.env.JWT_SECRET!, { expiresIn: '2h' });

		const token = await new SignJWT({ id: String(user._id) })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime("2h").setIssuedAt().sign(encodedSecret);

		const cookieStore = await cookies();

		cookieStore.set("token", token, {
			secure: process.env.NODE_ENV === "production"
		});

		return {
			success: true
		}
	} catch (error) {
		console.log(error);
		return {
			success: false
		}
	}
}

export const logout = async () => {
	const cookieStore = await cookies();

	cookieStore.delete("token");
}


export const verifyUser = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		return { success: false }
	}

	// const payload = jwt.verify(token, process.env.JWT_SECRET!);
	const { payload } = await jwtVerify(token, encodedSecret, {
		algorithms: ['HS256']
	})

	return {
		id: payload.id,
		success: true
	}
}

export const getUserWithId = async (id: string) => {
	const user = await UserModel.findById(id).lean();

	return user;
}