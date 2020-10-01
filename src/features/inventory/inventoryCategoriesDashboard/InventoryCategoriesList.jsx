import React from "react";
import { Segment } from "semantic-ui-react";
import InventoryCategoriesListItem from "./InventoryCategoriesListItem";
import classes from "../../../css/Dashboard.module.css";

export default function InventoryCategoriesList({ categories }) {
  return (
    <Segment.Group style={{ marginTop: "50px" }}>
      <Segment className={classes.DashboardListContainer}>
        {categories.map((category) => (
          <InventoryCategoriesListItem category={category} key={category.id} />
        ))}
      </Segment>
    </Segment.Group>
  );
}
