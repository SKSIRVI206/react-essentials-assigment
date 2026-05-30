import React from 'react'
import CardButton from './CardButton'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { profileData } from './profileData'
function CardHeader({name,title,photos}) {
    const [profileIndex,setProfileIndex] = useState(0);
    const handleProfileChange = () => {
    setProfileIndex((prev) => {
        if (prev === profileData.photos.length-1) {
            return 0;
        } 
        return prev + 1;
    });
};
  return (
    <div className='card-header'>
        <div>
            <img src={photos[profileIndex]} alt="profile-image"  className='profile-img' />
            <CardButton className='profile-btn' ButtonClick={handleProfileChange} ><Camera /></CardButton>
        </div>
        <div className='header-content'>
            <h1>{name}</h1>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default CardHeader