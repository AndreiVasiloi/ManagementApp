import React from "react";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";

export default function Chart({ month, days }) {
  const data = [];
  const getAppointments = month.map((m) => m.date.getDate());

  for (let i = 0; i < days.length; i++) {
    const check = getAppointments.filter(
      (appointment) => appointment === days[i]
    );
    data.push({ x: days[i], y: check.length });
  }

  return (
    <>
      <XYPlot height={300} width={300}>
        <VerticalBarSeries data={data} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </>
  );
}
