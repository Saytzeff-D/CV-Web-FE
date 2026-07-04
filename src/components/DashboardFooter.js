import React, { Fragment } from "react";
import Logo from "../assets/icon.png"

const DashboardFooter = () => {
    return (
        <Fragment>
            {/* FOOTER BOUNDARY LINE */}
      <hr style={{ borderTop: "1px solid #ECECEC", margin: "40px 0 20px 0" }} />

      {/* MAIN SYSTEM FOOTER */}
      <footer className="row align-items-center g-3 pb-4">
        {/* Left Side: Brand Logo and Micro Disclaimer Meta */}
        <div className="col-md-6 text-center text-md-start">
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
            <img 
              src={Logo} 
              alt="CV Properties" 
              style={{ height: "32px", objectFit: "contain" }} 
            />
            <span className="fw-bold text-success" style={{ fontSize: "18px", letterSpacing: "-0.3px" }}>
              CV Properties
            </span>
          </div>
          <small className="text-muted" style={{ fontSize: "12px" }}>
            © 2026 Chuks n Vins Real Estate Management, Client Dashboard. All rights reserved.
          </small>
        </div>

        {/* Right Side: Legal Hyperlinks Context menu */}
        <div className="col-md-6 text-center text-md-end">
          <div className="d-flex justify-content-center justify-content-md-end gap-4">
            <a href="#help" className="text-secondary text-decoration-none" style={{ fontSize: "12px", fontWeight: 500 }}>
              Help Center
            </a>
            <a href="#terms" className="text-secondary text-decoration-none" style={{ fontSize: "12px", fontWeight: 500 }}>
              Terms of Service
            </a>
            <a href="#privacy" className="text-secondary text-decoration-none" style={{ fontSize: "12px", fontWeight: 500 }}>
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
        </Fragment>
    )
}

export default DashboardFooter;