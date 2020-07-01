import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_USER_STOCKS from '../queries/getUserStocks'
import CURRENT_USER from '../queries/currentUser'
import ADD_UPDATE_STOCK from '../mutations/AddUpdateStock'
import UPDATE_USER_ASSETS from '../mutations/updateUserAssets'
import axios from 'axios'


const Performance = props =>  {

  const [stocks, setStocks] = useState([])
  const [balance, setBalance] = useState(0)

  const [updateStock] = useMutation(ADD_UPDATE_STOCK)
  const [updateUserAssets] = useMutation(UPDATE_USER_ASSETS)

  const { loading, error, data } = useQuery(GET_USER_STOCKS)
  const { loading: loading1, error: error1, data: data1 } = useQuery(CURRENT_USER)

  useEffect(() => {
    updateAllStocks()

  }, [data, loading])

  //updates database
  useEffect(() => {

    stocks.forEach(({ name, ticker, currentPrice})=> {
      let stockObj = {
        name,
        ticker,
        price: currentPrice,
        qty: 0
      }
      updateStock({variables: stockObj})
      updateUserAssets()
    })

  }, [stocks])



  const getData = (url, stock) => {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((res) => resolve({...stock, currentPrice: res.data.c}))
    })
  }

  const updateAllStocks = async () => {

    let updatedStocks = []

    if (!loading && data) {
      let userStocks = data.getUserStock

      userStocks.forEach(stock => {
        updatedStocks.push(getData(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=brcq3cvrh5rcn6su4hb0`, stock))
      })

      Promise.all(updatedStocks)
        .then(stockData => setStocks(stockData))
    }
  }

  return (
    <div>
      <h3>Balances and Holdings</h3>
      <div>
        <span>Total Assets: </span>
      </div>
    </div>
  )

}

export default Performance