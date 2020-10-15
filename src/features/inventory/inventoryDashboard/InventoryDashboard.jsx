import React, { useEffect, useState } from "react";
import {  Grid, Loader } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import { useSelector, useDispatch } from "react-redux";
import InventoryListItemPlaceholder from "./InventoryListItemPlaceholder";
import { fetchItems, listenToItems } from "../inventoryItemsActions";
import classes from "../../../css/Dashboard.module.css";
import InventoryNavbar from "../inventoryNav/InventoryNavbar";
import { RETAIN_STATE } from "../inventoryConstants";
import { listenToItemsFromFirestore } from "../../../app/firestore/firestoreService";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";

export default function InventoryDashboard() {
  // const limit = 10;
  const dispatch = useDispatch();
  // const { items, moreItems, sort, lastVisible, retainState } = useSelector((state) => state.item);
  const { items } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.async);
  // const [loadingInitial, setLoadingInitial] = useState(false);
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

  useFirestoreCollection({
    query: () => listenToItemsFromFirestore(predicate),
    data: (items) => dispatch(listenToItems(items)),
    deps: [dispatch, predicate],
  });

  // useEffect(() => {
  //   if(retainState) return;
  //   setLoadingInitial(true);
  //   dispatch(fetchItems(sort, limit)).then(() => {
  //     setLoadingInitial(false);
  //   })
  //   return () => {
  //     dispatch({type: RETAIN_STATE})
  //   }
  // }, [dispatch, sort, retainState])

  // function handleFetchNextItems() {
  //   dispatch(fetchItems(sort, limit, lastVisible));
  // }

  return (
    <div className={classes.dashboardContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryNavbar
            setText={setText}
          />
          {loading && (
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
              // getNextItem={handleFetchNextItems}
              // moreItems={moreItems}
            />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading}/>
        </Grid.Column>
      </Grid>
    </div>
  );
}
