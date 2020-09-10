import React from "react";
import { Segment, Item, Grid, Icon } from "semantic-ui-react";
import classes from "./InventoryDashboard.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { deleteItemInFirestore } from "../../../app/firestore/firestoreService";

export default function InventoryListItem({ item }) {
  return (
    <Segment.Group>
      <Segment textAlign='center' className={classes.inventoryItemContainer}>
        <Item.Group>
          <Grid>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.category}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.name}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={2}>
              <Item>
                <Item.Content>{item.price} RON</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>
                  {format(item.expirationDate, "MMMM d, yyyy")}
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.amount} / buc.</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={1}>
              <Item>
                <Item.Content as={Link} to={`/editItem/${item.id}`}>
                  <Icon name='edit' className={classes.editIcon} />
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={1}>
              <Item>
                <Item.Content>
                  <Icon
                    name='delete'
                    className={classes.deleteIcon}
                    onClick={() => deleteItemInFirestore(item.id)}
                  />
                </Item.Content>
              </Item>
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
