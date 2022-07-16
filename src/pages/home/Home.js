import React from 'react'
import Posts from '../posts/Posts'
import './home.css'
import { useSelector } from 'react-redux'

const Home = () => {
  const { show } = useSelector(state => state.modal)
  return (
    <div className='home'>
      {/* the posts  */}
      <Posts />
      {/* tags are sticky */}
      {!show && (
        <div className="tags">Tags</div>
      )}
    </div>
  )
}

export default Home