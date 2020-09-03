import React from "react";
import { Segment, Item, Grid, Icon } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";
import { useDispatch } from "react-redux";
import { deleteItem } from "../inventoryItemsActions";
import { Link } from "react-router-dom";

export default function InventoryListItem({ item }) {
  const dispatch = useDispatch();
  return (
    <Segment.Group>
      <Segment textAlign='center' className={classes.inventoryItemContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.category}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Image
                  size='tiny'
                  src={item.categoryPhoto}
                  className={classes.itemImage}
                />
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.name}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.price} RON</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.expirationDate}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.amount} / buc.</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content  as={Link} to={`/editItem/${item.id}`}>
                  <Icon
                    name='edit'
                    className={classes.editIcon}
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>
                  <Icon name='delete' className={classes.deleteIcon}  onClick={() => dispatch(deleteItem(item.id))} />
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
