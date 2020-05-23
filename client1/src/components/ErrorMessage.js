import React from 'react'
import { Alert } from 'react-bootstrap'


const ErrorMessage = (props) => {

  return (
    <Alert variant='secondary'>
      {props.message}
    </Alert>
  )
}

export default ErrorMessage