import React from "react";
import { Segment, Item, Grid, Icon, Dropdown } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";
import { NavLink } from "react-router-dom";

export default function InventoryListTitles({ setFormOpen }) {
  const tagOptions = [
    {
      key: "Category",
      text: "Category",
      value: "Category",
    },
    {
      key: "Item",
      text: "Item",
      value: "Item",
    },
  ];
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
              <Dropdown
                multiple
                icon='add'
                className={classes.addIcon}
                as={NavLink}
                to='/createItem'
              >
                <Dropdown.Menu>
                  <Dropdown.Menu scrolling>
                    {tagOptions.map((option) => (
                      <Dropdown.Item key={option.value} {...option} />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
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
