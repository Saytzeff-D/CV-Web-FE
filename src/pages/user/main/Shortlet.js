import { useEffect, useState } from "react";
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import 'react-range-slider-input/dist/style.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import FilterBar from "../../../components/Filterbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";

const Shortlet = () => {
    const { type } = useParams()
    const [properties, setProperties] = useState([])
    const uri = useSelector(state=>state.UriReducer.uri)
    const currency = useSelector(state=>state.CurrencyReducer.currency)
    const rates = useSelector(state=>state.CurrencyReducer.rates);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")
    const [filteredProperties, setFilteredProperties] = useState([])
    const [savedProperties, setSavedProperties] = useState([])
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        fetchProperties()
        fetchSavedProperties();
    }, [uri, type])

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

    const fetchProperties = () =>{
        setIsLoading(true)
        setProperties([])
        setErrorMessage("")
        axios.get(`${uri}property/all`)
          .then((response) => {
            console.log("Fetched properties:", response.data);
            type == 'all' ? setProperties(response.data.data.filter(each => each.category == 'shortlet')) 
            : setProperties(response.data.data.filter(each => each.address.toLowerCase().includes(type) && each.category == 'shortlet'));
            type == 'all' ? setFilteredProperties(response.data.data.filter(each => each.category == 'shortlet')) : setFilteredProperties(response.data.data.filter(each => each.address.toLowerCase().includes(type) && each.category == 'shortlet'));
          })
          .catch((error) => {
            console.error("Error fetching properties:", error);
            const msg = error?.response?.data?.message 
                         || "Server Connection Failed. Please try again.";

            setErrorMessage(msg);
          })
          .finally(() => {
            setIsLoading(false);
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

    return (
        <>
        <Navbar />
        <div className="container my-5 py-4">
            <hr className="text-theme fw-bold" />
            <p className="fw-semibold">
                Home / <span className="text-theme">Shortlet / Shortlet in {type} </span>
            </p>
            <FilterBar type={'shortlet'} properties={properties} setFilteredProperties={setFilteredProperties} />
            <div className="row">
                {
                    filteredProperties.length == 0 && !isLoading && !errorMessage
                    ? (
                        <p className="fw-semibold fs-4 pb-5 text-muted">No properties available...</p>
                    )
                    :
                    filteredProperties.map((each, i)=>(
                        <div className="col-lg-3 col-sm-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                            <div className="position-relative overflow-hidden rounded">                
                            <img src={each.main_photo} className="card-img-top" alt="Property" height={'200px'} />
                            
                            <button onClick={() => handleSaveProperty(each.id)} type="button"
                                className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                                <i className={savedProperties.includes(each.id) ? "fa fa-heart text-success" : "fa fa-heart-o"}></i>
                            </button>

                            <Link to={each.type === 'land' ? `/land/shortlet/${encode(each.id)}` : `/apartment/shortlet/${encode(each.id)}`}
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
                                    <div>{each.land_size} Sqm</div>                        
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
                }
            </div>
        </div>
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

        <Dialog open={Boolean(errorMessage)}>
            <DialogTitle className="text-danger fw-bold">Error</DialogTitle>
            <DialogContent>
                <p>{errorMessage}</p>
                <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={fetchProperties}
                    style={{ marginTop: "15px" }}
                >
                    Retry
                </Button>
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

        <Footer />
        </>
    )
}

export default Shortlet;