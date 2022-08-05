import React from 'react'
import { useSelector } from 'react-redux'

const SnackBar = () => {
  const { show, message } = useSelector(state => state.modal)
  return (
    <div className={`snackbar ${show ? 'show-snackbar' : 'hide-snackbar'}`}>
      <p>{message}</p>
    </div>
  )
}

export default SnackBar