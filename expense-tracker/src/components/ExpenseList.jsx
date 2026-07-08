import React from 'react'

function ExpenseList({expenses, totalAmount,handleDeleteExpense}) {
  return (
    <div className='expense-list'>
        {
          expenses.length === 0 ? (
            <div className='no-expense'>
              <h2>No Expense Yet.</h2>
              <p>Please Add Expense</p>
            </div>
          ):(
            <div>
              <div className='expense-grid'>
                {expenses.map(expense =>(
                <div className='expense-data' key={expense.id}>
                  <div className='expense-meta'>
                    <h3>{expense.title.charAt(0).toUpperCase()+expense.title.slice(1)}</h3>
                    <h3>Rs. {expense.amount}</h3>
                    
                  </div>
                  <div className='expense-meta'>
                    <p className='expense-category'>{expense.category.charAt(0).toUpperCase()+expense.category.slice(1)}</p>
                    <p className='expense-date'>{expense.date}</p>
                  </div>
                  <div>
                    <button onClick={()=>handleDeleteExpense(expense.id)} className='delete-btn'>Delete</button>
                  </div>
                </div>
                ))}
              </div>
              <div className='total-section'>
                <h3>Total Expenses</h3>
                <div className='total-amount'>Rs {totalAmount.toFixed(2)}</div>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default ExpenseList
