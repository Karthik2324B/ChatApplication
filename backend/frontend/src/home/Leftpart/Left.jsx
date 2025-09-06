import React from 'react'
import Search from './Search.jsx'
import Users from './Users.jsx'
import Logout from './Logout.jsx'

const Left = () => {
  return (
    <div className='w-full bg-black'>
      <Search/>
      <Users/>
       {/* logout fixed at bottom */}
  <Logout />
    </div>
  )
}

export default Left
