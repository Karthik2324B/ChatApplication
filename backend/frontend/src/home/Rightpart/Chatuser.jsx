import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx'
import { MdMenu } from "react-icons/md";

const Chatuser = () => {
  const { selectedConversation } = useConversation()

  const { onlineUsers } = useSocketContext();
  //  const isOnline = onlineUsers.includes(user._id);
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  console.log(selectedConversation)
  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Select a conversation to start chatting
      </div>
    );
  }
  return (
    <div className='flex items-center space-x-4 py-1 justify-center cursor-pointer bg-gray-700 hover:bg-gray-600 duration-300 h-[10vh]'>
        <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-1 p-2"
      >
       <MdMenu className='text-4xl text-white p-0'/>
      </label>
    <div className={`avatar ${getOnlineUsersStatus(selectedConversation._id) === "Online" ? "avatar-online" : ""}`}>
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg'>{selectedConversation.fullname}</h1>
        <span className='text-sm'>  {getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>
    </div>
  )
}

export default Chatuser
