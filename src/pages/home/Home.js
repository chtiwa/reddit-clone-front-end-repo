import React, { useEffect } from 'react'
import Posts from '../posts/Posts'
import './home.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTags } from '../../redux/posts/postsActions'

const Home = () => {
  const dispatch = useDispatch()
  const { tags } = useSelector(state => state.posts)
  useEffect(() => {
    dispatch(getTags())
  }, [dispatch])

  return (
    <div className='home'>
      {/* the posts  */}
      <div className="home-posts-container">
        <Posts />
      </div>
      {/* tags are sticky */}
      <div className="tags-container">
        <div className="tags">
          <div className="tags-title">
            Top subreddits :
          </div>
          {tags.length && tags.map((tag, index) => {
            return (
              <div className="tag" key={index}>
                <Link to={`/r/${tag}`} className='tag-link' state={{ tag: tag }} >
                  {index + 1}) &nbsp; /r/{tag}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home