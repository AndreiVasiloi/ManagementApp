import React from "react";
import InventoryListItem from "./InventoryListItem";
import { Segment } from "semantic-ui-react";
import InventoryListTitles from "./InventoryListTitles";
import classes from "../../../css/Dashboard.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default function InventoryList({
  items,
  predicate,
  setPredicate,
  loading
}) {
  
  return (
    <Segment.Group
      style={{ marginTop: "50px" }}
      className={classes.dashboardListContainer}
    >
      <Segment>
      <InventoryListTitles
          predicate={predicate}
          setPredicate={setPredicate}
          loading={loading}
        />
        {items.map((item) => (
          <InventoryListItem item={item} key={item.id} />
        ))}
        {/* <InventoryListTitles
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
        )} */}
      </Segment>
    </Segment.Group>
  );
}
