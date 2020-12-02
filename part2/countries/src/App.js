import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import Country from './components/Country'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filtered = newFilter === '' ? [] : 
    countries.filter(c => c.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <div>find countries<input value={newFilter} onChange={handleFilterChange}/></div>
      <Country filtered={filtered} setNewFilter={setNewFilter}/>
    </div>
  )
}

export default App