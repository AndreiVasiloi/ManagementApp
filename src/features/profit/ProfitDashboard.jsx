import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Icon, Segment } from "semantic-ui-react";
import {
  listenToAppointmentsFromFirestore,
  listenToReasonsFromFirestore,
} from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import classes from "../../css/Dashboard.module.css";
import { listenToAppointments } from "../appointments/appointmentsActions";
import { listenToReasons } from "../appointments/reasonsActions";
import ProfitList from "./ProfitList";
import lodash from "lodash";
import { Calendar } from "react-calendar";
import Chart from "./chart/Chart";

export default function ProfitDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { reasons } = useSelector((state) => state.reason);
  const dispatch = useDispatch();
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const numberOfDays = getDaysInMonth(month + 1, year);
  const days = getDaysAsArray(numberOfDays);
  const firstDayInMonth = days[0];
  const lastDayInMonth = days[days.length - 1];
  const [fullDateFirstDay, setFullDateFirstDay] = useState(
    new Date(year, month, firstDayInMonth)
  );
  const [fullDateLastDay, setFullDateLastDay] = useState(
    new Date(year, month, lastDayInMonth)
  );
  const [predicate, setPredicate] = useState(
    new Map([
      ["firstDay", fullDateFirstDay],
      ["lastDay", fullDateLastDay],
    ])
  );

  const addAppointmentPrice = appointments.map((appointment) => ({
    ...appointment,
    price: getPrice(appointment.reason),
  }));
  const getAllPrices = addAppointmentPrice.map((app) => app.price);
  const totalPrices = getTotalPrices();
  const sortAppointments = appointments.map((app) => app);
  const groupedAppointments = groupedObj(appointments, "date");
  var objKeys = Object.keys(groupedAppointments);

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

  function group(arr) {
    if (arr !== undefined && arr.length > 0) {
      return arr.reduce((r, o) => {
        var date = new Date(o);
        console.log(date);
        var p = date.date.split(" "); // get the parts: year, month and day
        var week = Math.floor(p.pop() / 7) + 1; // calculate the week number (Math.floor(day / 7) + 1) and remove day from the parts array (p.pop())
        var month = p.reduce((date, p) => (date[p] = date[p] || {}), r); // get the month object (first, get the year object (if not create one), then get the month object (if not create one)
        if (month[week]) month[week].push(date);
        // if there is an array for this week in the month object, then push this object o into that array
        else month[week] = [date]; // otherwise create a new array for this week that initially contains the object o
        return r;
      });
    }
  }

  function sortFunction(a, b) {
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;
  }

  function groupedObj(objArray, property) {
    return objArray.reduce((prev, cur) => {
      if (!prev[cur[property]]) {
        prev[cur[property]] = [];
      }
      prev[cur[property]].push(cur);

      return prev;
    }, {});
  }

  function getTotalPrices() {
    if (getAllPrices.length > 0) {
      return getAllPrices.reduce(addAppointmentsPrices);
    }
  }

  function getPrice(reasontype) {
    const reason = reasons.find((reason) => reason.text === reasontype);
    if (reason !== undefined) {
      return reason.price;
    }
  }

  function addAppointmentsPrices(total, price) {
    return total + price;
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  // useFirestoreCollection({
  //   query: () => listenToAppointmentsFromFirestore(predicate),
  //   data: (appointments) => dispatch(listenToAppointments(appointments)),
  //   deps: [dispatch],
  // });

  // useFirestoreCollection({
  //   query: () => listenToReasonsFromFirestore(),
  //   data: (reasons) => dispatch(listenToReasons(reasons)),
  //   deps: [dispatch],
  // });
console.log(fullDateFirstDay)
  return (
    <>
      <div className={classes.dashboardContainer}>
        <Segment>
          <Grid>
            <Grid.Column width={16}>
              <button
                onClick={() =>
                  handleSetPredicate("startDate", new Date(2019, 3, 22))
                }
              >
                click
              </button>
              {/* <ProfitList appointments={appointments} reasons={reasons}/> */}
              <Chart
                year={year}
                month={month}
                setYear={setYear}
                setMonth={setMonth}
                setFullDateFirstDay={setFullDateFirstDay}
                firstDayInMonth={firstDayInMonth}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
}
