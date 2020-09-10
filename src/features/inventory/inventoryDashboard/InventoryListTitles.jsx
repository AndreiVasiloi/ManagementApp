import React from "react";
import { Segment, Item, Grid } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";
import { orderItems, listenToItemsFromFirestore } from "../../../app/firestore/firestoreService";

export default function InventoryListTitles({setOrderItem}) {
debugger
  return (
    <Segment.Group className={classes.inventoryTitlesContainer}>
      <Segment textAlign='center'>
        <Item.Group>
          <Grid>
            <Grid.Column width={3}>
              <Item.Content onClick={() => setOrderItem('category')}>
                <Item.Header>CATEGORY</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content className={classes.inventoryTitlesName}>
                  NAME
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>PRICE</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>EXPIRATION DATE</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>AMOUNT</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
