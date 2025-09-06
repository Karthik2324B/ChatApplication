import React from 'react'
import User from './User.jsx'
import Logout from './Logout.jsx'
import useGetAllUsers from '../../context/useGetAllUsers.jsx'



const Users = () => {
  const [allUsers, loading] = useGetAllUsers()
  console.log(allUsers)
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className="h-[68vh] flex flex-col">
        {/* scrollable user list */}
        <div className="scrollbar-hide overflow-y-scroll">
          {allUsers.map((user, index) => (
            <User key={index} user={user} />
          ))}
          {/* ... */}
        </div>


      </div>

    </div>
  )
}

export default Users
