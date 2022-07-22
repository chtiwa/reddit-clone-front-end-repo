import React, { useState, useEffect } from 'react'
import './auth.css'
import FileBase from 'react-file-base64'
import { AiFillLock } from 'react-icons/ai'
import { AiFillUnlock } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../../redux/auth/authActions'

const Authentication = () => {
  // at first it's signup
  const dispatch = useDispatch()
  const { isLoggedIn, error } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [showPsw, setShowPsw] = useState(false)
  const [formData, steFormData] = useState({ name: '', email: '', password: '', image: '' })


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      dispatch(login(formData))
    } else {
      dispatch(signup(formData))
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    steFormData({ ...formData, [name]: value })
  }

  return (
    <div className='auth'>
      <div className="auth-container">
        <div className="type">
          <span className={`login ${isLogin ? 'bg-orange-red' : 'bg-whitish'}`} onClick={() => setIsLogin(true)} >Login</span>
          <span className={`signup ${!isLogin ? 'bg-orange-red' : 'bg-whitish'}`} onClick={() => setIsLogin(false)} style={{ backgroundColor: `${!isLogin ? '#FF5700' : '#fefefe'}` }}>Signup</span>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-control">
                <input onChange={handleChange} type="text" name="name" value={formData.name} placeholder="Name" />
              </div>
            )}
            <div className="form-control">
              <input onChange={handleChange} type="email" name="email" value={formData.email} placeholder="Email" style={{ marginTop: `${isLogin ? '1.5rem' : ''}` }} />
            </div>
            <div className="form-control">
              <input onChange={handleChange} type={`${showPsw ? 'text' : 'password'}`} name="password" value={formData.password} placeholder="Password" className="password-input" />
              {showPsw ? (
                <AiFillUnlock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              ) : (
                <AiFillLock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              )}
            </div>
            {!isLogin && (
              <div className="form-control-filebase">
                <label htmlFor="fileInput">Choose a user image (optionnal) :</label>
                <FileBase multiple={false} onDone={({ base64 }) => steFormData({ ...formData, image: base64 })} />
              </div>
            )}
            {isLogin && (
              <span className="forgot-psw">Forgot password ?</span>
            )}
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication