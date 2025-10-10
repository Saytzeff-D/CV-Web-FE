import React, { useState } from "react";

const BedsBathDropdown = () => {
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");

  const resetSelections = () => {
    setBedrooms("Any");
    setBathrooms("Any");
  };

  return (
    <div className="dropdown position-static">
      <button
        className="btn btn-outline border dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="false"
        aria-expanded="false"
      >
        Beds & Bath
      </button>

      <div
        className="dropdown-menu p-4 shadow border-0 rounded-3"
        style={{ maxwidth: "500px" }}
      >
        <div>
            <h6 className="fw-bold text-success mb-3">Beds & Bath</h6>
        </div>
        <div className="dropdown-divider"></div>
        {/* Bedrooms */}
        <div className="mb-3">
          <h6 className="fw-bold text-success mb-2">Bedrooms</h6>
          <div className="d-flex flex-wrap gap-2">
            {["Any", "+1", "+2", "+3", "+4", "+5"].map((label) => (
              <label key={label} className={`btn ${bedrooms === label ? "btn-success" : "btn-outline-success"} btn-sm m-0 rounded-pill px-3`}>
                <input
                  type="radio"
                  name="bedrooms"
                  value={label}
                  checked={bedrooms === label}
                  onChange={() => setBedrooms(label)}
                  className="btn-check"
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="dropdown-divider"></div>

        {/* Bathrooms */}
        <div className="mb-3">
          <h6 className="fw-bold text-success mb-2">Bathrooms</h6>
          <div className="d-flex flex-wrap gap-2">
            {["Any", "+1", "+2", "+3", "+4", "+5"].map((label) => (
              <label key={label} className={`btn ${bathrooms === label ? "btn-success" : "btn-outline-success"} btn-sm m-0 rounded-pill px-3`}>
                <input
                  type="radio"
                  name="bathrooms"
                  value={label}
                  checked={bathrooms === label}
                  onChange={() => setBathrooms(label)}
                  className="btn-check"
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center border-top pt-3">
          <button className="btn btn-link text-decoration-none text-muted p-0" onClick={resetSelections}>
            Clear all
          </button>
          <button className="btn btn-success px-4 py-1">Save</button>
        </div>
      </div>
    </div>
  );
};

export default BedsBathDropdown;