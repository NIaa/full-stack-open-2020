import React, { useState, useEffect } from 'react'
import axios from 'axios' 

const Country = ({filtered}) => {
  const l = filtered.length
  if (l > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (l > 1 && l <= 10) {
    return <div>{filtered.map(c => <CountryName key={c.name} name={c.name}/>)}</div> 
  } else if (l === 1) {
    console.log(filtered[0])
    return <OneCountry country={filtered[0]}/>
  } else return '' 
  {/* empty filter */}
}
const OneCountry = ({country}) => { 
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} height="100" />
    </div>
)}

const CountryName = ({name}) => <p>{name}</p>


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
      <Country filtered={filtered}/>
    </div>
  )
}

export default App