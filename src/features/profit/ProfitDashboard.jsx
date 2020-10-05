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
  const addAppointmentPrice = appointments.map(appointment => ({...appointment, price: getPrice(appointment.reason)}));
  const getAllPrices = addAppointmentPrice.map(app => app.price);
  const totalPrices = getTotalPrices();
  const sortAppointments = appointments.map(app => app).sort(sortFunction);
  const groupedAppointments = groupedObj(appointments, 'date');

  var objKeys = Object.keys(groupedAppointments);
// objKeys.sort();
// objKeys.map( (value) => {
//     console.log(value)
// });
console.log(groupedAppointments);
console.log(objKeys);
  function sortFunction(a,b){  
    
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1;  
}; 

// console.log(groupedAppointments);

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
    if(getAllPrices.length > 0) {
      return getAllPrices.reduce(addAppointmentsPrices);
    }
  }

  function getPrice(reasontype) {
    const reason = reasons.find(reason => reason.text === reasontype);
    if(reason !== undefined){
      return reason.price;
    }
  }

  function addAppointmentsPrices(total, price){
    return total + price;
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
