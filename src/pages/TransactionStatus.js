import Paid from '../assets/paid.png'
import PaidFail from '../assets/paid-fail.png'
import { useNavigate } from 'react-router-dom';
import React from 'react';

const TransactionStatus = () => {
    const navigate = useNavigate();
    const [success, setSuccess] = React.useState(false);

    return (
        <div className="d-flex justify-content-center">
            {
                success
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
                <div className="col-lg-5 col-md-8 p-5 text-center">
                    <img src={PaidFail} alt="Payment Failed" />
                    <p className="fw-bold h2 pt-3 pb-0">Oops!</p>
                    <p className="text-secondary fw-semibold h4 py-0">Transaction Failed</p>
                    <small className="text-muted py-5 px-5">Unfortunately, we couldn’t complete your transaction. Please try again or contact support for assistance</small>
                    <div className="pt-4">
                        <button className='btn btn-success' onClick={()=>navigate('/pay-now')}>
                            Try Again
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TransactionStatus;