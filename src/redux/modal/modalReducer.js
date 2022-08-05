import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_MODAL_MESSAGE
} from './modalTypes'

const initialState = {
  show: false,
  message: ''
}
// Snackbar
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_MODAL: return { ...state, show: false }
    case OPEN_MODAL: return { ...state, show: true }
    case SET_MODAL_MESSAGE: return {
      ...state,
      message: action.payload
    }
    default: return state
  }
}

export default reducer