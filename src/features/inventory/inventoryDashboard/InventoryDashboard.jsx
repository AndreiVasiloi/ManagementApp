import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import InventoryItemForm from "../inventoryForm/InventoryItemForm";
import { sampleData } from "../../../app/api/sampleData";

export default function InventoryDashboard() {
  const [items, setItems] = useState(sampleData);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleCreateFormOpen() {
    setSelectedItem(null);
    setFormOpen(true)
  }

  function handleCreateItem(item) {
    setItems([...items, item]);
  }

  function handleSelectedItem(item) {
    setSelectedItem(item);
    setFormOpen(true);
  }

  function handleUpdateItem(updatedItem) {
    setItems(items.map(itm => itm.id === updatedItem.id ? updatedItem : itm));
    setSelectedItem(null);
  }

  function handleDeleteItem(itemId) {
    setItems(items.filter(itm => itm.id !== itemId));
  }


  return (
    <Grid>
      <Grid.Column width={10}>
        <InventoryList
          items={items}
          setFormOpen={handleCreateFormOpen}
          selectItem={handleSelectedItem}
          deleteItem={handleDeleteItem}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <InventoryItemForm
            setFormOpen={setFormOpen}
            setItems={setItems}
            createItem={handleCreateItem}
            selectedItem={selectedItem}
            updateItem={handleUpdateItem}
            key={selectedItem ? selectedItem.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
