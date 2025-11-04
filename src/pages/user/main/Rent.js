import { useState } from "react";
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import 'react-range-slider-input/dist/style.css';
import FilterBar from "../../../Filterbar";
import { Link, useParams } from "react-router-dom";

const Rent = () => {
    const { type } = useParams()
    const properties = [1,2,3,4, 5,6,7,8,9,10,11,12]
    
    return (
        <>
        <Navbar />
        <div className="container my-5 py-4">
            <hr className="text-theme fw-bold" />
            <p className="fw-semibold">
                Home / <span className="text-theme">Rent / {type} for rent</span>
            </p>
            <FilterBar />
            <div className="row">
                {
                    properties.map((each, i)=>(
                        <div className="col-lg-3 col-sm-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                            <div className="position-relative overflow-hidden rounded">                
                            <img src={`https://picsum.photos/600/400?random=${each}`} className="card-img-top" alt="Property" />
                            
                            <button type="button"
                                className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                                <i className="fa fa-heart-o"></i>
                            </button>

                            <Link to={type === 'land' ? `/land/rent/${i}` : `/apartment/rent/${i}`}
                                className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                                See More
                            </Link>
                            </div>

                            <div className="card-body px-0 pt-3">
                            <h6 className="card-title mb-1">Furnished 4bdrm Duplex</h6>
                            <p className="h5 fw-bold mb-2">₦450,000</p>
                            <div className="d-flex flex-wrap text-muted small">
                                <div className="me-3"><i className="fa fa-regular fa-bed"></i> 4 beds</div>
                                <div className="me-3"><i className="fa fa-regular fa-toilet"></i> 5 toilets</div>
                                <div className="me-3"><i className="fa fa-regular fa-bath"></i> 5 baths</div>
                            </div>
                            <p className="text-muted small mt-2">Ikota, Lekki, Lagos</p>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Rent;