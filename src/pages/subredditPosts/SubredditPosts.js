import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import './subredditPosts.css'
import Post from '../posts/post/Post'
import Pagination from '../../components/pagination/Pagination'
import { useParams } from 'react-router-dom'
import { getPostsBySubreddit } from '../../redux/posts/postsActions'

const SubredditPosts = () => {
  const location = useLocation()
  const { tag } = useParams()
  const [page, setPage] = useState()
  console.log(tag)
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(state => state.posts)
  // let page = 1
  useEffect(() => {
    dispatch(getPostsBySubreddit(page, tag))
  }, [dispatch, tag, page])

  let tagRender
  if (location.state?.tag) {
    tagRender = location.state.tag
  } else if (!loading && posts.length) {
    tagRender = tag
  }
  return (
    <div className='subreddit-posts-container'>
      <div className='subreddit-posts-span-container'>
        <span>/r/{tagRender}
        </span>

      </div>
      <div className="posts-container">
        {posts.map((post) => {
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