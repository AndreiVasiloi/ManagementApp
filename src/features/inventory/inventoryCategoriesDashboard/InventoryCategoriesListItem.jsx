import React from 'react'
import { Segment, Item, Grid, Icon } from 'semantic-ui-react';
import classes from '../inventoryDashboard/InventoryDashboard.module.css';
import { Link } from "react-router-dom";
import { deleteCategoryInFirestore } from '../../../app/firestore/firestoreService';

export default function InventoryCategoriesListItem({category}) {
    return (
        <Segment.Group>
        <Segment textAlign='center' className={classes.inventoryItemContainer}>
          <Item.Group>
            <Grid>
              <Grid.Column width={14}>
                <Item>
                  <Item.Content>{category.text}</Item.Content>
                </Item>
              </Grid.Column>
              
              <Grid.Column width={1}>
                <Item>
                  <Item.Content as={Link} to={`/editCategory/${category.id}`}>
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
                      onClick={() => deleteCategoryInFirestore(category.id)}
                    />
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid>
          </Item.Group>
        </Segment>
      </Segment.Group>
    )
}
