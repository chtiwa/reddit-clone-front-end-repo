import {
  SET_LOADING,
  SET_ERROR,
  AUTH,
  // LOGIN,
  // SIGNUP,
  LOGOUT,
  CHECK_LOGIN
} from './authTypes'

import axios from 'axios'
import '../../axios'

const url = 'http://localhost:5000/auth'

export const login = (form) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { user: { name, image } } } = await axios.post(`${url}/login`, form)
    // console.log(image)
    dispatch({ type: AUTH, payload: { name, image } })
    // window.location.reload()
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const signup = (form) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { user: { name, image } } } = await axios.post(`${url}/signin`, form)
    dispatch({ type: AUTH, payload: { name, image } })
    // window.location.reload()
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data } = await axios.get(`${url}/logout`)
    console.log(data)
    dispatch({ type: LOGOUT })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const checkLogin = () => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { isLoggedIn, name, image } } = await axios.get(`${url}/checklogin`)
    // console.log(data)
    dispatch({ type: CHECK_LOGIN, payload: { isLoggedIn, name, image } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}
