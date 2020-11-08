import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import classes from "../../css/HomePage.module.css";

export default function Features() {
  return (
    <Container fluid>
      <Row className={classes.featureContainer}>
        <Col lg={4} className={classes.featureBox}>
          <Icon
            name="check circle"
            size="huge"
            color="teal"
            className={classes.featuresIcon}
          />
          <h3 className={classes.featureTitle}>Easy to use.</h3>
          <p className={classes.homeParagraph}>
            So easy to use, just register and done.
          </p>
        </Col>
        <Col lg={4} className={classes.featureBox}>
          <Icon
            name="bullseye"
            size="huge"
            color="teal"
            className={classes.featuresIcon}
          />
          <h3 className={classes.featureTitle}>Elite Clientele</h3>
          <p className={classes.homeParagraph}>
            We have all kinds of customers, from all fields.
          </p>
        </Col>
        <Col lg={4} className={classes.featureBox}>
          <Icon
            name="heart"
            size="huge"
            color="teal"
            className={classes.featuresIcon}
          />
          <h3 className={classes.featureTitle}>Guaranteed to help.</h3>
          <p className={classes.homeParagraph}>
            You can see the whole business as a whole.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
