import React, { useActionState } from 'react'
import { useTaskContext, ACTIONS } from '../context/TaskContext'
import TaskItem from './TaskItem'
import { useState } from 'react'
import Model from './Model'
function TaskList() {
    const [isOpen,setIsOpen] = useState(false)
    const {state, dispatch} = useTaskContext()
    console.log(state)
    if(state.tasks.length == 0){
        return(
            <div className='empty-tasks'>
                <div>
                    <h2>No task yet</h2>
                    <p>Please add task</p>
                </div>
            </div>
        )
    }
  return (
    <div className='task-list'>
        <div className='task-status-bar'>
                <span>Total Tasks: {state.tasks.length}</span>
                <span>Completed: {state.tasks.filter(task => task.completed).length}</span>
                <span>Pending: {state.tasks.filter(task=>!task.completed).length}</span>
                <button className='clear-btn' onClick={()=>setIsOpen(true)}>Delete All</button>
                <Model isOpen={isOpen}>
                    <div className='model-heading'>Are you sure you delete all task</div>
                    <div className='model-btn'>
                        <button className='yes-btn' onClick={()=>{dispatch({type:ACTIONS.CLEAR_TASK});setIsOpen(false)}}>Yes</button>
                        <button className='no-btn' onClick={()=>setIsOpen(false)}>No</button>
                    </div>
                </Model>
        </div>
        <div className='tasks'>
        {state.tasks.map(task=>(
            <TaskItem key={task.id} task={task}/>
        ))}
    </div>
    </div>
  )
}

export default TaskList