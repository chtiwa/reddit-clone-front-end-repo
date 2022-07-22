import React from 'react'
import './posts.css'
import Post from './post/Post'
import Pagination from '../../components/pagination/Pagination'

const Posts = () => {
  return (
    // media query
    <div className="posts-container-major">
      <div className="posts-container" >
        <Post />
        <Post />
        <Post />
      </div>
      <div className="pagination-container">
        <Pagination />
      </div>
    </div>
  )
}

export default Posts