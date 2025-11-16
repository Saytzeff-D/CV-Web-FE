import React, { useEffect, useRef } from "react";
import Carousel1 from "../assets/carousel-1.png";
import Carousel2 from "../assets/carousel-2.png";
import Carousel3 from "../assets/carousel-3.png";

const ImageSlider = () => {
  const sliderRef = useRef(null);
  const imageArray = [Carousel2, Carousel1, Carousel3]

  // Auto-slide effect
  // useEffect(() => {
  //   const slider = sliderRef.current;
  //   if (!slider) return;

  //   const interval = setInterval(() => {
  //     slider.scrollBy({ left: 250, behavior: "smooth" });
  //     // loop back if end reached
  //     if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
  //       slider.scrollTo({ left: 0, behavior: "smooth" });
  //     }
  //   }, 3000); // slide every 3s

  //   return () => clearInterval(interval);
  // }, []);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = 250;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container-fluid my-4 px-0">
      {/* Slider Row */}
      <div
        ref={sliderRef}
        className="d-flex flex-row flex-nowrap overflow-auto"
        style={{
          scrollBehavior: "smooth",
          gap: "1rem",
          paddingBottom: "0.5rem",
        }}
      >
        {imageArray.map((each, i) => (
          <div
            key={i}
            className="card"
            style={{              
              flexShrink: 0,              
            }}
          >
            <img
              src={each}
              className="img-fluid h-100"
              alt="Slide"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
