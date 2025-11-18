import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Booking = (props) => {
    const { type, property } = props;
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [duration, setDuration] = useState(0);

    const payNow = (type)=>{
        if(!sessionStorage.getItem('userToken')){
            setShowLoginPrompt(true);
            return;
        }
        sessionStorage.setItem('propertyForPayment', JSON.stringify({type, name: property.name, fee: type == 'inspection' ? property.inspection_fee : property.total_price, id: property.id}));
        navigate(`/pay-now`);
    }
    useEffect(() => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    // difference in milliseconds
    const diff = end - start;    

    // convert to years
    const diffYears = diff / (1000 * 60 * 60 * 24 * 365.25);

    // Check if diffYears is a whole number
    const wholeYears = Math.floor(diffYears);
    const isWholeYear = Math.abs(diffYears - wholeYears) < 0.01; // tolerance

    // if (!isWholeYear) {
    //     alert("Duration must be in full years only (e.g., 1 year, 2 years).");
    //     setEndDate("");
    //     return;
    // }

    // Duration is correct
    setDuration(wholeYears);

    }, [startDate, endDate]);
    return (
        <div>
            {
                type == 'rent'
                ?
                <div className="">
                    <div
                        className="card booking-card shadow-sm sticky-top border-0"
                        style={{ top: 100, borderRadius: "12px" }}
                    >
                        <div className="card-body p-0">
                        {/* DATE INPUTS */}
                        <div className="p-4 border-bottom">
                            <div class="mb-1">
                                <label class="form-label small text-muted mb-1">Start of Rent</label>
                                <input onChange={(e)=>setStartDate(e.target.value)} type="date" class="form-control rounded-2" min={new Date().toISOString().split("T")[0]} />
                            </div>
                            <div>
                                <label class="form-label small text-muted mb-1">End of Rent</label>
                                <input onChange={(e)=>setEndDate(e.target.value)} type="date" class="form-control rounded-2" min={startDate} value={endDate} />
                            </div>
                        </div>

                        <div className="bg-light">

                            <div className="px-4 py-3 bg-light">
                                <h4 className="fw-bold mb-2">{Number(property.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</h4>
                                <span className="text-muted">/ per year</span>

                                <div className="mt-3 dropdown">
                                    <button className="btn btn-success w-100 mb-3 mt-2 dropddown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Schedule for Inspection
                                    </button>
                                    <ul className="dropdown-menu w-75 text-center p-2">
                                        <li>
                                        <button onClick={()=>payNow('inspection')} className="btn btn-success w-100 mb-2">
                                            Schedule for Inspection
                                        </button>
                                        </li>
                                        <li>
                                            I Want to Buy Now! <br />
                                        <button onClick={()=>payNow('checkout')} className="btn btn-white border w-100">
                                            <span className="small">Proceed to Check out</span>
                                        </button>
                                        </li>
                                    </ul>
                                </div>

                                <button className="btn btn-outline-dark w-100">
                                Contact Agent
                                </button>
                            </div>

                            <p className="small text-center text-muted mt-1">
                                You won’t be charged yet
                            </p>

                            {/* PRICE DETAILS */}
                            <div className="px-4 py-3 border-top">
                                <h6 className="fw-bold small mb-2">Price Details</h6>
                                <div className="d-flex justify-content-between small mb-1">
                                <span>Apartment rent x {duration} year{duration > 1 ? "s" : ""}</span>
                                <span className="fw-semibold">{Number(property.total_price) * duration}</span>
                                </div>
                                <div className="d-flex justify-content-between small mb-1">
                                <span>Agent & Cleaning Fee</span>
                                <span className="fw-semibold">₦40,000</span>
                                </div>
                                <div className="d-flex justify-content-between small">
                                <span>C&V Services Fee</span>
                                <span className="fw-semibold">₦10,000</span>
                                </div>
                            </div>

                            {/* BENEFITS */}
                            <div className="px-4 py-3 border-top">
                                <h6 className="fw-bold small mb-2">Benefits</h6>
                                <ul className="list-unstyled small text-muted mb-0">
                                <li>✔ First-hand Experience of the Property</li>
                                <li>✔ High-Speed Wi-Fi & Smart Amenities</li>
                                <li>✔ 24/7 Support & Security</li>
                                <li>✔ Privacy and Comfort</li>
                                </ul>
                            </div>
                        </div>                        
                        </div>
                    </div>
                </div>
                :
                <div className="card booking-card shadow-sm sticky-top" style={{ top: 100 }}>
                    <div className="card-body p-0">
                        <div className="px-4 pt-4">
                        <span className="fw-bold mb-2 h5">{Number(property.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</span>
                        <small className="text-muted">outright</small>
                        <p className="my-0">
                            {property.name}
                        </p>
                        <p className="text-muted py-0">
                            {property.address}
                        </p>
                        </div>

                        <div className="mt-3 bg-light p-3">
                        <span className="fw-bold mb-2 h5">{Number(property.inspection_fee).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</span>
                        <span className="small text-muted mb-2"> / inspection</span>
                        <div className="mt-3 dropdown">
                            <button className="btn btn-success w-100 mb-3 mt-2 dropddown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Schedule for Inspection
                            </button>
                            <ul className="dropdown-menu w-75 text-center p-2">
                                <li>
                                <button onClick={()=>payNow('inspection')} className="btn btn-success w-100 mb-2">
                                    Schedule for Inspection
                                </button>
                                </li>
                                <li>
                                    I Want to Buy Now! <br />
                                <button onClick={()=>payNow('checkout')} className="btn btn-white border w-100">
                                    <span className="small">Proceed to Check out</span>
                                </button>
                                </li>
                            </ul>
                        </div>
                        <button className="btn btn-outline-dark w-100">Contact Agent</button>
                        <p className="small py-2 text-center">
                            You won’t be charged yet
                        </p>                  
                        <h6 className="fw-bold small mb-2">Schedule for inspection</h6>
                        <ul className="small text-muted mb-0 ps-3 booking">
                            <li className="booking-features">
                            First-hand experience of the property
                            </li>
                            <li className="booking-features">
                            Assess land features
                            </li>
                            <li className="booking-features">
                            Verify zoning and land use
                            </li>
                            <li className="booking-features">
                            Identify any land issues
                            </li>
                        </ul>
                        </div>

                    </div>
                </div>
            }

            <Dialog open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
                <DialogTitle className="fw-bold">Login Required</DialogTitle>
                <DialogContent>
                    <p>You need to log in before you can continue.</p>
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
    )
}

export default Booking;