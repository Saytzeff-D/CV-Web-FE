import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Details from "../../../components/apartment/details";
import Map from "../../../components/apartment/map";
import Realtor from "../../../components/apartment/realtor";

const images = [
  "https://picsum.photos/900/500?random=2",
  "https://picsum.photos/300/180?random=3",
  "https://picsum.photos/300/180?random=4",
  "https://picsum.photos/300/180?random=5"  
];

const ApartmentDetails = () => {
  const [mainIndex, setMainIndex] = useState(0);

  return (
    <>
      <Navbar />
      <div className="container py-5 my-5">        
        <div className="my-3">
          <h3 className="fw-bold mb-1">3 Bedroom Apartment</h3>
          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mb-0">
                Harmony Estate, GRA Phase I, Magodo, Lagos
              </p>
            </div>
            <div className="d-flex justify-content-end mb-3 gap-2">
              <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Share">
                <i className="fa fa-share"></i> Share
              </button>
              <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Save">
                <i className="fa fa-heart-o"></i> Save
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="rounded overflow-hidden">
              <img
                src={"https://picsum.photos/300/180?random=1"}
                alt="main"
                className="img-fluid w-100"
                style={{ height: 300, objectFit: "cover", borderRadius: 8 }}
              />
            </div>            
          </div>          
          <div className="col-lg-5">                                
            {/* thumbnail grid (two columns inside the col-4) */}
            <div className="row g-2 thumbnail-grid">
              {images.map((src, i) => (
                <div key={i} className="col-6">
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    onClick={() => setMainIndex(i)}
                    className={
                      "img-fluid thumb-img thumb-active"
                    }
                    style={{ width: "100%", height:  145, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-muted small d-flex justify-content-end">
            <p>
                30 days on <b className="text-dark">C&V</b> · <b className="text-dark">300</b> views · <b className="text-dark">20</b> saves
            </p>
          </div>
        </div>

        <div>
          <span className="h4 fw-bold">N30,000,000</span>          
        </div>

        {/* SECOND ROW: TABS (col-8) + BOOKING CARD (col-4) */}
        <div className="row g-4 mt-4">
          {/* TABS & CONTENT */}
          <div className="col-lg-8">
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
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#realtor">
                  Realtor
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="details">
                <Details />
              </div>

              <div className="tab-pane fade" id="map">
                <Map />
              </div>

              <div className="tab-pane fade" id="realtor">
                <Realtor />
              </div>
            </div>
          </div>

          {/* BOOKING CARD (beside tabs) */}
          <div className="col-lg-4">
            <div className="card booking-card shadow-sm sticky-top" style={{ top: 100 }}>
              <div className="card-body p-0">
                <div className="px-4 pt-4">
                  <span className="h4 fw-bold mb-0">₦30,000,000</span>
                  <small className="text-muted">outright</small>
                  <p className="my-0">
                      3 Bedroom Apartment
                  </p>
                  <p className="text-muted py-0">
                    Harmony Estate, GRA Phase 1, Magodo, Lagos
                  </p>
                </div>

                <div className="mt-3 bg-light p-3">
                  <span className="fw-bold h4">₦5,000</span>
                  <span className="small text-muted mb-2"> / inspection</span>
                  <button className="btn btn-success w-100 mb-3 mt-2">Schedule for Inspection</button>
                  <button className="btn btn-outline-dark w-100">Contact Agent</button>
                  <p className="small py-2 text-center">
                    You won’t be charged yet
                  </p>                  
                  <h6 className="fw-bold small mb-2">Schedule for inspection</h6>
                  <ul className="small text-muted mb-0 ps-3 booking">
                    <li className="booking-features">
                      First-hand experience of the property
                    </li>
                    <li className="booking-features">
                      Assess land features
                    </li>
                    <li className="booking-features">
                      Verify zoning and land use
                    </li>
                    <li className="booking-features">
                      Identify any land issues
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ApartmentDetails;