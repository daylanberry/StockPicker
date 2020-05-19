import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import './Login.css'
import LOGIN_USER from '../mutations/loginUser'
import CURRENT_USER from '../queries/currentUser'
import { useMutation, useQuery } from '@apollo/react-hooks';


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data } = useQuery(CURRENT_USER)


  const [
    loginUser,
    {loading, error }] = useMutation(
      LOGIN_USER,
      {
        update(cache, { data: { login }}){
          try {
            const currentUser = cache.readQuery({query: CURRENT_USER })

            cache.writeQuery({
              query: CURRENT_USER,
              data: currentUser
            });

            props.history.push('/')
          } catch(e) {
            console.log(e)
          }
        }
      }
    )

  const handleSubmit = (e, method) => {
    e.preventDefault()

    loginUser({
      variables: { email, password }
    })

  }



  if (error) {
    return <p>Invalid Credentials</p>
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

        <div className='d-flex' >
          <Button className='red' variant="primary" type="submit">
            Login with email
          </Button>
          <a href='auth/google' onClick={() => console.log('hi')} className='google'>Sign In with Google</a>

        </div>
      </Form>
    </div>
  )

}

export default Login
