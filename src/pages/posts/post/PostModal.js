import React from 'react'
import './post.css'
import './postModal.css'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { useDispatch } from 'react-redux'
import { setHide } from '../../../redux/modal/modalReducer'

const PostModal = ({ show, like, dislike, handleDislike, handleLike }) => {
  const dispatch = useDispatch()
  return (
    <div className={`modal-container ${show ? 'show' : 'hide'}`}>
      <span className={`close ${show ? 'show-close' : 'hide'}`} onClick={() => dispatch(setHide())} >X</span>
      <div className="modal" >
        <div className="post-container">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostModal