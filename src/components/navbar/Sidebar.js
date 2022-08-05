import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Sidebar = ({ userImage, name, handleLogout, CgProfile }) => {
  return (
    <div className='sidebar'>
      <div className="sidebar-avatar">
        {userImage !== '' && (
          <img src={userImage} alt="userImage" className="navbar-profile-icon" />
        )}
        {userImage === '' && (
          <CgProfile className="navbar-profile-icon" />
        )}
        <div className="sidebar-content">
          <Link className='link sidebar-create' to='/posts/create'>Create post</Link>
          <Link className='link sidebar-userposts' state={{ creator: name }} to='/user'>My posts</Link>
          <Link className='link sidebar-logout' to='/' onClick={handleLogout} >Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar