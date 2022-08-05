import React, { useState } from 'react'
import './post.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { FiMoreHorizontal } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../../../redux/posts/postsActions'
const Post = ({ title, file, tags, description, _id, creator, likes, comments, createdAt, creatorImage }) => {
  const dispatch = useDispatch()
  const { sameUser } = useSelector(state => state.posts)
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)

  const handleLike = () => {
    setLike(!like)
    setDislike(false)
  }
  const handleDislike = () => {
    setDislike(!dislike)
    setLike(false)
  }

  const d = new Date(createdAt)
  let date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString()

  let fileDisplay
  if (file?.format === "jpeg" || file?.format === "jpg" || file?.format === "png" || file?.format === "webp" || file?.format === "gif") {
    fileDisplay = <img src={file?.url} alt="img" />
  } else if (file?.format === "mp4" || file?.format === "mov" || file?.format === "wmv" || file?.format === "avi" || file?.format === "webm") {
    fileDisplay = <video controls autoPlay muted playsInline>
      <source src={file?.url} type={`video/${file?.format}`} />
    </video>
  } else {
    fileDisplay = ''
  }

  return (
    <div className="post-container" >
      <div className=" post-info">
        <div className="post-info-creator">
          <div className="avatar-info-container">
            <div className="avatar">
              <Link to={`/user`} state={{ creator: creator }} >
                {creatorImage === '' ? (
                  <CgProfile style={{ fontSize: "28px" }} />
                ) : (
                  <img src={creatorImage} alt={creator} />
                )}
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
                  <Link to={`/posts/create`} state={{ id: _id, description: description, title: title, tags: [...tags], file: file }} >Edit</Link>
                </span>
                <span onClick={() => dispatch(deletePost(_id))}>Delete</span>
              </div>
            </div>
          )}
        </div>
        <div className="post-info-title">
          <Link to={`/post/${_id}`} >
            {title}
          </Link>
        </div>
      </div>
      <Link to={`/post/${_id}`} >
        {fileDisplay === '' ? (
          <></>
        ) : (
          <div className="post-img">
            {fileDisplay}
          </div>
        )}
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
          {/* <Link to={`/post/${_id}`} className='comments-link' > */}
          <FaRegCommentAlt className='comment-icon' />
          <span>{comments?.length} Comments</span>
          {/* </Link> */}
        </div>
      </div>
    </div>
  )
}

export default Post