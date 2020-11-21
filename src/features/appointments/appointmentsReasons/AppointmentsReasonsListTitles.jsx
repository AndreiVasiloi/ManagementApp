import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Item, Segment } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";

export default function AppointmentsReasonsListTitles() {
  return (
    <Segment.Group className={classes.dashboardListElement}>
      <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
        <Item.Group>
          <Container fluid>
            <Row>
              <Col lg={4} xs={4} className={classes.reasonsTitles}>
                <Item.Content>
                  <Item.Header>NAME</Item.Header>
                </Item.Content>
              </Col>
              <Col lg={3} xs={3} className={classes.reasonsTitles}>
                <Item>
                  <Item.Content>
                    <Item.Header>TEXT COLOR</Item.Header>
                  </Item.Content>
                </Item>
              </Col>
              <Col lg={4} xs={4} className={classes.reasonsTitles}>
                <Item>
                  <Item.Content>
                    <Item.Header>PRICE</Item.Header>
                  </Item.Content>
                </Item>
              </Col>
              <Col lg={1} xs={1}></Col>
            </Row>
          </Container>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
