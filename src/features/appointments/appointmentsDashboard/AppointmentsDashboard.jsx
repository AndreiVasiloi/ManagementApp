import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { Calendar } from "react-calendar";
import AppointmentsCalendar from "../calendar/AppointmentsCalendar";

export default function AppointmentsDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(
    new Map([["startDate", new Date()]])
  );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(predicate),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch, predicate ],
  });

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav />
            {/* <AppointmentsCalendar setPredicate={handleSetPredicate} predicate={predicate} /> */}
            <Calendar
              onChange={(date) => handleSetPredicate("startDate", date)}
              value={predicate.get("startDate") || new Date()}
              tileDisabled={() => loading}
            />
            <AppointmentsList appointments={appointments} />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
