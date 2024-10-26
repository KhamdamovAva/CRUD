import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className='flex justify-between py-[10px] bg-slate-900 px-[15px] text-zinc-400'>
        <p>React CRUD</p>
        <ul className='space-x-5'>
          <Link to="/">Home</Link>
          <Link to="/CreateUser" >Create User</Link>
          <Link to="/ShowUser" >Show User</Link>
        </ul>
      </nav >
    </>
  )
}

export default Navbar
