import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToReasonsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import AppointmentsReasonsNav from "../appointmentsNav/AppointmentsReasonsNav";
import { fetchReasons, listenToReasons } from "../reasonsActions";
import AppointmentsReasonsList from "./AppointmentsReasonsList";
import classes from "../../../css/Dashboard.module.css";
import { RETAIN_STATE } from "../../inventory/inventoryConstants";
import InventoryListItemPlaceholder from "../../inventory/inventoryDashboard/InventoryListItemPlaceholder";

export default function AppointmentsReasonsDashboard() {
  const limit = 10;
  const { reasons, moreReasons, lastVisible, retainState } = useSelector(
    (state) => state.reason
  );
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchReasons(limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState]);

  function handleFetchNextReasons() {
    dispatch(fetchReasons(limit, lastVisible));
  }

  return (
    <>
      <div className={classes.dashboardContainer}>
        <Grid>
          <Grid.Column width={16}>
            <AppointmentsReasonsNav />
            {loadingInitial && (
              <>
                <InventoryListItemPlaceholder />
                <InventoryListItemPlaceholder />
              </>
            )}
            <AppointmentsReasonsList
              reasons={reasons}
              loading={loading}
              getNextReason={handleFetchNextReasons}
              moreReasons={moreReasons}
            />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
