import React from "react";
import InventoryListItem from "./InventoryListItem";
import { Segment } from "semantic-ui-react";
import InventoryListTitles from "./InventoryListTitles";
import classes from "./InventoryDashboard.module.css";

export default function InventoryList({
  items,
  setFormOpen,
  selectItem,
  deleteItem,
}) {
  return (
    <Segment.Group>
      <Segment className={classes.inventoryListContainer}>
        <InventoryListTitles setFormOpen={setFormOpen} />
        {items.map((item) => (
          <InventoryListItem
            item={item}
            key={item.id}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
        ))}
      </Segment>
    </Segment.Group>
  );
}
