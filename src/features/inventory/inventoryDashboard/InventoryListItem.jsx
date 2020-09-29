import React from "react";
import { Segment, Item, Grid, Icon, Popup } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";
import { Link } from "react-router-dom";
import { deleteItemInFirestore } from "../../../app/firestore/firestoreService";
import { Dropdown } from "react-bootstrap";

export default function InventoryListItem({ item }) {
  const currentDay = new Date();
  const itemExpirationDate = new Date(item.displayExpirationDate);
  const expirationDateDifferenceInTime =
    itemExpirationDate.getTime() - currentDay.getTime();
  const expirationDateDifferenceInDays = Math.floor(
    expirationDateDifferenceInTime / (1000 * 3600 * 24) + 1
  );
  const checkIfIsAboutToExpire = expirationDateDifferenceInDays <= 7;
  const checkIfExpired = expirationDateDifferenceInDays < 0;

  return (
    <Segment.Group>
      <Segment textAlign="center" className={classes.inventoryItemContainer}>
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
                <Item.Content>{item.displayPrice}</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={4}>
              <Item>
                <Item.Content
                  className={
                    checkIfExpired
                      ? `${classes.expirationDateRed}`
                      : checkIfIsAboutToExpire
                      ? `${classes.expirationDateRed}`
                      : `${classes.expirationDateBlack}`
                  }
                >
                  {checkIfExpired ? "Expired" : item.displayExpirationDate}
                </Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={3}>
              <Item>
                <Item.Content>{item.amount} / buc.</Item.Content>
              </Item>
            </Grid.Column>
            <Grid.Column width={1}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  className={classes.DashboardDropdownButton}
                >
                  <Icon name="ellipsis horizontal" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    as={Link}
                    to={`/editItem/${item.id}`}
                    className={classes.edit}
                  >
                    <Icon name="edit" />
                    Edit Item
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => deleteItemInFirestore(item.id)}
                    className={classes.delete}
                  >
                    <Icon name="delete" />
                    Delete Item
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
