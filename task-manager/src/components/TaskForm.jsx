import React, { useState } from 'react'
import { useTaskContext, ACTIONS } from '../context/TaskContext';
function TaskForm() {
  const { dispatch } = useTaskContext();
  const [formData,setFormData] = useState({
    title:'',
    description:'',
    priority: 'medium'
  });
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    // Define the new task object
    const newTask = {
      id: Date.now(), // Unique ID
      title:formData.title,
      description: formData.description,
      completed: false,
      priority: formData.priority,
      createdAt: new Date().toISOString()
    };

    // Dispatch the action
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: newTask
    });

    setFormData({
      title:'',
      description:'',
      priority: 'medium'
    })
  };
  return (
    <div className='task-form'>
      <form onSubmit={handleSubmit}>
        <h2>Add New Task</h2>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input 
            type="text" 
            name='title'
            value={formData.title} 
            id="title"
            placeholder='Enter Task Title Here....' 
            onChange={handleChange}
            required/>
        </div>
        <div className='form-group'>
          <label htmlFor="description">Description</label>
          <textarea 
            name="description" 
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter task description here... '
            rows={3}
            />
        </div>
        <div className='form-group'>
          <label htmlFor="priority">Priority</label>
          <select 
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
        </div>
        <div className='form-group'>
          <button type='submit' disabled={!formData.title.trim()} className='add-task-btn'>Add Task</button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm