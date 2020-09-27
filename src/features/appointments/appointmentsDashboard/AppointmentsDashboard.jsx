import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToAppointmentsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";


export default function AppointmentsDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch],
  });
  return (
    <>
      <Grid>
        <Grid.Column width={16}>
          <AppointmentsNav/>
          <AppointmentsList appointments={appointments} />
        </Grid.Column>
      </Grid>
    </>
  );
}
