import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header } from "semantic-ui-react";
import { listenToAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";
import Placeholder from "../../../app/common/placeholders/Placeholder/Placeholder";

export default function AppointmentsDashboard() {
  const { currentUser } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [text, setText] = useState("");
  const today = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  const tomorrow = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", today],
      ["endDate", tomorrow],
    ])
  );
  const date = predicate.get("startDate");

  const textLowered = text.trim().toLowerCase();
  const currentUserAppointments = appointments.filter(
    (appointment) => appointment?.userUid === currentUser?.uid
  );

  const filteredAppointments =
    text === ""
      ? currentUserAppointments
      : currentUserAppointments.filter((appointment) =>
          handleFilter(appointment, textLowered)
        );
  const groupedAppointments = groupedObj(filteredAppointments, "date");

  function handleFilter(appointment, text) {
    const keys = Object.keys(appointment).filter((key) => key !== "id");
    const keysWithoutUid = keys.filter(key => key !== 'userUid');
    const values = keysWithoutUid.map((key) => {
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
debugger
  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav
              setText={setText}
              setShowAllAppointments={setShowAllAppointments}
            />
            <div className={classes.calendar}>
              <LineCalendar
                showAllAppointments={showAllAppointments}
                date={date}
                setPredicate={handleSetPredicate}
              />
            </div>
            {loading && (
              <>
                <Placeholder />
              </>
            )}
            {Object.keys(groupedAppointments).length > 0 ? (
              Object.entries(groupedAppointments).map((appointment) => (
                <AppointmentsList
                  key={appointment[0]}
                  text={text}
                  loading={loading}
                  date={appointment[0]}
                  appointments={appointment[1]}
                />
              ))
            ) : (
              <Header
                size='huge'
                textAlign='center'
                color='teal'
                content='No appointments to display'
              />
            )}
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
