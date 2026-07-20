import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Menu from './pages/Menu'
import Cart from './pages/Cart'


import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div className='App'>
      
      <Navbar />
      
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        
        <Route
          path='/menu' 
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/cart' 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
