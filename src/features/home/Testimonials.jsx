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
        Reverto is the most valuable business resource we have EVER tryed.
        </h2>
        <div className={classes.testimonialImageContainer}>
        <img
          className={classes.testimonialImage}
          src='https://randomuser.me/api/portraits/men/22.jpg'
          alt='First slide'
        />
        <em className={classes.testimonialName}> Rick Y, New York</em>
        </div>
     
      </Carousel.Item>
      <Carousel.Item className={classes.testimonialItemContainer}>
        <h2 className={classes.testimonialText}>
        Fantastic, I'm totally blown away by Reverto.
        </h2>
        <div className={classes.testimonialImageContainer}>
        <img
          className={classes.testimonialImage}
          src='https://randomuser.me/api/portraits/men/16.jpg'
          alt='Second slide'
        />
        <em className={classes.testimonialName}>Jack F, L.A.</em>
        </div>
      </Carousel.Item>
      <Carousel.Item className={classes.testimonialItemContainer}>
        <h2 className={classes.testimonialText}>
        This is unbelievable. After using Reverto my buisness skyrocketed!
        </h2>
        <div className={classes.testimonialImageContainer}>
        <img
          className={classes.testimonialImage}
          src='https://randomuser.me/api/portraits/women/20.jpg'
          alt='Third slide'
        />
        <em className={classes.testimonialName}>Jessie E, London</em>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}
