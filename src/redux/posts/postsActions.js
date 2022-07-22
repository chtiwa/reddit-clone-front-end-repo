import {
  FETCH_JSON,
  SET_LOADING,
  SET_ERROR,
  GET_POSTS,
  GET_POSTS_BY_SEARCH,
  GET_POSTS_BY_CREATOR,
  GET_POSTS_BY_SUBREDDIT,
  GET_SINGLE_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
  COMMENT_POST
} from './postsTypes'

import '../../axios'
import axios from 'axios'

const url = 'http://localhost:5000/posts'


export const fetchJson = () => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({ type: FETCH_JSON, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error })
  }
}
export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { pages, posts } } = await axios.get(`${url}?page=${page}`)
    dispatch({ type: GET_POSTS, payload: { posts, pages } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const createPost = (form, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    console.log(form)
    const { data } = await axios.post(`${url}`, form)
    // the data is the post
    console.log(data)
    dispatch({ type: CREATE_POST, payload: data })
    // navigate(`/posts/${data._id}`)
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsBySearch = (search) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.get(`${url}/find?search=${search}`)
    // console.log(data)
    // the data is posts
    dispatch({ type: GET_POSTS_BY_SEARCH, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsByCreator = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { posts, pages } } = await axios.get(`${url}/user/myposts?page=${page}`)
    // console.log(data)
    dispatch({ type: GET_POSTS_BY_CREATOR, payload: { posts, pages } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getPostsBySubreddit = (page, tag) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { posts, pages } } = await axios.get(`${url}/r/${tag}?page=${page}`)
    // console.log(data)
    dispatch({ type: GET_POSTS_BY_SUBREDDIT, payload: { posts, pages } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const likePost = async (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    // the id of post
    const { data } = await axios.patch(`${url}/likepost/${id}`)
    // console.log(data)
    // the payload is the post
    dispatch({ type: LIKE_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const commentPost = (comment, id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    // the id 
    const { data } = await axios.patch(`${url}/commentpost/${id}`, { comment })
    console.log(data)
    dispatch({ type: COMMENT_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const updatePost = (post, id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.patch(`${url}/${id}`, { post })
    console.log(data)
    dispatch({ type: UPDATE_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.delete(`${url}/${id}`)
    console.log(data)
    dispatch({ type: DELETE_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const getSinglePost = (id) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.get(`${url}/${id}`)
    console.log(data)
    dispatch({ type: GET_SINGLE_POST, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}