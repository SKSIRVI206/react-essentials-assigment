import React, { useState } from 'react'
import useForm from '../hooks/useForm';

function ExpenseForm({handleAddExpense,categories}) {
    const {inputValue, handleInputChange,resetForm} = useForm({title:'', amount:'', category:'food'});  
    
    
    const addExpense = (e)=>{
        e.preventDefault();
        if(!inputValue.title.trim() || !inputValue.amount) return;
        const newExpense = {
          title:inputValue.title,
          amount:parseFloat(inputValue.amount),
          category:inputValue.category,
        }
        handleAddExpense(newExpense);
        resetForm();
    }
    
  return (
    <div className='expense-form'>
        <form onSubmit={addExpense}>
            <div className='form-group'>
              <label>Title</label>
              <input 
                type="text"
                name='title'
                value={inputValue.title}
                onChange={handleInputChange}
                placeholder='What did you spend  '/>
            </div>
            <div className='form-group'>
              <label>Amount</label>
              <input 
                type="Number"
                name='amount'
                placeholder='0.00'
                value={inputValue.amount}
                onChange={handleInputChange}
                step='0.01'/>
            </div>
            <div className='form-group'>
              <label>Category</label>
              <select
                name='category'
                value={inputValue.category}
                onChange={handleInputChange}>
                {categories.slice(1).map(cat=>(
                  <option 
                    key={cat}
                    value={cat}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <button className='add-expense' type='submit'>Add Expense</button>
            </div>
        </form>
    </div>
  )
}

export default ExpenseForm
