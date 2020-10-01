import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import {  listenToReasonsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import AppointmentsReasonsNav from "../appointmentsNav/AppointmentsReasonsNav";
import { listenToReasons } from "../reasonsActions";
import AppointmentsReasonsList from "./AppointmentsReasonsList";
import classes from '../../../css/Dashboard.module.css';


export default function AppointmentsReasonsDashboard() {
  const { reasons } = useSelector((state) => state.reason);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });
  return (
    <>
    <div className={classes.dashboardContainer}>
    <Grid>
        <Grid.Column width={16}>
            <AppointmentsReasonsNav/>
          <AppointmentsReasonsList reasons={reasons} />
        </Grid.Column>
      </Grid>
    </div>
    </>
  );
}
