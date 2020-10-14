import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { fetchAppointments } from "../appointmentsActions";
import AppointmentsNav from "../appointmentsNav/AppointmentsNav";
import AppointmentsList from "./AppointmentsList";
import classes from "../../../css/Dashboard.module.css";
import { LineCalendar } from "../lineCalendar/LineCalendar";
import { RETAIN_STATE } from "../../inventory/inventoryConstants";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";

export default function AppointmentsDashboard() {
  const limit = 5;
  const {
    appointments,
    moreAppointments,
    lastVisible,
    retainState,
    startDate,
  } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const filteredAppointments =
    text === ""
      ? appointments
      : appointments.filter((appointment) =>
          handleFilter(appointment, textLowered)
        );

  function handleFilter(appointment, text) {
    const keys = Object.keys(appointment).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = appointment[key];
      return value.toString().toLowerCase();
    });

    return values.some((value) => value.includes(text));
  }

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchAppointments(startDate, limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState, startDate]);

  function handleFetchNextAppointments() {
    dispatch(fetchAppointments(startDate, limit, lastVisible));
  }

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsNav setText={setText} />
            <div style={{ marginTop: 40 }}>
              <LineCalendar />
            </div>
            {loadingInitial && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            <AppointmentsList
              moreAppointments={moreAppointments}
              loading={loading}
              getNextAppointment={handleFetchNextAppointments}
              appointments={filteredAppointments}
            />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
