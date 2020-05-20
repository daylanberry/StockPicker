import React from 'react'
import './Search.css'

import { Form, Button, FormControl } from 'react-bootstrap'


class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: ''
    }
  }


  handleSubmit = (e) => {
    e.preventDefault()

  }

  render() {
    return (
      <div className='search'>
        Stock Information
        <Form onSubmit={this.handleSubmit} inline>
          <FormControl type="text" placeholder="Search Ticker" className=" mr-md-2" />
          <Button type="submit">Get Info</Button>
        </Form>
      </div>
    )
  }
}

export default Search