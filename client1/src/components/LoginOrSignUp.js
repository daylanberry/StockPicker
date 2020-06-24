import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import './LoginOrSignUp.css'

import LOGIN_USER from '../mutations/loginUser'
import SIGN_UP from '../mutations/signUpUser'
import { useMutation } from '@apollo/react-hooks';
import CURRENT_USER from '../queries/currentUser'


const LoginOrSignUp = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [errors, setErrors] = useState('')

  const [loginUser] = useMutation(LOGIN_USER, {
    refetchQueries: [{query: CURRENT_USER }]
  })
  const [signUpUser] = useMutation(SIGN_UP, {
    refetchQueries: [{query: CURRENT_USER}]
  })

  const handleSubmit = (e, method) => {
    e.preventDefault()
    const existing = props.existing

    if (!existing && password !== password2) {
      alert('passwords are not the same')
      setPassword('')
      setPassword2('')
      return
    }
    let func = existing ? loginUser : signUpUser

    func({
      variables: { email, password }
    }).then(user => props.history.push('/'))
    .catch(res => {
      console.log(res.graphQLErrors[0])
      const errors = res.graphQLErrors[0] ? res.graphQLErrors[0].message : 'Invalid Credentials!'

      return setErrors(errors)
    })

    setEmail('')
    setPassword('')
    setPassword2('')
    setErrors('')

  }

  const retypePassword = () => {
    return (
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Retype Password"
          value={password2}
          name='password'
          onChange={(e) => setPassword2(e.target.value)}
        />
      </Form.Group>
    )
  }


  const errorMessage = () => {

    if (errors.length) {
      return <Alert className='signup-alert' variant='danger'>{errors}</Alert>
    }
  }

  return (
    <div className='signin-form row justify-content-center'>
      <Form
        className='center-block w-15'
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {
          !props.existing ? retypePassword() : null
        }

        <div className='d-flex' >
          <Button className='red' variant="primary" type="submit">
            Login with email
          </Button>
          <a href='auth/google' className='google'>Sign In with Google</a>
        </div>
        {errorMessage()}
      </Form>
    </div>
  )

}

export default LoginOrSignUp
