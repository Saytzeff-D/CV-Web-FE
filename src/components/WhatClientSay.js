import data from "../data.json";

const WhatClientsSay = () => {
  return (
    <div className="container-fluid py-5 px-md-5 px-3">
      {/* Heading */}
      <div className="mb-5">
        <h2 className="fw-bold">Guest Stories</h2>
        <p className="text-muted">
          Trusted by over 10,000+ happy travelers across Nigeria
        </p>
      </div>

      {/* Testimonials */}
      <div className="row g-4">
        {data.testimonials
          .filter((m, i) => i < 3)
          .map((t, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="bg-white shadow-sm rounded-4 p-4 h-100 d-flex flex-column"
                style={{ minHeight: "260px" }}
              >
                {/* Profile */}
                <div className="d-flex align-items-center mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="rounded-circle me-3"
                    style={{
                      width: "56px",
                      height: "56px",
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <h6 className="fw-bold mb-1">{t.name}</h6>

                    <small
                      className="fw-semibold px-2 py-1 rounded-pill"
                      style={{
                        background: "#EAF8EE",
                        color: "#0A7A2F",
                        fontSize: "11px",
                      }}
                    >
                      {t.role}
                    </small>
                  </div>
                </div>

                {/* Testimonial */}
                <p
                  className="text-muted fst-italic flex-grow-1"
                  style={{ fontSize: "14px", lineHeight: "1.8" }}
                >
                  "{t.text}"
                </p>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa ${
                          i < t.rating ? "fa-star" : "fa-star-o"
                        } text-warning me-1`}
                      ></i>
                    ))}
                  </div>

                  <small className="text-uppercase text-muted fw-semibold">
                    June 2026
                  </small>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WhatClientsSay;