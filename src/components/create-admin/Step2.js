import React, { useState } from "react";

const Step2 = (props) => {
  const {setStep} = props;
  const [verified, setVerified] = useState(false);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 bg-create-admin"
    >
      <div className="bg-opacity-75 p-4 rounded-4" style={{ width: "100%", maxWidth: "600px" }}>
        {/* Header */}
        <div className="mb-4">
          <h5 className="fw-bold text-success mb-1">Create Account For Administrator</h5>
          <p className="text-muted small mb-0">Verify your information to get started</p>
        </div>

        {/* Step Progress */}
        <div className="d-flex justify-content-center align-items-center mb-4">
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="bg-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>          
          <div className="flex-grow-1 border-top border-success mx-2"></div>
          <div className="border border-success rounded-circle" style={{ width: "14px", height: "14px" }}></div>
        </div>
        <p className="text-center text-success small fw-semibold mb-4">Step 2 of 3</p>

        {/* Form */}
        <div>
          <p className="text-success fs-3" >
            Verify your Email address
          </p>
          <p>
            We sent you an OTP code to your Email <span className="fw-bold">{sessionStorage.getItem('adminEmail')}</span>
          </p>
          {
            verified && 
            <div className="d-flex justify-content-center">
              <span className="bg-success text-white py-2 px-4 rounded-3 mb-2">
                Email Verified
              </span>
              <span className="bg-success text-white text-center rounded-circle mb-2 ms-3" style={{ width: "30px", height: "30px"}}>
                <i className="fa fa-check"></i>
              </span>
            </div>
          }
          <input className="form-control bg-transparent py-2" placeholder="Enter OTP" />
          <button className="btn btn-success mt-4">
            Submit
          </button>
          {
            verified &&
            <div className="d-flex justify-content-center">
            <button className="btn btn-success px-4 mt-5" onClick={()=>setStep(3)}>
                Continue
              </button>
            </div>
          
          }
        </div>
      </div>
    </div>
  );
}

export default Step2;