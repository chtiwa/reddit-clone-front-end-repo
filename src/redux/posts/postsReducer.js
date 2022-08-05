import {
  SET_LOADING,
  SET_ERROR,
  SET_TAGS_LOADING,
  SECONDARY_LOADING,
  SET_SEARCH_LOADING,
  SET_LAST_POST_SCROLL_Y,
  ADD_PAGE,
  // SET_LIKES,
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
  GET_TAGS
} from './postsTypes'

const initialState = {
  posts: [],
  searchedPosts: [],
  postsByCreator: [],
  subredditPosts: [],
  post: {},
  hasLikedPost: false,
  sameUser: false,
  tags: [],
  comments: [],
  likes: [],
  pages: 1,
  // page is the one that changes the starting index
  page: 1,
  error: false,
  loading: true,
  tagsLoading: false,
  searchLoading: false,
  lastPostScrollY: 300,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: return {
      ...state,
      sameUser: false,
      loading: true
    }
    case SECONDARY_LOADING: return {
      ...state,
      secondaryLoading: true,
    }
    case SET_TAGS_LOADING: return {
      ...state,
      tagsLoading: true,
    }
    case SET_LAST_POST_SCROLL_Y: return {
      ...state,
      lastPostScrollY: action.payload
    }
    case ADD_PAGE: return {
      ...state,
      page: state.page + 1
    }
    case SET_SEARCH_LOADING: return {
      ...state,
      searchLoading: true,
    }
    case SET_ERROR: return {
      ...state,
      error: action.payload,
      tagsLoading: false,
      loading: false
    }
    case GET_POSTS: return {
      ...state,
      posts: [...state.posts, ...action.payload.posts],
      pages: action.payload.pages,
      loading: false,
      secondaryLoading: false,
      error: false
    }
    case GET_POSTS_BY_SEARCH: return {
      ...state,
      searchedPosts: action.payload,
      searchLoading: false,
      secondaryLoading: false,
      error: false
    }
    case GET_POSTS_BY_SUBREDDIT: return {
      ...state,
      subredditPosts: action.payload.posts,
      pages: action.payload.pages,
      loading: false,
      secondaryLoading: false,
      error: false
    }
    case GET_POSTS_BY_CREATOR: return {
      ...state,
      postsByCreator: action.payload.posts,
      pages: action.payload.pages,
      secondaryLoading: false,
      // add a boolean hasLikedPost based on if the user like that particular post or no
      sameUser: action.payload.sameUser,
      loading: false,
      error: false
    }
    case GET_SINGLE_POST: return {
      ...state,
      post: action.payload.post,
      hasLikedPost: action.payload.hasLikedPost,
      comments: action.payload.post.comments,
      likes: action.payload.post.likes,
      loading: false,
      error: false
    }
    case LIKE_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload.likedPost._id) ? action.payload.likedPost : post),
      likes: action.payload.likedPost.likes,
      hasLikedPost: action.payload.hasLikedPost,
      loading: false
    }
    case UNLIKE_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload.unlikedPost._id) ? action.payload.unlikedPost : post),
      likes: action.payload.unlikedPost.likes,
      hasLikedPost: action.payload.hasLikedPost,
      loading: false
    }
    case COMMENT_POST: return {
      ...state,
      posts: state.posts.map((post) => (post._id === action.payload._id) ? action.payload : post),
      comments: action.payload.post.comments,
      loading: false
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
      sameUser: true,
      loading: false,
      error: false
    }
    case GET_TAGS: return {
      ...state,
      tags: action.payload,
      tagsLoading: false,
      error: false
    }
    default: return state
  }
}

export default reducer