import React, { useState } from 'react'
import {Moon,Sun} from 'lucide-react'
import Button from './Button';
function ToogleTheme() {
  const [isDark,setIsDark] = useState(false);
  const handleTheme=()=>{
    setIsDark(prev=>!prev)
    if(!isDark){
      document.body.classList.add('dark-mode');
    }else{
      document.body.classList.remove('dark-mode')
    }
  }
  return (
    <div className='toogle-theme'>
      <Button onClick={handleTheme} className='theme-btn'>
        {isDark ? (
          <div className='toogle-btn'>
            <Sun size={15} color='yellow'/>
            <span>Light Mode</span>
          </div>
        ):(
          <div className='toogle-btn'>
            <Moon size={15} color='black'/>
            <span>Dark Mode</span>
          </div>
        )}
      </Button>
    </div>
  )
}

export default ToogleTheme