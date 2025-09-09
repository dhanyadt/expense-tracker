import React from 'react';

const categoryIcons = {
  Food: '🍔',
  Travel: '✈️',
  Bills: '💡',
  Entertainment: '🎮',
  Other: '📝'
};

const categoryColors = {
  Food: '#ff6b6b',
  Travel: '#4dabf7',
  Bills: '#ffa94d',
  Entertainment: '#b197fc',
  Other: '#dee2e6'
};

function ExpenseList({ expenses, onEdit, onDelete, filterCategory = 'All', searchQuery = '' }) {
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ul className="expense-list">
      {filteredExpenses.map((expense, index) => {
        const isOverBudget = expense.amount > expense.budget;
        return (
          <li
            key={index}
            className="expense-item"
            style={{
              borderLeft: `6px solid ${categoryColors[expense.category]}`,
              backgroundColor: isOverBudget ? '#fdd' : '#fcefee'
            }}
          >
            <div>
              {categoryIcons[expense.category]} <strong>{expense.description}</strong>
              <small style={{ display: 'block', fontSize: '0.8rem', color: '#555' }}>
                {expense.category}
              </small>
            </div>
            <div className="expense-actions">
              <span>₹{expense.amount} {isOverBudget && <span style={{color: 'red'}}>(Over Budget)</span>}</span>
              <button className="edit-btn" onClick={() => onEdit(index)}>✏️</button>
              <button className="delete-btn" onClick={() => onDelete(index)}>🗑️</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default ExpenseList;



