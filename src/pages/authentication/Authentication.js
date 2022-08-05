import React, { useState, useEffect, useMemo } from 'react'
import './auth.css'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, signup, forgotPassword } from '../../redux/auth/authActions'
import { openModal, setModalMessage } from '../../redux/modal/modalActions'
import SnackBar from '../snackbar/SnackBar'


const Authentication = () => {
  const dispatch = useDispatch()
  const { isLoggedIn, error, success, loading, message } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [showPsw, setShowPsw] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [fileData, setFileData] = useState('')
  const [file, setFile] = useState('')

  useMemo(() => {
    // back end error-handling
    if (!loading && success && !error) {
      dispatch(setModalMessage(message))
      dispatch(openModal())
    }
    if (!loading && !success && error) {
      dispatch(setModalMessage(error))
      dispatch(openModal())
    }
  }, [loading, success, error, message, dispatch])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('name', form.name)
    formdata.append('email', form.email)
    formdata.append('file', fileData)
    formdata.append('password', form.password)
    if (isLogin) {
      dispatch(login(form))
    } else {
      dispatch(signup(formdata))
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleForgotPassword = () => {
    if (form.email === '' || form.email.length < 8) {
      console.log('No email')
      // front end error message
      dispatch(setModalMessage('Please enter an email'))
      dispatch(openModal())
    } else {
      dispatch(forgotPassword(form.email))
    }
  }

  return (
    <div className='auth'>
      <SnackBar />
      <div className="auth-container">
        <div className="type">
          <span className={`login ${isLogin ? 'bg-orange-red' : 'bg-whitish'}`} onClick={() => setIsLogin(true)} >Login</span>
          <span className={`signup ${!isLogin ? 'bg-orange-red' : 'bg-whitish'}`} onClick={() => setIsLogin(false)} style={{ backgroundColor: `${!isLogin ? '#FF5700' : '#fefefe'}` }}>Signup</span>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit} encType="mlutipart/form-data" >
            {!isLogin && (
              <div className="form-control">
                <input onChange={handleChange} type="text" name="name" value={form.name || ''} placeholder="Name" required min="3" max="20" />
              </div>
            )}
            <div className="form-control">
              <input onChange={handleChange} type="email" name="email" value={form.email || ''} placeholder="Email" style={{ marginTop: `${isLogin ? '1.5rem' : ''}` }} required min="6" max="30" />
            </div>
            <div className="form-control">
              <input onChange={handleChange} type={`${showPsw ? 'text' : 'password'}`} name="password" value={form.password || ''} placeholder="Password" className="password-input" required min="6" max="20" />
              {showPsw ? (
                <AiFillUnlock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              ) : (
                <AiFillLock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              )}
            </div>
            {!isLogin && (
              <div className="form-control-filebase">
                <input type="file" name="file" onChange={handleFileChange} value={file || ''} />
              </div>
            )}
            {isLogin && (
              <span className="forgot-psw" onClick={handleForgotPassword} >Forgot password ?</span>
            )}
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication