import {
  SET_LOADING,
  SET_ERROR,
  AUTH,
  // LOGIN,
  // SIGNUP,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  LOGOUT,
  CHECK_LOGIN
} from './authTypes'

import axios from 'axios'
import '../../axios'

const url = 'http://localhost:5000/auth'

export const login = (form) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const { data: { user: { name, image, userId } } } = await axios.post(`${url}/login`, form)
    // console.log(image)
    dispatch({ type: AUTH, payload: { name, image, userId } })
    // window.location.reload()
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.response.data.message })
  }
}

export const signup = (form) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const { data: { user: { name, image, userId } } } = await axios.post(`${url}/signin`, form, config)
    dispatch({ type: AUTH, payload: { name, image, userId } })
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
    const { data: { isLoggedIn, name, image, userId } } = await axios.get(`${url}/checklogin`)
    // console.log(data)
    dispatch({ type: CHECK_LOGIN, payload: { isLoggedIn, name, image, userId } })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message })
  }
}

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    console.log(email)
    const { data } = await axios.post(`${url}/forgotpassword`, { email })
    console.log(data)
    // the data would be the link
    // send an email with the resetToken link
    dispatch({ type: FORGOT_PASSWORD, payload: data })
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error?.response?.data?.message })
  }
}

export const resetPassword = (password, resetToken, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING })
  try {
    // get the resetToken from the params
    const { data } = await axios.patch(`${url}/resetpassword/${resetToken}`, { password })
    console.log(data)
    dispatch({ type: RESET_PASSWORD, payload: data })
    navigate('/auth')
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error?.response?.data?.message })
  }
}
