import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'


const Suggestions = ({tickerChange, stock: { symbol, name }}) => {

  return (
    <Card style={{ width: '17rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div onClick={() => tickerChange(symbol, name)}>
            <span style={{'fontSize': '10px', 'cursor': 'pointer'}}>
              {name} <strong>({symbol})</strong>
            </span>
          </div>
        </ListGroup.Item>
     </ListGroup>
    </Card>
  )
};


export default Suggestions