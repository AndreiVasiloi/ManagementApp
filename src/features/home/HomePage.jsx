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

export default function HomePage({ history }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  return (
    <>
      <section className={classes.coloredSection} id={classes.title}>
        <Container fluid className={classes.containerFluid}>
          <HomePageNavBar
            handleShowLoginModal={handleShowLoginModal}
            handleCloseLoginModal={handleCloseLoginModal}
            showLoginModal={showLoginModal}
            handleShowRegisterModal={handleShowRegisterModal}
            handleCloseRegisterModal={handleCloseRegisterModal}
            showRegisterModal={showRegisterModal}
          />
          <Title
            handleShowRegisterModal={handleShowRegisterModal}
            handleCloseRegisterModal={handleCloseRegisterModal}
            showRegisterModal={showRegisterModal}
          />
        </Container>
      </section>
      <section className={classes.whiteSection} id={classes.features}>
        <Features />
      </section>
      <section className={classes.coloredSection} id={classes.testimonials}>
        <Testimonials />
      </section>
      <section className={classes.whiteSection} id={classes.examples}>
        <Examples />
      </section>
      <section className={classes.coloredSection} id={classes.cta}>
        <CallToAction
          handleShowLoginModal={handleShowLoginModal}
          handleCloseLoginModal={handleCloseLoginModal}
          showLoginModal={showLoginModal}
          handleShowRegisterModal={handleShowRegisterModal}
          handleCloseRegisterModal={handleCloseRegisterModal}
          showRegisterModal={showRegisterModal}
        />
      </section>
      <footer className={classes.whiteSection} id={classes.footer}>
        <Footer />
      </footer>
    </>
  );
}
