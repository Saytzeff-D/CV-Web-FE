import { Alert, Box, Button, Dialog, DialogContent, DialogTitle, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PropertiesForYou = () => {
   const [properties, setProperties] = useState([{ sale: [], rent: [], shortlet: [] }]);
   const containerRef1 = useRef(null);
   const containerRef2 = useRef(null);
   const containerRef3 = useRef(null);
   const uri = useSelector(state=>state.UriReducer.uri)
   const currency = useSelector(state=>state.CurrencyReducer.currency)
   const rates = useSelector(state=>state.CurrencyReducer.rates);
   const [isLoading, setIsLoading] = useState(true);
   const [errorMessage, setErrorMessage] = useState("")
   const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([])

   const scroll = (direction, ref) => {    
    const { current } = ref;
    if (current) {
      const cardWidth = 260; // card min-width + margin (adjust as needed)
      current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
   }

   const fetchSavedProperties = () => {
      if (!sessionStorage.getItem('userToken')) return;
      axios.get(`${uri}customer/saved-properties`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
      })
      .then(res => {          
          setSavedProperties(res.data.savedProperties.map(prop => prop.id));
      })
      .catch(err => {
          console.log(err);
      });
  }
  const encode = (str) => {
      return btoa(str.toString());
  }

  const handleSaveProperty = (propertyId) => {
      if (!sessionStorage.getItem('userToken')) {
          setShowLoginPrompt(true);
          return;
      }
      axios.post(`${uri}customer/save-property`, { propertyId }, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
      })
      .then(res => {            
          fetchSavedProperties();
      })
      .catch(err => {
          console.log(err)
      })
  }

   useEffect(()=>{
    axios.get(`${uri}property/for-you`)
      .then(response => {
        setProperties([...response.data.data.sale, ...response.data.data.rent, ...response.data.data.shortlet]);
        console.log([response.data.data.sale, response.data.data.rent, response.data.data.shortlet])
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.response?.data?.message || "Failed to fetch properties. Please try again.");
        setIsLoading(false);
      });
   }, [])

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
        {properties.map((property) => (
          <div key={property.id} className="col-12 col-md-6 col-lg-4">
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
                  ☆ {property.rating}
                </span>
              </div>

              <div className="card-body">
                <h4 className="fw-bold">{property.total_price}</h4>

                <h5 className="mt-3">{property.name}</h5>

                <p className="text-muted small">
                  <i className="fa fa-map-marker-alt me-2"></i>
                  {property.address}
                </p>

                <hr />

                <div className="d-flex justify-content-between text-muted small flex-wrap">
                  <span>
                    <i className="fa fa-bed me-1"></i>
                    {property.bedrooms} Beds
                  </span>

                  <span>
                    <i className="fa fa-bath me-1"></i>
                    {property.bathrooms} Baths
                  </span>

                  <span>
                    <i className="fa fa-expand me-1"></i>
                    {property.land_size} sqft
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
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
      <div className="roommate-card mt-5">
        <div className="row align-items-center">
          <div className="col-lg-8 text-center text-lg-start">
            <span className="badge bg-success-subtle text-success mb-3">
              NEW FEATURE
            </span>

            <h3 className="fw-bold">Need a roommate?</h3>

            <p className="text-muted">
              Find trusted roommates in your area — match by budget,
              location and lifestyle.
            </p>

            <div className="d-flex gap-3 flex-column flex-sm-row justify-content-center justify-content-lg-start">
              <button className="btn btn-success rounded-pill px-4">
                Find a Roommate
              </button>

              <button className="btn btn-link text-dark text-decoration-none">
                Advertise your room
              </button>
            </div>

            <small className="text-muted d-block mt-3">
              Safety tip: Verify ID before meeting
            </small>
          </div>

          <div className="col-lg-4 text-center mt-4 mt-lg-0">
            <img
              src="/images/roommates.png"
              alt="roommates"
              className="img-fluid"
              style={{ maxWidth: "220px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertiesForYou;
