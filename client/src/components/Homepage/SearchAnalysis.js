import React, { useState } from 'react'

import { Button } from 'react-bootstrap'
import './SearchAnalysis.css'

const SearchAnalysis = ({switchTicker}) => {

  const [ticker, setTicker] = useState('')

  const handleChange = (e) => {
    setTicker(e.target.value.toUpperCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    switchTicker(ticker)
  }

  return (
    <form onSubmit={handleSubmit} className='search-recom'>
      <input
        className='recom-input'
        type='text'
        placeholder='search for new stock'
        value={ticker}
        onChange={handleChange}
      />
      <Button
        className='recom-input'
        type='submit'
      >
        Search
      </Button>
    </form>
  )
}

export default SearchAnalysis