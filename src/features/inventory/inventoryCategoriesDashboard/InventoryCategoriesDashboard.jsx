import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import InventoryCategoriesList from "./InventoryCategoriesList";
import { fetchCategories } from "../inventoryCategoriesActions";
import InventoryCategoriesNavbar from "../inventoryNav/InventoryCategoriesNavbar";
import { RETAIN_STATE } from "../inventoryConstants";
import InventoryListItemPlaceholder from "../inventoryDashboard/InventoryListItemPlaceholder";

export default function InventoryCategoriesDashboard() {
  const limit = 10;
  const dispatch = useDispatch();
  const { categories, moreCategories, lastVisible, retainState } = useSelector(
    (state) => state.category
  );
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useEffect(() => {
    if (retainState) return;
    setLoadingInitial(true);
    dispatch(fetchCategories(limit)).then(() => {
      setLoadingInitial(false);
    });
    return () => {
      dispatch({ type: RETAIN_STATE });
    };
  }, [dispatch, retainState]);

  function handleFetchNextCategories() {
    dispatch(fetchCategories(limit, lastVisible));
  }

  return (
    <div className={classes.dashboardContainer}>
      <Grid>
        <Grid.Column width={16}>
          <InventoryCategoriesNavbar />
          {loadingInitial && (
            <>
              <InventoryListItemPlaceholder />
              <InventoryListItemPlaceholder />
            </>
          )}
          <InventoryCategoriesList
            loading={loading}
            categories={categories}
            getNextCategory={handleFetchNextCategories}
            moreCategories={moreCategories}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}
