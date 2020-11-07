import React from "react";
import { Col, Row } from "react-bootstrap";
import classes from "../../css/HomePage.module.css";
import appointmentsImage from "../../images/appointments.png";
import inventoryImage from "../../images/inventory.png";
import profitImage from "../../images/profit.png";
// import appointmentsBig from '../../images/appointmentsBig.png';
// import appointmentsImageBig from "../../images/appointmentsBig.png";
// import inventoryImageSmall from "../../images/inventorySmall.png";
// import inventoryImageBig from "../../images/inventoryBig.png";
// import profitImageSmall from "../../images/profitSmall.png";
// import profitImageBig from "../../images/profitBig.png";
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
