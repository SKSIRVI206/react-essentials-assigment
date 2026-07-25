import React from 'react'
import useFetch from './hooks/useFetch'

function App() {
  const apiUrl =  "https://api.escuelajs.co/api/v1/products"
  const { data, error, loading, fetchData } = useFetch(apiUrl);
  console.log(data)
  if(loading){
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-3 h-screen bg-slate-100">
        <div className="w-30 h-30 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"/>
        <p className="text-2xl font-bold text-green-600 animate-pulse mt-5">Loading...</p>
      </div>
    )
  }
  if (error) {

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-6 shadow-lg text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">Failed to Load Products</h2>
            <p className="text-sm text-red-600 font-mono bg-red-50 p-2 rounded-lg mt-2 border border-red-100">
              { error || "Something went wrong while fetching products."}
            </p>
          </div>

          <button
            onClick={fetchData}
            className="w-full py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm active:scale-95"
          >
            Try Again
          </button>

        </div>
      </div>
    )
  }
  return (
    <div className="bg-slate-100 min-h-screen p-4">
      <h1 className="text-3xl text-gray-800 font-bold text-center py-4 mb-6">Product List</h1>

      <div className="px-2 max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data && data.map(product => (
          <div key={product.id} className="border border-slate-200 shadow-md p-5 rounded-2xl bg-white flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
              
              <img 
                src={product.images && product.images[0]} 
                alt={product.title} 
                className="w-full h-48 object-cover rounded-xl mb-4 bg-slate-100"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">{product.description}</p>
            </div>

            <div className="text-center font-bold text-xl text-emerald-600">
              Rs. {product.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
