import React, { useState } from "react";
// import './App.css';
import classes from "../../../css/Dashboard.module.css";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";
import { Icon } from "semantic-ui-react";

export default function Chart() {
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
  const data = [];
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const monthName = monthNames[month];
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const appDates = [
    150,
    200,
    300,
    19,
    34,
    65,
    78,
    99,
    100,
    10,
    500,
    430,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];

  for(let i = 0; i < days.length ; i++){
    // debugger
    if(appDates[i] === undefined){
      appDates[i] = 0
    }
    data.push({ x: i, y: appDates[i] })
  }

  // appDates.map((date) => {

  //   data.push({ x: x++, y: date })
  // });

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
    <>
    <XYPlot height={300} width={300}>
      <VerticalBarSeries data={data} />
      <XAxis />
      <YAxis />
    </XYPlot>
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
                      name='angle double left'
                      onClick={() => setYear(year - 1)}
                    />
                  </div>
                  <div className={classes.prevMonth}>
                    <Icon
                      name='angle left'
                      onClick={() => changeMonth("prev")}
                    />
                  </div>
                  <div className={classes.nextMonth}>
                    <Icon name='angle right'  onClick={changeMonth}/>
                  </div>
                  <div className={classes.nextYear}>
                    <Icon
                      name='angle double right'
                      onClick={() => setYear(year + 1)}
                    />
                  </div>
                </div>
              </div>
    </>
  );
}
