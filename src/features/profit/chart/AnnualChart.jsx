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
import { MONTH_NAMES } from "../../appointments/appointmentsConstants";

export default function AnnualChart({ appointmentsDates, expensesDates }) {
  const data = [];

  for (let i = 0; i < MONTH_NAMES.length; i++) {
    const filteredAppointments = appointmentsDates.filter(
      (appointment) =>
        appointment.getMonth() === MONTH_NAMES.indexOf(MONTH_NAMES[i])
    );
    const filteredExpenses = expensesDates.filter(
      (expense) => expense.getMonth() === MONTH_NAMES.indexOf(MONTH_NAMES[i])
    );
    data.push({
      name: MONTH_NAMES[i],
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
