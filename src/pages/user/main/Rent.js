import { useEffect, useState } from "react";
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import 'react-range-slider-input/dist/style.css';
import FilterBar from "../../../components/Filterbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Dialog, DialogContent } from "@mui/material";

const Rent = () => {
    const { type } = useParams()
    const [properties, setProperties] = useState([])
    const uri = useSelector(state=>state.uri)
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setIsLoading(true)
        setProperties([])
        axios.get(`${uri}property/all`)
          .then((response) => {
            console.log("Fetched properties:", response.data);
            type == 'all' ? setProperties(response.data.data.filter(each => each.category == 'rent')) : setProperties(response.data.data.filter(each => each.type === type && each.category == 'rent'));
          })
          .catch((error) => {
            console.error("Error fetching properties:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });    
    }, [uri, type])

    const encode = (str) => {
        return btoa(str.toString());
    }
    
    return (
        <>
        <Navbar />
        <div className="container my-5 py-4">
            <hr className="text-theme fw-bold" />
            <p className="fw-semibold">
                Home / <span className="text-theme">Rent / {type} for rent</span>
            </p>
            <FilterBar type={type} />
            <div className="row">
                {
                    properties.length == 0 && !isLoading
                    ? (
                        <p className="fw-semibold fs-4 pb-5 text-muted">No properties available...</p>
                    )
                    :
                    properties.map((each, i)=>(
                        <div className="col-lg-3 col-sm-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                            <div className="position-relative overflow-hidden rounded">                
                            <img src={each.main_photo} className="card-img-top" alt="Property" />
                            
                            <button type="button"
                                className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                                <i className="fa fa-heart-o"></i>
                            </button>

                            <Link to={type === 'land' || type === 'all' ? `/land/rent/${encode(each.id)}` : `/apartment/rent/${encode(each.id)}`}
                                className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                                See More
                            </Link>
                            </div>

                            <div className="card-body px-0 pt-3">
                            <h6 className="card-title mb-1">{each.name}</h6>
                            <h6 className="fw-bold mb-2">{Number(each.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</h6>
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
        <Footer />
        </>
    )
}

export default Rent;