"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function page() {
    const [userDetails,setUserDetails] = useState("");
    const router = useRouter();
    async function ProfileHandler(){
        try {
            const response = await axios.get("/api/users/me");
            setUserDetails(response.data.data._id);
        } catch (error:any) {
            console.error(error.message);
            toast.error(error.message)
        }

    }

    async function logout(){
         await axios.get("/api/users/logout");
         toast.success("LogOut Success")
         router.push("/login")
    }
    useEffect(()=>{
         ProfileHandler()
    },[userDetails])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className='text-white'>{userDetails}</h1>
         <Link href={`/profile/${userDetails}`}>Move Profile</Link>
         <button onClick={logout} className='bg-green-500 rounded-lg p-2'>Logout</button>
    </div>
  )
}

export default page