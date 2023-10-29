import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countryList, setCountryList] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  const api_key = import.meta.env.VITE_SOME_KEY

  // Fetch list of countries based on countrySearch
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountryList(response.data)
      })
      .catch((error) => {
        console.log('Data fetch error', error)
      })
  }, [])

  // Fetch weather data from openweather. Triggers always when countrySearch changes value. Data stored in weatherData variable
  useEffect(() => {
    // API url to for fetching the data. Changed units to the metric system so the temperature displays straight in Celsius instead of Kelvin
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${countrySearch}&units=metric&appid=${api_key}`

    axios
    .get(api_url)
    .then(response => {
      const weatherData = response.data
      setWeatherData(weatherData)
    })
    .catch((error) => {
      console.log('Error downloading weather data', error)
    })
  }, [countrySearch])

  // Event handler for countrySearch
  const handleInput = ({ target: { value } }) => {
    setCountrySearch(value)
  }

  // Filter for countryList
  const countriesToShow = countryList.filter((country) =>
    country.name.common.toLowerCase().startsWith(countrySearch.toLowerCase())
  )

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        find country: <input onChange={handleInput}/>
      </form>
      <div>
            {countriesToShow.length > 10 ? ( // Filter matches > 10 countries and tells user to specify search
              <p>Too many matches, specify another filter</p>
        ) : countriesToShow.length === 1 ? ( // Full information of a single country including name, capital, area, languages and flag
             countriesToShow.map((country) =>
              <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital}</p>
              <p>Area {country.area}</p>
              <h3>Languages:</h3>
              {country.languages &&
                Object.values(country.languages)
                      .map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
              <img src={country.flags.png} alt={country.flags.alt}/>
              <h2>Weather in {country.capital}</h2>
              {weatherData === null ? ( // When weatherData is null there will be a text instead of fetch
                <p>Loading weather data...</p>
            ) : ( // When weatherData has a value to show here begins the part where are temperature, weather status icon and wind speed
              <div>
                <p>Temperature {weatherData.main.temp.toFixed(2)} Celsius</p>
                  <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}/>
                <p>Wind {weatherData.wind.speed} m/s</p>
              </div>
             )}
          </div>
          )
        ) : ( // Option of 2-10 countries to show. There is a 'show' button which fills search bar with the current country's full name and redirects to full info
          countriesToShow.map((country) => (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => setCountrySearch(country.name.common)}>show</button>
          </div>
      )))}
    </div>
    </div>
  )
}

export default App
