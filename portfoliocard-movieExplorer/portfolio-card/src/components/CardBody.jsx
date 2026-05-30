import React from 'react'

function CardBody({bio,skills}) {
  return (
    <div className='card-body'>
        <h3>Skills</h3>
        <p>{bio}</p>
        <div className='skills-badge'>{skills.map(skill=><span key={skill.id} style={{backgroundColor:skill.color}}>{skill.name}</span>)}</div>
    </div>
  )
}

export default CardBody