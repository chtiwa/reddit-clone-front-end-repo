import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './subredditPosts.css'
import Post from '../posts/post/Post'
import Pagination from '../../components/pagination/Pagination'
import { useParams } from 'react-router-dom'
import { getPostsBySubreddit } from '../../redux/posts/postsActions'
import PostLoading from '../posts/post/PostLoading'

const SubredditPosts = () => {
  const location = useLocation()
  const { tag } = useParams()
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const { subredditPosts, loading } = useSelector(state => state.posts)
  useEffect(() => {
    dispatch(getPostsBySubreddit(page, tag))
  }, [dispatch, tag, page])

  let tagRender
  if (location.state?.tag) {
    tagRender = location.state.tag
  } else if (!loading && subredditPosts.length) {
    tagRender = tag
  }

  if (loading) {
    return (
      <div className="post-loading-container">
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    )
  }

  return (
    <div className='subreddit-posts-container'>
      <div className='subreddit-posts-span-container'>
        <span>/r/{tagRender}
        </span>

      </div>
      <div className="posts-container">
        {subredditPosts.map((post) => {
          return (
            <Post {...post} key={post._id} />
          )
        })}
      </div>
      <div className="pagination-container">
        <Pagination page={page} setPage={setPage} />
      </div>
    </div>
  )
}

export default SubredditPosts