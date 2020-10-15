import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import { fetchAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";
import { RETAIN_STATE } from "../appointmentsConstants";

export default function AppointmentsDashboard() {
  const limit = 5;
  const {
    appointments,
    moreAppointments,
    lastVisible,
    retainState,
    startDate,
    endDate
  } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [text, setText] = useState("");
  const groupedAppointments = groupedObj(appointments, 'date');

  function groupedObj(objArray, property) {
    
    return objArray.reduce((prev, cur) => {
      if (!prev[cur[property]]) {
        prev[cur[property]] = [];
      }
      prev[cur[property]].push(cur);
  
      return prev;
    }, {});
  }

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchAppointments(startDate, endDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState, startDate, endDate]);

  function handleFetchNextAppointments() {
    dispatch(fetchAppointments(startDate, endDate, limit, lastVisible));
  }

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav setText={setText} />
            <div style={{ marginTop: 40 }}>
              <LineCalendar showAllAppointments={showAllAppointments}/>
            </div>
            {loadingInitial && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            <Button onClick={() => setShowAllAppointments(true)} content='see all'/>
            <Button onClick={() => setShowAllAppointments(false)} content='see 2 days'/>
            {Object.entries(groupedAppointments).map(appointment => (
              <AppointmentsList
              key={appointment[0]}
              text={text}
              moreAppointments={moreAppointments}
              loading={loading}
              getNextAppointments={handleFetchNextAppointments}
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
