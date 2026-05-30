import React, { useState } from 'react'
import CardButton from './CardButton'
import{ MoonStar,Mail, Heart} from 'lucide-react'
function CardFooter() {
    const[like,setLike] = useState(0)
    const handleLike=()=>{
        if(like==0){
            setLike(prev=>prev+1)
        }else{
            setLike(prev=>prev-1)
        }
    }
    const handleContact=()=>{
        alert('You Are Conected With US!')
    }
  return (
    <div className='card-footer'>
        <CardButton className='theme-toogle'><MoonStar/>Dark</CardButton>
        <CardButton className='nav-arrow'>&lt;</CardButton>
        <CardButton className='nav-arrow'>&gt;</CardButton>
        <CardButton className='page-indicator'>1/4</CardButton>
        <CardButton ButtonClick={handleLike} className='like-btn'><Heart/>{like}</CardButton>
        <CardButton ButtonClick={handleContact} className='contact-btn'><Mail/>Contact</CardButton>
    </div>
  )
}

export default CardFooter