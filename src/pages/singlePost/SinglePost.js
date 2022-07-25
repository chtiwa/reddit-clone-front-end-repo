import React, { useEffect, useState } from 'react'
import './singlePost.css'
import { TiArrowBack } from 'react-icons/ti'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Comment from './Comment.js'
import { getSinglePost, commentPost, likePost } from '../../redux/posts/postsActions'
import { useDispatch, useSelector } from 'react-redux'

const SinglePost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { post, loading, hasLikedPost, likes, comments } = useSelector(state => state.posts)
  const { userImage } = useSelector(state => state.auth)
  const [like, setLike] = useState(hasLikedPost)
  const [dislike, setDislike] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(getSinglePost(id))
  }, [dispatch, id])

  useEffect(() => {
    if (hasLikedPost) {
      setLike(true)
    } else {
      setLike(false)
    }
  }, [hasLikedPost, dispatch])

  const handleLike = () => {
    dispatch(likePost(id))
    setLike(true)
    setDislike(false)
  }
  const handleDislike = () => {
    setDislike(!dislike)
    setLike(false)
  }

  const handleComment = () => {
    dispatch(commentPost(comment, id))
    setComment('')
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  // const { creator, title, description, tags, image, createdAt, creatorImage } = post
  const d = new Date(post.createdAt)
  let date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString()

  return !loading && post && (
    <div className='singlepost-container'>
      <div className="singlepost">
        <div className="back">
          <Link to="/" className='singlepost-link'>
            <TiArrowBack className='back-icon' />
            <div className="singlepost-content">
              Go back to the home page
            </div>
          </Link>
        </div>
        <div className="post-info">
          <div className="post-info-creator">
            <div className="avatar">
              <Link to={`/user`} state={{ creator: post.creator }} >
                <img src={post.creatorImage} alt={post.creator} />
              </Link>
            </div>
            <div className="post-creator-created"> Posted by &nbsp;<span className="post-creator">
              {post.creator}
            </span>
              <span className="post-created">&nbsp; at&nbsp;{date}
              </span>
            </div>
          </div>
          <div className="post-info-title">
            {post.title}
          </div>
        </div>
        <div className="singlepost-img-container">
          <img src={post.image} alt="post" className="singlepost-img" />
        </div>
        <div className="singlepost-description">
          <p>{post.description}</p>
        </div>
        <div className="post-features">
          <div className="votes">
            <ImArrowUp className={`vote-icon ${like ? 'like' : ''}`} onClick={handleLike} />
            <span>{likes.length} up votes</span>
            <ImArrowDown className={`vote-icon ${dislike ? 'like' : ''}`} onClick={handleDislike} />
          </div>
          <div className="comments-icon-container">
            <FaRegCommentAlt className='comment-icon' />
            <span>{comments.length} Comments</span>
          </div>
        </div>
        <div className="write-comment">
          <div className="comment-creator">
            <img src={userImage} alt="" />
          </div>
          <textarea className="textarea" name="" id="" placeholder='Add your comment to this post' minLength="2" maxLength="300" value={comment || ''} onChange={handleCommentChange} />
          <IoMdSend className="write-comment-icon" onClick={handleComment} />
        </div>
        <div className="comments-container">
          {comments?.length > 0 && !loading && comments.map((c, index) => {
            return (
              <Comment key={index} creatorImage={c.creatorImage} comment={c.comment} />
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default SinglePost