import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, checkLogin } from '../../redux/auth/authActions'
import { getPostsBySearch } from '../../redux/posts/postsActions'

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { isLoggedIn, userImage, name } = useSelector(state => state.auth)
  const { searchedPosts, loading } = useSelector(state => state.posts)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(checkLogin())
    } else if (name === null) {
      // when the state is lost
      dispatch(checkLogin())
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault()
      setSearch(e.target.value.trim().toLowerCase())
      if (search) {
        if (search.length < 10) {
          console.log(search)
          dispatch(getPostsBySearch(search))
          setSearch('')
        }
      }
    }
  }

  const handleHideModal = () => {
    setModal(false)
    console.log(modal)
  }

  const handleShowModal = () => {
    setModal(true)
    console.log(modal)
  }

  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <Link to='/'>
          <img src="../../../images/reddit.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-search" onMouseLeave={handleHideModal}>
        <input type="text" name="" id="" placeholder='Search...' onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} onClick={handleShowModal} />
        {/* create a modal for the search */}
        <FaSearch className='navbar-search-icon' onClick={handleKeyDown} />
        <div className={`navbar-search-content ${modal ? 'show' : 'hide'}`}>
          {!loading && searchedPosts.length > 0 && searchedPosts.map((post) => {
            const { _id, image, title, description, tags } = post
            return (
              <Link to={`/post/${_id}`} onClick={handleHideModal} key={_id} className="navbar-search-link">
                <div className="navbar-search-content-post">
                  <div className="navbar-search-content-post-title">
                    {title}
                  </div>
                  <div className="navbar-search-content-post-inner">
                    <div className="navbar-search-content-post-image">
                      <img src={image} alt="img" />
                    </div>
                    <div className="navbar-search-content-post-desc">
                      {description.slice(0, 20)}
                    </div>
                  </div>
                  <div className="navbar-search-content-tags">
                    {tags.length && `/r/${tags[0]}`}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
      {!isLoggedIn && (
        <div className="signin">
          <Link className='link' to='/auth'>Signin/Login</Link>
        </div>
      )}
      {isLoggedIn && (
        <>
          <div className="create">
            <Link className='link' to='/posts/create'>Create post</Link>
          </div>
          <div className="logout">
            <Link className='link' to='/' onClick={handleLogout} >Logout</Link>
          </div>
          <div className="avatar">
            {userImage !== '' && (
              <img src={userImage} alt="userImage" className="navbar-profile-icon" />
            )}
            {userImage === '' && (
              <CgProfile className="navbar-profile-icon" />
            )}
            {/*  */}
            <div className="content">
              <Link className='link' state={{ creator: name }} to='/user'>My posts</Link>
              {/* <Link className='link' to='/user'>My profile</Link> */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar