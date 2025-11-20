import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Rent from "./booking/Rent";
import Shortlet from "./booking/Shortlet";
import Sale from "./booking/Sale";

const Booking = (props) => {
    const { type, property } = props;
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();    

    return (
        <div>
            {
                type == 'rent'
                ?
                <Rent type={type} property={property} />
                :
                type == 'shortlet'
                ?
                <Shortlet type={type} property={property} />
                :
                <Sale type={type} property={property} />
            }

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

export default Booking;