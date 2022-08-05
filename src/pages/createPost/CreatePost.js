import React, { useState, useEffect } from 'react'
// import FileBase from 'react-file-base64'
import './createPost.css'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../redux/posts/postsActions'
import { useNavigate } from 'react-router-dom'

// pass the id through the state
// if there's an id then it's an editing page else
// it would be a create post Page


const CreatePost = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.posts)
  const [form, setForm] = useState({ title: '', description: '' })
  const [fileData, setFileData] = useState('')
  const [file, setFile] = useState('')
  const [tags, setTags] = useState([])
  const [value, setValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (location.state?.id) {
      setForm({ title: location.state?.title, description: location.state?.description })
      setTags(location.state.tags)
      // console.log(location.state.tags.split(','))
      // let previousTags = location.state.tags.forEach(tag => {
      //   console.log(tag)
      //   tags.push(tag)
      // })
      console.log(tags)
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [location.state])
  // console.log(form)

  const handleFileChange = ({ target }) => {
    setFileData(target.files[0])
    setFile(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formdata = new FormData()
    formdata.append('file', fileData)
    formdata.append('title', form.title)
    formdata.append('description', form.description)
    formdata.append('tags', tags)
    // console.log(tags)
    // console.log(formdata)
    // form data works when we send a file
    if (isEditing) {
      dispatch(updatePost(formdata, location.state.id, navigate))
    } else {
      dispatch(createPost(formdata, navigate))
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleTagsChange = (e) => {
    setValue(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      let tag = e.target.value.trim().toLowerCase()
      if (tag) {
        if (tags.find(tag => tag === e.target.value.trim()) === undefined) {
          if (tags.length < 12) {
            setTags([...tags, tag])
            setValue('')
          }
        }
      }
    }
  }

  const handleDeleteTag = (item) => {
    let newTags = tags.filter(tag => tag !== item)
    setTags(newTags)
  }

  return (
    <div className='createpost-container'>
      <form className='createpost-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="creaetpost-form-group">
          <h2 className='createpost-form-h2'>{isEditing ? 'Edit Post' : 'Create Post'}</h2>
        </div>
        <div className="createpost-form-group">
          <input className="createpost-input" type="text" name="title" value={form.title || ''} onChange={handleChange} placeholder='Title' required />
        </div>
        <div className="createpost-form-group">
          <textarea type="text" maxLength={900} className="createpost-textarea" name="description" value={form.description || ''} onChange={handleChange} placeholder='Description' spellCheck='false' required />
        </div>
        <div className="createpost-form-group">
          <div className="createpost-input">
            <input type="file" name="image" accept='image/*' value={file || ''} onChange={handleFileChange} placeholder="upload image" />
          </div>
        </div>
        <div className="createpost-form-group">
          <div className="createpost-from-group-tags">
            {tags.length > 0 && tags.map((tag, index) => {
              return (
                <div key={index} className="createpost-from-group-tag">
                  {tag}
                  <span className="createpost-tag-close" onClick={() => handleDeleteTag(tag)}>&times;</span>
                </div>
              )
            })}
          </div>
          <input className="createpost-input" type="text" name="tags" value={value || ''} placeholder="Click enter to add tags" onChange={handleTagsChange} onKeyDown={handleKeyDown} />
        </div>
        <button className="createpost-btn" type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreatePost