import { format } from "date-fns";
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

export default function RangeChart({
  appointmentsDates,
  days,
  expensesDates,
  firstDate,
}) {
  const data = [];

  for (let i = 0; i < days.length; i++) {
    let result = new Date(firstDate);
    result.setDate(result.getDate() + i);
    const filteredAppointments = appointmentsDates.filter(
      (appointment) => appointment.getTime() === result.getTime()
    );
    const filteredExpenses = expensesDates.filter(
      (expense) => expense.getTime() === result.getTime()
    );
    data.push({
      name: format(result, "MMM d"),
      appointments: filteredAppointments.length,
      expenses: filteredExpenses.length,
    });
  }

  return (
    <ResponsiveContainer width={"100%"} height={300}>
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
