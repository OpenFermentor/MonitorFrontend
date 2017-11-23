import React from 'react'
import TagsInput from 'react-tagsinput'
import './styles.css'

const Tags = ({ label, placeholder, tags = [], onChange, tagDisplayProp }) => {
  return (
    <div className='tags-input field'>
      <label>{label}</label>
      <TagsInput
        value={tags}
        tagDisplayProp={tagDisplayProp}
        onChange={onChange}
        inputProps={{
          className: 'react-tagsinput-input',
          placeholder: placeholder
        }}
      />
    </div>
  )
}

export default Tags
