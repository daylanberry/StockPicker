import React, { useEffect } from 'react'
import socketIOClient from 'socket.io-client'

var socket;
const ENDPOINT = ''

class Performance extends React.Component {


  ws = new WebSocket('wss://ws.finnhub.io?token=brcq3cvrh5rcn6su4hb0');

  componentDidMount() {
    //this.unsubscribe('BINANCE:BTCUSDT')
    this.ws.onopen = () => {

      this.ws.send(JSON.stringify({
        'type': 'subscribe', 'symbol': 'ERI'
      }))

      this.ws.onmessage = evt => {
        console.log('hi')
        console.log(evt)
      }
    }
  }

  unsubscribe = (symbol) => {
    this.ws.send(JSON.stringify({
      'type': 'unsubscribe',
      'symbol': symbol
    }))
  }

  render() {
    return (
      <div>
        props
      </div>
    )
  }
}

export default Performance