import React, { useState } from "react";

const PropertiesForYou = () => {
   const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card position-relative overflow-hidden"
      style={{ width: "18rem", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src="https://picsum.photos/400/250"
        className="card-img-top"
        alt="Property"
      />

      {/* Overlay (only on hover) */}
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 d-flex flex-column 
        justify-content-center align-items-center text-white 
        ${hovered ? "bg-dark bg-opacity-50" : "d-none"}`}
      >
        <a href="#" className="btn btn-light fw-bold">
          SEE MORE
        </a>
      </div>

      {/* Love button (always visible) */}
      <button
        type="button"
        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow"
      >
        <i className="bi bi-heart-fill text-danger"></i>
      </button>

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title">Beautiful Apartment</h5>
        <p className="card-text">2 Bed · 2 Bath · 1200 sqft</p>
        <a href="#" className="btn btn-primary">
          View Details
        </a>
      </div>
    </div>
  );
}

export default PropertiesForYou;
