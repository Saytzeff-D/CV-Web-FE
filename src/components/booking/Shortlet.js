import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Shortlet = (props) =>{
    const { type, property } = props;
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [duration, setDuration] = useState(0);
    const currency = useSelector(state=>state.CurrencyReducer.currency);
    const rates = useSelector(state=>state.CurrencyReducer.rates);

    const payNow = (purpose)=>{
        sessionStorage.removeItem('postLoginRedirect');
        if(!sessionStorage.getItem('userToken')){
            setShowLoginPrompt(true);
            return;
        }
        if(purpose !== 'inspection'){
            if(startDate == '' || endDate == ''){
                alert("Please select start and end dates.");
                return;
            }
        }
        sessionStorage.setItem('propertyForPayment', JSON.stringify({
            purpose, 
            name: property.name, 
            fee: purpose == 'inspection' ? Number(property.inspection_fee) * rates[currency] : Number(property.total_price) * rates[currency] * (duration !== 0 ? duration : 1) + Number(property.inspection_fee), 
            id: property.id, 
            durationDays:startDate && endDate ? duration : null, 
            startDate:startDate ? startDate : null,
            paid: property.paid
        }));
        navigate(`/pay-now`);
    }    

    const setDayDiff = (checkoutDate) => {  
        const start = new Date(startDate);
        const end = new Date(checkoutDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        setDuration(diffDays);
        setEndDate(checkoutDate);
    }

    return (
        <div className="">
            <div
                className="card booking-card shadow-sm sticky-top border-0"
                style={{ top: 100, borderRadius: "12px" }}
            >
                <div className="card-body p-0">
                {/* DATE INPUTS */}
                <div className="p-4 border-bottom">
                    <div class="mb-1">
                        <label class="form-label small text-muted mb-1">Check In</label>
                        <input onChange={(e)=>setStartDate(e.target.value)} type="date" class="form-control rounded-2" min={new Date().toISOString().split("T")[0]} />
                    </div>                                                      
                    <div class="mt-3">
                        <label class="form-label small text-muted mb-1">Check Out</label>
                        <input onChange={(e)=>setDayDiff(e.target.value)} type="date" class="form-control rounded-2" min={startDate} value={endDate} />
                    </div>
                </div>

                <div className="bg-light">

                    <div className="px-4 py-3 bg-light">
                        <h4 className="fw-bold mb-2">{Number(property.total_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</h4>
                        <span className="text-muted">/ per day</span>

                        <button onClick={()=>payNow(property.category)} className="btn btn-success w-100 mb-3 mt-2">
                            <span className="small">Book Now</span>
                        </button>
                        {/* <div className="mt-3 dropdown">
                            <button className="btn btn-success w-100 mb-3 mt-2 dropddown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Book Now
                            </button>
                            <ul className="dropdown-menu w-75 text-center p-2">
                                <li>
                                <button onClick={()=>payNow('inspection')} className="btn btn-success w-100 mb-2">
                                    Book Now for Inspection
                                </button>
                                </li>
                                <li>
                                    I Want to Buy Now! <br />
                                <button onClick={()=>payNow(property.category)} className="btn btn-white border w-100">
                                    <span className="small">Proceed to Check out</span>
                                </button>
                                </li>
                            </ul>
                        </div> */}

                        <button disabled={property.phone_number == null} onClick={()=>window.open(`https://wa.me/${property.phone_number}`)} className="btn btn-outline-dark w-100">
                            Contact Agent
                        </button>
                    </div>

                    <p className="small fw-bold text-center text-info mt-1">
                        {property.paid == 1 ? (<><i className="fa fa-danger"></i> Not Available</>) : (<><i className="fa fa-success"></i> Available for {property.category}</>)}
                    </p>

                    {/* PRICE DETAILS */}
                    <div className="px-4 py-3 border-top">
                        <h6 className="fw-bold small mb-2">Price Details</h6>
                        <div className="d-flex justify-content-between small mb-1">
                            <span>Apartment shortlet x {duration} day{duration > 1 ? "s" : ""}</span>
                            <span className="fw-semibold">{Number((property.total_price * rates[currency]) * duration).toLocaleString('en-NG', {style: 'currency', currency})}</span>
                        </div>                        
                        <div className="d-flex justify-content-between small mb-1">
                            <span>Caution Fee</span>
                            <span className="fw-semibold">{Number((property.inspection_fee * rates[currency])).toLocaleString('en-NG', {style: 'currency', currency})}</span>
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

            <Dialog open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)}>
                <DialogTitle className="fw-bold">Login Required</DialogTitle>
                <DialogContent>
                    <p>You need to log in before you can continue.</p>
                    <Button
                        variant="contained" 
                        fullWidth 
                        onClick={() => { navigate('/login'); sessionStorage.setItem('postLoginRedirect', window.location.pathname); }}
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

export default Shortlet;