import React, { useEffect } from 'react'

import AnalysisTable from './AnalysisTable'
import './BuyOrSell.css'


const BuyOrSell = ({ticker}) => {

  useEffect(() => {

  })

  return (
    <div className='buy-sell-table'>
      <div className='eval-title'>
        <h3>{ticker} Evaluation</h3>
      </div>
      <AnalysisTable />
    </div>
  )
}

export default BuyOrSell