import React from "react";
import Carousel1 from "../assets/carousel-1.png";
import Carousel2 from "../assets/carousel-2.png";
import Carousel3 from "../assets/carousel-3.png";

const Header = () => {
    const images = [Carousel1, Carousel2, Carousel3];
  return (
    <div id="headerCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators d-none d-md-flex">
            {images.map((image, index) => (
            <button
                key={index}
                type="button"
                data-bs-target="#headerCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                aria-label={`Slide ${index + 1}`}
            ></button>
            ))}
        </div>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={image}
              className="d-block w-100"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="position-absolute top-50 start-50 translate-middle
    w-100 px-3 text-center text-white"
     style={{ transform: "translate(-50%, -60%)" }}>
        <p className="">No 1 Real estate agency</p>
        <h1 className="fw-bold fs-3 fs-md-1">Find your Dream Property with Us</h1>
    </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#headerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#headerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Header;
