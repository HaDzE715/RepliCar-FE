import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import Porsche from "../Pictures/Group 5.png";
import Ferrari from "../Pictures/Group 4.png";
import AMG from "../Pictures/Group 6.png";
import "../Style/Home.css";
import { Link } from "react-router-dom";

function Home({ logosData }) {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === logosData.slides.length - 1 ? 0 : slide + 1);
  };
  const previousSlide = () => {
    setSlide(slide === 0 ? logosData.slides.length - 1 : slide - 1);
  };
  return (
    <>
      {/* Desktop version */}
      <div className="home-desktop">
        <div className="fade-in-top image-container">
          <Link to="/porsche">
            <img src={Porsche} alt="porsche" className="image grayscale" />
          </Link>
        </div>
        <div className="fade-in-bottom image-container">
          <Link to="/ferrari">
            <img src={Ferrari} alt="ferrari" className="image grayscale" />
          </Link>
        </div>
        <div className="fade-in-top image-container">
          <Link to="/mercedes">
            <img src={AMG} alt="mercedes" className="image grayscale" />
          </Link>
        </div>
      </div>

      {/* Mobile version */}
      <div className="home-mobile">
        <div className="carousel">
          <BsArrowLeftCircleFill
            className="arrow arrow-left"
            onClick={previousSlide}
          />
          {logosData.slides.map((item, idx) => (
            <Link to={`/${item.alt.toLowerCase()}`} key={idx}>
              <img
                src={item.src}
                alt={item.alt}
                className={slide === idx ? "slide" : "slide-hidden"}
              />
            </Link>
          ))}
          <BsArrowRightCircleFill
            className="arrow arrow-right"
            onClick={nextSlide}
          />
          <span className="indicators">
            {logosData.slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                className={
                  slide === idx ? "indicator" : "indicator indicator-inactive"
                }
              ></button>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

export default Home;
