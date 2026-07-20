import React from 'react'
import { useSelector } from 'react-redux'
import { createPortal} from 'react-dom'
const Model = ({children}) => {
    const isOpen = useSelector(state => state.ui.isOpen);

    if(!isOpen) return null;

    return createPortal(
    <div className='model-overlay'>
        <div className='model-container'>{children}</div>
    </div>, document.body);
  
}

export default Model