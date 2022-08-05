import React, { useEffect, useState } from 'react'
import './creatorPosts.css'
import { useLocation } from 'react-router-dom'
import Pagination from '../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../posts/post/Post'
import { getPostsByCreator } from '../../redux/posts/postsActions'
import PostLoading from '../posts/post/PostLoading'

const CreatorPosts = () => {
  const location = useLocation()
  // const [page, setPage] = useState(1)
  const [creator, setCreator] = useState(location?.state?.creator)
  const dispatch = useDispatch()
  const { postsByCreator, loading, page } = useSelector(state => state.posts)

  useEffect(() => {
    // console.log('creatorPosts')
    dispatch(getPostsByCreator(page, creator))
  }, [dispatch, page, creator])

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

  if (!loading && postsByCreator.length === 0) {
    return <h2 style={{ textAlign: 'center', paddingTop: '3rem' }} >No posts made yet!</h2>
  }

  return (
    <div className='creator-posts-container'>
      <div className="posts-creator-container">
        {postsByCreator?.length > 0 && !loading && (
          <div className="posts-creator">
            <>
              Posts created by :
              <br />
              <span>
                {location.state?.creator}
              </span>
            </>
          </div>
        )}
      </div>
      <div className="posts-container">
        {postsByCreator.map((post) => {
          return (
            <Post {...post} key={post._id} />
          )
        })}
      </div>
      <div className="pagination-container">
        <Pagination setCreator={setCreator} />
      </div>
    </div>
  )
}

export default CreatorPosts