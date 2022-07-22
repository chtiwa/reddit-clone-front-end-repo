import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'
import { logout, checkLogin } from '../../redux/auth/authActions'
// check login

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, userImage } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <Link to='/'>
          <img src="../../../images/reddit.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" name="" id="" placeholder='Search...' />
        {/* create a modal for the search */}
        <FaSearch className='navbar-search-icon' />
      </div>
      {!isLoggedIn && (
        <div className="signin">
          <Link className='link' to='/auth'>Signin/Login</Link>
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className="logout">
            <Link className='link' to='/' onClick={handleLogout} >Logout</Link>
          </div>
          <div className="create">
            <Link className='link' to='/posts/create'>Create post</Link>
          </div>
          <div className="avatar">
            <CgProfile className="navbar-profile-icon" />
            {/*  */}
            <div className="content">
              <Link className='link' to='/user'>My posts</Link>
              <Link className='link' to='/user'>My profile</Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar