import {
  SET_LOADING,
  SET_ERROR,
  AUTH,
  // LOGIN,
  // SIGNUP,
  LOGOUT,
  CHECK_LOGIN
} from './authTypes'

const initialState = {
  name: null,
  // userImage: null,
  isLoggedIn: false,
  loading: false,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING: return {
      ...state,
      loading: true
    }
    case SET_ERROR: return {
      ...state,
      error: action.payload
    }
    // case LOGIN: return {
    //   ...state,
    //   name: action.payload.name,
    //   userImage: action.payload.image,
    //   isLoggedIn: true,
    //   loading: false,
    //   error: false
    // }
    // case SIGNUP: return {
    //   ...state,
    //   name: action.payload.name,
    //   userImage: action.payload.image,
    //   isLoggedIn: true,
    //   loading: false,
    //   error: false
    // }
    case AUTH:
      return {
        ...state,
        name: action.payload.name,
        userImage: action.payload.image,
        isLoggedIn: true,
        loading: false,
        error: false
      }
    case LOGOUT: return {
      name: '',
      userImage: '',
      isLoggedIn: false,
      error: false,
      loading: false
    }
    case CHECK_LOGIN: return {
      ...state,
      name: action.payload.name,
      isLoggedIn: action.payload.isLoggedIn,
      userImage: action.payload.image,
      loading: false,
      error: false
    }
    default: return state
  }
}

export default reducer