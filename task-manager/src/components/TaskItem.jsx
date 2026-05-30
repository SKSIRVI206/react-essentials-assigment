import React, { useState } from 'react'
import { useTaskContext, ACTIONS } from '../context/TaskContext'

function TaskItem({task}) {
  const { dispatch } = useTaskContext()
  const [isEditing,setIsEditing] = useState(false)
  const [editData,setEditData] = useState({
    title:task.title,
    description:task.description,
    priority:task.priority
  })
  const handleEditSave = () =>{
    dispatch({
      type: ACTIONS.EDIT_TASK,
      payload: { id: task.id, ...editData }
    })
    setIsEditing(false)
  }
  const handleEditCancel = () =>{
    setEditData({
      title:task.title,
      description:task.description,
      priority:task.priority
    })
    setIsEditing(false)
  }
  const getPriorityColor = (priority) => {
    switch(priority){
      case 'low' : return "#db4703";
      case 'medium' : return "#d8d521";
      case "high" : return '#10b31e';
      default : return "#ddd";
    }
  }
  if (isEditing) {
    return(
      <div className='task-item editing'>
        <input 
          type="text"
          value={editData.title}
          onChange={(e)=>setEditData(prev=>({...prev, title: e.target.value}))} 
          placeholder='Task title...'/>

        <textarea
          value={editData.description}
          onChange={(e)=>setEditData(prev=>({...prev, description: e.target.value}))}
          placeholder='Task Description...'/>

        <select
          value={editData.priority}
          onChange={(e)=>setEditData(prev=>({...prev, priority: e.target.value}))}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className='edit-actions'>
          <button onClick={handleEditSave} className='save-btn'>save</button>
          <button onClick={handleEditCancel} className='cancel-btn'>Cancel</button>  
        </div>    
      </div>
    )
  }
  return (
    <div className={`task-item ${task.completed ?'completed':''}`}>
      <div className='task-content'>
        <div className='task-header'>
          <h3>{task.title}</h3>
          <span
            className='priority-badge'
            style={{backgroundColor: getPriorityColor(task.priority)}}
          >{task.priority}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}
        <div className='task-meta'>
          <small>CreatedAt: {new Date(task.createdAt).toLocaleDateString()}</small>
        </div>
       <div className='task-actions'>
          
          <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: task.id })} className='toggle-btn'>
            {task.completed ? "Completed" : "Pending"}
          </button>

          <button onClick={() => setIsEditing(true)} className='edit-btn'>Edit</button>

          
          <button onClick={() => dispatch({ type: ACTIONS.DELETE_TASK, payload: task.id })} className='delete-btn'>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem