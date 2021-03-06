import React, { useState } from "react";
import Title from "./Title";
import HomePageNavBar from "./homePageNavBar/HomePageNavBar";
import classes from "../../css/HomePage.module.css";
import { Container } from "react-bootstrap";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Examples from "./Examples";
import CallToAction from "./CallToAction";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

export default function HomePage({ history }) {
  const [formToDisplay, setFormToDisplay] = useState();
  const { showModal } = useSelector((state) => state.modals);
  return (
    <>
      <section className={classes.coloredSection} id={classes.title}>
        <Container fluid className={classes.containerFluid}>
          <ScrollToTop smooth color='#14b1ab'/>
          <HomePageNavBar
            formToDisplay={formToDisplay}
            setFormToDisplay={setFormToDisplay}
            showModal={showModal}
          />
          <Title
            formToDisplay={formToDisplay}
            setFormToDisplay={setFormToDisplay}
            showModal={showModal}
          />
        </Container>
      </section>
      <section className={classes.whiteSection} id={classes.examples}>
        <Examples />
      </section>
      <section className={classes.coloredSection} id={classes.testimonials}>
        <Testimonials />
      </section>
      <section className={classes.whiteSection} id={classes.features}>
        <Features />
      </section>
      <section className={classes.coloredSection} id={classes.cta}>
        <CallToAction
          formToDisplay={formToDisplay}
          setFormToDisplay={setFormToDisplay}
          showModal={showModal}
        />
      </section>
      <footer
        className={`${classes.whiteSection} ${classes.footer}`}
        id="footer"
      >
        <Footer />
      </footer>
    </>
  );
}
