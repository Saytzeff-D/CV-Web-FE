import React from "react";
import AppPreview from "../assets/Cover.jpg"; // your phone mockup image

const ExperienceMore = () => {
  return (
    <section className="container-fluid p-md-5">
      <div className="mobile-app-section overflow-hidden">
        <div className="row align-items-center h-100">
          {/* LEFT CONTENT */}
          <div className="col-lg-5 px-lg-5 px-4 py-5 text-white order-1 order-lg-0">
            <small
              className="fw-bold text-uppercase d-block mb-3"
              style={{
                color: "#58D14D",
                letterSpacing: "2px",
                fontSize: "10px",
              }}
            >
              Experience More
            </small>

            <h1 className="fw-bold mb-4">
              Get the full
              <br />
              experience on our
              <br />
              mobile app
            </h1>

            <div className="d-flex justify-content-md-center justify-content-lg-start">
              <p
                className="mb-4 d-none d-md-block"
                style={{
                  color: "#A8B0C0",
                  maxWidth: "350px",
                  lineHeight: "1.8",
                }}
              >
                Book stays, track your payments, and communicate
                with hosts in real-time. Available now for iOS
                and Android.
              </p>
            </div>

            {/* STORE BUTTONS */}
            <div className="d-flex justify-content-md-center justify-content-lg-start">
                <div className="d-flex flex-wrap gap-3 mb-5 d-none d-md-flex">
              <button className="btn btn-light rounded-3 px-3 py-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="fab fa-apple fs-4"></i>

                  <div className="text-start">
                    <small className="d-block lh-1">
                      Download on the
                    </small>
                    <strong>App Store</strong>
                  </div>
                </div>
              </button>

              <button className="btn btn-light rounded-3 px-3 py-2">
                <div className="d-flex align-items-center gap-2">
                  <i className="fab fa-google-play fs-4"></i>

                  <div className="text-start">
                    <small className="d-block lh-1">
                      Get it on
                    </small>
                    <strong>Google Play</strong>
                  </div>
                </div>
              </button>
            </div>
            </div>

            <div className="row g-3 mt-3 d-md-none d-block">
                <div className="col-12 col-sm-auto">
                    <button className="btn btn-light rounded-3 w-100 px-4 py-3">
                    <i className="fa-brands fa-apple me-2"></i>
                    App Store
                    </button>
                </div>

                <div className="col-12 col-sm-auto">
                    <button className="btn btn-light rounded-3 w-100 px-4 py-3">
                    <i className="fa-brands fa-google-play me-2"></i>
                    Google Play
                    </button>
                </div>
            </div>

            {/* QR */}
            <div className="d-none d-lg-flex align-items-center gap-3 mt-4">
              <div className="qr-box">
                <i className="fas fa-qrcode fs-1"></i>
              </div>

              <div>
                <small className="text-secondary d-block">
                  Scan to download
                </small>

                <strong>Quick Access</strong>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-7 py-4 px-5">
            <div className="image-wrapper h-100">
                <img
                    src={AppPreview}
                    alt="Mobile App Preview"
                    className="img-fluid w-100 h-100 mobile-preview"
                />
            </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceMore;