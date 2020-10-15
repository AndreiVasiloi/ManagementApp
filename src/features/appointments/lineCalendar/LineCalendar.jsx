import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import classes from "../../../css/LineCalendar.module.css";
import { setEndDate, setStartDate } from "../appointmentsActions";

export function LineCalendar({ onNewDate, date, showAllAppointments }) {
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

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const dispatch = useDispatch();
  const { startDate } = useSelector((state) => state.appointment);
  const [year, setYear] = useState(startDate.getFullYear());
  const [month, setMonth] = useState(startDate.getMonth());
  const monthName = monthNames[month];
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const halfOfMonth = Math.floor(days.length / 2);

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

  function changeMonth(newMonth) {
    if (newMonth === "prev") {
      if (month === 0) {
        setYear(year - 1);
        setMonth(11);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    }
  }

  return (
    <div className={classes.container}>
      {days.map((day) => {
        const thisDate = new Date(year, month, day);
        const nextDate = new Date(year, month, day + 1)
        const dateName = dayNames[thisDate.getDay()];

        const dayButton = (
          <div className={classes.dayContainer} key={day * 100}>
            <div>{dateName}</div>
            <button
              key={day}
              onClick={() => {
                if(showAllAppointments) {
                  dispatch(setStartDate(thisDate))
                  dispatch(setEndDate(null))
                }else {
                  dispatch(setStartDate(thisDate))
                  dispatch(setEndDate(nextDate))
                }
               
              }}
              className={
                day === startDate.getDate()
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
              <div className={classes.displayYearAndMonthContainer}>
                <div className={classes.yearAndMonth}>
                  <div className={classes.monthText}>
                    <p>{monthName}</p>
                  </div>
                  <div className={classes.yearText}>
                    <p>{year}</p>
                  </div>
                </div>
                <div className={classes.changeDateContainer}>
                  <div className={classes.prevYear}>
                    <Icon
                      name="angle double left"
                      onClick={() => setYear(year - 1)}
                    />
                  </div>
                  <div className={classes.prevMonth}>
                    <Icon
                      name="angle left"
                      onClick={() => changeMonth("prev")}
                    />
                  </div>
                  <div className={classes.nextMonth}>
                    <Icon name="angle right" onClick={changeMonth} />
                  </div>
                  <div className={classes.nextYear}>
                    <Icon
                      name="angle double right"
                      onClick={() => setYear(year + 1)}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          );
        }

        return dayButton;
      })}
    </div>
  );
}
