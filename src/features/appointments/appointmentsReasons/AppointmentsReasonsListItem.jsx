import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { deleteReasonInFirestore } from "../../../app/firestore/firestoreService";
import classes from "../appointmentsDashboard/AppointmentsDashboard.module.css";

export default function AppointmentsReasonsListItem({ reason }) {
  return (
    <Segment.Group>
        <Segment textAlign='center' className={classes.inventoryItemContainer}>
          <Item.Group>
            <Grid>
              <Grid.Column width={14}>
                <Item>
                  <Item.Content>{reason.text}</Item.Content>
                </Item>
              </Grid.Column>
              
              <Grid.Column width={1}>
                <Item>
                  <Item.Content as={Link} to={`/editReason/${reason.id}`}>
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
                      onClick={() => deleteReasonInFirestore(reason.id)}
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
