import React, { useState, useEffect } from 'react';

function BudgetTracker({ expenses }) {
  const [budget, setBudget] = useState(20000);
  const [showAlert, setShowAlert] = useState(false);

  const totalSpent = expenses.reduce((sum, item) => {
    const amount = Number(item.amount) || 0;
    return sum + amount;
  }, 0);

  const remaining = budget - totalSpent;

  useEffect(() => {
    setShowAlert(totalSpent > budget);
  }, [totalSpent, budget]);

  const formatCurrency = (value) =>
    value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    });

  return (
    <div className="budget-tracker">
      <h3>💰 <strong>Budget Overview</strong></h3>

      <div style={{ marginBottom: '10px' }}>
        <label><strong>Monthly Budget:</strong></label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          min="0"
          style={{ marginLeft: '10px', padding: '5px', width: '150px' }}
        />
      </div>

      <div>
        <p><strong>Total Spent:</strong> {formatCurrency(totalSpent)}</p>
        <p><strong>Remaining:</strong> {formatCurrency(remaining >= 0 ? remaining : 0)}</p>
      </div>

      {showAlert && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ⚠ You’ve exceeded your budget!
        </p>
      )}
    </div>
  );
}

export default BudgetTracker;

