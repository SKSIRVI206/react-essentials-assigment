import React, { useEffect, useState } from 'react'
import { Menu, Search, Sun, Thermometer, Droplets, Wind, Gauge } from 'lucide-react'
import weatherImage from './assets/weatherimage.jpg'
import './App.css'
function App() {
  const [background, setBackground] = useState(weatherImage)
  const [time, setTime] = useState(new Date())
  const [cityName, setCityName] = useState('')
  const [defaultCity, setDefaultCity] = useState('Mumbai')
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetchWether = async() => {
    try {
      setLoading(true)
      setError(null)
      const APIkey = import.meta.env.VITE_WEATHER_API_KEY;
      const API = `https://api.openweathermap.org/data/2.5/forecast?q=${defaultCity}&appid=${APIkey}&units=metric`
      const response = await fetch(API)
      const data = await response.json()
      if(response.ok){
        setWeatherData(data)
        const mainCondition = data.list[0].weather[0].main.toLowerCase();
        if (mainCondition.includes('rain')) {
            setBackground('https://www.shutterstock.com/image-photo/raining-season-summer-storm-dark-260nw-2665854493.jpg'); 
          } else if (mainCondition.includes('cloud')) {
            setBackground('https://sunmodo.com/wp-content/uploads/2015/08/solar-on-cloudy-days.jpg'); 
          } else if (mainCondition.includes('clear')) {
            setBackground(weatherImage); 
          } else {
            setBackground(weatherImage);
          }
      }
      if(!response.ok){
        throw new Error(`Https Error! : City ${response.statusText}`)
      }
    } catch (err) {
      setError(err.message)
      
      
    }finally{
      setLoading(false)
    }
    
  }
  useEffect(()=>{
    fetchWether();
    const autoRefreshingData = setInterval(()=>{
      fetchWether();
    },60000)
    return ()=>{
      clearInterval(autoRefreshingData)
    }
  },[defaultCity])
  
  const handleCitySearch = () => {
  if (cityName.trim() !== '') {
    setDefaultCity(cityName);
    setCityName('');
  }}

  useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000)
  return () => clearInterval(timer)
  }, [])


  return (
    <div className='app'>
      <div className='navbar'>
        <div>
          <Sun size={30} color={'yellow'}/>
          <h1>AccuWeather</h1>
        </div>
        <div>
          <input 
          type="text"
          value={cityName}
          onChange={(e)=>setCityName(e.target.value)}
          placeholder='Search city here...'
          />
          <button onClick={handleCitySearch}>
            Get Weather
          </button>  
        </div>
        <div>
          <p>{time.toDateString()}</p>
          <p>{time.toLocaleTimeString()}</p>
        </div>
        
      </div>
      {loading && (<div className='loading'>
        <p>loading...</p>
      </div>)}
      {error && (<div className='error-info'>
        <h2>Error Occured!</h2>
        <p>{error}</p>
        <button onClick={fetchWether} className='try-btn'>Try Again</button>
      </div>)}
      {!loading && !error && weatherData &&(<div className='weather-info'>
        <div className='Hero-card'
          style={{ 
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',        
            backgroundRepeat: 'no-repeat',  
            backgroundPosition: 'center'    
          }}
          >
            <img src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`} alt="weather-icon" />
            <h1>{weatherData.city.name}</h1>
            <h1>{weatherData.list[0].main.temp}&deg;c</h1>
            <p>{weatherData.list[0].weather[0].main}, {weatherData.list[0].weather[0].description}</p>
        </div>
        <div className='highlight-grid'>
          <div className="card">
            <div className="card-header">
              <Thermometer size={24} className="icon-style" /> 
              <h2>Feels Like</h2>
            </div>
            <p>{weatherData.list[0].main.feels_like}&deg;c</p>
          </div>
          <div className="card">
            <div className='card-header'>
              <Droplets size={24} className="icon-style" />
              <h2>Humidity</h2>
            </div>
            <p>{weatherData.list[0].main.humidity}%</p>
          </div>
          <div className="card">
            <div className='card-header'>
              <Wind size={24} className='icon-style'/>
              <h2>Wind Speed</h2>
            </div>
            <p>{weatherData.list[0].wind.speed} m/s</p>
          </div>
          <div className="card">
            <div className='card-header'>
              <Gauge size={24} className='icon-style'/>
              <h2>Pressure</h2>
            </div>
            <p>{weatherData.list[0].main.pressure} hPa</p>
          </div>
        </div>
        <div className="forecast-row">
            {weatherData.list
              .filter((item) => item.dt_txt.includes("12:00:00")) 
              .map((item, index) => {

                const dayName = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
              
                return (
                  <div key={index} className="forecast-card">
                    <h5>{dayName}</h5>
                    <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                    <p>{Math.round(item.main.temp)}°C</p>
                  </div>
                );
              })
            }
          </div>
      </div>)} 
    </div>
  )
}

export default App
