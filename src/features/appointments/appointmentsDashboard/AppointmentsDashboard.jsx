import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";

export default function AppointmentsDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [text, setText] = useState("");
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["endDate", new Date()],
    ])
  );
  const date = predicate.get("startDate");

  const textLowered = text.trim().toLowerCase();
  const filteredAppointments =
    text === ""
      ? appointments
      : appointments.filter((appointment) =>
          handleFilter(appointment, textLowered)
        );
  const groupedAppointments = groupedObj(filteredAppointments, "date");

  function handleFilter(appointment, text) {
    const keys = Object.keys(appointment).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = appointment[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(predicate),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch, predicate],
  });

  function groupedObj(objArray, property) {
    return objArray.reduce((prev, cur) => {
      if (!prev[cur[property]]) {
        prev[cur[property]] = [];
      }
      prev[cur[property]].push(cur);

      return prev;
    }, {});
  }

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav
              setText={setText}
              setShowAllAppointments={setShowAllAppointments}
            />
            <div style={{ marginTop: 40 }}>
              <LineCalendar
                showAllAppointments={showAllAppointments}
                date={date}
                setPredicate={handleSetPredicate}
              />
            </div>
            {loading && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            {Object.entries(groupedAppointments).map((appointment) => (
              <AppointmentsList
                key={appointment[0]}
                text={text}
                loading={loading}
                date={appointment[0]}
                appointments={appointment[1]}
              />
            ))}
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
