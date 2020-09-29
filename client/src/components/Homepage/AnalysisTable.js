import React from 'react'

import { Table } from 'react-bootstrap'

const AnalysisTable = ({stock: { buy, hold, sell, strongBuy, strongSell}}) => {

  return (

    <Table style={{width: '100%'}} striped bordered hover>
      <tbody>
        <tr>
          <td>
            Buy:
          </td>
          <td>
            {buy}
          </td>
        </tr>

        <tr>
          <td>
            Hold:
          </td>
          <td>
            {hold}
          </td>
        </tr>

        <tr>
          <td>
            Sell:
          </td>
          <td>
            {sell}
          </td>
        </tr>

        <tr>
          <td>
            Strong Buy:
          </td>
          <td>
            {strongBuy}
          </td>
        </tr>

        <tr>
          <td>
            Strong Sell:
          </td>
          <td>
            {strongSell}
          </td>
        </tr>
      </tbody>
      </Table>
  )
}

export default AnalysisTable