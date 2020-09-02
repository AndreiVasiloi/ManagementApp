import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import InventoryItemForm from "../inventoryForm/InventoryItemForm";
import { sampleData } from "../../../app/api/sampleData";

export default function InventoryDashboard() {
  const [items, setItems] = useState(sampleData);
  const [formOpen, setFormOpen] = useState(true);

  return (
    <Grid>
      <Grid.Column width={10}>
        <InventoryList items={items} setFormOpen={setFormOpen} />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && <InventoryItemForm setFormOpen={setFormOpen} setItems={setItems}/>}
      </Grid.Column>
    </Grid>
  );
}
