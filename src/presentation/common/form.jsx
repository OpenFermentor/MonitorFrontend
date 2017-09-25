import React from 'react'
import { Form } from 'semantic-ui-react'

const TextInput = ({ fetching, onSubmit, children }) => {
  return (
    <Form loading={fetching} onSubmit={onSubmit}>
      { children }
    </Form>
  )
}

export default TextInput
