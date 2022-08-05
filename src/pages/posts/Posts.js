import React, { useEffect } from 'react'
import './posts.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../redux/posts/postsActions'
import Post from './post/Post'
import Pagination from '../../components/pagination/Pagination'

const Posts = () => {
  const dispatch = useDispatch()
  const { posts, page } = useSelector(state => state.posts)
  useEffect(() => {
    dispatch(getPosts(page))
  }, [dispatch, page])

  return (
    // media query
    <div className="posts-container-major">
      <div className="posts-container" >
        {posts.map((post) => {
          return (
            <Post {...post} key={post._id} />
          )
        })}
      </div>
      <div className="pagination-container">
        {/* <Pagination page={page} setPage={setPage} /> */}
        <Pagination />
      </div>
    </div>
  )
}

export default Posts