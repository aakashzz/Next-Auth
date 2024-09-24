"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import  toast  from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
   username: string;
   email: string;
   password: string;
}

function page() {
   const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
   });
   const router = useRouter();
   const [loading, setLoading] = useState<Boolean>(false);
   const [buttonDisabled, setButtonDisabled] = useState<Boolean>(true);

   const SignUpHandler = async () => {
      try {
         setLoading(true);
         const response = await axios.post("/api/users/signup", user);
         console.log("Signup User", response.data);
         toast.success("User Will be Created")
         router.push("/login");
      } catch (error: any) {
         console.error(error.message);
         toast.error(error.message);
      }
   };
   useEffect(() => {
      if (
         user.email.length > 0 &&
         user.password.length > 0 &&
         user.username.length > 0
      ) {
         setButtonDisabled(false);
      } else {
         setButtonDisabled(true);
      }
   }, [user]);
   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-2xl py-2 font-semibold">{loading ? "Processing" : "SignUp"}</h1>
         
            <label htmlFor="username">Username</label>
            <input
               className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
               type="username"
               id="username"
               value={user.username}
               onChange={(e) => setUser({ ...user, username: e.target.value })}
               placeholder="Type Username"
            />
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
            <button onClick={SignUpHandler} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
               {buttonDisabled ? "No Register" : "SignUp"}
            </button>
            <Link href={"/login"}>Visit Login Page</Link>
      </div>
   );
}

export default page;
