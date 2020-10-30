import React from "react";
import { Grid, Item, Segment } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";

export default function ClientsListTitles() {
  return (
    <Segment.Group className={classes.dashboardListElement}>
      <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={5}>
              <Item.Content>
                <Item.Header>NAME</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={5}>
              <Item.Content>
                <Item.Header>PHONE NUMBER</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={5}>
              <Item.Content>
                <Item.Header>EMAIL</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
