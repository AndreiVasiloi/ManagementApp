import React from "react";
import { Grid } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import InventoryCategoriesList from "./InventoryCategoriesList";
import { listenToCategories } from "../inventoryCategoriesActions";
import InventoryCategoriesNavbar from "../inventoryNav/InventoryCategoriesNavbar";
import Placeholder from "../../../app/common/placeholders/Placeholder/Placeholder";
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { listenToCategoriesFromFirestore } from "../../../app/firestore/firestoreService";

export default function InventoryCategoriesDashboard() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading } = useSelector((state) => state.async);
  const { currentUser } = useSelector((state) => state.auth);
  const currentUserCategories = categories.filter(
    (category) => category?.userUid === currentUser?.uid
  );

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
          {loading && (
            <>
              <Placeholder />
            </>
          )}
          <InventoryCategoriesList loading={loading} categories={currentUserCategories} />
        </Grid.Column>
      </Grid>
    </div>
  );
}
