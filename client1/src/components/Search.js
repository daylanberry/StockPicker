import React from 'react'
import './Search.css'
import { stockAPI } from '../keys/keys'
import axios from 'axios'

import Suggestions from './Suggestions'
import { Form, Button, FormControl } from 'react-bootstrap'


class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: '',
      values: [{name: 'test'}]
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ticker: value})

    const searchURI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${stockAPI}`

    if (value.length >= 3 && value.length % 2 !== 0) {
      axios.get(searchURI)
        .then(res => this.setState({
          values: res.data
        }))
    }
  }


  handleSubmit = (e) => {
    const { ticker } = this.state
    e.preventDefault()

    const uri = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${stockAPI}`

    axios.get(uri)
      .then(res => console.log(res.data))

  }

  render() {
    return (
      <div className='search'>
        Stock Information
        <Form onSubmit={this.handleSubmit} inline>
          <FormControl
            type="text"
            placeholder="Search Ticker"
            className="mr-md-2"
            value={this.state.ticker}
            onChange={this.handleChange}
          />
          <Button type="submit">Get Info</Button>
         {/* <Suggestions options={this.state.values} handleChange={this.handleChange}/> */}
        </Form>
      </div>
    )
  }
}

export default Search