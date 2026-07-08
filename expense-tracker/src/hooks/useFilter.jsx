import React, { useMemo } from 'react'
import { useState } from 'react'

function useFilter(expenses) {
  const [filters, setFilters] = useState({
    title:'',
    category:'',
    sortBy:'date-desc',
    startDate:'',
    endDate:''
  });

  const updateFilter =(key, value)=>{
    setFilters({
        ...filters,
        [key]:value
    });
  }

  const filteredExpenses = useMemo(()=>{
    const tempFilteredExpenses = expenses.filter(expense =>{
        if(filters.category && filters.category !== 'all' && expense.category !== filters.category){
            return false
        }
        if(filters.title && !expense.title.toLowerCase().includes(filters.title.toLowerCase())){
            return false
        }
        if (filters.startDate && expense.date < filters.startDate) {
            return false;
        }
        if (filters.endDate && expense.date > filters.endDate){
          return false;
        }
        return true
    })

    const sortedExpenses = [...tempFilteredExpenses].sort((a, b)=>{
      if(filters.sortBy ==='amount-desc'){
        return b.amount - a.amount;
      }
      if(filters.sortBy === 'amount-asc'){
        return a.amount - b.amount;
      }
      if(filters.sortBy === 'date-desc'){
        return new Date(b.date) - new Date(a.date);
      }
      if(filters.sortBy === 'date-asc'){
        return new Date(a.date) - new Date(b.date);
      }
      if(filters.sortBy === 'category-asc'){
        return a.category.localeCompare(b.category);
      }
      if(filters.sortBy === 'category-des'){
        return b.category.localeCompare(a.category);
      }
      return 0;
    })

    return sortedExpenses
  },[expenses, filters])

  return [filters, updateFilter, filteredExpenses]
}

export default useFilter
