import React, { useState, useEffect, useRef } from "react";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import PropertyFiltersSidebar from "./PropertyFiltersSidebar";
import { useNavigate } from "react-router-dom";
import { encodePropertyId } from "../utils/idObfuscator";

// Helper to remove underscores and format property types cleanly
const formatPropertyType = (type = "") => {
  return type.replace(/_/g, " ").trim();
};

const TopCategories = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const savedSearches = useSelector(
    (state) => state.UserReducer.savedSearches
  );
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${uri}property/top-categories`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message ||
            "Failed to fetch properties. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uri]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -450 : 450,
      behavior: "smooth",
    });
  };

  // Clean specs without bedrooms, bathrooms, or toilets
  const renderPropertySpecs = (property) => {
    const rawType = (property.type || "").toLowerCase().trim();
    const cleanType = rawType.replace(/_/g, " ");

    if (cleanType === "land") {
      return (
        <>
          <small>
            <i className="fa fa-expand me-1"></i>
            {property.land_size ? `${property.land_size} sq.m` : "Standard Plot"}
          </small>
          <small>
            <i className="fa fa-tag me-1"></i>
            {property.category || "For Sale"}
          </small>
          <small>
            <i className="fa fa-compass me-1"></i>
            {property.location || "Prime Land"}
          </small>
        </>
      );
    }

    if (cleanType === "hotel" || cleanType === "shortlet") {
      const roomTypesCount = property.room_types?.length;
      return (
        <>
          <small>
            <i className="fa fa-hotel me-1"></i>
            {roomTypesCount ? `${roomTypesCount} Room Types` : "Luxury Suite"}
          </small>
          <small>
            <i className="fa fa-users me-1"></i>
            {property.capacity || "1-2"} Guests
          </small>
          <small>
            <i className="fa fa-star me-1 text-warning"></i>
            {property.star_rating ? `${property.star_rating} Star` : "Verified"}
          </small>
        </>
      );
    }

    if (cleanType === "event center") {
      return (
        <>
          <small>
            <i className="fa fa-users me-1"></i>
            {property.capacity || property.seating_capacity || 200} Capacity
          </small>
          <small>
            <i className="fa fa-calendar-check-o me-1"></i>
            Event Space
          </small>
          <small>
            <i className="fa fa-car me-1"></i>
            {property.parking_spaces ? `${property.parking_spaces} Parking` : "Parking Space"}
          </small>
        </>
      );
    }

    // Default / Apartment / House / Hostel
    return (
      <>
        <small>
          <i className="fa fa-building-o me-1"></i>
          <span className="text-capitalize">{formatPropertyType(property.type) || "Residential"}</span>
        </small>
        <small>
          <i className="fa fa-check-circle-o me-1 text-success"></i>
          {property.furnishing || "Furnished"}
        </small>
        <small>
          <i className="fa fa-shield me-1 text-primary"></i>
          {property.security || "24/7 Security"}
        </small>
      </>
    );
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* FILTERS */}
        <PropertyFiltersSidebar />

        {/* PROPERTIES */}
        <div className="col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div className="d-flex gap-2 flex-wrap">
              <span className="text-muted fw-bold">Trending:</span>

              {[
                "Lekki Phase 1",
                "Banana Island",
                "Victoria Island",
                "Ikoyi",
              ].map((trend) => (
                <button
                  key={trend}
                  className="btn border-0 badge bg-light text-dark px-3 py-2"
                >
                  {trend}
                </button>
              ))}
            </div>

            {savedSearches !== undefined && (
              <button
                onClick={() => navigate("/user/saved-searches")}
                className="btn btn-sm border-0 text-success fw-bold"
              >
                <i className="fa fa-star-o"></i> My Saved Searches ({savedSearches})
              </button>
            )}
          </div>

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Top Categories</h2>
              <p className="text-muted mb-0">
                Handpicked premium listings with live availability
              </p>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn rounded-circle border category-arrow"
                onClick={() => scroll("left")}
              >
                <i className="fa fa-arrow-left"></i>
              </button>

              <button
                className="btn btn-dark rounded-circle category-arrow"
                onClick={() => scroll("right")}
              >
                <i className="fa fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* SCROLLABLE CARDS */}
          <div ref={scrollRef} className="category-scroll-container">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="category-card-wrapper">
                  <Skeleton
                    variant="rectangular"
                    height={450}
                    sx={{ borderRadius: "20px" }}
                  />
                </div>
              ))
            ) : (
              categories.map((property) => {
                const normalizedType = (property.type || "").toLowerCase().replace(/_/g, " ").trim();

                return (
                  <div key={property.id} className="category-card-wrapper">
                    <div className="property-card-home">
                      <div className="position-relative">
                        <img
                          src={property.main_photo}
                          className="property-image"
                          alt={property.name}
                        />

                        <div className="position-absolute top-0 start-0 d-flex gap-2 m-3">
                          <span className="badge bg-success rounded-pill px-3 py-2 text-capitalize">
                            <i className="fa fa-bolt me-1"></i>
                            {property.category}
                          </span>

                          <span className="badge bg-secondary rounded-pill px-3 py-2 text-capitalize">
                            <i className="fa fa-play-circle me-1"></i>
                            {formatPropertyType(property.type)}
                          </span>
                        </div>

                        <button
                          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3"
                          style={{
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          <i className="fa fa-star-o text-warning"></i>
                        </button>
                      </div>

                      <div className="p-4">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="fw-bold">
                              {property.name.split(" ").slice(0, 3).join(" ")}
                            </h6>

                            <small className="text-muted">
                              <i className="fa fa-map-marker-alt me-1"></i>
                              {property.address.split(",").slice(0, 2).join(",")}
                            </small>
                          </div>

                          <div className="text-end">
                            <h6 className="fw-bold">
                              {parseInt(property.total_price).toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN",
                              })}
                            </h6>

                            <small className="text-uppercase text-muted">
                              Per{" "}
                              {normalizedType === "hotel"
                                ? "Night"
                                : normalizedType === "shortlet"
                                ? "Day"
                                : normalizedType === "event center"
                                ? "Event"
                                : "Year "}
                            </small>
                          </div>
                        </div>

                        {/* Clean Specs */}
                        <div className="d-flex justify-content-between mt-4 text-muted">
                          {renderPropertySpecs(property)}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <div className="d-flex align-items-center">
                            <div className="avatar-stack">
                              <img
                                src="https://i.pravatar.cc/40?img=1"
                                className="avatar-img"
                                alt=""
                              />
                              <img
                                src="https://i.pravatar.cc/40?img=2"
                                className="avatar-img"
                                alt=""
                              />
                              <img
                                src="https://i.pravatar.cc/40?img=3"
                                className="avatar-img"
                                alt=""
                              />
                            </div>

                            <span className="small text-muted ms-2">+12</span>
                          </div>

                          <button
                            onClick={() =>
                              navigate(`/property/${encodePropertyId(property.id)}`)
                            }
                            className="btn text-success border-0 fw-bold"
                          >
                            View Details ↗
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {!isLoading && categories.length === 0 && (
            <p className="text-center text-muted mt-4">
              {errorMessage || "No properties found"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopCategories;