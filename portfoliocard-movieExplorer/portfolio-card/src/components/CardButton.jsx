import React from 'react'

function CardButton({children,ButtonClick,className}) {
  return (
    <button onClick={ButtonClick} className={className}>{children}</button>
  )
}

export default CardButton