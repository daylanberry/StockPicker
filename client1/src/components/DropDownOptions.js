import React from 'react'

import { Dropdown } from 'react-bootstrap'
import './DropDownOptions.css'


const DropDownOptions = () => {

  return (
    <Dropdown className='dropdown'>
      <Dropdown.Toggle id="dropdown-basic">
        Options
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/costBasis">Cost Basis</Dropdown.Item>
        <Dropdown.Item href="/search">Search Stock</Dropdown.Item>
        <Dropdown.Item href="/performance">Performance</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropDownOptions