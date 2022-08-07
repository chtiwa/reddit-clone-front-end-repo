import {
  SET_LOADING,
  SET_ERROR,
  SET_TAGS_LOADING,
  SET_SEARCH_LOADING,
  GET_POSTS,
  GET_POSTS_BY_SEARCH,
  GET_POSTS_BY_CREATOR,
  GET_POSTS_BY_SUBREDDIT,
  GET_SINGLE_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
  UNLIKE_POST,
  COMMENT_POST,
  GET_TAGS,
  SET_PAGE
} from './postsTypes'

import '../../axios'
import axios from 'axios'

const url = 'https://reddit-clone-cthiwa-backend.netlify.app/api/posts'

export const setPage = (page) => (dispatch) => {
  dispatch({ type: SET_PAGE, payload: page })
}

export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    if (page === undefined) page = 1
    const { data: { posts, pages } } = await axios.get(`${url}?page=${page}`)
    dispatch({ type: GET_POSTS, payload: { posts, pages } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data.message })
  }
}

// export const uploadImage = (formData) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     }
//     const { data } = await axios.post(`${url}/upload`, formData, config)
//     console.log(data)
//   } catch (error) {
//     dispatch({ type: SET_ERROR, payload: error })
//   }
// }

export const createPost = (form, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const { data } = await axios.post(`${url}`, form, config)
    dispatch({ type: CREATE_POST, payload: data })
    navigate(`/post/${data._id}`)
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsBySearch = (search) => async (dispatch) => {
  dispatch({ type: SET_SEARCH_LOADING })
  try {
    const { data } = await axios.get(`${url}/find?search=${search}`)
    // console.log(data)
    // the data is posts
    dispatch({ type: GET_POSTS_BY_SEARCH, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsByCreator = (page, creator) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    if (page === undefined) page = 1
    const { data: { posts, pages, sameUser } } = await axios.get(`${url}/user/myposts?page=${page}&creator=${creator}`)
    // console.log(data)
    dispatch({ type: GET_POSTS_BY_CREATOR, payload: { posts, pages, sameUser } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsBySubreddit = (page, tag) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    if (page === undefined) page = 1
    const { data: { posts, pages } } = await axios.get(`${url}/r/${tag}?page=${page}`)
    // console.log(data)
    dispatch({ type: GET_POSTS_BY_SUBREDDIT, payload: { posts, pages } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}
export const getSinglePost = (id, userId) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { post, hasLikedPost } } = await axios.get(`${url}/${id}/${userId}`)
    // dispatch({ type: SET_COMMENTS, payload: data.comments })
    // dispatch({ type: SET_LIKES, payload: data.likes })
    dispatch({ type: GET_SINGLE_POST, payload: { post, hasLikedPost } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}
export const likePost = (id) => async (dispatch) => {
  // dispatch({ type: SET_LOADING })
  try {
    const { data: { likedPost, hasLikedPost } } = await axios.patch(`${url}/likepost/${id}`)
    dispatch({ type: LIKE_POST, payload: { likedPost, hasLikedPost } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const unlikePost = (id) => async (dispatch) => {
  // dispatch({ type: SET_LOADING })
  try {
    const { data: { unlikedPost, hasLikedPost } } = await axios.patch(`${url}/unlikepost/${id}`)
    dispatch({ type: UNLIKE_POST, payload: { unlikedPost, hasLikedPost } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const commentPost = (comment, id) => async (dispatch) => {
  // dispatch({ type: SET_LOADING })
  try {
    // the id 
    const { data: { post } } = await axios.patch(`${url}/commentpost/${id}`, { comment })
    dispatch({ type: COMMENT_POST, payload: { post } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const updatePost = (post, id, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    // console.log(post)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const { data } = await axios.patch(`${url}/${id}`, post, config)
    // console.log(data)
    dispatch({ type: UPDATE_POST, payload: data })
    navigate(`/post/${data._id}`)
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.delete(`${url}/${id}`)
    // console.log(data)
    // the data is the id
    dispatch({ type: DELETE_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getTags = () => async (dispatch) => {
  dispatch({ type: SET_TAGS_LOADING })
  try {
    const { data } = await axios.get(`${url}/tags`)
    dispatch({ type: GET_TAGS, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error })
  }
}