import React from "react";
import { Segment } from "semantic-ui-react";
import AppointmentReasonsListItem from "./AppointmentsReasonsListItem";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default function AppointmentsReasonsList({
  reasons,
  loading,
  getNextReason,
  moreReasons,
}) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        {reasons.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextReason}
            hasMore={!loading && moreReasons}
            initialLoad={false}
          >
            {reasons.map((reason) => (
              <AppointmentReasonsListItem reason={reason} key={reason.id} />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </Segment.Group>
  );
}
