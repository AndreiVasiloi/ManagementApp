import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";

export default function AppointmentsDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(
    new Map([["startDate", new Date()]])
  );
  const date = predicate.get("startDate");
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const filteredAppointments =
    text === ""
      ? appointments
      : appointments.filter((appointment) =>
          handleFilter(appointment, textLowered)
        );

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  function handleFilter(appointment, text) {
    const keys = Object.keys(appointment).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = appointment[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(predicate),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch, predicate],
  });

  return (
    <>
      <div className={classes.dashboardContainer}>
          <Grid>
            <Grid.Column width={16}>
              <AppointmentsNav setText={setText} />
              <div style={{ marginTop: 40 }}>
                <LineCalendar
                  date={date}
                  onNewDate={(date) => handleSetPredicate("startDate", date)}
                />
              </div>
              <AppointmentsList
                appointments={filteredAppointments}
              />
            </Grid.Column>
          </Grid>
      </div>
    </>
  );
}
