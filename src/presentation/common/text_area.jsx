import React from 'react'
import { Form } from 'semantic-ui-react'

const TextInput = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.TextArea
      label={label}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e, {name, value}) => onChange(value)}
    />
  )
}

export default TextInput
