import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { format } from "date-fns";
import InventoryList from "./InventoryList";
import { useSelector, useDispatch } from "react-redux";
import InventoryListItemPlaceholder from "./InventoryListItemPlaceholder";
import { listenToItemsFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToItems } from "../inventoryItemsActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "./InventoryDashboard.module.css";
import InventoryNavbar from "../inventoryNav/InventoryNavbar";

function onFilter(item, text) {
  const keys = Object.keys(item).filter(key => key !== 'id');
  const values = keys.map((key) => {
    const value = item[key];
    return value.toString().toLowerCase();
  });

  return values.some((value) => value.includes(text));
}

export default function InventoryDashboard() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.async);

  const [predicate, setPredicate] = useState(
    new Map([["sort", "expirationDate"]])
  );

  const [text, setText] = useState("");

  const textLowered = text.trim().toLowerCase();
  const filteredItems =
    text === "" ? items : items.filter((item) => onFilter(item, textLowered));

  function handleSearch(text) {
    console.log("you searched for ", text);
    setText(text);
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useFirestoreCollection({
    query: () => listenToItemsFromFirestore(predicate),
    data: (items) => dispatch(listenToItems(items)),
    deps: [dispatch, predicate],
  });

  return (
    <div className={classes.inventoryContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryNavbar
            predicate={predicate}
            setPredicate={handleSetPredicate}
            onSearch={handleSearch}
          />
          {loading ? (
            <>
              <InventoryListItemPlaceholder />
              <InventoryListItemPlaceholder />
            </>
          ) : (
            <InventoryList
              items={filteredItems}
              predicate={predicate}
              setPredicate={handleSetPredicate}
              loading={loading}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
