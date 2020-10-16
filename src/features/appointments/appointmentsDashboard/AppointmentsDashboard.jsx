import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Icon, Popup } from "semantic-ui-react";
import {
  fetchAppointments,
  listenToAppointments,
} from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";
import { RETAIN_STATE } from "../appointmentsConstants";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";

export default function AppointmentsDashboard() {
  // const limit = 5;
  // const {
  //   appointments,
  //   moreAppointments,
  //   lastVisible,
  //   retainState,
  //   startDate,
  //   endDate
  // } = useSelector((state) => state.appointment);
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  // const [loadingInitial, setLoadingInitial] = useState(false);
  const [text, setText] = useState("");
  const groupedAppointments = groupedObj(appointments, "date");

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

  function groupedObj(objArray, property) {
    return objArray.reduce((prev, cur) => {
      if (!prev[cur[property]]) {
        prev[cur[property]] = [];
      }
      prev[cur[property]].push(cur);

      return prev;
    }, {});
  }

  // useEffect(() => {
  //   if (retainState) return;
  //   setLoadingInitial(true);
  //   dispatch(fetchAppointments(startDate, endDate, limit)).then(() => {
  //     setLoadingInitial(false);
  //   });
  //   return () => {
  //     dispatch({ type: RETAIN_STATE });
  //   };
  // }, [dispatch, retainState, startDate, endDate]);

  // function handleFetchNextAppointments() {
  //   dispatch(fetchAppointments(startDate, endDate, limit, lastVisible));
  // }

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav setText={setText} />
            <div style={{ marginTop: 40 }}>
              <LineCalendar
                showAllAppointments={showAllAppointments}
                date={date}
                // onNewDate={(date) => handleSetPredicate("startDate", date)}/>
                setPredicate={handleSetPredicate}
              />
            </div>
            {loading && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}

            <Popup
              trigger={
                <Button onClick={() => setShowAllAppointments(false)}>
                  <Icon name='th large' />
                </Button>
              }
              content='View only 2 days'
              position='top center'
            />
            <Popup
              trigger={
                <Button onClick={() => setShowAllAppointments(true)}>
                  <Icon name='th' />
                </Button>
              }
              content='View only all days'
              position='top center'
            />
            {Object.entries(groupedAppointments).map((appointment) => (
              <AppointmentsList
                key={appointment[0]}
                text={text}
                // moreAppointments={moreAppointments}
                loading={loading}
                // getNextAppointments={handleFetchNextAppointments}
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
