import React from 'react'
import { profileData } from './profileData'
import './PortfolioCard.css'
import ToogleTheme from './ToogleTheme'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
function PortfolioCard() {
  return (
    <div className='portfolio-card'>
        <ToogleTheme/>
        <div className='card-content'>
            <CardHeader {...profileData}/>
            <CardBody {...profileData}/>
            <CardFooter />
        </div>
    </div>
  )
}

export default PortfolioCard