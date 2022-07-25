import React, { useEffect, useState } from 'react'
import './creatorPosts.css'
import { useLocation } from 'react-router-dom'
import Pagination from '../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../posts/post/Post'
import { getPostsByCreator } from '../../redux/posts/postsActions'

const CreatorPosts = () => {
  // you need to pass the page and setPage
  // the pages will be fetched in the pagination
  const location = useLocation()
  const [page, setPage] = useState()
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(state => state.posts)
  // 
  // let page = 1
  // 
  let name
  if (posts?.length) {
    name = posts[0].creator
  }
  useEffect(() => {
    console.log(location.state?.creator)
    if (location.state) {
      dispatch(getPostsByCreator(page, location.state?.creator))
    } else {
      dispatch(getPostsByCreator(page))
    }
  }, [dispatch, page, name, location.state])

  return (
    <div className='creator-posts-container'>
      <div className="posts-creator-container">
        {posts?.length > 0 && !loading && (
          <div className="posts-creator">
            <>
              Posts created by:
              <br />
              <span>
                {name}
              </span>
            </>
          </div>
        )}
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

export default CreatorPosts