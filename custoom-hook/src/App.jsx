import React from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
const App = () => {
  const {data, loading, error, fetchApi} = useFetch('https://api.escuelajs.co/api/v1/products')
  return (
    <div className='App'>
      <h1>Photos</h1>
      {loading && (<div>
        <div className='loading'></div>
        <p className='loading-text'>Loading</p>
      </div>)}
      {error && (<div className='error'>
        <p className='error-text'>{error.message}</p>
        <button onClick={fetchApi} className='try-btn'>Try Again</button>
      </div>)}
      {!loading && !error && data && (<div className='product-grid'>
        {data.slice(0,21).map((d)=>(<div key={d.id} className='product-card'>
          <h3>{d.title}</h3>
          <img src={d.images[0]} alt="Product-image" />
          <div>
            <p><strong>Price:</strong> {d.price}</p>
            <button> + Add</button>
          </div>
        </div>))}
      </div>)}

    </div>
  )
}

export default App
