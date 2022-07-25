import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import './createPost.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../redux/posts/postsActions'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.posts)
  const [form, setForm] = useState({ title: '', description: '', image: '' })
  const [tags, setTags] = useState([])
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    let newForm = { ...form, tags }
    // console.log(newForm)
    dispatch(createPost(newForm, navigate))
    // if (error === false) {
    // show some feed back that the post was made
    // }
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
      console.log(tags)
    }
  }

  const handleDeleteTag = (item) => {
    let newTags = tags.filter(tag => tag !== item)
    setTags(newTags)
  }

  return (
    <div className='createpost-container'>
      <form className='createpost-form' onSubmit={handleSubmit}>
        <div className="creaetpost-form-group">
          <h2 className='createpost-form-h2'>Create Post</h2>
        </div>
        <div className="createpost-form-group">
          <input className="createpost-input" type="text" name="title" value={form.title || ''} onChange={handleChange} placeholder='Title' />
        </div>
        <div className="createpost-form-group">
          <textarea type="text" maxLength={900} className="createpost-textarea" name="description" value={form.description || ''} onChange={handleChange} placeholder='Description' spellCheck='false' />
        </div>
        <div className="createpost-form-group">
          <div className="createpost-input">
            <label htmlFor="fileInput">Choose an image for your post (optionnal) : </label>
            <FileBase className="createpost-filebase" multiple={false} onDone={({ base64 }) => setForm({ ...form, image: base64 })} />
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