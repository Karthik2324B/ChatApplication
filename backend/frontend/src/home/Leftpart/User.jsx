import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from "../../context/SocketContext.jsx";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // ⚡ Safe check
  const isSelected = selectedConversation?._id === user?._id;

  const { socket, onlineUsers } = useSocketContext();
  const isOnline = user?._id && onlineUsers.includes(user._id); // only check if user._id exists

  // ⚡ Render nothing if user is undefined
  if (!user) return null;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${isSelected ? "bg-slate-700" : ""}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className='flex space-x-4 py-2 px-4 hover:bg-slate-700 duration-300 cursor-pointer'>
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" alt="avatar" />
          </div>
        </div>
        <div>
          <h1 className='text-white'>{user?.fullname || "Unknown User"}</h1>
          <span className='text-white'>{user?.email || "No Email"}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
