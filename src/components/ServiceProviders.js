import React, { useEffect } from "react";
import data from '../data.json';
import { useSelector } from "react-redux";
import axios from "axios";

export default function ServiceProvidersSection() {
  const uri = useSelector(state => state.UriReducer.uri);
  const [providers, setProviders] = React.useState([]);

  useEffect(() => {
    axios.get(`${uri}v2/service/top-providers`)
      .then(response => {
        console.log("Service Providers Response:", response.data);
        setProviders(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching service providers:", error);
      });
  }, []);
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

                <button onClick={()=> window.open('https://agent.cvproperties.co')} className="btn btn-light rounded-pill px-4 mt-3">
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

      {/* PROVIDERS */}
      <h2 className="fw-bold mb-4">Top Service Providers</h2>

      <div className="providers-wrapper">
        {providers.map((provider) => (
          <div key={provider.id} className="provider-card">
            <div className="provider-image-wrapper">
                <img
                    src={provider.avatar}
                    alt={provider.lastname}
                    className="provider-img"
                />

                <div className="verified-badge">
                    <i className="fa fa-check"></i>
                </div>
            </div>

            <h6 className="fw-bold mt-3">{provider.firstname} {provider.lastname}</h6>

            <small className="text-muted d-block">
              {provider.role}
            </small>

            <small className="d-block my-2">
              <i className="fa fa-star-o text-warning"></i> <span className="fw-bold">{provider.average_rating} ({provider.reviews} reviews)</span>
            </small>

            <button className="btn btn-success rounded-pill w-100">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}