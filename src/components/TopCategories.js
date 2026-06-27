import React, { useState } from "react";
import ViewToggle from "./ViewToggle";
import { Box, Slider, Typography } from "@mui/material";

const categories = [
  {
    id: 1,
    title: "Skyline Penthouse 1",
    location: "Victoria Island, Lagos",
    price: "₦120,000",
    image: "/images/property1.jpg",
    instantBook: true,
    videoTour: true,
  },
  {
    id: 2,
    title: "Skyline Penthouse 2",
    location: "Victoria Island, Lagos",
    price: "₦240,000",
    image: "/images/property2.jpg",
    instantBook: false,
    videoTour: false,
  },
];

const TopCategories = () => {
    const [priceRange, setPriceRange] = useState([1500000, 2000000]);
    const priceFilter = (val)=>{
    setPriceRange(val)    
    // const filtered = properties.filter(each => Number(String(each.total_price).replace(/[^0-9.]/g, '')) >= val[0] && Number(String(each.total_price).replace(/[^0-9.]/g, '')) <= val[1])
    // setFilteredProperties(filtered)    
  }
  return (
    <div className="container py-4 mt-5 pt-5">

      {/* HEADER */}
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
            <i className="fa fa-arrow-up me-1"></i>
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
            <i className="fa fa-arrow-up me-1"></i>
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
            <i className="fa fa-arrow-down me-1"></i>
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
            <i className="fa fa-arrow-up me-1"></i>
            +18%
          </small>
        </div>
      </div>
    </div>
  </div>

</div>

      <div className="row">

        {/* FILTERS */}

        <div className="col-lg-3 mb-4">

          <div className="filter-card">

            <div className="d-flex justify-content-between mb-4">
              <h6 className="fw-bold">Filters</h6>
              <small className="text-success">Reset</small>
            </div>            

            <Box>
            <Typography variant="subtitle2" className="fw-bold mb-2">
                Price Range (NGN)
            </Typography>
            <div className="d-flex justify-content-between mb-2">
                <span>₦{priceRange[0].toLocaleString()}</span>
                <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
                value={priceRange}
                onChange={(e, val) => priceFilter(val)}
                min={200000}
                max={5000000}
                step={50000}
                sx={{ color: "green" }}
            />
            </Box>

            <h6 className="fw-bold mt-4">
              Property Type
            </h6>

            <div className="d-flex flex-wrap gap-2 mt-3">

              {[
                "Land",
                "Apartments",
                "Shortlets",
                "Event Centers",
                "Hotels",
                "Hostels",
              ].map((item) => (
                <button
                  key={item}
                  className="btn btn-outline-secondary rounded-pill btn-sm"
                >
                  {item}
                </button>
              ))}

            </div>

            <div className="mt-4">
              <div className="d-flex justify-content-between">
                <span>Instant Book</span>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-dark rounded-pill w-100 mt-4">
              Show 142 Results
            </button>

          </div>

          {/* NEIGHBORHOOD */}

          <div className="neighbourhood-card mt-4">

            <small className="text-success">
              Neighbourhood: Lekki
            </small>

            <div className="row text-center mt-4">

              <div className="col">
                <h6>₦85k/night</h6>
                <small>Price</small>
              </div>

              <div className="col">
                <h6>92%</h6>
                <small>Occupancy</small>
              </div>

            </div>

          </div>

        </div>

        {/* PROPERTY GRID */}

        <div className="col-lg-9">

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <div className="d-flex gap-2 flex-wrap">

              {[
                "Lekki Phase 1",
                "Banana Island",
                "Victoria Island",
                "Ikoyi",
              ].map((trend) => (
                <span
                  key={trend}
                  className="badge bg-light text-dark px-3 py-2"
                >
                  {trend}
                </span>
              ))}

            </div>

            <small className="text-success">
              <i className="fa fa-star-o"></i>
              {" "}My Saved Searches (4)
            </small>

          </div>

          <h2 className="fw-bold">
            Top Categories
          </h2>

          <p className="text-muted">
            Handpicked premium listings with live availability
          </p>

          <div className="row g-4">

            {categories.map((property) => (

              <div className="col-md-6" key={property.id}>

                <div className="property-card">

                  <div className="position-relative">

                    <img
                      src={property.image}
                      className="property-image"
                      alt=""
                    />

                    {property.instantBook && (
                      <span className="badge bg-success position-absolute top-0 start-0 m-3">
                        Instant Book
                      </span>
                    )}

                    {property.videoTour && (
                      <span className="badge bg-dark position-absolute top-0 start-0 m-3 ms-5">
                        Video Tour
                      </span>
                    )}

                  </div>

                  <div className="p-3">

                    <div className="d-flex justify-content-between">
                      <h5>{property.title}</h5>

                      <h4 className="fw-bold">
                        {property.price.toLocaleString()}
                      </h4>
                    </div>

                    <small className="text-muted">
                      <i className="fa fa-map-marker-alt me-1"></i>
                      {property.location}
                    </small>

                    <div className="d-flex justify-content-between mt-4 text-muted">

                      <small>4 Beds</small>
                      <small>4.5 Baths</small>
                      <small>3200 sqft</small>

                    </div>

                    <div className="text-end mt-3">

                      <button className="btn btn-link text-success">
                        View Details →
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default TopCategories;