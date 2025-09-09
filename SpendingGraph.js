import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const categoryColors = {
  Food: '#ff6b6b',
  Travel: '#4dabf7',
  Bills: '#ffa94d',
  Entertainment: '#b197fc',
  Shopping: '#00b894',
  Healthcare: '#fd79a8',
  Other: '#dfe6e9'
};

function SpendingGraph({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((key) => ({
    category: key,
    amount: categoryTotals[key],
  }));

  return (
    <div style={{ height: 300, marginTop: 20 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={categoryColors[entry.category] || '#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingGraph;
