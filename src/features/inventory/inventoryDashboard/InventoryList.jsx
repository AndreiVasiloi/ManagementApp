import React from "react";
import InventoryListItem from "./InventoryListItem";
import { Segment } from "semantic-ui-react";
import InventoryListTitles from "./InventoryListTitles";
import classes from "./InventoryDashboard.module.css";

export default function InventoryList({
  items,
}) {
  return (
    <Segment.Group>
      <Segment className={classes.inventoryListContainer}>
        <InventoryListTitles/>
        {items.map((item) => (
          <InventoryListItem
            item={item}
            key={item.id}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
}
