import React from "react";
import { Segment } from "semantic-ui-react";
import InventoryCategoriesListItem from "./InventoryCategoriesListItem";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default function InventoryCategoriesList({
  categories,
  loading,
  getNextCategory,
  moreCategories,
}) {
  return (
    <Segment.Group style={{ marginTop: "50px" }}>
      <Segment className={classes.DashboardListContainer}>
        {categories.length !== 0 && (
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextCategory}
            hasMore={!loading && moreCategories}
            initialLoad={false}
          >
            {categories.map((category) => (
              <InventoryCategoriesListItem
                category={category}
                key={category.id}
              />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </Segment.Group>
  );
}
