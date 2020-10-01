import React from 'react';
import classes from './LineCalendar.module.css';

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDaysInMonth(month, year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
  return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
}

function getDaysAsArray(lastDay) {
  let days = [];

  for (let i = 1; i <= lastDay; i++) {
    days.push(i);
  }

  return days;
}

export function LineCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentMonthName = monthNames[currentMonth];

  const numberOfDays = getDaysInMonth(currentMonth + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const halfOfMonth = Math.floor(days.length / 2);

  return (
    <div className={classes.container}>
      {days.map((day) => {
        if (day === halfOfMonth) {
          return (
            <>
              <button className={classes.day}>{day}</button>
              <div>
                {currentMonthName} {year}
              </div>
            </>
          );
        }

        return <button className={classes.day}>{day}</button>;
      })}
    </div>
  );
}
