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
          console.log("Saved properties:", res.data);
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
        setProperties(response.data.data);
        console.log("Properties for you:", response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.response?.data?.message || "Failed to fetch properties. Please try again.");
        setIsLoading(false);
      });
   }, [])

  return (
    <div className="container my-5">
      <h2 className="my-4">Properties For You</h2>
      <p className="text-muted mb-4">
        Tailored Property Listings to Match Your Lifestyle
      </p>
      
      <div className="">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className="nav-link active border-0 text-dark" data-bs-toggle="tab" data-bs-target="#buy">
              Buy
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#rent">
              Rent
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#shortlet">
              Shortlet
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="buy">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef1)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef1)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef1} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                isLoading ? (
                  <div className="row w-100">
                      {
                        [1,2,3,4].map((_, index)=>(
                          <div className="col-md-3" key={index}>
                            <Skeleton variant="rectangular" width={260} height={180} />
                            <Box sx={{ pt: 0.5 }}>
                              <Skeleton />
                              <Skeleton width="60%" />
                            </Box>
                          </div>
                        ))
                      }
                  </div>
                )
                : 
                properties.sale && properties.sale.length > 0 ?
                properties.sale.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={each.main_photo} className="card-img-top" alt="Property" height={'200px'} />
                        
                        <button onClick={() => handleSaveProperty(each.id)} type="button"
                            className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                            <i className={savedProperties.includes(each.id) ? "fa fa-heart text-success" : "fa fa-heart-o"}></i>
                        </button>

                        <Link to={each.type === 'land' ? `/land/rent/${encode(each.id)}` : `/apartment/rent/${encode(each.id)}`}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
                        </div>

                      <div className="card-body px-0 pt-3">
                          <h6 className="card-title mb-1">{each.name}</h6>
                          <h6 className="fw-bold mb-2">{Number(each.total_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</h6>
                          {
                              each.type == 'land'
                              ?
                              <div className="d-flex flex-wrap text-muted small">
                                  <div>{Number(each.land_size).toLocaleString()} Sqm</div>                        
                              </div>
                              :
                              <div className="d-flex flex-wrap text-muted small">
                                  <div className="me-3"><i className="fa fa-regular fa-bed"></i> {each.bedrooms} beds</div>
                                  <div className="me-3"><i className="fa fa-regular fa-toilet"></i> {each.toilets} toilets</div>
                                  <div className="me-3"><i className="fa fa-regular fa-bath"></i> {each.bathrooms} baths</div>
                              </div>
                          }
                          <p className="text-muted small mt-2">{each.address}</p>
                      </div>
                    </div>
                  </div>
                ))
                 :
                 (
                  <Alert severity="info" className="my-4">
                    No properties available...
                  </Alert>
                )              
              }
            </div>
          </div>

          <div className="tab-pane fade" id="rent">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef2)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef2)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef2} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                isLoading ? (
                  <div className="row w-100">
                      {
                        [1,2,3,4].map((_, index)=>(
                          <div className="col-md-3" key={index}>
                            <Skeleton variant="rectangular" width={260} height={180} />
                            <Box sx={{ pt: 0.5 }}>
                              <Skeleton />
                              <Skeleton width="60%" />
                            </Box>
                          </div>
                        ))
                      }
                  </div>
                )
                : 
                properties.rent && properties.rent.length > 0 ?
                properties.rent.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={each.main_photo} className="card-img-top" alt="Property" height={'200px'} />
                        
                        <button onClick={() => handleSaveProperty(each.id)} type="button"
                            className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                            <i className={savedProperties.includes(each.id) ? "fa fa-heart text-success" : "fa fa-heart-o"}></i>
                        </button>

                        <Link to={each.type === 'land' ? `/land/rent/${encode(each.id)}` : `/apartment/rent/${encode(each.id)}`}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
                        </div>

                      <div className="card-body px-0 pt-3">
                          <h6 className="card-title mb-1">{each.name}</h6>
                          <h6 className="fw-bold mb-2">{Number(each.total_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</h6>
                          {
                              each.type == 'land'
                              ?
                              <div className="d-flex flex-wrap text-muted small">
                                  <div>{Number(each.land_size).toLocaleString()} Sqm</div>                        
                              </div>
                              :
                              <div className="d-flex flex-wrap text-muted small">
                                  <div className="me-3"><i className="fa fa-regular fa-bed"></i> {each.bedrooms} beds</div>
                                  <div className="me-3"><i className="fa fa-regular fa-toilet"></i> {each.toilets} toilets</div>
                                  <div className="me-3"><i className="fa fa-regular fa-bath"></i> {each.bathrooms} baths</div>
                              </div>
                          }
                          <p className="text-muted small mt-2">{each.address}</p>
                      </div>
                    </div>
                  </div>
                ))
                 :
                 (
                  <Alert severity="info" className="my-4">
                    No properties available...
                  </Alert>
                )              
              }              
            </div>
          </div>

          <div className="tab-pane fade" id="shortlet">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef3)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef3)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef3} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                isLoading ? (
                  <div className="row w-100">
                      {
                        [1,2,3,4].map((_, index)=>(
                          <div className="col-md-3" key={index}>
                            <Skeleton variant="rectangular" width={260} height={180} />
                            <Box sx={{ pt: 0.5 }}>
                              <Skeleton />
                              <Skeleton width="60%" />
                            </Box>
                          </div>
                        ))
                      }
                  </div>
                )
                : 
                properties.shortlet && properties.shortlet.length > 0 ?
                properties.shortlet.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={each.main_photo} className="card-img-top" alt="Property" height={'200px'} />
                        
                        <button onClick={() => handleSaveProperty(each.id)} type="button"
                            className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                            <i className={savedProperties.includes(each.id) ? "fa fa-heart text-success" : "fa fa-heart-o"}></i>
                        </button>

                        <Link to={each.type === 'land' ? `/land/rent/${encode(each.id)}` : `/apartment/rent/${encode(each.id)}`}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
                        </div>

                      <div className="card-body px-0 pt-3">
                          <h6 className="card-title mb-1">{each.name}</h6>
                          <h6 className="fw-bold mb-2">{Number(each.total_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</h6>
                          {
                              each.type == 'land'
                              ?
                              <div className="d-flex flex-wrap text-muted small">
                                  <div>{Number(each.land_size).toLocaleString()} Sqm</div>                        
                              </div>
                              :
                              <div className="d-flex flex-wrap text-muted small">
                                  <div className="me-3"><i className="fa fa-regular fa-bed"></i> {each.bedrooms} beds</div>
                                  <div className="me-3"><i className="fa fa-regular fa-toilet"></i> {each.toilets} toilets</div>
                                  <div className="me-3"><i className="fa fa-regular fa-bath"></i> {each.bathrooms} baths</div>
                              </div>
                          }
                          <p className="text-muted small mt-2">{each.address}</p>
                      </div>
                    </div>
                  </div>
                ))
                 :
                 (
                  <Alert severity="info" className="my-4">
                    No properties available...
                  </Alert>
                )              
              }
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
}

export default PropertiesForYou;
