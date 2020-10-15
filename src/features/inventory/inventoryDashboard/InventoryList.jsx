import React from "react";
import InventoryListItem from "./InventoryListItem";
import { Segment } from "semantic-ui-react";
import InventoryListTitles from "./InventoryListTitles";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default function InventoryList({
  items,
  loading,
  getNextItem,
  moreItems,
}) {
  
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
        <InventoryListTitles
          loading={loading}
        />
        {items.length !== 0 && (
          <InfiniteScroll
          pageStart={0}
          loadMore={getNextItem}
          hasMore={!loading && moreItems}
          initialLoad={false}
          >
            {items.map((item) => (
              <InventoryListItem item={item} key={item.id} />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </Segment.Group>
  );
}
