import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import GET_USER_STOCKS from '../queries/getUserStocks'
import CURRENT_USER from '../queries/currentUser'
import ADD_UPDATE_STOCK from '../mutations/addUpdateStock'
import UPDATE_USER_ASSETS from '../mutations/updateUserAssets'
import axios from 'axios'

import { Spinner, Card, Button } from 'react-bootstrap'
import * as helpers from './utils'

import AssetTable from './AssetTable'


const Performance = props =>  {

  const [stocks, setStocks] = useState([])
  const [balance, setBalance] = useState(0)

  const [updateStock] = useMutation(ADD_UPDATE_STOCK);
  const [updateUserAssets] = useMutation(UPDATE_USER_ASSETS, {
    refetchQueries: [{query: CURRENT_USER}]
  })

  const { loading, error, data } = useQuery(GET_USER_STOCKS)
  const { loading: loading1, error: error1, data: data1 } = useQuery(CURRENT_USER)

  useEffect(() => {
    updateAllStocks()
    updateUserAssets()

  }, [data, data1, loading])


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

  const displayAssets = () => {

    if (data1) {
      if (data1.currentUser) {
        return <span>${helpers.numberFormatter(data1.currentUser.assets)}</span>
      }
    } else {
      return <span>Loading...</span>
    }
  }

  const tableLoading = () => {
    return (
      <div>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
      </div>
    )
  }

  const displayContent = () => {
    if (!stocks.length && data1) {
      if (data1.currentUser.assets === data1.currentUser.avalBalance) {

        return (
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Card style={{marginTop: '20px', width: '40%'}}>
              <Card.Body >
                <Card.Title>No Stocks held</Card.Title>
                <Card.Text>
                  Click below to search and buy funds!
                </Card.Text>
                <Button onClick={() => props.history.push('/search')} variant="primary">Search/Buy Funds</Button>
              </Card.Body>
            </Card>

          </div>
        )
      }
    }

    return (
      stocks.length ? (
        <AssetTable
          stocks={stocks}
          user={data1}
        />
      ) : tableLoading()
    )

  }


  return (
    <div>
      <h3>Balances and Holdings</h3>
      <div>
        <span>Total Assets: {displayAssets()} </span>
        {/* {
          stocks.length ? (
            <AssetTable
              stocks={stocks}
              user={data1}
            />
          ) : tableLoading()
        } */}
        {displayContent()}
      </div>
    </div>
  )

}

export default Performance