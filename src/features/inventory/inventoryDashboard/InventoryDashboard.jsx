import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import { useSelector, useDispatch } from "react-redux";
import InventoryListItemPlaceholder from "./InventoryListItemPlaceholder";
import { listenToItemsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToItems } from "../inventoryItemsActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "./InventoryDashboard.module.css";
import InventoryNavbar from "../inventoryNav/InventoryNavbar";

export default function InventoryDashboard() {
  debugger
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.async);

  const [orderItem, setOrderItem] = useState('expirationDate');

  useFirestoreCollection({
    query: () => listenToItemsFromFirestore(orderItem),
    data: (items) => dispatch(listenToItems(items)),
    deps: [dispatch],
  });

  return (
    <div className={classes.inventoryContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryNavbar />
          {loading ? (
            <>
              <InventoryListItemPlaceholder />
              <InventoryListItemPlaceholder />
            </>
          ) : (
            <InventoryList items={items} setOrderItem={setOrderItem}/>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
