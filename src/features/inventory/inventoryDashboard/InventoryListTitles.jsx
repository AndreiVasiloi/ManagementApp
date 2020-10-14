import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Item, Grid, Popup, Icon } from "semantic-ui-react";
import { addFilterIcon } from "../inventoryNavActions";
import classes from "../../../css/Dashboard.module.css";
import { setSort } from "../inventoryItemsActions";

export default function InventoryListTitles({
  loading,
}) {
  const { filterIcon } = useSelector((state) => state.addClass);
  const { sort } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  return (
    <Segment.Group className={classes.dashboardListElement}>
      <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={3}>
              <Item.Content
                onClick={() => {
                  dispatch(setSort("category"))
                  dispatch(addFilterIcon("category"));
                }}
                disabled={loading}
              >
                <Popup
                  trigger={
                    <Item.Header>
                      CATEGORY
                      {filterIcon === "category" && <Icon name="caret down" />}
                    </Item.Header>
                  }
                  content="Sort items by category"
                  position="top center"
                />
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content
                  onClick={() => {
                    dispatch(setSort("name"))
                    dispatch(addFilterIcon("name"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        NAME{" "}
                        {filterIcon === "name" && <Icon name="caret down" />}
                      </Item.Header>
                    }
                    content="Sort items by name"
                    position="top center"
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content
                  onClick={() => {
                    dispatch(setSort("price"))
                    dispatch(addFilterIcon("price"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        PRICE{" "}
                        {filterIcon === "price" && <Icon name="caret down" />}
                      </Item.Header>
                    }
                    content="Sort items by price"
                    position="top center"
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  onClick={() => {
                    dispatch(setSort("expirationDate"))
                    dispatch(addFilterIcon("expirationDate"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        EXPIRATION DATE{" "}
                        {filterIcon === "expirationDate" && (
                          <Icon name="caret down" />
                        )}
                      </Item.Header>
                    }
                    content="Sort items by expiration date"
                    position="top center"
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content
                  onClick={() => {
                    dispatch(setSort("amount"))
                    dispatch(addFilterIcon("amount"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        AMOUNT{" "}
                        {filterIcon === "amount" && <Icon name="caret down" />}
                      </Item.Header>
                    }
                    content="Sort items by amount"
                    position="top center"
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
