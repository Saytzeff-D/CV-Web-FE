import { useState } from "react";
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar"
import BedsBathDropdown from "../../../components/BedsBathDropdown";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import FilterProperty from "../../../components/FilterProperty";
import { Link, useParams } from "react-router-dom";

const Buy = () => {
    const { type } = useParams()
    const properties = [1,2,3,4, 5,6,7,8,9,10,11,12]
    const [rangeValue, setRangeValue] = useState(50);
    const rangeSpan = 50000000 - 50000;
    const windowSize = 10000000; // Adjust the window size as needed
    const formatPrice = (value) => {
        if (value >= 1000000) return `₦${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `₦${(value / 1000).toFixed(0)}K`;
        return `₦${value}`;
    };
    const midPoint = 50000 + (rangeSpan * rangeValue) / 100;
    const dynamicMin = Math.max(50000, midPoint - windowSize / 2);
    const dynamicMax = Math.min(50000000, midPoint + windowSize / 2);
    return (
        <>
        <Navbar />
        <div className="container my-5 py-4">
            <hr className="text-theme fw-bold" />
            <p className="fw-semibold">
                Home / <span className="text-theme">Buy / {type} for sale</span>
            </p>
            <div
                className="d-flex flex-wrap gap-2 align-items-center mb-4 overflow-auto p-2"
                style={{ whiteSpace: "nowrap" }}
            >
                <div className="position-relative" style={{ minWidth: "350px", flex: "1" }}>
                    <input
                    type="text"
                    className="form-control ps-4 pe-5"
                    placeholder="Search by address or city"
                    />
                    <i
                    className="fa-solid fa-search position-absolute text-muted"
                    style={{
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}
                    ></i>
                </div>

                <div className="dropdown position-static">
                    <button className="btn btn-outline border dropdown-toggle d-flex justify-content-between align-items-center px-3" data-bs-toggle="dropdown" style={{ minWidth: "80px" }}>
                        Price Range
                    </button>
                    <ul className="dropdown-menu filter-drop px-3 py-2 rounded-0 border-none" style={{ minWidth: "350px", maxWidth: "500px" }}>
                        <li>
                            <div className="d-flex justify-content-between mb-2">
                            <span className="fw-semibold">Price Range</span>
                            <span>
                                {formatPrice(dynamicMin)} - {formatPrice(dynamicMax)}
                            </span>
                            </div>
                            <input
                                type="range"
                                className="form-range"
                                min="50000"
                                max="50000000"
                                step="100000"
                                onChange={(e) => setRangeValue(e.target.value)}
                            />
                        </li>
                    </ul>
                </div>                

                <div>
                    <BedsBathDropdown />
                </div>            

                <div className="dropdown position-static">
                    <button className="btn btn-outline border dropdown-toggle d-flex justify-content-between align-items-center px-3" data-bs-toggle="dropdown" style={{ minWidth: "80px" }}>
                        Size
                    </button>
                    <ul className="dropdown-menu filter-drop px-3 py-2 rounded-0 border-none" style={{ minWidth: "350px", maxWidth: "500px" }}>
                        <li>
                            <div className="d-flex justify-content-between mb-2">
                            <span className="fw-semibold">Size</span>
                            <span>
                                {formatPrice(dynamicMin)} - {formatPrice(dynamicMax)}
                            </span>
                            </div>
                            <RangeSlider className="" defaultValue={[14000, 20000]} min={10000} max={50000} />
                        </li>
                    </ul>
                </div>                

                <button className="btn btn-white border" data-bs-toggle="modal" data-bs-target="#filterModal">
                    <i className="fa-solid fa-sliders me-2"></i> Filters
                </button>
            </div>

            <div className="modal fade" id="filterModal">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">                        
                            <FilterProperty />                        
                    </div>
                </div>
            </div>
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

                            <Link to={type === 'land' ? `/land/sale/${i}` : `/apartment/sale/${i}`}
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

export default Buy;