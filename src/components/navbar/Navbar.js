import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <Link to='/'>
          <img src="./reddit.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" name="" id="" placeholder='Search...' />
        {/* create a modal for the search */}
        <FaSearch className='navbar-search-icon' />
      </div>
      <div className="signin">
        <Link className='link' to='/auth'>Signin/Login</Link>
      </div>
      <div className="logout">
        <Link className='link' to='/'>Logout</Link>
      </div>
      <div className="create">
        <Link className='link' to='/create'>Create post</Link>
      </div>
      <div className="avatar">
        <CgProfile className="navbar-profile-icon" />
        <div className="content">
          <Link className='link' to='/user'>My posts</Link>
          <Link className='link' to='/user'>My profile</Link>
        </div>
      </div>


    </div>
  )
}

export default Navbar