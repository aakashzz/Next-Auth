"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import  toast  from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function page() {
   const [user, setUser] = useState({
      email: "",
      password: "",
   });
   const router = useRouter();
   const [loading, setLoading] = useState<Boolean>(false);
   const [buttonDisabled, setButtonDisabled] = useState<Boolean>(true);

   const LoginHandler = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/login", user);
         console.log("Login User", response.data.message);
         toast.success("User Logged In")
         router.push("/profile");
      } catch (error: any) {
         toast.error(error.message);
         console.error(error.message);
      }
   };
   useEffect(() => {
      if (
         user.email.length > 0 &&
         user.password.length > 0 
      ) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [user]);
   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-2xl py-2 font-semibold">{loading ? "Processing" : "Login"}</h1>
            <label htmlFor="email">Email</label>
            <input
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
               type="email"
               id="email"
               value={user.email}
               onChange={(e) => setUser({ ...user, email: e.target.value })}
               placeholder="Type Email"
            />
            <label htmlFor="password">Password</label>
            <input
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
               type="password"
               id="password"
               value={user.password}
               onChange={(e) => setUser({ ...user, password: e.target.value })}
               placeholder="Type Password"
            />
            <button onClick={LoginHandler} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
               {buttonDisabled ? "No Login" : "Login"}
            </button>
            <Link href={"/signup"}>Visit SignUp Page</Link>
      </div>
   );
}

export default page;
