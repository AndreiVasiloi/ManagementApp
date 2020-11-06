import React from "react";
import { Header, Segment } from "semantic-ui-react";
import InventoryCategoriesListItem from "./InventoryCategoriesListItem";
import classes from "../../../css/Dashboard.module.css";

export default function InventoryCategoriesList({ categories }) {
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        {categories.length > 0 ? (
          categories.map((category) => (
            <InventoryCategoriesListItem
              category={category}
              key={category.id}
            />
          ))
        ) : (
          <Header
            size='huge'
            textAlign='center'
            color='teal'
            content='No categories to display'
          />
        )}
      </Segment>
    </Segment.Group>
  );
}
