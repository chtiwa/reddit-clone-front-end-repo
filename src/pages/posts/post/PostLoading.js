import React from 'react'
import './post.css'

const PostLoading = () => {
  return (
    <div className="post-container loading-post-container" >
      <div className="loading-post-info">
        <div className="loading-post-info-creator">
          <div className="avatar-info-container">
            <div className="loading-post-avatar skeleton "></div>
            <div className="loading-post-creator-created skeleton"></div>
          </div>
        </div>
        <div className="loading-post-info-title skeleton"></div>
      </div>
      <div className="loading-post-img-container">
        <div className="loading-post-img skeleton"></div>
      </div>
      <div className="loading-post-desc-container">
        <div className="loading-post-desc skeleton"></div>
      </div>
      <div className="loading-post-features">
        <div className="votes skeleton"></div>
        <div className="comments skeleton"></div>
      </div>
    </div>
  )
}

export default PostLoading