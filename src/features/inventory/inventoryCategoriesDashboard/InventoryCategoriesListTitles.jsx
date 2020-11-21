import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Item, Segment } from 'semantic-ui-react'
import classes from "../../../css/Dashboard.module.css";

export default function InventoryCategoriesListTitles() {
    return (
        <Segment.Group className={classes.dashboardListElement}>
        <Segment textAlign="center" className={classes.inventoryTitlesContainer}>
          <Item.Group>
            <Container fluid>
              <Row>
                <Col lg={11} xs={10}>
                  <Item.Content>
                    <Item.Header>NAME</Item.Header>
                  </Item.Content>
                </Col>
                <Col lg={1} xs={2}></Col>
              </Row>
            </Container>
          </Item.Group>
        </Segment>
      </Segment.Group>
    )
}
