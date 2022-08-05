import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { FaSearch } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'
import { logout, checkLogin } from '../../redux/auth/authActions'
import { getPostsBySearch } from '../../redux/posts/postsActions'
import SearchPostLoading from './SearchPostLoading'
import Sidebar from './Sidebar'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, userImage, name } = useSelector(state => state.auth)
  const { searchedPosts, searchLoading } = useSelector(state => state.posts)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  useEffect(() => {
    if (name === null) {
      dispatch(checkLogin())
    }
  }, [dispatch, name])

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleKeyUp = (e) => {
    setSearch(e.target.value)
    // console.log(search)
    if (search) {
      if (search.length < 10) {
        console.log(search)
        dispatch(getPostsBySearch(search))
      }
    }
  }

  const handleHideModal = () => {
    setModal(false)
    setSearch('')
  }

  const handleShowModal = () => {
    setModal(true)
  }

  let SearchedPosts
  if (searchLoading) {
    SearchedPosts = (
      <>
        <SearchPostLoading />
        <SearchPostLoading />
        <SearchPostLoading />
      </>
    )
  } else if (!searchLoading && searchedPosts.length !== 0) {
    SearchedPosts = (
      <>
        {searchedPosts.map((post) => {
          const { _id, file, title, description, tags } = post
          return (
            <Link to={`/post/${_id}`} onClick={handleHideModal} key={_id} className={`navbar-search-link`}>
              <div className="navbar-search-content-post">
                <div className="navbar-search-content-post-title">
                  {title}
                </div>
                <div className="navbar-search-content-post-inner">
                  <div className="navbar-search-content-post-image">
                    {(file?.format === "jpeg" || file?.format === "jpg" || file?.format === "png" || file?.format === "webp" || file?.format === "gif") && (
                      <img src={file?.url} alt="img" className="singlepost-img" />
                    )}
                    {(file?.format === "mp4" || file?.format === "mov" || file?.format === "wmv" || file?.format === "avi" || file?.format === "webm") && (
                      <video muted className="singlepost-img">
                        <source src={file?.url} type={`video/${file?.format}`} />
                      </video>
                    )}
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
      </>
    )
  } else {
    SearchedPosts = (
      <h3 style={{ padding: "1rem ", overflow: "hidden" }}>No posts</h3>
    )
  }

  return (
    <div className='navbar' onMouseLeave={handleHideModal}>
      <div className="navbar-logo">
        <Link to='/'>
          <img src="../../../images/reddit.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-search">
        <input type="text" name="" id="" placeholder='Search...' value={search || ""} onChange={(e) => setSearch(e.target.value)} onKeyUp={handleKeyUp} onClick={handleShowModal} />
        {/* create a modal for the search */}
        <FaSearch className='navbar-search-icon' onClick={handleKeyUp} />
        <div className={`navbar-search-content ${modal ? 'show' : 'hide'}`}>
          {SearchedPosts}
        </div>
      </div>
      <div className="navbar-features">
        {!isLoggedIn && (
          <Link className='link signin' to='/auth'>Signin/Login</Link>
        )}
        {isLoggedIn && (
          <div className="sidebar-dissapear">
            <Link className='link create' to='/posts/create'>Create post</Link>
            <Link className='link logout' to='/' onClick={handleLogout} >Logout</Link>
            <div className="avatar">
              {userImage !== '' && (
                <img src={userImage} alt="userImage" className="navbar-profile-icon" />
              )}
              {userImage === '' && (
                <CgProfile className="navbar-profile-icon" />
              )}
              <div className="content">
                <Link className='link' state={{ creator: name }} to='/user'>My posts</Link>
              </div>
            </div>
          </div>
        )}
        {isLoggedIn && (
          <Sidebar name={name} handleLogout={handleLogout} CgProfile={CgProfile} userImage={userImage} />
        )}
      </div>
    </div>
  )
}

export default Navbar