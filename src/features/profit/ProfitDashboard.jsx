import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Segment } from "semantic-ui-react";
import { listenToAppointmentsFromFirestore, listenToReasonsFromFirestore } from "../../app/firestore/firestoreService";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import classes from "../../css/Dashboard.module.css";
import { listenToAppointments } from "../appointments/appointmentsActions";
import { listenToReasons } from "../appointments/reasonsActions";
import ProfitList from "./ProfitList";

export default function ProfitDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { reasons } = useSelector((state) => state.reason);
  const dispatch = useDispatch();
  const appointmentsReason = [];
  const reasonFromReasons = [];
  const text = 'cu oja semi;'
  const filteredItems = reasons.filter((reason) => handleFilter(reason, appointmentsReason[0]));


    appointments.map((appointment) => (
    appointmentsReason.push(appointment.reason)
  ))

  function handleFilter(item, text) {
    const keys = Object.keys(item).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = item[key];
      return value.toString().toLowerCase();
    });
    // console.log(keys);
    // values.map((value) => console.log(value))
    console.log(text);
    return values.some((value) => value.includes(text));
  }
  
  useFirestoreCollection({
    query: () => listenToAppointmentsFromFirestore(),
    data: (appointments) => dispatch(listenToAppointments(appointments)),
    deps: [dispatch],
  });

  useFirestoreCollection({
    query: () => listenToReasonsFromFirestore(),
    data: (reasons) => dispatch(listenToReasons(reasons)),
    deps: [dispatch],
  });


  // appointments.map((appointment) => {
  //   if(appointment.reason === 'cu oja semi'){
  //     console.log(appointment.reason);
  //   }
    
  // })

  

  // appointments.map((appointment) => (
  //   appointmentsReason.push(appointment.reason)
  // ))

  // appointmentsReason.map(appReason => {
    
  //   return appReason
  // })

  // reasons.map((reason) => (
  //   reasonFromReasons.push(reason.reason)
  // ))


  // for (const reason of appointmentsReason) {
    
  //   console.log(reason);
  // }


  return (
    <>
      <div className={classes.dashboardContainer}>
        <Segment>
          <Grid>
            <Grid.Column width={16}>
              {/* <ProfitList appointments={appointments} reasons={reasons}/> */}
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </>
  );
}
