import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from "react-router-dom"
import { logout } from '../store/slice/authSlice'


const Navbar = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to='/'> PizzaSlice</NavLink>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <NavLink to='/menu' className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Menu</NavLink>
            <NavLink to='/cart' className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Cart</NavLink>
            <button onClick={handleLogout} className='logout-btn'>Logout</button>
          </>
        ) : (
          <>
            <NavLink to='/login' className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Login</NavLink>
            <NavLink to='/signup' className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Signup</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;