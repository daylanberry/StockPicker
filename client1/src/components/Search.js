import React from 'react'
import './Search.css'
import { stockAPI, suggestionStock } from '../keys/keys'
import axios from 'axios'

import Suggestions from './Suggestions'
import StockInfo from './StockInfo'
import ErrorMessage from './ErrorMessage'
import { Form, Button, FormControl } from 'react-bootstrap'


class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ticker: '',
      name: '',
      suggestions: [],
      selectedStock: {},
      error: ''
    }
  }

  searchSuggestion = (value) => {
    const { ticker } = this.state

    if (!value.length) this.setState({suggestions: []})

    const searchURI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${suggestionStock}`


    if (ticker.length % 2 !== 0 && value.length > 2) {

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
    this.setState({ticker: value, error: ''}, () => this.searchSuggestion(value))

  }

  suggestionTickerChange = (ticker, name) => {
    this.setState({
      ticker,
      suggestions: [],
      name,
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();

    const { ticker } = this.state

    const uri = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${stockAPI}`

    axios.get(uri)
      .then(res => {

        if (res.data['Error Message']){
          this.setState({
            error: 'oops we are not able to fetch this stock!'
          })
          return
        }

        if (res.data['Note']) {
          this.setState({
            error: 'This application requires a limit of 5 requests per minute'
          })
        }


        const stockObj = res.data['Global Quote']

        let selectedStock = {};

        for (var prop in stockObj) {
          var description = prop.split(' ')[1]
          selectedStock[description] = stockObj[prop]
        }

        selectedStock.name = this.state.name

        this.setState({
          selectedStock,
          suggestions: [],
          errors: ''
        })
      })
  }

  render() {
    const { ticker, suggestions, selectedStock, name, error } = this.state

    return (
      <div className='stock-info'>
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
            suggestions.map((stock, i) => (
              <Suggestions
                key={i}
                stock={stock}
                tickerChange={this.suggestionTickerChange}
              />
            ))
          }
          {
            error.length ?  <ErrorMessage message={error}/> : null
          }
        </div>
        {
          selectedStock.price && selectedStock.name === name ?
          <StockInfo
            stock={selectedStock}
            typedName={name}
            typedTicker={ticker}
          /> : null
        }
      </div>

    )
  }
}

export default Search