import React from "react";

const PropertyDetails = () =>  {
  return (
    <div className="container py-4">
      {/* Top Section: Title and Images */}
      <div className="row">
        <div className="col-lg-8">
          <h3 className="fw-bold">3 Bedroom Apartment</h3>
          <p className="text-muted">Harmony Estate, GRA Phase II, Magodo, Lagos</p>

          {/* Image Gallery */}
          <div className="mb-3">
            <img
              src="https://via.placeholder.com/800x400"
              className="img-fluid rounded mb-2"
              alt="main"
            />
            <div className="d-flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://via.placeholder.com/150x100?text=Img+${i}`}
                  alt={`gallery-${i}`}
                  className="img-thumbnail"
                  style={{ cursor: "pointer", width: "23%" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking / Price Card */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h4 className="fw-bold text-success mb-3">₦4,000,000 <small className="text-muted">/ per year</small></h4>

              <div className="mb-3">
                <label className="form-label small">Select Duration</label>
                <select className="form-select">
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>1 Year</option>
                </select>
              </div>

              <button className="btn btn-success w-100 mb-2">Check Availability</button>
              <button className="btn btn-outline-success w-100">Contact Agent</button>

              <hr />
              <p className="mb-1"><strong>Price Details</strong></p>
              <ul className="list-unstyled small text-muted">
                <li>Rent (12 months): ₦4,000,000</li>
                <li>Agency Fee: ₦200,000</li>
                <li>Legal Fee: ₦100,000</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-5">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#details">
              Details
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#map">
              Map
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#area">
              Area Guide
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#realtor">
              Realtor
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* Details Tab */}
          <div className="tab-pane fade show active" id="details">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="border rounded p-3 text-center">
                  <i className="fa-solid fa-bed fa-lg mb-2 text-success"></i>
                  <p className="mb-0">4 Bedrooms</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="border rounded p-3 text-center">
                  <i className="fa-solid fa-bath fa-lg mb-2 text-success"></i>
                  <p className="mb-0">2 Bathrooms</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="border rounded p-3 text-center">
                  <i className="fa-solid fa-car fa-lg mb-2 text-success"></i>
                  <p className="mb-0">6 Parking Spaces</p>
                </div>
              </div>
            </div>

            <h5 className="fw-bold mt-4">About this place</h5>
            <p className="text-muted">
              A cozy 3-bedroom apartment with modern design, spacious rooms, and excellent lighting. Located in a serene environment with good road access.
            </p>

            <h6 className="fw-bold">What this place offers</h6>
            <ul className="list-inline small text-muted">
              <li className="list-inline-item me-3"><i className="fa-solid fa-kitchen-set me-1 text-success"></i> Kitchen</li>
              <li className="list-inline-item me-3"><i className="fa-solid fa-tv me-1 text-success"></i> TV</li>
              <li className="list-inline-item me-3"><i className="fa-solid fa-water me-1 text-success"></i> Swimming Pool</li>
              <li className="list-inline-item me-3"><i className="fa-solid fa-wifi me-1 text-success"></i> Wi-Fi</li>
            </ul>
          </div>

          {/* Map Tab */}
          <div className="tab-pane fade" id="map">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!..."
              width="100%"
              height="400"
              className="rounded border"
              loading="lazy"
            ></iframe>
          </div>

          {/* Area Guide Tab */}
          <div className="tab-pane fade" id="area">
            <p className="text-muted">Magodo is a serene and secure residential area with good road networks and proximity to shopping centers.</p>
          </div>

          {/* Realtor Tab */}
          <div className="tab-pane fade" id="realtor">
            <div className="card border-0 shadow-sm p-3">
              <h6 className="fw-bold mb-1">Agent: Chuks & Vic Real Estate</h6>
              <p className="text-muted mb-1 small">Phone: +234 812 345 6789</p>
              <p className="text-muted mb-1 small">Email: info@chuksvicproperties.com</p>
              <button className="btn btn-outline-success mt-2">Message Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;