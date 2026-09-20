# React Custom Hook

This is a React project where I created a custom `useFetch` hook to fetch products from an API.


## useFetch hook
 * it accept url parameter
 * return four values likes data, loading, error and fetchApi function for data fetching

```jsx
import React, { useEffect, useState,useCallback } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchApi = useCallback(async() =>{
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if(!response.ok){
        throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
      }
      const apiData = await response.json();
      setData(apiData)
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false)
    }
  },[url])
  useEffect(()=>{
    fetchApi()
  },[fetchApi])


  return {data, loading, error, fetchApi}
}

export default useFetch
```

# Decisions
 * When App is render useFetch hook will be called from app.jsx.
 * It accept url parameter.
 * in useFetch hook i create three state and fetchApi function and return its
 1. data => api response data
 2. loading => api request running
 3. error => api error when request fail 
 4. fetchApi function => fetch data from api 
 *  i create this function using useCallback hook. it help in maintain same function reference. if i not use useCallback when state change app will re-render fetchApi function will recreate with other reference. i give dependency as url. when url change fetchApi wll recreate or new reference
 ```jsx
 const fetchApi = useCallback(async() =>{
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if(!response.ok){
        throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
      }
      const apiData = await response.json();
      setData(apiData)
    } catch (error) {
      setError(error)
    } finally{
      setLoading(false)
    }
  },[url])
 ```
* in useEffect i give fetchApi as dependency. 
```jsx
useEffect(()=>{
    fetchApi()
  },[fetchApi])
```
* when url change => fetchApi function reference change => new fetchApi reference => useEffect will run again  

