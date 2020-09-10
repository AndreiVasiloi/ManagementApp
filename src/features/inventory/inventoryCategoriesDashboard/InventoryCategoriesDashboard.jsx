import React from "react";
import { Grid } from "semantic-ui-react";
import classes from "../inventoryDashboard/InventoryDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import InventoryCategoriesList from "./InventoryCategoriesList";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToCategoriesFromFirestore } from "../../../app/firestore/firestoreService";
import { listenToCategories } from "../inventoryCategoriesActions";
import InventoryCategoriesNavbar from "../inventoryNav/InventoryCategoriesNavbar";

export default function InventoryCategoriesDashboard() {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToCategoriesFromFirestore(),
    data: (categories) => dispatch(listenToCategories(categories)),
    deps: [dispatch],
  });

  return (
    <div className={classes.inventoryContainer}>
      <Grid>
        <Grid.Column width={16}>
        <InventoryCategoriesNavbar/>
          <InventoryCategoriesList categories={categories} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
