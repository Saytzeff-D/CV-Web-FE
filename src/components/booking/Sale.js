import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sale = (props) =>{
    const { type, property } = props;
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();    
    const [duration, setDuration] = useState(0);
    const currency = useSelector(state=>state.CurrencyReducer.currency);
    const rates = useSelector(state=>state.CurrencyReducer.rates);

    const payNow = (purpose)=>{
        sessionStorage.removeItem('postLoginRedirect');
        if(!sessionStorage.getItem('userToken')){
            setShowLoginPrompt(true);
            return;
        }        
        sessionStorage.setItem('propertyForPayment', JSON.stringify({purpose, name: property.name, fee: purpose == 'inspection' ? Number(property.inspection_fee) * rates[currency] : Number(property.total_price) * rates[currency] * (duration !== 0 ? duration : 1), id: property.id}));
        navigate(`/pay-now`);
    }        

    return (
        <div className="card booking-card shadow-sm sticky-top" style={{ top: 100 }}>
            <div className="card-body p-0">
                <div className="px-4 pt-4">
                <span className="fw-bold mb-2 h5">{Number(property.total_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</span>
                <small className="text-muted">outright</small>
                <p className="my-0">
                    {property.name}
                </p>
                <p className="text-muted py-0">
                    {property.address}
                </p>
                </div>

                <div className="mt-3 bg-light p-3">
                <span className="fw-bold mb-2 h5">{Number(property.inspection_fee * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</span>
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
                        <button onClick={()=>payNow(property.category)} className="btn btn-white border w-100">
                            <span className="small">Proceed to Check out</span>
                        </button>
                        </li>
                    </ul>
                </div>
                <button disabled={property.phone_number == null} onClick={()=>window.open(`https://wa.me/${property.phone_number}`)} className="btn btn-outline-dark w-100">
                    Contact Agent
                </button>
                <p className="small fw-bold text-center text-info mt-1">
                    {property.paid == 1 ? (<><i className="fa fa-danger"></i> Not Available</>) : (<><i className="fa fa-success"></i> Available for {property.category}</>)}
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

export default Sale;