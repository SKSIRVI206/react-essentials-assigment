import React from 'react'
import {createPortal} from 'react-dom'
function Model({children,isOpen}) {
    if(!isOpen) return null
  return (
    <div style={{position:'fixed',
        top:0,left:0,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        zIndex:'1000',
        height:'100vh',
        width:'100vw',
        backgroundColor:'rgba(0,0,0,0.5)'}}>
      <div style={{
        backgroundColor:'white',
        padding:'10px',
        borderRadius:'10px'
      }}>{children}</div>
    </div>
  )
}

export default Model
