import React, { useState } from "react";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FilterProperty = () => {
  const [landSize, setLandSize] = useState([10000, 20000]);
  const [priceRange, setPriceRange] = useState([200000, 500000]);

  const handleRangeChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = Number(value);
      return updated;
    });
  };

  const handleClear = () => {
    setLandSize([10000, 20000]);
    setPriceRange([200000, 500000]);
  };

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h5 className="fw-bold mb-4">Filters</h5>

      {/* Land Size */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Property Size</span>
            <span>
                14,000 - 20,000 sqft
            </span>
        </div>
        <RangeSlider className="" defaultValue={[14000, 20000]} min={10000} max={50000} />
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-2">
            <span className="fw-semibold">Property Size</span>
            <span>
                14,000 - 20,000 sqft
            </span>
        </div>
        <RangeSlider className="" defaultValue={[14000, 20000]} min={10000} max={50000} />
      </div>

      {/* Ownership Type */}
      <div className="mb-4">
        <label className="fw-semibold d-block">Ownership Type</label>
        {["Freehold", "Leasehold", "Co-ownership"].map((type) => (
          <div className="form-check" key={type}>
            <input className="form-check-input" type="checkbox" id={type} />
            <label className="form-check-label" htmlFor={type}>
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Amenities */}
      <div className="mb-4">
        <label className="fw-semibold d-block">Amenities</label>
        {["WiFi", "Kitchen", "Laundry facilities", "Bar areas"].map((item) => (
          <div className="form-check" key={item}>
            <input className="form-check-input" type="checkbox" id={item} />
            <label className="form-check-label" htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary btn-sm" onClick={handleClear}>
          Clear all
        </button>
        <button className="btn btn-success btn-sm">Show results</button>
      </div>
    </div>
  );
}

export default FilterProperty;