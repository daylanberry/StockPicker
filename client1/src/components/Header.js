import React from 'react'
import CURRENT_USER from '../queries/currentUser'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import LOGOUT from '../mutations/logoutUser.js'

const Header = (props) => {

  const { data, loading, error } = useQuery(CURRENT_USER)

  const messageButton = () => {

    if (!loading && !data) {
      return <Button>Login</Button>
    } else if (!loading && data.currentUser) {
      return <Button>Logout</Button>
    }
  }

  return (
    <div>
    <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Link to='/'>Home</Link>
    </Nav>
    <Form inline className='nav-selections justify-content space-between'>
      {messageButton()}
    </Form>
  </Navbar>
    </div>
  )

}

export default Header