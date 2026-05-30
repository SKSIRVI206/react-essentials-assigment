import React, { useState } from 'react'
import CardButton from './CardButton'
import { Sun ,Moon} from 'lucide-react';

function ToogleTheme() {
    const [isdark,setIsDark] = useState(false);
    const handleTheme=()=>{
        setIsDark(prev=>!prev)
        if(!isdark){
            document.body.classList.add("dark-mode");
        }
        else{
            document.body.classList.remove('dark-mode');
        }

    }
  return (
    <div className='toogle-theme'>
        <CardButton ButtonClick={handleTheme} className='toogle-btn'>
            {isdark ? (
                <div>
                    <Sun size={18} color='#facc15'/>
                    <span>Light Mode</span>
                </div>
            ):(
                <div>
                    <Moon size={18} color='#60a5fa'/>
                    <span>Dark Mode</span>
                </div>
            )}
        </CardButton>
    </div>
  )
}

export default ToogleTheme