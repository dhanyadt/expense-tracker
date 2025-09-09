import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


const groupExpenses = (expenses, keyFunction) => {
  const grouped = {};
  expenses.forEach((expense) => {
    const key = keyFunction(new Date(expense.date));
    grouped[key] = (grouped[key] || 0) + Number(expense.amount);
  });

  return Object.entries(grouped).map(([key, amount]) => ({ date: key, amount }));
};

const ExpenseTrends = ({ expenses }) => {
  // Grouping functions
  const groupByDay = (date) => date.toISOString().split('T')[0];
  
  const groupByWeek = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
    return start.toISOString().split('T')[0];
  };
  
  const groupByMonth = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

  const dailyData = groupExpenses(expenses, groupByDay);
  const weeklyData = groupExpenses(expenses, groupByWeek);
  const monthlyData = groupExpenses(expenses, groupByMonth);

  const renderChart = (data, title) => (
    <div style={{ marginBottom: '2rem' }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div>
      {renderChart(dailyData, "Daily Expense Trend")}
      {renderChart(weeklyData, "Weekly Expense Trend")}
      {renderChart(monthlyData, "Monthly Expense Trend")}
    </div>
  );
};

export default ExpenseTrends;