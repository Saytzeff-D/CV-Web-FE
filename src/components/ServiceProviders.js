import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Skeleton } from "@mui/material";

export default function ServiceProvidersSection() {
  const uri = useSelector((state) => state.UriReducer.uri);
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${uri}v2/service/top-providers`)
      .then((response) => {
        setProviders(response.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching service providers:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uri]);

  return (
    <div className="container py-5">
      {/* TOP CARDS */}
      <div className="row g-4 mb-5">
        {/* LEFT CARD */}
        <div className="col-lg-8">
          <div className="property-card p-4 h-100">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h2 className="fw-bold text-white">
                  List your property or service with us today
                </h2>

                <p className="text-light mt-3">
                  Reach thousands of potential buyers and tenants every day.
                  Start your journey with No.1 agency.
                </p>

                <button
                  onClick={() => window.open("https://agent.cvproperties.co", "_blank")}
                  className="btn btn-light rounded-pill px-4 mt-3 fw-bold"
                >
                  Get Started Now
                </button>
              </div>

              <div className="col-md-5 text-center mt-4 mt-md-0">
                <i
                  className="fa-regular fa-building text-white opacity-25"
                  style={{ fontSize: "7rem" }}
                ></i>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-lg-4">
          <div className="verification-card h-100 text-center p-4">
            <div className="verify-icon mx-auto mb-3">
              <i className="fa-solid fa-user-check text-white"></i>
            </div>

            <h4 className="fw-bold">Verified Listings Only</h4>

            <p className="text-muted">
              Every property on our platform undergoes a rigorous 5-step
              verification process.
            </p>

            <a href="/" className="text-success fw-semibold text-decoration-none">
              Learn About Verification
            </a>
          </div>
        </div>
      </div>

      {/* PROVIDERS HEADER */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-1">Top Service Providers</h2>
          <p className="text-muted mb-0 small">
            Verified artisans, property managers, and home improvement experts
          </p>
        </div>
      </div>

      {/* LOADING STATE */}
      {isLoading ? (
        <div className="row g-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="p-3 border rounded-4 text-center bg-white shadow-sm">
                <Skeleton
                  variant="circular"
                  width={80}
                  height={80}
                  className="mx-auto mb-3"
                />
                <Skeleton variant="text" width="60%" className="mx-auto" />
                <Skeleton variant="text" width="40%" className="mx-auto mb-3" />
                <Skeleton
                  variant="rounded"
                  height={36}
                  className="rounded-pill"
                />
              </div>
            </div>
          ))}
        </div>
      ) : providers.length === 0 ? (
        /* EMPTY STATE */
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-light">
          <div
            className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#ECFDF5",
              color: "#017E53",
            }}
          >
            <i className="fa-solid fa-user-tie" style={{ fontSize: "28px" }}></i>
          </div>

          <h5 className="fw-bold mb-2">No Service Providers Listed Yet</h5>
          <p className="text-muted small mx-auto mb-4" style={{ maxWidth: "460px" }}>
            We are currently onboarding top-rated handymen, electricians, interior designers,
            and cleaning agencies in your area.
          </p>

          <div className="d-flex justify-content-center gap-2 flex-wrap">
            <button
              onClick={() => window.open("https://agent.cvproperties.co", "_blank")}
              className="btn btn-success rounded-pill px-4 fw-bold"
              style={{ backgroundColor: "#017E53", borderColor: "#017E53" }}
            >
              <i className="fa fa-plus me-1"></i> Register as a Service Provider
            </button>
          </div>
        </div>
      ) : (
        /* PROVIDERS LIST */
        <div className="providers-wrapper">
          {providers.map((provider) => (
            <div key={provider.id} className="provider-card">
              <div className="provider-image-wrapper">
                {provider.avatar ? (
                  <img
                    src={provider.avatar}
                    alt={`${provider.firstname} ${provider.lastname}`}
                    className="provider-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}

                {/* Fallback Initials Avatar */}
                <div
                  className="provider-img fallback-avatar align-items-center justify-content-center fw-bold bg-success text-white"
                  style={{ display: provider.avatar ? "none" : "flex" }}
                >
                  {provider.firstname?.[0]?.toUpperCase()}
                  {provider.lastname?.[0]?.toUpperCase()}
                </div>

                <div className="verified-badge" title="Verified Provider">
                  <i className="fa fa-check"></i>
                </div>
              </div>

              <h6 className="fw-bold mt-3 text-truncate">
                {provider.firstname} {provider.lastname}
              </h6>

              <small className="text-muted d-block text-truncate">
                {provider.role || "Service Specialist"}
              </small>

              <small className="d-block my-2">
                <i className="fa fa-star text-warning me-1"></i>
                <span className="fw-bold">
                  {provider.average_rating ? Number(provider.average_rating).toFixed(1) : "5.0"}
                </span>{" "}
                <span className="text-muted">
                  ({provider.reviews || 0} {provider.reviews === 1 ? "review" : "reviews"})
                </span>
              </small>

              <button
                className="btn btn-success rounded-pill w-100 fw-bold"
                style={{ backgroundColor: "#017E53", borderColor: "#017E53" }}
                onClick={() => {
                  if (provider.phone) {
                    window.open(`tel:${provider.phone}`);
                  } else if (provider.email) {
                    window.open(`mailto:${provider.email}`);
                  }
                }}
              >
                Contact
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}