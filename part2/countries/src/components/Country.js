import React, { useState } from "react"
import axios from 'axios' 

const api_key = process.env.REACT_APP_API_KEY

const Country = ({filtered, setNewFilter}) => {
  const l = filtered.length
  if (l > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (l > 1 && l <= 10) {
    return <div>{filtered.map(c => <CountryName key={c.name} name={c.name} setNewFilter={setNewFilter}/>)}</div> 
  } else if (l === 1) {
    // console.log(filtered[0])
    return <OneCountry country={filtered[0]}/>
  } else return '' 
}

const OneCountry = ({country}) => { 
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt='' height="100" />
      <Weather country={country}/>
    </div>
)}

const Weather = ({country}) => {
  const baseUrl = 'http://api.weatherstack.com/'
  const url = `${baseUrl}current?access_key=${api_key}&query=${country.capital}`

  const [ temperature, setTemperature ] = useState(0)
  const [ icon, setIcon ] = useState('')
  const [ windSpeed, setWindSpeed ] = useState('')
  const [ windDir, setWindDir ] = useState('')
  axios
    .get(url)
    .then(response => {
      // console.log(response)
      if ('current' in response.data) {
        setTemperature(response.data.current.temperature)
        setIcon(response.data.current.weather_icons)
        setWindSpeed(response.data.current.wind_speed)
        setWindDir(response.data.current.wind_dir)
      } else {
        throw('failed')
      }
    })
    .catch(error => console.log(error))
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature:</b> {temperature} Celcius</p>
      <img src={icon} alt=''/>
      <p><b>wind:</b> {windSpeed} mph direction {windDir}</p>
    </div>
  )
}

const CountryName = ({name, setNewFilter}) => {
  // console.log(setNewFilter)
  return <p>{name}<button onClick={() => setNewFilter(name)} >show</button></p>
}

export default Country