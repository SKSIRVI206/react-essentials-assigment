import { useState, useEffect } from 'react';
import './App.css';
function App (){
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    phoneNumber:'',
    password:'',
    confirmPassword:'',
    gender:'',
    aggreeToTerm:false
  });
  const [errors,setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const handleChange =(e)=>{
    const {name,value,type,checked} = e.target;
    setFormData({
      ...formData,
      [name]:type === 'checkbox' ? checked : value
    })
  };
  const formValidate = ()=>{
    const newErrors ={};
    if(!formData.name.trim()){
      newErrors.name = 'Please enter your name';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!formData.email.trim()){
      newErrors.email = 'Please enter your email address.'
    }
    else if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., name@example.com).";
    }
    const phoneRegex = /^\d{10}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!formData.password.trim()){
      newErrors.password = 'Password is required'
    }
    else if (formData.password) {
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = "Password must be 8+ characters with at least one capital letter and one number.";
      }
    }
    if(!formData.confirmPassword.trim()){
      newErrors.confirmPassword = "Confirm Password is required"
    }
    else if (formData.confirmPassword && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords does not match.";
    }
    if(!formData.gender){
      newErrors.gender = 'Please select your gender'
    }
    if(!formData.aggreeToTerm){
      newErrors.aggreeToTerm = 'Please accept the terms and condition';
    }
    return newErrors;
  }
  useEffect(() => {
     const validationErrors = formValidate();
     if (Object.keys(validationErrors).length === 0) {
       setIsFormValid(true);
     } else {
       setIsFormValid(false);
     }
   }, [formData]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formErrors = formValidate();
    if(Object.keys(formErrors).length>0){
      setErrors(formErrors);
      return;
    }
    alert('Thank you for register with us');
    console.log(formData);
  }
  return(
    <div className='App'>
      <h1>user registration</h1>
      <p>welcome user please register here </p>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="name">name</label>
          <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Rahul Kumar'/>
          {errors.name && <span className='error-msg'>{errors.name}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="email">email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder='example@gmail.com'/>
          {errors.email && <span className='error-msg'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="phone-number">phone number</label>
          <input type="tel" name="phoneNumber" id="phone-number" value={formData.phoneNumber} onChange={handleChange} placeholder='8562312450'/>
          {errors.phoneNumber && <span className='error-msg'>{errors.phoneNumber}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password"  value={formData.password} onChange={handleChange} placeholder='Rohan@305' />
          {errors.password && <span className='error-msg'>{errors.password}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor="confirm-password">confirm password</label>
          <input type="password" name="confirmPassword" id="confirm-password" value={formData.confirmPassword} onChange={handleChange} placeholder='Rohan@305'/>
          {errors.confirmPassword && <span className='error-msg'>{errors.confirmPassword}</span>}
        </div>
        <div className='form-group'>
          <fieldset>
            <legend>Please select your gender</legend>
            <div className='radio-option'>
              <input type="radio" name="gender" id="male" value='male' checked={formData.gender==='male'} onChange={handleChange} />
              <label htmlFor="male">male</label>
            </div>
            <div className='radio-option'>
              <input type="radio" name="gender" id="female" value='female' checked={formData.gender==='female'} onChange={handleChange}/>
              <label htmlFor="female">female</label>
            </div>
          </fieldset>
          {errors.gender && <span className='error-msg'>{errors.gender}</span>}
        </div>
        <div className='form-group'>
          <label className='term-condi'> <input type="checkbox" name='aggreeToTerm' checked={formData.aggreeToTerm} onChange={handleChange} /> i agree to all terms & conditions</label>
          {errors.aggreeToTerm && <span className='error-msg'>{errors.aggreeToTerm}</span>}
        </div>
        <button type="submit" className='submit-btn' disabled={!isFormValid}>Register</button>
      </form>
    </div>
  )
}
export default App
