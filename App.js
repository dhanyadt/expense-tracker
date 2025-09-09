import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Chart from './components/Chart';
import Login from './components/Login';
import BudgetTracker from './components/BudgetTracker';
import ExpenseTrends from './components/ExpenseTrends';
import SpendingGraph from './components/SpendingGraph';

import emailjs from 'emailjs-com'; 
import { isSameDay, isSameWeek, isSameMonth, parseISO } from 'date-fns';

import './style.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('All');


  const addExpense = (expense) => {
    if (editIndex !== null) {
      const updated = [...expenses];
      updated[editIndex] = expense;
      setExpenses(updated);
      setEditIndex(null);
      setEditingExpense(null);
    } else {
      setExpenses([expense, ...expenses]);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditingExpense(expenses[index]);
  };

  const handleDelete = (index) => {
    const updated = expenses.filter((_, i) => i !== index);
    setExpenses(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setEditingExpense(null);
    }
  };

  const handleLogin = (name) => {
    setUsername(name);

    // Send email after successful login
    emailjs.send(
      'service_rkb21c6',     
      'template_q6qzrh4',    
      { user_name: name },   
      'XyHZD57fx_Fa4q2up'         
    )
    .then((response) => {
      console.log('Login email sent successfully:', response);
    })
    .catch((error) => {
      console.error('Error sending login email:', error);
    });
  };

  const calculateSummary = () => {
    let total = 0;
    const categoryTotals = expenses.reduce((acc, expense) => {
      total += Number(expense.amount);
      acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});

    const categoryBudgets = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.budget;
      return acc;
    }, {});

    return { total, categoryTotals, categoryBudgets };
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = parseISO(expense.date); 
    const today = new Date();
  
    let timeMatch = true;
    if (timeFilter === 'Daily') {
      timeMatch = isSameDay(expenseDate, today);
    } else if (timeFilter === 'Weekly') {
      timeMatch = isSameWeek(expenseDate, today);
    } else if (timeFilter === 'Monthly') {
      timeMatch = isSameMonth(expenseDate, today);
    }
  
    return (
      timeMatch &&
      (!filterCategory || expense.category === filterCategory) &&
      (!searchQuery || expense.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
  const { total, categoryTotals, categoryBudgets } = calculateSummary();

  return (
    <div className="container">
      {!username ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <header>
            <h1>💸ExpenseWise</h1>
            <h2>Track Smart. Spend Smarter.</h2>
            <h3><center>Welcome, {username}!</center></h3>
            <p><center>Your personalized expense tracker</center></p>
          </header>

          <section>
            <ExpenseForm onAddExpense={addExpense} editData={editingExpense} />
          </section>

          <section>
            <h2>View Expenses</h2>
            <div className="filters" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
  <option value="All">All</option>
  <option value="Daily">Today</option>
  <option value="Weekly">This Week</option>
  <option value="Monthly">This Month</option>
</select>


              <input
                type="text"
                placeholder="Search description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>

          <section>
            <h2>Spending Breakdown</h2>
            <Chart expenses={filteredExpenses} />
          </section>
          <section>
  <h2>Spending Overview</h2>
  <SpendingGraph expenses={expenses} />
</section>

          
          <section>
  <h2>Expense Trends</h2>
  <ExpenseTrends expenses={expenses} />
</section>

          <section>
            <h2>Summary Report</h2>
            <div>Total Expenses: ₹{total.toFixed(2)}</div>
          </section>

          <section>
            <h2>Budget Tracker</h2>
            <BudgetTracker expenses={expenses} />
          </section>
        </>
      )}
    </div>
  );
}

export default App;