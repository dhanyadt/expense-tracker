import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';

function ExpenseForm({ onAddExpense, editData }) {
  const todayDate = new Date().toISOString().split('T')[0]; 

  const [expense, setExpense] = useState(
    editData || { category: '', amount: '', description: '', date: todayDate }
  );
  const [budget, setBudget] = useState('');

  const categories = ['Food',  'Travel', 'Entertainment', 'Bills',   'Other'];

  useEffect(() => {
    if (editData) {
      setExpense(editData);
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      ...expense,
      budget: parseFloat(budget) || 0,
    };

    // Send email via EmailJS
    emailjs
      .send(
        'service_rkb21c6',       
        'template_q6qzrh4',      
        expenseData,             
        'XyHZD57fx_Fa4q2up'      
      )
      .then((response) => {
        console.log('Expense email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending expense email:', error);
      });

   
    onAddExpense(expenseData);

    setExpense({ category: '', amount: '', description: '', date: todayDate });
    setBudget('');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <h3>{editData ? 'Edit Expense' : 'Add Expense'}</h3>

      <div className="form-group">
        <label>Category:</label>
        <select name="category" value={expense.category} onChange={handleInputChange} required>
          <option value="" disabled>Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Amount (₹):</label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={expense.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Set Budget for Category (Optional):</label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Enter Budget"
        />
      </div>

      <button type="submit">{editData ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
}

export default ExpenseForm;