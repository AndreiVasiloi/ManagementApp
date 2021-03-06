import React from "react";
import InventoryListItem from "./InventoryListItem";
import { Header, Segment } from "semantic-ui-react";
import InventoryListTitles from "./InventoryListTitles";
import classes from "../../../css/Dashboard.module.css";

export default function InventoryList({
  items,
  predicate,
  setPredicate,
  loading,
}) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <InventoryListTitles
          predicate={predicate}
          setPredicate={setPredicate}
          loading={loading}
        />
        {items.length > 0 ? (
          items.map((item) => <InventoryListItem item={item} key={item.id} />)
        ) : (
          <Header
            size='huge'
            textAlign='center'
            color='teal'
            content='No items to display'
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
