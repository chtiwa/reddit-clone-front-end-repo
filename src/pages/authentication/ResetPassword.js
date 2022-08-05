import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { resetPassword } from '../../redux/auth/authActions'
import SnackBar from '../snackbar/SnackBar'
import { openModal, setModalMessage } from '../../redux/modal/modalActions'

const ResetPassword = () => {
  const { resetToken } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { success, loading, message, error } = useSelector(state => state.auth)
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [showPsw, setShowPsw] = useState(false)

  useEffect(() => {
    if (!loading && success && !error) {
      dispatch(setModalMessage(message))
      dispatch(openModal())
    }
    if (!loading && !success && error) {
      dispatch(setModalMessage(error))
      dispatch(openModal())
    }
  }, [loading, error, success, message, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password === formData.confirmPassword) {
      dispatch(resetPassword(formData.password, resetToken, navigate))
    } else {
      dispatch(setModalMessage('The passwords do not match!'))
      dispatch(openModal())
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="auth">
      <SnackBar />
      <div className="auth-container">
        <div className="type">
          <h2>
            Reset password
          </h2>
        </div>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-control">
              <input onChange={handleChange} name="password" value={formData.password} placeholder="Password" className="password-input" required min="6" max="20" />
            </div>
            <div className="form-control">
              <input onChange={handleChange} type={`${showPsw ? 'text' : 'password'}`} name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm password" className="password-input" required min="6" max="20" />
              {showPsw ? (
                <AiFillUnlock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              ) : (
                <AiFillLock onClick={() => setShowPsw(!showPsw)} className="lock-icon" />
              )}
            </div>
            <button type='submit' >Reset password</button>
          </form>
        </div>
      </div>
    </div >
  )
}

export default ResetPassword