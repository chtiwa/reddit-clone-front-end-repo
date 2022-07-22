import React, { useEffect, useState } from 'react'
import './creatorPosts.css'
import Pagination from '../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../posts/post/Post'
import { getPostsByCreator } from '../../redux/posts/postsActions'

const CreatorPosts = () => {
  // you need to pass the page and setPage
  // the pages will be fetched in the pagination
  const [page, setPage] = useState()
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  // 
  // let page = 1
  // 
  let name
  if (posts.length) {
    name = posts[0].creator
  }
  useEffect(() => {
    dispatch(getPostsByCreator(page))
  }, [dispatch])
  return (
    <div className='creator-posts-container'>
      <div className="posts-creator-container">
        <div className="posts-creator">
          Posts created by:
          <br />
          <span>
            {name}
          </span>
        </div>
      </div>
      <div className="posts-container">
        <Post />
        <Post />
        <Post />
      </div>
      <div className="pagination-container">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  )
}

export default CreatorPosts