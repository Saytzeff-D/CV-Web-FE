import { Alert, Snackbar, Dialog, DialogContent } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PayNow = () => {
  const [inspectionDate, setInspectionDate] = useState("");
  const navigate = useNavigate();
  const currency  = useSelector(state=>state.CurrencyReducer.currency)
  const [propertyForPayment, setPropertyForPayment] = useState(null);
  const uri = useSelector(state=>state.UriReducer.uri)
  const [openDialog, setOpenDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem('propertyForPayment')) {
      navigate(-1);
      return;
    }
    setPropertyForPayment(JSON.parse(sessionStorage.getItem('propertyForPayment')));
  }, [navigate]);

  const handlePay = () => {
    setOpenDialog(true);
    setErrorMessage('')
    const value = {
      currency,
      propertyId: propertyForPayment.id,
      purpose: propertyForPayment.type == 'inspection' ? 'inspection_fee' : propertyForPayment.type,
      inspectionDate
    }
    axios.post(`${uri}payment/property/initialize`, value, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
    }).then((response) => {
      window.location.href = response.data.paymentLink;
      console.log("Payment initiation response:", response.data);      
    }).catch((error) => {
      setOpenDialog(false);
      setErrorMessage("Failed to initiate payment. Please try again.");
      console.error("Error initiating payment:", error);
      // alert("Failed to initiate payment. Please try again.");
    });
  };

  return (
    <div className="container-fluid py-5">
      <div className="d-flex justify-content-center my-4">

        {/* LEFT COLUMN */}
        <div className="col-md-5">
          <h4 className="fw-bold">Pay Now</h4>

          {
            propertyForPayment && propertyForPayment.type === 'inspection' && (
              <Alert severity="info" className="mt-3">
                You are about to pay for an inspection of <strong>{propertyForPayment.name}</strong> scheduled on <strong>{inspectionDate || "N/A"}</strong>.
              </Alert>
            )
          }
          {
            propertyForPayment && propertyForPayment.type !== 'inspection' && (
              <Alert severity="info" className="mt-3">
                You are about to pay for the purchase of <strong>{propertyForPayment.name}</strong>.
              </Alert>
            )
          }

          <h5 className="fw-semibold mt-4">{propertyForPayment && propertyForPayment.name}</h5>

          <h2 className="fw-bold mt-3">{Number(propertyForPayment && propertyForPayment.fee).toLocaleString('en-NG', {style: 'currency', currency})}</h2>
          <small className="text-muted">{propertyForPayment && propertyForPayment.type === 'inspection' ? 'per Inspection' : 'outright'}</small>

          <div className="border-bottom my-3"></div>

          {/* DATE PICKER */}
          {
            propertyForPayment && propertyForPayment.type === 'inspection' && (
              <div className="mb-4">
                <label className="form-label fw-semibold">Select Inspection Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={inspectionDate}
                  onChange={(e) => setInspectionDate(e.target.value)}
                />
              </div>
            )
          }
          <button onClick={()=>handlePay()} className="btn btn-success">
            Check Out
          </button>
          <button onClick={()=>navigate(-1)} className="btn btn-danger ms-3">
            Cancel
          </button>

        </div>
      </div>
        <div className="mt-5 bg-light px-0">
        <div className="container p-5">
            <p className="h5 fw-bold">Purchase Rules</p>
            <p className="">
                When renting or booking a shortlet property, it’s essential to carefully consider the financial implications to ensure the rental fits your budget and provides value for your money. Here are key financial tips to help guide you through the process of renting or shortletting a property, ensuring that you make an informed decision while managing your finances wisely.
            </p>
            <p>
                First, it's important to review your budget before committing to a rental or shortlet property. Start by calculating your total monthly income and expenses to determine how much you can comfortably allocate to rent. Experts often recommend that rent should not exceed 30% of your monthly income to ensure financial stability. Additionally, consider the costs beyond rent, such as utilities, maintenance fees, and other living expenses that may be required during your stay. Short-term rentals often include utilities in the rent, but it’s important to confirm what is covered and what you’ll need to pay separately.
            </p>
        </div>
        </div>

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

      <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PayNow;