import React from "react";
import { Segment, Item, Grid } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";

export default function InventoryListTitles({
  predicate,
  setPredicate,
  loading,
}) {
  return (
    <Segment.Group className={classes.inventoryTitlesContainer}>
      <Segment textAlign='center'>
        <Item.Group>
          <Grid>
            <Grid.Column width={3}>
              <Item.Content
                onClick={() => setPredicate("sort", "category")}
                disabled={loading}
              >
                <Item.Header>CATEGORY</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content
                  onClick={() => setPredicate("sort", "name")}
                  disabled={loading}
                >
                  NAME
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content
                  onClick={() => setPredicate("sort", "price")}
                  disabled={loading}
                >
                  PRICE
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content
                  onClick={() => setPredicate("sort", "expirationDate")}
                  disabled={loading}
                >
                  EXPIRATION DATE
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content
                  onClick={() => setPredicate("sort", "amount")}
                  disabled={loading}
                >
                  AMOUNT
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
