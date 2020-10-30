import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Item, Grid, Popup, Icon } from "semantic-ui-react";
import { addFilterIcon } from "../../inventory/inventoryNavActions";
import classes from "../../../css/Dashboard.module.css";

export default function ExpensesListTitles({
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
                  setPredicate("sort", "name");
                  dispatch(addFilterIcon("name"));
                }}
                disabled={loading}
              >
                <Popup
                  trigger={
                    <Item.Header>
                      NAME
                      {filterIcon === "name" && <Icon name="caret down" />}
                    </Item.Header>
                  }
                  content="Sort items by name"
                  position="top center"
                />
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  onClick={() => {
                    setPredicate("sort", "price");
                    dispatch(addFilterIcon("price"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        PRICE
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
                    setPredicate("sort", "purchaseDate");
                    dispatch(addFilterIcon("purchaseDate"));
                  }}
                  disabled={loading}
                >
                  <Popup
                    trigger={
                      <Item.Header>
                        PURCHASE DATE
                        {filterIcon === "purchaseDate" && <Icon name="caret down" />}
                      </Item.Header>
                    }
                    content="Sort items by purchase date"
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
