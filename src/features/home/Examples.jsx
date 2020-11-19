import React from "react";
import { Col, Row } from "react-bootstrap";
import classes from "../../css/HomePage.module.css";
import appointmentsImage from "../../images/appointments.png";
import inventoryImage from "../../images/inventory.png";
import profitImage from "../../images/profit.png";
import ModalImage from "react-modal-image";

export default function Examples() {
  return (
    <>
      <Row>
        <Col lg={12} className={classes.examplesTitleColumn}>
          <h1 className={classes.sectionHeading}>
            You Can Manage the Whole Business
          </h1>
          <p className={classes.homeParagraph}>Simple and easy to use.</p>
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={6} className={classes.examplesColumn}>
          <h3>Appointments</h3>
          <ModalImage
            small={appointmentsImage}
            large={appointmentsImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
        <Col lg={4} md={6} className={classes.examplesColumn}>
          <h3>Inventory</h3>
          <ModalImage
            small={inventoryImage}
            large={inventoryImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
        <Col lg={4} className={classes.examplesColumn}>
          <h3>Profit</h3>
          <ModalImage
            small={profitImage}
            large={profitImage}
            hideDownload={true}
            hideZoom={true}
          />
        </Col>
      </Row>
    </>
  );
}
