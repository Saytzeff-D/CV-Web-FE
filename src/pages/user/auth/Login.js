import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSchema } from "../../../schemas";
import axios from "axios";
import { Alert } from "@mui/material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const uri = useSelector(state=>state.uri)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setError('')
      setIsLoading(true)
      axios.post(`${uri}auth/login`, values)
      .then((res)=>{
        console.log(res.data);
        // Handle successful login
      })
      .catch((err)=>{
        setIsLoading(false)
        console.log(err);
        err.response ? setError(err.response.data.message) : setError('An error occurred')
      })
    }
  })

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
                <h4 className="text-center fw-semibold mb-1">Sign In Account</h4>
                <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "14px" }}
                >
                Welcome back! Please enter your details.
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
                <form onSubmit={handleSubmit}>       
                    {error && <Alert severity="error" className="mb-3">{error}</Alert>}
                <div className="mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                    Email Address
                    </label>
                    <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
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
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
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

                <button
                    type="submit"
                    className="btn w-100 fw-semibold"
                    disabled={isLoading}
                    style={{
                    backgroundColor: "#004225",
                    color: "#fff",
                    borderRadius: "6px",
                    height: "45px",
                    }}
                >
                    {isLoading ? 'Please wait...' : 'Login'}
                </button>

                <p className="text-center mt-3 mb-0" style={{ fontSize: "13px" }}>
                    No account?{" "}
                    <Link to={'/create-account'} className="fw-semibold">
                        Create Account
                    </Link>
                </p>
                <p className="text-center mt-4" style={{ fontSize: "13px" }}>
                    <Link to={'/forgot-password'} className="fw-semibold">
                        Forgot Password
                    </Link>
                </p>
                </form>
            </div>
            </div>
    </>
  );
}

export default Login;