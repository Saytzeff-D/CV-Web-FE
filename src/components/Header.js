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
    w-100 px-3 text-white"
     style={{ transform: "translate(-50%, -60%)" }}>
        <div className="d-flex justify-content-center">
          <div className="col-lg-5">
            <p className="fw-bold">No 1 Real estate agency</p>
            <h1 className="fw-bold fs-1 fs-md-1">Find your Dream Property with Us</h1>
            <div className="input-group mt-4 w-100">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder="Enter your address • city • zipcode"
              />
              <button className="btn btn-black rounded-0 p-3 fw-light" type="button">
                <i className="fa fa-search fw-light"></i> Search
              </button>
            </div>
          </div>
        </div>
    </div>

    </div>
  );
}

export default Header;
