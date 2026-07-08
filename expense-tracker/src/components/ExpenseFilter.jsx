import React from 'react'

function ExpenseFilter({ categories, filters, updateFilter }) {
  return (
    <div>
      <div className='expense-filters'>
        <div className='form-group'>
          <label>Filter By Category:</label>
          <select
            value={filters.category}
            onChange={(e)=>updateFilter('category', e.target.value)}>
            {categories.map(cat=>(
              <option value={cat} key={cat}>{cat.charAt(0).toUpperCase()+cat.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Search Title:</label>
          <input 
            type="text"
            value={filters.title}
            onChange={(e)=>updateFilter('title', e.target.value)} />
        </div>
        <div className='form-group'>
          <label>Sort By:</label>
          <select
            value={filters.sortBy} 
            onChange={(e)=>updateFilter('sortBy', e.target.value)}>
              <option value="date-desc">Date: Newest First</option>
              <option value="date-asc">Date: Oldest First</option>
              <option value="amount-desc">Amount: High to Low</option>
              <option value="amount-asc">Amount: Low to High</option>
              <option value="category-asc">Category: A to Z</option>
              <option value="category-des">Category: Z to A</option>
            </select>
        </div>
      </div>
      <div className='expense-filters'>
        <div className='form-group'>
          <label>From Date:</label>
          <input 
            type="date"
            value={filters.startDate}
            onChange={(e)=>updateFilter('startDate', e.target.value)}/>
        </div>
        <div className='form-group'>
          <label>To Date:</label>
          <input 
            type="date"
            value={filters.endDate}
            onChange={(e)=>updateFilter('endDate', e.target.value)}/>
        </div>
      </div>
    </div>
  )
}

export default ExpenseFilter
