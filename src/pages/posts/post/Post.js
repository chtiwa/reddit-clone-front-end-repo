import React, { useState } from 'react'
import './post.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
const Post = () => {
  // the title description image date likes
  // when you click on the post it will open a modal that fetches the single post
  // the modal will be passed the info already fetched
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)

  // when clicked on the image or the comments it takes us to the single post page where we display the comments

  const handleLike = () => {
    setLike(!like)
    setDislike(false)
  }
  const handleDislike = () => {
    setDislike(!dislike)
    setLike(false)
  }

  return (
    <>
      <div className="post-container" >
        <div className="post-info">
          <div className="post-info-creator">
            <div className="avatar">
              C
            </div>
            <div className="post-creator"> Posted by creator
              <span className="post-created">1 hour ago</span>
            </div>
          </div>
          <div className="post-info-title">
            Title
          </div>
        </div>
        <div className="post-img">
          <img src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600" alt="img" />
        </div>
        <div className="post-features">
          <div className="votes">
            <ImArrowUp className={`vote-icon ${like ? 'like' : ''}`} onClick={handleLike} />
            {/* number of votes */}
            <span>Votes</span>
            <ImArrowDown className={`vote-icon ${dislike ? 'like' : ''}`} onClick={handleDislike} />
          </div>
          <div className="comments">
            <FaRegCommentAlt className='comment-icon' />
            <span>Comments</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post