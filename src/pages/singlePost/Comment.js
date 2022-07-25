import React from 'react'
import './comment.css'

const Comment = ({ creatorImage, comment }) => {
  return (
    <div className='comment'>
      <div className="comment-creator">
        <img src={creatorImage} alt="" />
      </div>
      <div className="comment-content">
        {comment}
      </div>
    </div>
  )
}

export default Comment