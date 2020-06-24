import React from 'react'
import { Alert } from 'react-bootstrap'


const ErrorMessage = ({error}) => {

  return (
    <Alert style={{marginTop: '5px'}} variant='danger'>
      {error}
    </Alert>
  )
}

export default ErrorMessage