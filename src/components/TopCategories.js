import React from "react";

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
  return (
    <div className="container py-4 mt-5 pt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

        <div>
          <h1 className="fw-bold display-6 mb-1">
            Find Your Perfect Stay
          </h1>

          <small className="text-success">
            <i className="fa fa-map-marker-alt me-1"></i>
            Lagos, Nigeria
          </small>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light rounded-pill px-4">
            <i className="fa fa-list me-2"></i>
            List View
          </button>

          <button className="btn btn-light rounded-pill px-4">
            <i className="fa fa-map me-2"></i>
            Map View
          </button>
        </div>

      </div>

      {/* SEARCH BOX */}

      <div className="search-box shadow-sm rounded-4 p-3 mb-4">

        <div className="row align-items-center g-3">

          <div className="col-lg-3">
            <div className="search-input">
              <i className="fa fa-search"></i>
              <div>
                <small className="text-muted">LOCATION</small>
                <div>Where are you going?</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="search-input">
              <i className="fa fa-calendar"></i>
              <div>
                <small className="text-muted">CHECK IN - OUT</small>
                <div>Add dates</div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="search-input">
              <i className="fa fa-users"></i>
              <div>
                <small className="text-muted">GUESTS</small>
                <div>Add guests</div>
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
          <div className="stat-card">
            <small className="text-muted">AVG NIGHTLY</small>
            <h5>₦45,000</h5>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-card">
            <small className="text-muted">OCCUPANCY</small>
            <h5>78.5%</h5>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-card">
            <small className="text-muted">AVG STAY</small>
            <h5>4.2 Nights</h5>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="stat-card">
            <small className="text-muted">BOOKING GROWTH</small>
            <h5>54%</h5>
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

            <label className="fw-semibold mb-3">
              Price Range (NGN)
            </label>

            <input
              type="range"
              className="form-range mb-4"
            />

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
                        {property.price}
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