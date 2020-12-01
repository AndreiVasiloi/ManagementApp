import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Icon, Placeholder, Segment } from "semantic-ui-react";

export default function AppointmentsPlaceholderList() {
  return (
    <Segment>
      <Container fluid>
        <Row>
          <Col lg={11}>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Col>
          <Col lg={1}>
            <Icon name="ellipsis horizontal" style={{ float: "right" }} />
          </Col>
        </Row>
      </Container>
    </Segment>
  );
}
