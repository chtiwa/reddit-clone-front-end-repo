import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_MODAL_MESSAGE
} from './modalTypes'

export const closeModal = () => (dispatch) => {
  dispatch({ type: CLOSE_MODAL })
}

export const openModal = () => (dispatch) => {
  dispatch({ type: OPEN_MODAL })
  let timer = setTimeout(() => {
    // wait 3 seconds and then dissapear
    dispatch(closeModal())
  }, [3500])
  return () => { clearTimeout(timer) }
}

export const setModalMessage = (message) => (dispatch) => {
  dispatch({ type: SET_MODAL_MESSAGE, payload: message })
}