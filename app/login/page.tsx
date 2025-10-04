"use client";

import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import { loginAction } from "@/actions/user-action";
import { useRouter } from "next/navigation";

//IF I DECIDE TO USE FORMDATA
// const Page = () => {
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError("");

//     const formData = new FormData(e.currentTarget)
//     const loginInfo = {
//       email: formData.get("email") as string,
//       password: formData.get("password") as string,
//     }

//     try {
//       const res = await loginAction(loginInfo) 
//       if (res.success) {
//         setError("✅ Login successful")
//         router.push("/")
//       }
//     } catch {
//       setError("Login failed")
//     }
//   }

const Page = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false) 

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await loginAction(loginInfo);

    if (res.success) {
      setError("✅ Login successful");

      // ✅ Redirect based on user role
      if (res.user?.role === "admin") {
        router.push("/admin-room");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(res.message || "❌ Login failed");
    }
  } catch {
    setError("❌ Server error, please try again");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative h-screen w-full">
      <Image
        src="/iimage.jpg"
        alt="Welcome Image"
        fill
        className="object-cover opacity-70"
      />

      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-6 border rounded-lg w-full max-w-md bg-white shadow absolute">
          <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex items-center border rounded px-3">
              <Mail className="text-gray-500 w-5 h-5 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={loginInfo.email}
                onChange={handleInputChange}
                className="w-full h-10 outline-none"
              />
            </div>

            <div className="flex items-center border rounded px-3">
              <Lock className="text-gray-500 w-5 h-5 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={loginInfo.password}
                onChange={handleInputChange}
                className="w-full h-10 outline-none"
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white py-2 rounded transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex gap-4">
              <h2>Do you have an account? No </h2>
              <Link href="/signup" className="text-blue-600 underline">
                Sign Up here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
