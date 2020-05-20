import React, { useState } from 'react'

import { stockAPI } from '../keys/keys'
import axios from 'axios'
import { Dropdown, TypeaHead } from 'react-bootstrap'
import {AsyncTypeahead} from 'react-bootstrap-typeahead'

const Suggestions = (props) => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)


  const handleSearch = (value) => {
    setLoading(true)

    const searchURI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=${stockAPI}`

    if (value.length >= 3 && value.length % 2 !== 0) {
      axios.get(searchURI)
        .then(res => setOptions(res.data))
        .then(() => setLoading(false))
    }


  }

  return (
    <AsyncTypeahead
      id="async-example"
      isLoading={loading}
      labelKey="login"
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder="Search for a Github user..."
      renderMenuItemChildren={(option, props) => (
        <div>
          <span>{option.name}</span>
        </div>
      )}
    />
  )
}

export default Suggestions