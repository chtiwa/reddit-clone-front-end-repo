import React, { useEffect, useState } from 'react'
import './singlePost.css'
import { TiArrowBack } from 'react-icons/ti'
import { ImArrowUp, ImArrowDown } from 'react-icons/im'
import { FaRegCommentAlt } from 'react-icons/fa'
import { IoMdSend } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import Comment from './Comment.js'
import { getSinglePost, commentPost, likePost, unlikePost } from '../../redux/posts/postsActions'
import { useDispatch, useSelector } from 'react-redux'
import SinglePostLoading from './SinglePostLoading'

const SinglePost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { post, loading, hasLikedPost, comments, likes } = useSelector(state => state.posts)
  const { userImage, userId, isLoggedIn } = useSelector(state => state.auth)
  const [like, setLike] = useState(hasLikedPost)
  const [dislike, setDislike] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(getSinglePost(id, userId))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch, id, userId])

  useEffect(() => {
    console.log(location?.state?.scrollPosition)
    if (hasLikedPost) {
      setLike(true)
    } else {
      setLike(false)
    }
  }, [hasLikedPost, dispatch, location?.state?.scrollPosition])

  const handleLike = () => {
    if (isLoggedIn) {
      if (hasLikedPost) {
        dispatch(unlikePost(id))
        setLike(false)
      } else {
        dispatch(likePost(id))
        setLike(true)
      }
      setDislike(false)
    }
  }
  const handleDislike = () => {
    setDislike(!dislike)
    setLike(false)
  }

  const handleComment = () => {
    if (comment.length) {
      dispatch(commentPost(comment, id))
    }
    setComment('')
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const d = new Date(post.createdAt)
  let date = d.getHours() + ':' + d.getMinutes() + ', ' + d.toDateString()

  if (loading) {
    return (
      <div className="post-loading-container">
        <SinglePostLoading />
      </div>
    )
  }

  const { file } = post
  let fileDisplay
  if (file?.format === "jpeg" || file?.format === "jpg" || file?.format === "png" || file?.format === "webp" || file?.format === "gif") {
    fileDisplay = <img src={file?.url} alt="img" className="singlepost-img" />
  } else if (file?.format === "mp4" || file?.format === "mov" || file?.format === "wmv" || file?.format === "avi" || file?.format === "webm") {
    fileDisplay = <video controls autoPlay muted playsInline className="singlepost-img">
      <source src={file?.url} type={`video/${file?.format}`} />
    </video>
  }


  // navigate(-1, state = {{ scrollPosition: location?.state?.scrollPosition }})

  return !loading && post && (
    <div className='singlepost-container'>
      <div className="singlepost">
        <div className="back" onClick={() => navigate(-1)}>
          <TiArrowBack className='back-icon' />
        </div>
        <div className="singlepost-info">
          <div className="singlepost-info-creator">
            <div className="avatar">
              <Link to={`/user`} state={{ creator: post.creator }} >
                {post.creatorImage !== '' ? (
                  <img src={post.creatorImage} alt={post.creator} />
                ) : (
                  <CgProfile style={{ fontSize: "28px" }} />
                )}
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
          {fileDisplay}
        </div>
        <div className="singlepost-description">
          <p>{post.description}</p>
        </div>
        <div className="post-features">
          <div className="votes">
            <ImArrowUp className={`vote-icon ${like ? 'like' : ''}`} onClick={handleLike} />
            <span>{likes?.length} up votes</span>
            <ImArrowDown className={`vote-icon ${dislike ? 'like' : ''}`} onClick={handleDislike} />
          </div>
          <div className="comments-icon-container">
            <FaRegCommentAlt className='comment-icon' />
            <span>{comments?.length} Comments</span>
          </div>
        </div>
        <div className="write-comment">
          {isLoggedIn && (
            <>
              <div className="comment-creator">
                {userImage === '' ? (
                  <CgProfile style={{ fontSize: "28px" }} />
                ) : (
                  <img src={userImage} alt="" />
                )}
              </div>
              <div className='textarea-container'>
                <textarea className="textarea" name="" id="" placeholder='Add your comment to this post' minLength="2" maxLength="300" value={comment || ''} onChange={handleCommentChange} />
                <IoMdSend className="write-comment-icon" onClick={handleComment} />
              </div>
            </>
          )}
        </div>
        <div className="comments-container">
          {comments?.length > 0 && !loading && comments.map((c, index) => {
            return (
              <Comment key={index} creatorImage={c.creatorImage} comment={c.comment} CgProfile={CgProfile} />
            )
          })}
        </div>
      </div>
    </div>
  )
}


export default SinglePost