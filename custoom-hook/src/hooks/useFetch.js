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