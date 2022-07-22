import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../posts/post/Post'
import Pagination from '../../components/pagination/Pagination'
import { useParams, useLocation } from 'react-router-dom'
import { getPostsBySubreddit } from '../../redux/posts/postsActions'

const SubredditPosts = () => {
  // const [page, setPage] = useState()
  const { tag } = useParams()
  console.log(tag)
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  let page = 1
  useEffect(() => {
    dispatch(getPostsBySubreddit(page, tag))
  }, [dispatch, tag])

  return (
    <div className='subreddit-posts-container'>
      <div className='subreddit-posts-span-container'>
        <span>/r/{posts.length && tag}</span>
      </div>
      <div className="posts-container">
        <Post />
        <Post />
        <Post />
      </div>
      <div className="pagination-container">
        {/* <Pagination page={page} setPage={setPage} /> */}
      </div>
    </div>
  )
}

export default SubredditPosts