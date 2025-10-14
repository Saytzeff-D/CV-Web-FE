import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAgent, setIsAgent] = useState(false);
  const navigate = useNavigate()

  const register = (e) => {
    e.preventDefault();
    navigate('/create-account/verify')
  }

  return (
    <>        
        <div
            className="d-flex justify-content-center align-items-center py-1"
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
                <h4 className="text-center fw-semibold mb-1">Create Account</h4>
                <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "14px" }}
                >
                Fill in the information to get started
                </p>

                {/* Social Buttons */}
                <div className="d-grid gap-2 mb-3">
                <button
                    className="btn d-flex align-items-center justify-content-center border my-0"
                    style={{
                    borderRadius: "6px",
                    backgroundColor: "#fafafa",
                    fontWeight: 500,
                    padding: "10px",
                    }}
                >
                    <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple"
                    style={{ height: "18px", marginRight: "8px" }}
                    />
                    Apple
                </button>
                <button
                    className="btn d-flex align-items-center justify-content-center border my-0"
                    style={{
                    borderRadius: "6px",
                    backgroundColor: "#fafafa",
                    fontWeight: 500,
                    padding: "10px",
                    }}
                >
                    <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    style={{ height: "18px", marginRight: "8px" }}
                    />
                    Google
                </button>
                </div>

                {/* Divider */}
                <div
                className="d-flex align-items-center text-muted mb-3"
                style={{ fontSize: "13px" }}
                >
                    <div className="flex-grow-1 border-bottom" />
                    <span className="px-2">or</span>
                    <div className="flex-grow-1 border-bottom" />
                </div>

                {/* Form */}
                <form>
                <div className="row">
                    <div className="col-6 mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Temi"
                        style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                        }}
                    />
                    </div>
                    <div className="col-6 mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Falana"
                        style={{
                        border: "1px solid #e9e9e9",
                        height: "42px",
                        fontSize: "14px",
                        }}
                    />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Email Address
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

                {/* TOGGLE SWITCH */}
                <div className="form-check form-switch mb-3">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    id="agentSwitch"
                    checked={isAgent}
                    onChange={() => setIsAgent(!isAgent)}
                    style={{
                        width: "42px",
                        height: "22px",
                        cursor: "pointer",
                    }}
                    />
                    <label
                    className="form-check-label ms-2 fw-medium"
                    htmlFor="agentSwitch"
                    style={{ fontSize: "13px" }}
                    >
                        Become an agent?
                    </label>
                </div>

                {/* CONDITIONAL FIELDS */}
                {isAgent && (
                    <>
                    <div className="mb-3">
                        <label
                        className="form-label fw-medium"
                        style={{ fontSize: "13px" }}
                        >
                        Professional Type
                        </label>
                        <select
                        className="form-select"
                        style={{
                            border: "1px solid #e9e9e9",
                            height: "42px",
                            fontSize: "14px",
                        }}
                        >
                        <option value="">Select your category</option>
                        <option>Real Estate Agent</option>
                        <option>Property Manager</option>
                        <option>Developer</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label
                        className="form-label fw-medium"
                        style={{ fontSize: "13px" }}
                        >
                        Experience Level
                        </label>
                        <select
                        className="form-select"
                        style={{
                            border: "1px solid #e9e9e9",
                            height: "42px",
                            fontSize: "14px",
                        }}
                        >
                        <option value="">Select level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        className="form-control"
                        placeholder="+234..."
                        style={{
                            border: "1px solid #e9e9e9",
                            height: "42px",
                            fontSize: "14px",
                        }}
                        />
                    </div>
                    </>
                )}


                <button
                    onClick={(e) => register(e)}
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
                    Do you have an account?{" "}
                    <Link to={'/login'} className="fw-semibold text-decoration-none">
                        Sign in
                    </Link>
                </p>
                </form>
            </div>
            </div>
    </>
  );
}

export default CreateAccount;