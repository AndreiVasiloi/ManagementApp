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
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import ReorderIcon from "@material-ui/icons/Reorder";
import {
  Fab,
  Tooltip,
} from "@material-ui/core";

export default function AppointmentsDashboard() {
  const { appointments } = useSelector((state) => state.appointment);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [text, setText] = useState("");
  const groupedAppointments = groupedObj(appointments, "date");

  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["endDate", new Date()],
    ])
  );
  const date = predicate.get("startDate");

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
            <AppointmentsNav setText={setText} />
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
            <div className={classes.displayDaysIconsContainer}>
              <Tooltip title="View only 2 days">
                <Fab
                  size="small"
                  onClick={() => setShowAllAppointments(false)}
                  className={classes.twoDaysBtn}
                >
                  <ViewStreamIcon className={classes.twoDaysIcon} />
                </Fab>
              </Tooltip>
              <Tooltip title="View all days">
                <Fab
                  size="small"
                  onClick={() => setShowAllAppointments(true)}
                  className={classes.allDaysBtn}
                >
                  <ReorderIcon className={classes.allDaysIcon} />
                </Fab>
              </Tooltip>
            </div>
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
