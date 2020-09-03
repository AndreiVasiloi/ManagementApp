import React from "react";
import { Segment, Item, Grid, Icon, Button } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";
import { NavLink } from "react-router-dom";

export default function InventoryListTitles() {

  return (
    <Segment.Group className={classes.inventoryTitlesContainer}>
      <Segment textAlign='center'>
        <Item.Group>
          <Grid>
            <Grid.Column width={2}>
              <Item.Content>
                <Item.Header>CATEGORY</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item.Content>
                <Item.Header>Image</Item.Header>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={2}>
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
            <Grid.Column width={2}>
              <Item>
                <Item.Content>EXPIRATION DATE</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>AMOUNT</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button content='Add category' color='blue' />
              <Button content='Add item' color='teal' as={NavLink} to='/createItem'/>
            </Grid.Column>
            <Grid.Column width={2}>
              <Icon name='filter' className={classes.filterIcon} />
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
