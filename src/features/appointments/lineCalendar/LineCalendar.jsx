import React, { Fragment, useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import classes from "../../../css/LineCalendar.module.css";

export function LineCalendar({ setPredicate, date, showAllAppointments }) {
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
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const monthName = monthNames[month];
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const halfOfMonth = Math.floor(days.length / 2);

  function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
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
        const nextDate = new Date(year, month, day + 1);
        const dateName = dayNames[thisDate.getDay()];

        const dayButton = (
          <div className={classes.dayContainer} key={day * 100}>
            <div>{dateName}</div>
            <button
              key={day}
              onClick={() => {
                setPredicate("startDate", thisDate);
                if (showAllAppointments) {
                  setPredicate("startDate", thisDate);
                  setPredicate("endDate", null);
                } else {
                  setPredicate("startDate", thisDate);
                  setPredicate("endDate", nextDate);
                }
              }}
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
                  <div className={classes.calendarChangeDateIcons}>
                    <Popup
                      trigger={
                        <Icon
                          name="angle double left"
                          onClick={() => setYear(year - 1)}
                        />
                      }
                      content="previous year"
                      position="top center"
                    />
                  </div>
                  <div className={classes.calendarChangeDateIcons}>
                    <Popup
                      trigger={
                        <Icon
                          name="angle left"
                          onClick={() => changeMonth("prev")}
                        />
                      }
                      content="previous month"
                      position="top center"
                    />
                  </div>
                  <div className={classes.calendarChangeDateIcons}>
                    <Popup
                      trigger={
                        <Icon name="angle right" onClick={changeMonth} />
                      }
                      content="next month"
                      position="top center"
                    />
                  </div>
                  <div className={classes.calendarChangeDateIcons}>
                    <Popup
                      trigger={
                        <Icon
                          name="angle double right"
                          onClick={() => setYear(year + 1)}
                        />
                      }
                      content="next year"
                      position="top center"
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
