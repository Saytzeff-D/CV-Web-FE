import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RoommateSection from "./RoomateSection";
import { encodePropertyId } from "../utils/idObfuscator";

const cleanLabel = (str) => {
  if (!str) return "";
  return str
    .toString()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getPropertySpecs = (property) => {
  const type = (property.type || "").toLowerCase().trim();
  const specs = [];

  switch (type) {
    case "event_center":    
      if (property.capacity) specs.push(`${Number(property.capacity).toLocaleString()} Capacity`);
      if (property.hall_type) specs.push(cleanLabel(property.hall_type));
      if (property.arrangement) specs.push(`${cleanLabel(property.arrangement)} Setup`);
      if (property.event_type_supported) specs.push(cleanLabel(property.event_type_supported));
      break;

    case "land":
      if (property.land_size) {
        const isNum = !isNaN(Number(property.land_size));
        specs.push(isNum ? `${Number(property.land_size).toLocaleString()} SQM` : property.land_size);
      }
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      if (property.category) specs.push(`For ${cleanLabel(property.category)}`);
      break;

    case "shortlet":
    case "hotel":
      if (property.furnishing_level) specs.push(cleanLabel(property.furnishing_level));
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;

    case "hostel":
      if (property.gender_preference) specs.push(`${cleanLabel(property.gender_preference)} Only`);
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;

    case "apartment":
    case "house":
    default:
      if (property.furnishing_level) specs.push(cleanLabel(property.furnishing_level));
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;
  }

  return specs;
};

const PropertiesForYou = () => {
  const [properties, setProperties] = useState([]);
  const uri = useSelector((state) => state.UriReducer.uri);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${uri}property/recommended`)
      .then((response) => {
        setProperties(response.data.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || "Failed to fetch properties. Please try again.");
        setIsLoading(false);
      });
  }, [uri]);

  return (
    <section className="container py-5">
      {/* Heading */}
      <div className="mb-4 text-center text-md-start">
        <h2 className="fw-bold">Featured Properties</h2>
        <p className="text-muted">
          Explore our most premium listings handpicked for you
        </p>
      </div>

      {/* Property Cards */}
      <div className="row g-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <Skeleton variant="rectangular" height={300} sx={{ borderRadius: "16px" }} />
            </div>
          ))
        ) : (
          properties.map((property) => {
            const specs = getPropertySpecs(property);

            return (
              <div
                onClick={() => navigate(`/property/${encodePropertyId(property.id)}`)}
                key={property.id}
                className="col-12 col-md-6 col-lg-4"
                style={{ cursor: "pointer" }}
              >
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <div className="position-relative">
                    <img
                      src={property.main_photo}
                      alt={property.name}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    <span className="badge bg-light text-success position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill">
                      Verified
                    </span>

                    <span className="position-absolute top-0 end-0 m-3 text-warning fw-bold">
                      ☆ {property.rating || "5.0"}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold mb-0">
                        {parseInt(property.total_price || 0).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                      </h4>
                      <small className="text-uppercase text-muted">
                        Per{" "}
                        {property.type === "hotel"
                          ? "Night"
                          : property.type === "shortlet"
                          ? "Day"
                          : property.type === "event_center" || property.type === "event center"
                          ? "Event"
                          : "Year"}
                      </small>
                    </div>

                    <h5 className="mt-3">{property.name.split(" ").slice(0, 3).join(" ")}</h5>

                    <p className="text-muted small">
                      <i className="fa fa-map-marker-alt me-2"></i>
                      {property.address}
                    </p>

                    <hr />

                    {/* Metadata Specs from switch case */}
                    <div className="d-flex justify-content-between text-muted small flex-wrap gap-2">
                      {specs.length > 0 ? (
                        specs.map((item, idx) => (
                          <span key={idx} className="d-inline-flex align-items-center">
                            <i className="fa fa-circle me-1" style={{ fontSize: "6px" }}></i>
                            {item}
                          </span>
                        ))
                      ) : (
                        <span>Available Now</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Features */}
      <div className="row g-3 mt-5">
        <div className="col-12 col-md-4">
          <div className="feature-box">
            <div className="feature-icon">
              <i className="fa fa-shield"></i>
            </div>
            <div>
              <h6 className="fw-bold">Verified Listings</h6>
              <small className="text-muted">
                Every property is hand-verified by our team.
              </small>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="feature-box">
            <div className="feature-icon">
              <i className="fa fa-user-shield"></i>
            </div>
            <div>
              <h6 className="fw-bold">Secure Payments</h6>
              <small className="text-muted">
                Encrypted transactions with multiple payment options.
              </small>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="feature-box">
            <div className="feature-icon">
              <i className="fa fa-bolt"></i>
            </div>
            <div>
              <h6 className="fw-bold">24/7 Support</h6>
              <small className="text-muted">
                Our concierge team is always available.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Roommate Section */}
      <RoommateSection />
    </section>
  );
};

export default PropertiesForYou;