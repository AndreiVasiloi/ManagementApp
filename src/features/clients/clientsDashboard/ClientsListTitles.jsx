import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Item, Segment } from "semantic-ui-react";
import classes from "../../../css/Dashboard.module.css";

export default function ClientsListTitles() {
  return (
    <Segment.Group className={classes.dashboardListElement}>
      <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
        <Item.Group>
          <Container fluid className={classes.clientsTitles}>
            <Row>
              <Col lg={3} xs={1}>
                <Item.Content>
                  <Item.Header>NAME</Item.Header>
                </Item.Content>
              </Col>
              <Col lg={3} xs={4}>
                <Item.Content>
                  <Item.Header>PHONE NUMBER</Item.Header>
                </Item.Content>
              </Col>
              <Col lg={5} xs={5}>
                <Item.Content>
                  <Item.Header>EMAIL</Item.Header>
                </Item.Content>
              </Col>
              <Col lg={1} xs={1}></Col>
            </Row>
          </Container>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}
