import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import AppointmentsReasonsNav from "../appointmentsNav/AppointmentsReasonsNav";
import { listenToReasons } from "../reasonsActions";
import AppointmentsReasonsList from "./AppointmentsReasonsList";
import classes from "../../../css/Dashboard.module.css";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToReasonsFromFirestore } from "../../../app/firestore/firestoreService";
import Placeholder from "../../../app/common/placeholders/Placeholder/Placeholder";

export default function AppointmentsReasonsDashboard() {
  const dispatch = useDispatch();
  const { reasons } = useSelector((state) => state.reason);
  const { loading } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);
  const currentUserReasons = reasons.filter(
    (reason) => reason?.userUid === currentUser?.uid
  );

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
            <AppointmentsReasonsNav />
            {loading && (
              <>
                <Placeholder />
              </>
            )}
            <AppointmentsReasonsList reasons={currentUserReasons} loading={loading} />
          </Grid.Column>
        </Grid>
      </div>
    </>
  );
}
