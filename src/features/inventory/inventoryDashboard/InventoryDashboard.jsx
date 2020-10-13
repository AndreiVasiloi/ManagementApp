import React, { useEffect, useState } from "react";
import { Button, Grid, Loader } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import { useSelector, useDispatch } from "react-redux";
import InventoryListItemPlaceholder from "./InventoryListItemPlaceholder";
import { listenToItemsFromFirestore } from "../../../app/firestore/firestoreService";
import { fetchItems, listenToItems } from "../inventoryItemsActions";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import classes from "../../../css/Dashboard.module.css";
import InventoryNavbar from "../inventoryNav/InventoryNavbar";

export default function InventoryDashboard() {
  const limit = 10;
  const dispatch = useDispatch();
  const { items, moreItems } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.async);
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const filteredItems =
    text === ""
      ? items
      : items.filter((item) => handleFilter(item, textLowered));

  const [predicate, setPredicate] = useState(
    new Map([["sort", "expirationDate"]])
  );

  function handleFilter(item, text) {
    const keys = Object.keys(item).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = item[key];
      return value.toString().toLowerCase();
    });
    return values.some((value) => value.includes(text));
  }

  function handleSetPredicate(key, value) {
    setPredicate(new Map(predicate.set(key, value)));
  }

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchItems(predicate, limit)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    })
  }, [dispatch, predicate])

  function handleFetchNextItems() {
    dispatch(fetchItems(predicate, limit, lastDocSnapshot)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
    })
  }

  // useFirestoreCollection({
  //   query: () => listenToItemsFromFirestore(predicate),
  //   data: (items) => dispatch(listenToItems(items)),
  //   deps: [dispatch, predicate],
  // });

  return (
    <div className={classes.dashboardContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryNavbar
            predicate={predicate}
            setPredicate={handleSetPredicate}
            setText={setText}
          />
          {loadingInitial && (
            <>
              <InventoryListItemPlaceholder />
              <InventoryListItemPlaceholder />
            </>
          )}
            <InventoryList
              items={filteredItems}
              predicate={predicate}
              setPredicate={handleSetPredicate}
              loading={loading}
              getNextItem={handleFetchNextItems}
              moreItems={moreItems}
            />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading}/>
        </Grid.Column>
      </Grid>
    </div>
  );
}
