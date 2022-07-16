import React, { useState } from 'react'
import './post.css'
import Modal from './PostModal'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux/es/exports'
import { setShow } from '../../../redux/modal/modalReducer'

const Post = ({ show }) => {
  // the title description image date likes
  // when you click on the post it will open a modal that fetches the single post
  // the modal will be passed the info already fetched
  const dispatch = useDispatch()
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

  return (
    <>
      <Modal show={show} handleDislike={handleDislike} handleLike={handleLike} like={like} dislike={dislike} />
      <div className="post-container" style={{ display: `${show ? 'none' : 'flex'}` }}>
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
        <div className="post-img" onClick={() => dispatch(setShow())}>
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