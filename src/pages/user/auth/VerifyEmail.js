import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {  
    const navigate = useNavigate()

    const verify = () => {
        navigate('/login')
        // Verification logic here
    }

  return (
    <>        
        <div
            className="d-flex justify-content-center align-items-center py-2"
            style={{ minHeight: "100vh" }}
        >
            <div
                className=""
                style={{                            
                padding: "40px 32px",
                width: "100%",
                maxWidth: "420px",
                }}
            >
                {/* Header */}
                <h4 className="text-center fw-semibold mb-1">Lets verify your email</h4>
                <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "14px" }}
                >
                    Check <b>Sogojames@gmail.com</b> to verify your account and get started
                </p>
                                
                {/* Form */}
                <div>               
                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Enter Code
                    </label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="falanayemi.com"
                    style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                    }}
                    />
                </div>                            

                <button
                    onClick={verify}
                    type="submit"
                    className="btn w-100 fw-semibold"
                    style={{
                    backgroundColor: "#004225",
                    color: "#fff",
                    borderRadius: "6px",
                    height: "45px",
                    }}
                >
                    Continue
                </button>

                <p className="text-center mt-3 mb-0" style={{ fontSize: "13px" }}>                    
                    <Link to={'/create-account'} className="fw-semibold">
                        Resend
                    </Link>
                </p>
                </div>
            </div>
            </div>
    </>
  );
}

export default VerifyEmail;