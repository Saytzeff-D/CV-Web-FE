import { Dialog, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import resetPasswordSuccessImage from '../../../assets/passkey 1.png'

const ResetPassword = () => {  
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const reset = () => {        
        setOpen(true)
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
                <h4 className="text-center fw-semibold mb-1">Set New Password</h4>
                <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "14px" }}
                >
                    Must be atleast 8 characters
                </p>
                                
                {/* Form */}
                <div>               
                <div className="mb-3 position-relative">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Password
                    </label>
                    <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="••••••••"
                    style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                    }}
                    />
                    <i
                    className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: "absolute",
                        right: "12px",
                        top: "36px",
                        cursor: "pointer",
                        color: "#aaa",
                    }}
                    ></i>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                    }}
                    />
                </div>

                <button
                    onClick={reset}
                    type="submit"
                    className="btn w-100 fw-semibold"
                    style={{
                    backgroundColor: "#004225",
                    color: "#fff",
                    borderRadius: "6px",
                    height: "45px",
                    }}
                >
                    Reset Password
                </button>                
                </div>
            </div>
        </div>

        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogContent>
                <div className="p-5 text-center">
                    <img src={resetPasswordSuccessImage} alt="Reset Password" className="img-fluid" />
                    <p className="h5 fw-semibold mt-3">
                        Password Reset Successful
                    </p>
                    <p className="text-muted" style={{ fontSize: "14px" }}>
                        You can now log in with your new password to access your account.
                    </p>
                    <p className="text-center mt-3 mb-0" style={{ fontSize: "13px" }}>                    
                        <Link to={'/login'} className="fw-semibold">
                            <i className="fa fa-arrow-left"></i> Back to Login
                        </Link>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    </>
  );
}

export default ResetPassword;