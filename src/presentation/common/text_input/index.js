import React from 'react'
import './styles.css'
import { Grid, Form } from 'semantic-ui-react'

const TextInput = ({ onChange, error, name, width, ...props }) => {
  const hasError = !!error && !!error.errors && !!error.errors[name]
  return (
    <Grid.Column className='textInput' width={width}>
      <Form.Input
        {...props}
        error={hasError}
        onChange={(e, {name, value}) => onChange(value)}
      />
      { hasError &&
        <p className='error'>{ error.errors[name].message }</p>
      }
    </Grid.Column>
  )
}

export default TextInput
