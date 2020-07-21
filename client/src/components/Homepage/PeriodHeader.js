import React from 'react'
import { Dropdown } from 'react-bootstrap'


const PeriodHeader = ({ ticker, stockAnalysis, currentIdx, changePeriod }) => {

  return (
    <div className='eval-title'>
      <h4>
        {ticker} Evaluation
      </h4>
      {
        stockAnalysis[currentIdx] ? (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {stockAnalysis[currentIdx].period}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changePeriod(2)}>May</Dropdown.Item>
              <Dropdown.Item onClick={() => changePeriod(1)}>June</Dropdown.Item>
              <Dropdown.Item onClick={() => changePeriod(0)}>July</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          ) : null
        }

      </div>
    )
}

export default PeriodHeader