import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import InventoryCategoriesList from "./InventoryCategoriesList";
import { listenToCategories } from "../inventoryCategoriesActions";
import InventoryCategoriesNavbar from "../inventoryNav/InventoryCategoriesNavbar";
import InventoryListItemPlaceholder from "../inventoryDashboard/InventoryListItemPlaceholder";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToCategoriesFromFirestore } from "../../../app/firestore/firestoreService";

export default function InventoryCategoriesDashboard() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.async);
  const [loadingInitial, setLoadingInitial] = useState(false);

  useFirestoreCollection({
    query: () => listenToCategoriesFromFirestore(),
    data: (categories) => dispatch(listenToCategories(categories)),
    deps: [dispatch],
  });

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
          <InventoryCategoriesList loading={loading} categories={categories} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
