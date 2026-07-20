import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, setErrors, updateField } from '../store/slice/userSlice'
import { signup } from '../store/slice/authSlice'


const Signup = () => {
    const formData = useSelector(state=>state.user.signupForm)
    const errors = useSelector(state =>state.user.errors)
    const dispatch = useDispatch()
    useEffect(()=>{
            dispatch(clearErrors())
        },[dispatch])
    const handleInputChange =(e)=>{
       const {name, value, checked} = e.target;
       if(e.target.type === 'checkbox'){
        dispatch(updateField({formType:'signupForm',fieldName:name, fieldValue:checked}))
       }else{
        dispatch(updateField({formType:'signupForm',fieldName:name, fieldValue:value}))
       }
    }
    const handleSignupSubmit =(e)=>{
        e.preventDefault();
        const validationError = {};
        if(!formData.name){
            validationError.name = 'Name is Required'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!formData.email){
            validationError.email = 'Email is Required';
            }else if(!emailRegex.test(formData.email)) {
            validationError.email = 'Please Enter a valid email';
        }
        const phoneRegex = /^\d{10}$/;
        if(!formData.phone.trim() || !phoneRegex.test(formData.phone)){
            validationError.phone = "Please Enter a valid number"
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if(!formData.password.trim() || !passwordRegex.test(formData.password.trim())){
            validationError.password = "Password must be 8+ characters with at least one capital letter and one number."
        }
        if(!formData.confirmPassword.trim()){
            validationError.confirmPassword = 'Please enter confirm password'
        }
        if(formData.confirmPassword.trim() && formData.password.trim() !== formData.confirmPassword.trim()){
            validationError.confirmPassword = 'Password does not match'
        }
        if(!formData.termsAndCond){
            validationError.termsAndCond = "please accept term and condition"
        }
        dispatch(setErrors(validationError))
        if(Object.keys(validationError).length === 0){
            dispatch(signup({signupData:formData}))
        }


    }
  return (
    <form onSubmit={handleSignupSubmit}>
        <h1>Welcome Back!</h1>
        <p>Sign Up Here</p>
        <div className='form-group'>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id='fullName' placeholder='Enter Your Full Name' name='name' value={formData.name} onChange={handleInputChange}/>
            {errors.name && <p className='error-msg'>{errors.name}</p>}
        </div>
        <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='example@gmail.com' name='email' value={formData.email} onChange={handleInputChange}/>
            {errors.email && <p className='error-msg'>{errors.email}</p>}
        </div>
        <div className='form-group'>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder='895624123' name='phone' value={formData.phone} onChange={handleInputChange}/>
            {errors.phone && <p className='error-msg'>{errors.phone}</p>}
        </div>
        <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder='Roh@305' name='password' value={formData.password} onChange={handleInputChange}/>
            {errors.password && <p className='error-msg'>{errors.password}</p>}
        </div>
        <div className='form-group'>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder='Roh@305' name='confirmPassword' value={formData.confirmPassword} onChange={handleInputChange}/>
            {errors.confirmPassword && <p className='error-msg'>{errors.confirmPassword}</p>}
        </div>
        <div className='form-group'>
            <label htmlFor="gender">Select Gender</label>
            <select id="gender" name='gender' value={formData.gender} onChange={handleInputChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            {errors.gender && <p className='error-msg'>{errors.gender}</p>}
        </div>
        <div className='form-group-checkbox'>
            <label> <input type="checkbox" name='termsAndCond' checked={formData.termsAndCond} onChange={handleInputChange}/>Accept Terms And Condition</label>
            {errors.termsAndCond && <p className='error-msg'>{errors.termsAndCond}</p>}
        </div>
        <button type='submit'>Sign up</button>
    </form>
  )
}

export default Signup