import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import classes from "../../css/HomePage.module.css";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className={classes.testimonialItemContainer}>
        <h2 className={classes.testimonialText}>
          <q>
            Reverto has got everything I need. It's incredible. The service was
            excellent. If you aren't sure, always go for Reverto.
          </q>
        </h2>
        <div className={classes.testimonialImageContainer}>
          <img
            className={classes.testimonialImage}
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="First slide"
          />
          <em className={classes.testimonialName}> Rick Y, New York</em>
        </div>
      </Carousel.Item>
      <Carousel.Item className={classes.testimonialItemContainer}>
        <h2 className={classes.testimonialText}>
          <q>I use Reverto often. Reverto has really helped our business.</q>
        </h2>
        <div className={classes.testimonialImageContainer}>
          <img
            className={classes.testimonialImage}
            src="https://randomuser.me/api/portraits/men/16.jpg"
            alt="Second slide"
          />
          <em className={classes.testimonialName}>Jack F, L.A.</em>
        </div>
      </Carousel.Item>
      <Carousel.Item className={classes.testimonialItemContainer}>
        <h2 className={classes.testimonialText}>
          <q>
            Thanks guys, keep up the good work! I can't say enough about
            Reverto.
          </q>
        </h2>
        <div className={classes.testimonialImageContainer}>
          <img
            className={classes.testimonialImage}
            src="https://randomuser.me/api/portraits/women/20.jpg"
            alt="Third slide"
          />
          <em className={classes.testimonialName}>Julia Y, London</em>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
