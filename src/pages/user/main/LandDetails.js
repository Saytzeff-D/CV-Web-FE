import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Details from "../../../components/land/details";
import Map from "../../../components/apartment/map";
import Realtor from "../../../components/apartment/realtor";
import Landmarks from "../../../components/land/landmarks";
import Booking from "../../../components/Booking";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { RWebShare } from "react-web-share";

const LandDetails = () => {
  const { type, id } = useParams();
  const [mainIndex, setMainIndex] = useState(0);
  const uri = useSelector(state=>state.uri)
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()  
  const [savedProperties, setSavedProperties] = useState([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(()=>{
    fetchSavedProperties();
    axios.get(`${uri}property/${decode(id)}`)
      .then((response) => {        
        setProperty(response.data.data);        
      })
      .catch((error) => {
        navigate("/404");
        console.error("Error fetching property details:", error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [uri, id]);

  const decode = (str) => {
    return atob(str);
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

  const fetchSavedProperties = () => {
      if (!sessionStorage.getItem('userToken')) return;
      axios.get(`${uri}customer/saved-properties`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
      })
      .then(res => {
          console.log("Saved properties:", res.data);
          setSavedProperties(res.data.savedProperties.map(prop => prop.id));
      })
      .catch(err => {
          console.log(err);
      });
  }

  return (
    <>
      <Navbar />
      {
        property &&
        <div className="container py-5 my-5">        
          <div className="my-3">
            <h3 className="fw-bold mb-1">{property.name}</h3>
            <div className="d-flex justify-content-between">
              <div>
                <p className="text-muted mb-0">
                  {property.address}
                </p>
              </div>
              <div className="d-flex justify-content-end mb-3 gap-2">
                <RWebShare
                    data={{
                      text: `Check out this property: ${property.name}, located at ${property.address}. Price: ${Number(property.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}.`,
                      url: window.location.href,
                      title: 'CV Properties'
                    }}>
                    <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Share">
                      <i className="fa fa-share"></i> Share
                    </button>
                  </RWebShare>
                <button onClick={()=>handleSaveProperty(property.id)} className="btn btn-light btn-sm btn-circle shadow-sm" title="Save">
                  <i className={savedProperties.includes(property.id) ? "fa fa-heart text-success" : "fa fa-heart-o"}></i> Save
                </button>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-7">
              <div className="rounded overflow-hidden">
                <img
                  src={property.main_photo}
                  alt="main"
                  className="img-fluid w-100"
                  style={{ height: 300, objectFit: "cover", borderRadius: 8 }}
                />
              </div>            
            </div>          
            <div className="col-lg-5">                                
              {/* thumbnail grid (two columns inside the col-4) */}
              <div className="row g-2 thumbnail-grid">
              {property.resources.slice(0,4).map((src, i) => (
                <div key={i} className="col-6 position-relative">
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    onClick={() => setMainIndex(i)}
                    className={
                      "img-fluid thumb-img thumb-active"
                    }
                    style={{ width: "100%", height:  145, objectFit: "cover", borderRadius: 8 }}
                  />
                  {i === 3 && property.resources.length > 4 && (
                <div 
                  className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{
                    top: 0,
                    left: 0,
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: 8,
                    cursor: "pointer",
                    zIndex: 2
                  }}
                  onClick={() => setShowGallery(true)}
                >
                  <span className="text-white fw-bold">
                    Show {property.resources.length - 4} more image
                    {property.resources.length - 4 > 1 ? "s" : ""}
                  </span>
                </div>
              )}
                </div>
              ))}
            </div>
            </div>
            <div className="mt-2 text-muted small d-flex justify-content-end">
              <p>
                  {property.days_listed} days on <b className="text-dark">C&V</b> · <b className="text-dark">{property.views_count}</b> views · <b className="text-dark">{property.saves_count}</b> saves
              </p>
            </div>
          </div>

          <div>
            <h4 className="fw-bold mb-2">{Number(property.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</h4>
            <span className="text-muted">/Per year </span>
            <span>· {Number(property.land_size).toLocaleString()}sqm</span>
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
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#landmarks">
                    Nearby Landmarks
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#area">
                    Area Guide
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
                  <Details property={property} />
                </div>

                <div className="tab-pane fade" id="map">
                  <Map lat={property.latitude} lng={property.longitude} />
                </div>

                <div className="tab-pane fade" id="landmarks">
                  <Landmarks />
                </div>

                {/* <div className="tab-pane fade" id="area">
                  <AreaGuide />
                </div> */}

                <div className="tab-pane fade" id="realtor">
                  <Realtor />
                </div>

              </div>
            </div>

            {/* BOOKING CARD (beside tabs) */}
            <div className="col-lg-4">
              <Booking type={type} property={property} />
            </div>
          </div>
        </div>
      }

      <Dialog open={isLoading} PaperProps={{
          style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          }
      }}
      >
          <DialogContent>
              <p>
                  <span className='spinner-border text-white'></span>
              </p>
          </DialogContent>
      </Dialog>

      <Dialog open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
          <DialogTitle className="fw-bold">Login Required</DialogTitle>
          <DialogContent>
              <p>You need to log in to save this property.</p>
              <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={() => navigate('/login')}
                  style={{ marginTop: "10px" }}
                  className="bg-success"
              >
                  Login
              </Button>

              <Button 
                  variant="outlined" 
                  fullWidth 
                  onClick={() => setShowLoginPrompt(false)}
                  style={{ marginTop: "10px" }}
              >
                  Cancel
              </Button>
          </DialogContent>
      </Dialog>

      <Dialog open={showGallery} onClose={() => setShowGallery(false)} maxWidth="md" fullWidth>
        <DialogTitle className="fw-bold">Gallery</DialogTitle>

        <DialogContent>
          <div className="row g-3">
            {property && property.resources.map((src, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <img
                  src={src}
                  alt={`gallery-${index}`}
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: 145,
                    objectFit: "cover",
                    borderRadius: 8
                  }}
                />
              </div>
            ))}
          </div>

          {/* <Button 
            className="mt-3" 
            variant="outlined" 
            fullWidth 
            onClick={() => setShowGallery(false)}
          >
            Close
          </Button> */}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}

export default LandDetails;