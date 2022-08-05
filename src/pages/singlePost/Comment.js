import React from 'react'
import './comment.css'

const Comment = ({ creatorImage, comment, CgProfile }) => {
  return (
    <div className='comment'>
      <div className="comment-creator">
        {creatorImage === "" ? (
          <CgProfile style={{ fontSize: "28px" }} />
        ) : (
          <img src={creatorImage} alt="" />
        )}
      </div>
      <div className="comment-content">
        {comment}
      </div>
    </div>
  )
}

export default Comment