import React, { useState } from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import Cookies from "js-cookie"
import { toast } from 'react-hot-toast'
const Logout = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully", { duration: 2000 }); // show for 3 sec
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <div className='bg-slate-600 mt-auto flex items-center pl-10'>
      <RiLogoutCircleLine
        className='text-6xl  hover:bg-slate-700 rounded-full p-2.5 cursor-pointer ' onClick={handleLogout}
      />
      <span className='font-bold text-2xl text-gray-400 pl-2'>Logout</span>
    </div>
  )
}

export default Logout



