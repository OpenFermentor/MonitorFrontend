import React from 'react'
import { Form } from 'semantic-ui-react'
import './styles.css'

import TextInput from '../common/text_input'
import Button from '../common/button'
import Container from '../common/container'

const SignInPresenter = ({ email, password, fetching, error, onSubmit, onChangeCredentials }) => {
  return (
    <div className='signIn'>
      <div>
        <h1>Inicia sesión en Open Fermentor</h1>
        <Form>
          <TextInput
            name='email'
            label='Email'
            required
            value={email}
            onChange={email => onChangeCredentials({ email, password })}
          />
          <TextInput
            name='password'
            label='Contraseña'
            required
            value={password}
            type='password'
            onChange={password => onChangeCredentials({ email, password })}
          />
          { error &&
            <p className='error'>{ error.message }</p>
          }
          <Container row end>
            <Button primary onClick={onSubmit} type='submit'>Iniciar sesión</Button>
          </Container>
        </Form>
      </div>
    </div>
  )
}

export default SignInPresenter
