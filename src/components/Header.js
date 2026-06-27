import React from "react";
import Carousel1 from "../assets/carousel-1.png";
import Carousel2 from "../assets/carousel-2.png";
import Carousel3 from "../assets/carousel-3.png";

const Header = () => {
    const images = [Carousel1, Carousel2, Carousel3];
  return (
    <div className="container py-4 mt-5 pt-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
      
              <div>
                <h1 className="fw-bold display-6 mb-1">
                  Find Your Perfect Stay
                </h1>
      
                <div className="location-pill d-inline-flex align-items-center">
                  <i className="fa fa-map-marker-alt me-2"></i>
                  Lagos, Nigeria
              </div>
              </div>        
      
            </div>
      
            {/* SEARCH BOX */}
      
            <div className="search-box shadow-sm rounded-4 p-3 mb-4">
      
              <div className="row align-items-center g-3">
      
                <div className="col-lg-3">
                  <div className="search-field">
                      <label className="small text-muted fw-semibold">
                          LOCATION
                      </label>
      
                      <div className="input-group">
                          <span className="input-group-text bg-transparent border-0">
                              <i className="fa fa-search"></i>
                          </span>
      
                          <input
                              type="text"
                              className="form-control border-0 shadow-none"
                              placeholder="Where are you going?"
                          />
                      </div>
                  </div>
                </div>
      
                <div className="col-lg-3">
                  <div className="search-field">
                      <label className="small text-muted fw-semibold">
                          CHECK IN-OUT
                      </label>
      
                      <div className="input-group">
                          <span className="input-group-text bg-transparent border-0">
                              <i className="fa fa-calendar"></i>
                          </span>
      
                          <input
                              type="date"
                              className="form-control border-0 shadow-none"
                              placeholder="Add Dates"
                          />
                      </div>
                  </div>
                </div>
      
                <div className="col-lg-3">
                  <div className="search-field">
                    <label className="small text-muted fw-semibold">
                      GUESTS
                    </label>
      
                    <div className="input-group">
                      <span className="input-group-text bg-transparent border-0">
                        <i className="fa fa-users"></i>
                      </span>
      
                      <select className="form-select border-0 shadow-none">
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>
      
                <div className="col-lg-3">
                  <button className="btn btn-success rounded-4 w-100 py-3">
                    <i className="fa fa-search me-2"></i>
                    Search
                  </button>
                </div>
      
              </div>
            </div>
      
            {/* STATS */}
      
            <div className="row g-3 mb-4">
      
        <div className="col-md-3 col-6">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon">
              <i className="fa fa-line-chart"></i>
            </div>
      
            <div>
              <small className="text-muted d-block">AVG NIGHTLY</small>
      
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold">₦45,000</h5>
      
                <small className="text-success fw-semibold">            
                  +12%
                </small>
              </div>
            </div>
          </div>
        </div>
      
        <div className="col-md-3 col-6">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon">
              <i className="fa fa-users"></i>
            </div>
      
            <div>
              <small className="text-muted d-block">OCCUPANCY</small>
      
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold">78.5%</h5>
      
                <small className="text-success fw-semibold">            
                  +6.2%
                </small>
              </div>
            </div>
          </div>
        </div>
      
        <div className="col-md-3 col-6">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon">
              <i className="fa fa-calendar"></i>
            </div>
      
            <div>
              <small className="text-muted d-block">AVG STAY</small>
      
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold">4.2 Nights</h5>
      
                <small className="text-danger fw-semibold">            
                  -2.1%
                </small>
              </div>
            </div>
          </div>
        </div>
      
        <div className="col-md-3 col-6">
          <div className="stat-card d-flex align-items-center gap-3">
            <div className="stat-icon">
              <i className="fa fa-bolt"></i>
            </div>
      
            <div>
              <small className="text-muted d-block">BOOKING GROWTH</small>
      
              <div className="d-flex align-items-center gap-2">
                <h5 className="mb-0 fw-bold">54%</h5>
      
                <small className="text-success fw-semibold">            
                  +18%
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
