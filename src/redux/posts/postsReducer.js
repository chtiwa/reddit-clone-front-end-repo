import {
  SET_LOADING,
  SET_ERROR,
  SET_COMMENTS,
  SET_LIKES,
  GET_POSTS,
  GET_POSTS_BY_SEARCH,
  GET_POSTS_BY_CREATOR,
  GET_POSTS_BY_SUBREDDIT,
  GET_SINGLE_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  LIKE_POST,
  COMMENT_POST,
  GET_TAGS
} from './postsTypes'

const initialState = {
  posts: [],
  searchedPosts: [],
  post: {},
  hasLikedPost: false,
  sameUser: false,
  tags: [],
  comments: [],
  likes: [],
  pages: null,
  error: false,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: return {
      ...state,
      sameUser: false,
      loading: true
    }
    // so that the comments and likes are uploaded differently than the post
    case SET_COMMENTS: return {
      ...state,
      comments: action.payload
    }
    case SET_LIKES: return {
      ...state,
      likes: action.payload
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
      sameUser: action.payload.sameUser,
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
      posts: state.posts.map((post) => (post._id === action.payload.likedPost._id) ? action.payload.likedPost : post),
      likes: action.payload.likes,
      hasLikedPost: action.payload.hasLikedPost
    }
    case COMMENT_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload._id) ? action.payload : post),
      comments: action.payload.comments
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
    case GET_TAGS: return {
      ...state,
      tags: action.payload,
      loading: false,
      error: false
    }
    default: return state
  }
}

export default reducer