import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import classes from "../../css/HomePage.module.css";
import appointmentsImage from "../../images/appointments.png";
import appointmentsSmallImage from "../../images/appointmentsSmall.png";
import inventoryImage from "../../images/inventory.png";
import profitImage from "../../images/profit.png";
import ModalImage from "react-modal-image";

export default function Examples() {
  return (
    <>
      <h2 className={classes.sectionHeading}>
        You Can Manage the Whole Business
      </h2>
      <p className={classes.homeParagraph}>Simple and easy to use.</p>
      <Row>
        <Col lg={4} md={6} className={classes.examplesColumn}>
          <h3>Appointments</h3>
          <ModalImage
            small={appointmentsImage}
            large={appointmentsSmallImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
        <Col lg={4} md={6} className={classes.examplesColumn}>
        <h3>Inventory</h3>
        <ModalImage
            small={appointmentsImage}
            large={appointmentsSmallImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
        <Col lg={4} className={classes.examplesColumn}>
        <h3>Profit</h3>
        <ModalImage
            small={appointmentsImage}
            large={appointmentsSmallImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
        <h4>and more...</h4>
      </Row>
    </>
  );
}
