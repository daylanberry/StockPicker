import React, { useState } from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import CURRENT_USER from '../queries/currentUser'
import { graphql } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LOGOUT from '../mutations/logoutUser.js'

import DropDownOptions from './DropDownOptions'
import './Header.css'

const Header = (props) => {

  const { data, loading, error } = useQuery(CURRENT_USER)

  const [logout] = useMutation(LOGOUT, {
    refetchQueries: [{query: CURRENT_USER}]
  })

  const messageButton = () => {
    const user = data ? data.currentUser : null
    if (!loading && user) {
      return <Button onClick={logout}>Logout</Button>
    } else {
      return (
        <Button onClick={() => props.history.push('/login')}>Login</Button>
      )
    }

  }

  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto justify-content">
        <Link className='home' to='/'>Home</Link>
        <DropDownOptions />
      </Nav>
        <Form inline className='nav-selections'>
        {messageButton()}
        <Link className='signup' to='/signup'>Sign Up</Link>
        </Form>
    </Navbar>
    </div>
  )

}

export default withRouter(Header)