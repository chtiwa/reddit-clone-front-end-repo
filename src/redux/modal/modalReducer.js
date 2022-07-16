export const SET_SHOW = 'SET_SHOW'
export const SET_HIDE = 'SET_HIDE'
const initialState = {
  show: false
}

export const setShow = () => (dispatch) => {
  dispatch({ type: SET_SHOW })
}
export const setHide = () => (dispatch) => {
  dispatch({ type: SET_HIDE })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SHOW: return { show: true }
    case SET_HIDE: return { show: false }
    default: return state
  }
}

export default reducer