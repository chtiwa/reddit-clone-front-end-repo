import React from 'react'
import './posts.css'
import Post from './post/Post'
import { useSelector } from 'react-redux'

const Posts = () => {
  const { show } = useSelector(state => state.modal)

  return (
    // media query
    <div className={`posts-container ${!show ? 'mt' : ''}`} >
      <Post show={show} />
    </div>
  )
}

export default Posts