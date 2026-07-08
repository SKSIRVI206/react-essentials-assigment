import React, { useState } from 'react'
import useLocalStorage from './useLocalStorage';

function useExpense() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const handleAddExpense = (expenseData)=>{
    const newExpense = {
        id: Date.now(),
        ...expenseData,
        date:new Date().toISOString().split('T')[0]
    }
    setExpenses(prevExpense =>[...prevExpense,newExpense])
  }
  const totalAmount = expenses.reduce((total,expense)=>total+parseFloat(expense.amount), 0)

  const handleDeleteExpense =(id)=>{
    const removeExpense = expenses.filter(expense=>expense.id !== id);
    setExpenses(removeExpense);
  }

  return {
    expenses,
    handleAddExpense,
    totalAmount,
    handleDeleteExpense
  }
}

export default useExpense
