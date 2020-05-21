import React, { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import axios from 'axios'




const Suggestions = ({stock: { symbol, name }}) => {

  return (
    <Card style={{ width: '17rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <div>
            {symbol}
          <span>
            ({name})
          </span>
          </div>
        </ListGroup.Item>
     </ListGroup>
    </Card>
  )
};


export default Suggestions