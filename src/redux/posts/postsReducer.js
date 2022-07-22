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

const initialState = {
  posts: [],
  searchedPosts: [],
  post: {},
  pages: null,
  error: false,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JSON: return {
      ...state,
      json: action.payload,
      error: false,
      loading: false
    }
    case SET_LOADING: return {
      ...state,
      loading: true
    }
    case SET_ERROR: return {
      ...state,
      error: action.payload
    }
    case GET_POSTS: return {
      ...state,
      posts: action.payload.posts,
      pages: action.payload.pages,
      loading: false,
      error: false
    }
    case GET_POSTS_BY_SEARCH: return {
      ...state,
      searchedPosts: action.payload,
      post: null,
      loading: false,
      error: false
    }
    case GET_POSTS_BY_SUBREDDIT: return {
      ...state,
      posts: action.payload.posts,
      pages: action.payload.pages,
      loading: false,
      error: false
    }
    case GET_POSTS_BY_CREATOR: return {
      ...state,
      posts: action.payload.posts,
      pages: action.payload.pages,
      loading: false,
      error: false
    }
    case GET_SINGLE_POST: return {
      ...state,
      post: action.payload,
      loading: false,
      error: false
    }
    case LIKE_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload._id) ? action.payload : post)
      // we can group LIKE_POST and COMMENT_POST together
    }
    case COMMENT_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload._id) ? action.payload : post)
    }
    case CREATE_POST: return {
      ...state,
      posts: [...state.posts, action.payload],
      loading: false,
      error: false
    }
    case UPDATE_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload._id) ? action.payload : post),
      loading: false,
      error: false
    }
    case DELETE_POST: return {
      ...state,
      posts: state.posts.filter((post) => post._id !== action.payload),
      loading: false,
      error: false
    }
    default: return state
  }
}

export default reducer