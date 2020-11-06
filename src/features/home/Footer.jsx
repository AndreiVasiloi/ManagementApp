import React from "react";
import { Container } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import classes from "../../css/HomePage.module.css";

export default function Footer() {
  return (
    <Container fluid className={classes.containerFluid}>
      <Icon name='facebook f' size='large' className={classes.footerIcon}/>
      <Icon name='twitter' size='large'  className={classes.footerIcon}/>
      <Icon name='instagram' size='large'  className={classes.footerIcon}/>
      <Icon name='envelope' size='large'  className={classes.footerIcon}/>
      <p className={classes.homeParagraph}>© Copyright 2020 Reverto</p>
    </Container>
  );
}
