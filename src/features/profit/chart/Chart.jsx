import React, { useEffect, useState } from "react";
// import './App.css';
import classes from "../../../css/Dashboard.module.css";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";
import { Icon } from "semantic-ui-react";
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { getAppointmentsNumberInMonth } from "../../../app/firestore/firestoreService";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentsMonth } from "../../appointments/appointmentsActions";

export default function Chart({month, year, setYear, setMonth, setFullDateFirstDay, firstDayInMonth}) {
  const dispatch = useDispatch();
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
  const monthName = monthNames[month];
  // const numberOfDays = getDaysInMonth(month + 1, year);
  // const days = getDaysAsArray(numberOfDays);
  // const firstDayInMonth = days[0];
  // const lastDayInMonth = days[days.length -1];
  // const firstDay = setFullDateFirstDay(new Date(year, month, firstDayInMonth));
  // const lastDay = setFullDateLastDay(new Date(year, month, lastDayInMonth));
  const { appointmentsMonth } = useSelector((state) => state.appointment);
  // const appDates = [];
  // const [fullDateFirstDay, setFullDateFirstDay] = useState(new Date(year, month, firstDayInMonth));
  // const [fullDateLastDay, setFullDateLastDay] = useState(new Date(year, month, lastDayInMonth));
  // const [predicate, setPredicate] = useState(
  //   new Map([["firstDay", fullDateFirstDay],['lastDay', fullDateLastDay]])
  // );

  // for(let i = 0; i < days.length ; i++){
  //   // debugger
  //   if(appDates[i] === undefined){
  //     appDates[i] = 0
  //   }
  //   data.push({ x: i, y: appDates[i] })
  // }

  // appDates.map((date) => {

  //   data.push({ x: x++, y: date })
  // });

  // function getDaysInMonth(month, year) {
  //   return new Date(year, month, 0).getDate();
  // }

  // function getDaysAsArray(lastDay) {
  //   let days = [];

  //   for (let i = 1; i <= lastDay; i++) {
  //     days.push(i);
  //   }

  //   return days;
  // }



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
    
    // setPredicate(new Map(predicate.set('firstDay', fullDateFirstDay)));
    // setPredicate(new Map(predicate.set('lastDay', fullDateLastDay)));
    
  }
    // setPredicate(new Map(predicate.set('firstDay', fullDateFirstDay)));
    // setPredicate(new Map(predicate.set('lastDay', fullDateLastDay)));
  // function getFirstAndLastDay(newYear ,newMonth){
  //   // const numberOfDays = getDaysInMonth(newMonth + 1, newYear);
  //   // const days = getDaysAsArray(numberOfDays);
  //   const firstDay = days[0];
  //   const lastDay = days[days.length -1];
  //   // setFullDateFirstDay(new Date(year, month, firstDay))
  //   // setFullDateLastDay(new Date(year, month, lastDay))
  //   const fullDateFirstDay = new Date(newYear, newMonth, firstDay);
  //   const fullDateLastDay = new Date(newYear, newMonth, lastDay);
  //   setPredicate(new Map(predicate.set('firstDay', fullDateFirstDay)));
  //   setPredicate(new Map(predicate.set('lastDay', fullDateLastDay)));
    
  // }

  // getFirstAndLastDay(year, month)

  // useFirestoreCollection({
  //   query: () => getAppointmentsNumberInMonth(fullDateFirstDay, fullDateLastDay),
  //   data: (appointmentsMonth) => dispatch(getAppointmentsMonth(appointmentsMonth)),
  //   deps: [dispatch, fullDateFirstDay, fullDateLastDay],
  // });
  // console.log(fullDateFirstDay)
  // console.log(fullDateLastDay)
  // console.log(predicate)
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
                      onClick={() => {
                        changeMonth("prev");
                        setFullDateFirstDay(new Date(year, month, firstDayInMonth - 1))
                        // setFullDateLastDay(new Date(year, month, lastDayInMonth));
                        // setPredicate(new Map(predicate.set('firstDay', fullDateFirstDay)));   
                        // setPredicate(new Map(predicate.set('lastDay', fullDateLastDay)));
                      }}
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
