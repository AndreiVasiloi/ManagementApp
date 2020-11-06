import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Item, Grid, Popup, Icon } from "semantic-ui-react";
import { addFilterIcon } from "../inventoryNavActions";
import classes from "../../../css/Dashboard.module.css";

export default function InventoryListTitles({
  setPredicate,
  loading,
}) {
  const { filterIcon } = useSelector((state) => state.addClass);
  const dispatch = useDispatch();
  return (
    <Segment.Group className={classes.dashboardListElement}>
      <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={4}>
              <Item.Content
                onClick={() => {
                  setPredicate("sort", "category");
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
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  onClick={() => {
                    setPredicate("sort", "name");
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
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  onClick={() => {
                    setPredicate("sort", "expirationDate");
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
                    setPredicate("sort", "amount");
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
