import Paid from '../assets/paid.png'
import PaidFail from '../assets/paid-fail.png'
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const TransactionStatus = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(true);
    const uri = useSelector(state=>state.UriReducer.uri)
    const [tryAgain, setTryAgain] = React.useState(false);

    useEffect(()=>{
        const queryParams = new URLSearchParams(window.location.search);
        const ref = queryParams.get('trxref');
        axios.get(`${uri}payment/verify/${ref}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
        })
        .then((res)=>{
            console.log("Payment verification response:", res.data);
            setSuccess(res.data.status === 'success' ? true : false);
            setOpenDialog(false);
        }).catch((error) => {
            console.error("Error verifying payment:", error);
            setSuccess(false);
            setOpenDialog(false);
        });
    }, [tryAgain, uri]);

    return (
        <div className="d-flex justify-content-center">
            {
                success && !openDialog
                ?
                <div className="col-lg-5 col-md-8 p-5 text-center">
                    <img src={Paid} alt="Payment Successful" />
                    <p className="fw-bold h2 pt-3 pb-0">Congratulations!</p>
                    <p className="text-secondary fw-semibold h4 py-0">Your transaction is complete</p>
                    <small className="text-muted py-5 px-5">Thank you for the payment. We've received your payment and are processing your transaction</small>
                    <div className="pt-4">
                        <button className='btn btn-success' onClick={()=>navigate('/client/dashboard')}>
                            Go to Dashboard
                        </button>
                    </div>
                </div>
                :
                !success && !openDialog &&
                <div className="col-lg-5 col-md-8 p-5 text-center">
                    <img src={PaidFail} alt="Payment Failed" />
                    <p className="fw-bold h2 pt-3 pb-0">Oops!</p>
                    <p className="text-secondary fw-semibold h4 py-0">Transaction Failed</p>
                    <small className="text-muted py-5 px-5">Unfortunately, we couldn’t complete your transaction. Please try again or contact support for assistance</small>
                    <div className="pt-4">
                        <button className='btn btn-success' onClick={()=>setTryAgain(!tryAgain)}>
                            Try Again
                        </button>
                    </div>
                </div>
            }

            <Dialog open={openDialog} PaperProps={{
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
        </div>
    )
}

export default TransactionStatus;