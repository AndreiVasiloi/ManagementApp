import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyChart({ appointmentsDates, expensesDates, days}) {
  const data = [];
  for (let i = 0; i < days.length; i++) {
    const filteredAppointments = appointmentsDates.filter(
      (appointment) =>
        appointment.getDate() === days[i]
    );
    const filteredExpenses = expensesDates.filter(
      (expense) =>
      expense.getMonth() === days[i]
    );
    data.push({
      name: days[i],
      appointments: filteredAppointments.length,
      expenses: filteredExpenses.length
    });
  }

  return (
    <ResponsiveContainer width={'100%'} height={300}>
    <LineChart
    width={730}
    height={250}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
    <Line type="monotone" dataKey="expenses" stroke="#af2d2d" />
  </LineChart>
    </ResponsiveContainer>

  );
}
