
"use client"

import Image from "next/image"
import { ChangeEvent, FormEvent, useState } from "react"
import { User, Mail, Phone, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/actions/user-action"

const Page = () => {
  const router = useRouter()

  const [formInput, setFormInput] = useState({
    surname: "",
    middlename: "",
    email: "",
    phonenumber: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
 
  const formInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      
      await registerUser(formInput)
   
      setFormInput({
        surname: "",
        middlename: "",
        email: "",
        phonenumber: "",
        password: "",
      })

      router.push("/login")
    } catch (error) {
      console.error("❌ Signup failed:", error);
      setLoading(false)
    }

  }

  return (
    <div className="relative h-screen w-full">
      <Image
        src="/iimage.jpg"
        alt="Welcome Image"
        fill
        className="object-cover opacity-70"
      />

      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center border rounded px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                name="surname"
                value={formInput.surname}
                onChange={formInputChange}
                placeholder="Surname"
                required
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                name="middlename"
                value={formInput.middlename}
                onChange={formInputChange}
                placeholder="Middlename"
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Mail className="text-gray-500 mr-2" size={18} />
              <input
                type="email"
                name="email"
                value={formInput.email}
                onChange={formInputChange}
                placeholder="Email"
                required
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Phone className="text-gray-500 mr-2" size={18} />
              <input
                type="number"
                name="phonenumber"
                value={formInput.phonenumber}
                onChange={formInputChange}
                placeholder="Phone Number"
                required
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="text-gray-500 mr-2" size={18} />
              <input
                type="password"
                name="password"
                value={formInput.password}
                onChange={formInputChange}
                placeholder="Password"
                required
                className="flex-1 outline-none bg-transparent"
              />
            </div>

            {/* <button
              type="submit"
              disabled={loading}
              className="bg-[rgb(79,133,167)] hover:bg-[rgb(238,164,34)] transition text-white py-2 rounded font-medium"
            >
              {loading ? "Signinup..." : "Sign Up"} THIS IS USEFUL ONLY WHEN YOU DONT WANT AN ANIMATION BESIDE YOUR button text
              Sign Up
            </button> */}

            <button
              type="submit"
              disabled={loading}
              className={`h-12 flex items-center justify-center gap-2 rounded font-medium text-white transition
                ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[rgb(79,133,167)] hover:bg-[rgb(238,164,34)]"}`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
