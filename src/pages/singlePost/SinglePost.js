import React, { useState } from 'react'
import './singlePost.css'
import { TiArrowBack } from 'react-icons/ti'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Comment from './Comment.js'

const SinglePost = () => {
  // copy some of the code in post file
  // and add a seperate file that contains comments  
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
    <div className='singlepost-container'>
      <div className="singlepost">
        <div className="back">
          <Link to="/">
            <TiArrowBack className='back-icon' />
          </Link>
        </div>
        <div className="singlepost-info">
          <div className="singlepost-info-inner">
            <div className="singlepost-info-creator">Creator
            </div>
            <div className="singlepost-info-createdAt">Created by creatr an hour ago
            </div>
          </div>
          <div className="singlepost-title">
            Title
          </div>
        </div>
        <div className="singlepost-img-container">
          <img src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=600" alt="post" className="singlepost-img" />
        </div>
        <div className="singlepost-description">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas deleniti nam voluptatem soluta hic! Ad vero eum, quam praesentium dignissimos ipsa ut nesciunt in repellendus illum unde debitis inventore dolore sint molestiae. Inventore officia magnam vero qui beatae ea enim facilis suscipit dicta necessitatibus officiis, distinctio consequuntur ullam dolor molestias.</p>
        </div>
        <div className="post-features">
          <div className="votes">
            <ImArrowUp className={`vote-icon ${like ? 'like' : ''}`} onClick={handleLike} />
            {/* number of votes */}
            <span>Votes</span>
            <ImArrowDown className={`vote-icon ${dislike ? 'like' : ''}`} onClick={handleDislike} />
          </div>
          <div className="comments-icon-container">
            <FaRegCommentAlt className='comment-icon' />
            <span>18 Comments</span>
          </div>
        </div>
        <div className="write-comment">
          <div className="comment-creator"></div>
          <textarea className="textarea" name="" id="" placeholder='Add your comment to this post' />
        </div>
        <div className="comments-container">
          {/* we'll map through the comments and get and push the params through the comment component */}
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  )
}


export default SinglePost