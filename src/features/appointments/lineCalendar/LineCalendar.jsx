import React, { Fragment } from "react";
import classes from "./LineCalendar.module.css";

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

var dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

export function LineCalendar({ onNewDate, date }) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthName = monthNames[month];

  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const halfOfMonth = Math.floor(days.length / 2);

  return (
    <div className={classes.container}>
      {days.map((day) => {
        const thisDate = new Date(year, month, day);
        const dateName = dayNames[thisDate.getDay()];

        const dayButton = (
          <div className={classes.dayContainer}>
            {dateName}
            <button
              key={day}
              onClick={() => onNewDate(thisDate)}
              className={
                day === date.getDate()
                  ? `${classes.day} ${classes.selectedDay}`
                  : `${classes.day}`
              }
            >
              {day}
            </button>
          </div>
        );

        if (day === halfOfMonth) {
          return (
            <Fragment key={day}>
              {dayButton}
              <button onClick={() => alert("choose another month or year")}>
                {monthName} {year}
              </button>
            </Fragment>
          );
        }

        return dayButton;
      })}
    </div>
  );
}
