import React, { useEffect, useRef } from "react";
import Spotlight1 from "../assets/spotlight-3.png";

const Spotlight = () => {
  const sliderRef = useRef(null);
  const spotArray = [Spotlight1, Spotlight1, Spotlight1, Spotlight1]

  // Auto-slide effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({ left: 250, behavior: "smooth" });
      // loop back if end reached
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000); // slide every 3s

    return () => clearInterval(interval);
  }, []);

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
    <div className="container-fluid my-5">
        <h2 className="mb-4">Spotlight</h2>
        <p className="text-muted mb-0">
            See some Of Our Elegant Propreties
        </p>
      {/* Heading + Controls */}
      <div className="d-flex justify-content-end d-md-none">
        <button
          className="btn btn-light btn-sm me-2 rounded-circle"
          onClick={() => scroll("left")}
          style={{width: '35px', height: '35px'}}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="btn btn-light btn-sm rounded-circle"
          style={{width: '35px', height: '35px'}}
          onClick={() => scroll("right")}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div ref={sliderRef} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
        {
            spotArray.map((each, i)=>(
              <div className="me-4" key={i}>
                    <div className="card border-0" style={{ minWidth: "32rem", flexShrink: 0}}>
                        <div className="row g-0">
                            <div className="col-6">
                                <img src={each} className="img-fluid rounded-start" alt="Spotlight" />
                            </div>
                            <div className="col-6 bg-light px-4">
                                <h6 className="text-muted pb-5 pt-3">No 1 Real estate agency</h6>
                                <p className="text-dark pt-5 pb-0 mb-0">
                                    Luxury 4 bedroom detached duplex with boys quarter
                                </p>  
                                <p className="text-muted pb-4 fw-semibold">
                                    Ajah Lagos
                                </p>
                                <strong>
                                    N200,000
                                </strong>                        
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
      </div>
      <div className="d-flex justify-content-between flex-md-row flex-column text-center mt-5 px-5 py-4">
        <div className="counter-item my-2 p-3">
          <span className="counter-number">200+</span><br />
          <span className="counter-label text-muted">Properties</span>
        </div>
        <div className="counter-item my-2 p-3">
          <span className="counter-number">500</span><br />
          <span className="counter-label text-muted">Users</span>
        </div>
        <div className="counter-item my-2 p-3">
          <span className="counter-number">24/7</span><br />
          <span className="counter-label text-muted">Customer Support</span>
        </div>
        <div className="counter-item my-2 p-3">
          <span className="counter-number">100%</span><br />
          <span className="counter-label text-muted">Trust</span>
        </div>
      </div>
    </div>
  );
}

export default Spotlight;