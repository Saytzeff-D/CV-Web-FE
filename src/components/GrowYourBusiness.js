import React from "react";
import data from '../data.json';

const GrowYourBusiness = () => {
  const experts = data.experts;

  return (
    <section className="container p-md-5 mb-5">
      <div className="advert-card p-4 p-lg-5">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-lg-7 pe-lg-5">

            <span className="badge rounded-pill text-success bg-success-subtle px-3 py-2 mb-4">
              GROW YOUR BUSINESS
            </span>

            <h2 className="fw-bold fs-1 mb-3">
              Advertise Your Service •
              <br />
              <span className="text-success">
                Get Hired
              </span>{" "}
              by Thousands
            </h2>

            <p className="text-muted mb-4">
              Join the world's most trusted marketplace for verified
              professionals. Connect with high-value clients and manage
              your bookings in one seamless platform.
            </p>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <span className="feature-pill">
                ✓ Verified Professionals
              </span>

              <span className="feature-pill">
                ✓ Secure Payments
              </span>

              <span className="feature-pill">
                ✓ Top Rated Reviews
              </span>
            </div>

            <div className="d-flex gap-3 mb-3 flex-wrap">
              <button onClick={()=> window.open('https://agent.cvproperties.co')} className="btn btn-success px-4 py-3 rounded-4">
                Advertise Now →
              </button>

              <button className="btn btn-light border px-4 py-3 rounded-4">
                Find a Pro
              </button>
            </div>

            <small className="text-muted d-block mb-4">
              Limited offer:{" "}
              <strong>Free trial for first 30 days</strong>{" "}
              for new providers.
            </small>

            <hr />

            {/* STATS */}
            <div className="row text-center my-4">
              <div className="col-4">
                <h5 className="fw-bold text-success">5k+</h5>
                <small className="text-muted fs-8">
                  ACTIVE PROVIDERS
                </small>
              </div>

              <div className="col-4 border-start">
                <h5 className="fw-bold text-success">12k+</h5>
                <small className="text-muted">
                  JOBS COMPLETED
                </small>
              </div>

              <div className="col-4 border-start">
                <h5 className="fw-bold text-success">98%</h5>
                <small className="text-muted">
                  CLIENT SATISFACTION
                </small>
              </div>
            </div>
            <hr />
            {/* TESTIMONIAL */}
            <div className="testimonial-box mt-4">
              <p className="fst-italic text-muted mb-3">
                “Since joining the marketplace, my monthly
                bookings have increased by 40%. The verification
                badge alone helped build instant trust with new
                clients.”
              </p>

              <small className="text-success fw-semibold">
                — Sarah Jenkins, Creative Consultant
              </small>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-5 bg-light position-relative d-none d-lg-block">

            <div className="search-card">
              <small className="text-muted">
                SEARCHING FOR...
              </small>
              <div className="fw-semibold">
                Verified Experts
              </div>
            </div>

            {experts.map((expert, index) => (
              <div
                key={index}
                className="expert-card"
                style={{
                  top: expert.top,
                  left: expert.left,
                }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={expert.image}
                    alt=""
                    className="rounded-circle me-3"
                    width="50"
                    height="50"
                  />

                  <div className="flex-grow-1">
                    <h6 className="mb-0 fw-bold">
                      {expert.name}
                    </h6>

                    <small className="text-muted">
                      {expert.role}
                    </small>

                    <div className="small mt-2">
                      ⭐ {expert.rating}
                    </div>
                  </div>

                  <div className="text-end">
                    <small className="text-muted">
                      Starting from
                    </small>

                    <div className="fw-bold text-success">
                      {expert.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowYourBusiness;