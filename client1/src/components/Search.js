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
      suggestions: []
    }
  }

  searchSuggestion = (value) => {
    if (!value.length) this.setState({suggestions: []})

    const searchURI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${stockAPI}`


    if (this.state.ticker.length % 2 !== 0 && value.length) {

      axios.get(searchURI)
        .then(res => {

          const suggestions = res.data.bestMatches ? res.data.bestMatches.map(stock => ({
            symbol: stock["1. symbol"],
            name: stock["2. name"]
          })) : []

          this.setState({
            suggestions
          })
        })
    }

  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ticker: value}, () => this.searchSuggestion(value))

  }


  handleSubmit = (e) => {
    const { ticker } = this.state
    e.preventDefault()

    const uri = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${stockAPI}`

    axios.get(uri)
      .then(res => console.log(res.data))

  }

  render() {
    const { ticker, suggestions } = this.state

    return (
      <div className='search'>
        Stock Information
        <Form onSubmit={this.handleSubmit} inline>
          <FormControl
            type="text"
            placeholder="Search Ticker"
            className="mr-md-2"
            value={ticker}
            onChange={this.handleChange}
          />
          <Button type="submit">Get Info</Button>
        </Form>
        {
          suggestions.map((stock) => (
            <Suggestions stock={stock} />
          ))
        }
      </div>
    )
  }
}

export default Search