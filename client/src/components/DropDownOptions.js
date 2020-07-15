import React from 'react'
import ErrorMessage from './ErrorMessage'
import CURRENT_USER from '../queries/currentUser'
import { useQuery } from '@apollo/react-hooks'

import { Dropdown } from 'react-bootstrap'
import './DropDownOptions.css'


const DropDownOptions = ({user, userLoading}) => {

  const { data, loading } = useQuery(CURRENT_USER)

  const displayPerformanceTab = () => {

    let message = !loading && data && !data.currentUser ? 'Performance (Must log in)' : 'Performance'
    let toDisable = !loading && data && !data.currentUser ? true : false

    return <Dropdown.Item disabled={toDisable} href="/performance">{message}</Dropdown.Item>
  }


  return (
    <Dropdown className='dropdown'>
      <Dropdown.Toggle id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/balance">Add Funds</Dropdown.Item>
        <Dropdown.Item href="/search">Search Stock</Dropdown.Item>
        {/* <Dropdown.Item href="/performance">Performance</Dropdown.Item> */}
        {displayPerformanceTab()}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDownOptions