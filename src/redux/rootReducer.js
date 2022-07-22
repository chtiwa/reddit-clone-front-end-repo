import { combineReducers } from 'redux'
// import modalReducer from './modal/modalReducer'
import authReducer from './auth/authReducer'
import postsReducer from './posts/postsReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer
})

export default rootReducer