import React, { useState, useEffect, useRef, useCallback } from 'react'
import './posts.css'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts, addPage } from '../../redux/posts/postsActions'
import Post from './post/Post'
import { useLocation } from 'react-router-dom'
// import Pagination from '../../components/pagination/Pagination'
import PostLoading from './post/PostLoading'

const Posts = () => {
  const location = useLocation()
  const lastPostRef = useRef()
  const [scrollPosition, setScrollPosition] = useState(0)
  const dispatch = useDispatch()
  const { posts, error, loading, secondaryLoading, lastPostScrollY, postsPage, postsPages } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(getPosts(postsPage))
  }, [dispatch, postsPage])

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset
    setScrollPosition(position)
    if ((scrollPosition >= lastPostScrollY) && (postsPage < postsPages)) {
      // when we reach the last post and there are new posts to fetch
      // when the page changes => dispatch(getPosts(page)) 
      dispatch(addPage())
      console.log(postsPage)
      console.log(scrollPosition, lastPostScrollY)
    }
  }, [dispatch, lastPostScrollY, postsPage, postsPages, scrollPosition])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])



  if (loading) {
    return (
      <div className='posts-loading-container'>
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
        <PostLoading />
      </div>
    )
  }

  if (!loading && posts.length === 0) {
    return (
      <h2 style={{ textAlign: 'center', paddingTop: '3rem' }} >There are no posts to display</h2>
    )
  }

  return (
    <div className="posts-container">
      <div className="posts-container" >
        {location?.state?.posts && location.state.posts.map((post, index) => {
          return (
            <Post posts={posts} {...post} key={post._id} lastPostRef={posts.length === index + 1 ? lastPostRef : null} />
          )
        })}
        {posts.map((post, index) => {
          return (
            <Post posts={posts} {...post} key={post._id} lastPostRef={posts.length === index + 1 ? lastPostRef : null} scrollPosition={scrollPosition} />
          )
        })}
      </div>
      {secondaryLoading && !error && (
        <div className="loader-container">
          <div className="loader loader-1"></div>
          <div className="loader loader-2"></div>
          <div className="loader loader-3"></div>
          <div className="loader loader-4"></div>
          <div className="loader loader-5"></div>
        </div>
      )}
    </div>
  )
}

export default Posts