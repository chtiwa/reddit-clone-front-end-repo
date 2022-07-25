import React, { useState } from 'react'
import './post.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../../redux/posts/postsActions'
const Post = ({ title, image, tags, description, _id, creator, likes, comments, createdAt, creatorImage }) => {
  const dispatch = useDispatch()
  const { sameUser } = useSelector(state => state.posts)
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)

  const handleLike = () => {
    dispatch(likePost(_id))
    setLike(!like)
    setDislike(false)
  }
  const handleDislike = () => {
    setDislike(!dislike)
    setLike(false)
  }

  // let creationDate = new Date(createdAt)
  const d = new Date(createdAt)
  let date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString()

  return (
    <>
      <div className="post-container" >
        <div className="post-info">
          <div className="post-info-creator">
            <div className="avatar-info-container">
              <div className="avatar">
                <Link to={`/user`} state={{ creator: creator }} >
                  <img src={creatorImage} alt={creator} />
                </Link>
              </div>
              <div className="post-creator-created"> Posted by &nbsp;<span className="post-creator">{creator}</span>
                <span className="post-created">&nbsp; at&nbsp;{date}</span>
              </div>
            </div>
            {sameUser && (
              <div className="sameuser-features">
                <FiMoreHorizontal className='sameuser-features-icon' />
                <div className="sameuser-features-content">
                  <span>
                    <Link to={`/`} >Edit</Link>
                  </span>
                  <span>Delete</span>
                </div>
              </div>
            )}
          </div>
          <div className="post-info-title">
            {title}
          </div>
        </div>
        <Link to={`/post/${_id}`}>
          <div className="post-img">
            <img src={image} alt="img" />
          </div>
        </Link>
        <div className="post-desc">
          {description.slice(0, 40)}...
        </div>
        <div className="post-features">
          <div className="votes">
            <ImArrowUp className={`vote-icon ${like ? 'like' : ''}`} onClick={handleLike} />
            {/* number of votes */}
            <span>{likes?.length} up votes</span>
            <ImArrowDown className={`vote-icon ${dislike ? 'like' : ''}`} onClick={handleDislike} />
          </div>
          <div className="comments">
            <Link to={`/post/${_id}`} className='comments-link' >
              <FaRegCommentAlt className='comment-icon' />
              <span>{comments?.length} Comments</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post