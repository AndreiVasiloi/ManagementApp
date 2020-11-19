import React from "react";
import { Container } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import classes from "../../css/HomePage.module.css";

export default function Footer() {
  return (
    <Container fluid className={classes.containerFluid}>
      <a
        className={classes.footerLink}
        href="https://www.facebook.com/andrei.vasiloi/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon
          name="facebook f"
          size="large"
          className={`${classes.footerIcon} ${classes.facebookIcon}`}
        />
      </a>
      <a
        className={classes.footerLink}
        href="https://www.linkedin.com/in/andrei-vasiloi/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon
          name="linkedin square"
          size="large"
          className={`${classes.footerIcon} ${classes.linkedinIcon}`}
        />
      </a>
      <a
        className={classes.footerLink}
        href="mailto:andrei_vasiloi@yahoo.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon
          name="envelope"
          size="large"
          className={`${classes.footerIcon} ${classes.envelopeIcon}`}
        />
      </a>
      <p className={classes.homeParagraph}>© Copyright 2020 Andrei Vasiloi</p>
    </Container>
  );
}
