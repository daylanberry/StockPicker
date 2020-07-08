import React from 'react'
import './Search.css'
import { stockAPI, suggestionStock, finnhub } from '../keys/keys'
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
      clickedSuggestion: false,
      selectedStock: {},
      error: '',
      buy: true
    }

  }

  toggleBuy = () => {
    this.setState({buy: !this.state.buy})
  }

  componentDidMount() {

    const routerState = this.props.location.state

    if (routerState) {

      const { buy } = this.props.location.state

      let moreStockObj = {
        name: routerState.stock.name,
        price: routerState.stock.price,
        symbol: routerState.stock.ticker,
      }

      this.setState({
        ticker: routerState.stock.ticker,
        name: routerState.stock.name,
        selectedStock: moreStockObj,
        buy
      }, () => this.getStockInfo(moreStockObj.price))

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
    this.setState({
      ticker: value.toUpperCase(),
      error: '',
      clickedSuggestion: false
    }, () => this.searchSuggestion(value))

  }

  suggestionTickerChange = (ticker, name) => {
    this.setState({
      ticker,
      suggestions: [],
      clickedSuggestion: true,
      name,
    })
  }

  getAdditionalInfo = () => {
    const { ticker, clickedSuggestion } = this.state;
    var uri = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${finnhub}`

    if (!clickedSuggestion) {
      axios.get(uri)
        .then(res => {
          this.setState({
            name: res.data.name
          })
        })
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getStockInfo(null)
  }

  getStockInfo = (buyMorePrice=null) => {
    const {
      ticker,
      name
    } = this.state

    const uri = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${stockAPI}`

    axios.get(uri)
      .then(res => {

        if (res.data['Error Message']) {
          this.setState({
            error: 'oops we are not able to fetch this stock!'
          })
          return
        }

        if (res.data['Note']) {
          this.setState({
            error: 'This application requires a limit of 5 requests per minute'
          })
          return
        }


        const stockObj = res.data['Global Quote']

        let selectedStock = {};

        for (var prop in stockObj) {
          var description = prop.split(' ')[1]
          if (description === 'price' && buyMorePrice) {
            selectedStock[description] = buyMorePrice
            continue;
          };

          selectedStock[description] = stockObj[prop]
        }

        this.setState({
          selectedStock,
          suggestions: [],
          error: ''
        }, () => this.getAdditionalInfo(null))
      })
  }


  render() {
    const { ticker, suggestions, selectedStock, name, error, buy } = this.state

    return (
      <div className={`stock-info`}>
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
            error.length ?  <ErrorMessage error={error}/> : null
          }
        </div>
        {
          selectedStock.symbol === ticker ?
          <StockInfo
            name={name}
            buy={buy}
            stock={selectedStock}
            toggle={this.toggleBuy}
          />
          : null
        }
      </div>

    )
  }
}

export default Search