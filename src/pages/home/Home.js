import React from 'react'
import Posts from '../posts/Posts'
import './home.css'

const Home = () => {
  return (
    <div className='home'>
      {/* the posts  */}
      <div className="home-posts-container">
        <Posts />
      </div>
      {/* tags are sticky */}
      <div className="tags">Tags</div>
    </div>
  )
}

export default Home