import React from "react";
import { Grid } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import { useSelector } from "react-redux";

export default function InventoryDashboard() {

  const {items} = useSelector(state => state.item);

  return (
    <Grid>
      <Grid.Column width={16}>
        <InventoryList
          items={items}
        />
      </Grid.Column>
    </Grid>
  );
}
