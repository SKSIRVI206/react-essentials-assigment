import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, setErrors, updateField } from '../store/slice/userSlice'
import { login } from '../store/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { openModel, closeModel } from '../store/slice/uiSlice'
import Model from '../components/Model'

const Login = () => {
    const formData = useSelector(state=>state.user.loginForm)
    const isSubmitting = useSelector(state =>state.user.isSubmitting)
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInputChange =(e)=>{
       const {name, value} = e.target;
       dispatch(updateField({formType:'loginForm',fieldName:name, fieldValue:value}))
    }
    const handleLoginSubmit =(e)=>{
        e.preventDefault();
        dispatch(login({loginData:formData}))
        dispatch(openModel());
        
    }
  return (
    <div style={{display:'grid',placeItems:'center', minHeight:'90vh'}}>
    <form onSubmit={handleLoginSubmit}>
        <h1>Welcome Back!</h1>
        <p>Login Here</p>
        <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='example@gmail.com' name='email' value={formData.email} onChange={handleInputChange}/>
        </div>
        <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Roh@305' name='password' value={formData.password} onChange={handleInputChange}/>
        </div>
        <button type='submit' disabled={isSubmitting}>Login</button>
        <Model>
            <div className="modal-content" style={{ padding: '15px', textAlign: 'center' }}>
                {error ? (
                    
                    <>
                        <h2 style={{ color: 'red', marginBottom: "8px" }}>⚠️ Login Failed!</h2>
                        <p style={{ marginBottom: "15px", color: '#555' }}>{error}</p>
                        <button 
                            type="button" 
                            onClick={() => dispatch(closeModel())} 
                            style={{ background: 'red', color: "white", borderRadius: '5px', padding: "8px 15px", border: 'none', cursor: 'pointer' }}
                        >
                            Try Again
                        </button>
                    </>
                ) : (
                    
                    <>
                        <h2 style={{ color: 'green', marginBottom: "8px" }}>🎉 Login Successful!</h2>
                        <p style={{ marginBottom: "15px", color: '#555' }}>Welcome back to your Pizza Shop.</p>
                        <button 
                            type="button" 
                            onClick={() => {
                                dispatch(closeModel());
                                navigate('/menu'); 
                            }}
                            style={{ background: 'green', color: "white", borderRadius: '5px', padding: "8px 15px", border: 'none', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </>
                )}
            </div>
        </Model>
    </form>
    </div>
  )
}

export default Login