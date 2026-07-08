import React, { useMemo, useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import useExpense from './hooks/useExpense';
import ExpenseFilter from './components/ExpenseFilter';
import useFilter from './hooks/useFilter';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer,Legend } from 'recharts';
function App() {
  const {expenses, handleAddExpense, totalAmount, handleDeleteExpense} = useExpense();
  const categories = ['all','food','bills','movie', 'rent', 'transport', 'insurance', 'electricity'];
  const [filters, updateFilter, filteredExpenses] = useFilter(expenses);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];
  const monthlySummary = useMemo(()=>{
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentMonthExpenses = expenses.filter(expense =>{
      const expenseDate = new Date(expense.date);
      return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === currentMonth;
    });
    const totalMonthExpense = currentMonthExpenses.reduce((sum, expense)=>sum + parseFloat(expense.amount),0);
    return {
      totalMonthExpense:totalMonthExpense,
      transactionCount:currentMonthExpenses.length
    };
  },[expenses]);
  const chartData = useMemo(()=>{
    const categoryTotals = {};
    filteredExpenses.forEach(expense =>{
      if(categoryTotals[expense.category]){
        categoryTotals[expense.category] += Number(expense.amount);
      }else{
        categoryTotals[expense.category] = Number(expense.amount);
      }
    });

    return Object.keys(categoryTotals).map(cat =>({
      name:cat.toUpperCase(),
      value: categoryTotals[cat],
    }))
  },[filteredExpenses]);
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Expense Tracker</h1>
        <p>Here you manage your expenses</p>
      </header>
      <main className='App-main'>
        <div className='monthly-summary-card'>
          <h3>Monthly Summary</h3>
          <p>Total Spent: <strong>Rs. {monthlySummary.totalMonthExpense}</strong></p>
          <p>Total Transactions: <strong>{monthlySummary.transactionCount}</strong></p>
        </div>
        <ExpenseForm handleAddExpense={handleAddExpense} categories={categories}/>
        <ExpenseFilter categories={categories} filters={filters} updateFilter={updateFilter}/>
        <ExpenseList expenses={filteredExpenses} totalAmount={totalAmount} handleDeleteExpense={handleDeleteExpense}/>
        {chartData.length > 0 && (
          <div className="chart-container" style={{ 
            width: '100%', 
            maxWidth: '400px', 
            margin: '20px auto', 
            background: '#f9f9f9', 
            padding: '15px', 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Category Breakdown 📊</h3>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} 
                  >
                    
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} /> 
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
