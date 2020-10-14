import React, { useEffect, useState } from "react";
import {  Grid, Loader } from "semantic-ui-react";
import InventoryList from "./InventoryList";
import { useSelector, useDispatch } from "react-redux";
import InventoryListItemPlaceholder from "./InventoryListItemPlaceholder";
import { fetchItems } from "../inventoryItemsActions";
import classes from "../../../css/Dashboard.module.css";
import InventoryNavbar from "../inventoryNav/InventoryNavbar";
import { RETAIN_STATE } from "../inventoryConstants";

export default function InventoryDashboard() {
  const limit = 10;
  const dispatch = useDispatch();
  const { items, moreItems, sort, lastVisible, retainState } = useSelector((state) => state.item);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);
  const [text, setText] = useState("");
  const textLowered = text.trim().toLowerCase();
  const filteredItems =
    text === ""
      ? items
      : items.filter((item) => handleFilter(item, textLowered));

  function handleFilter(item, text) {
    const keys = Object.keys(item).filter((key) => key !== "id");
    const values = keys.map((key) => {
      const value = item[key];
      return value.toString().toLowerCase();
    });
    return values.some((value) => value.includes(text));
  }

  useEffect(() => {
    if(retainState) return;
    setLoadingInitial(true);
    dispatch(fetchItems(sort, limit)).then(() => {
      setLoadingInitial(false);
    })
    return () => {
      dispatch({type: RETAIN_STATE})
    }
  }, [dispatch, sort, retainState])

  function handleFetchNextItems() {
    dispatch(fetchItems(sort, limit, lastVisible));
  }

  return (
    <div className={classes.dashboardContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryNavbar
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
