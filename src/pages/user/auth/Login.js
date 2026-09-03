import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../../../schemas";
import axios from "axios";
import { Alert } from "@mui/material";
import { ArrowBackOutlined, LaunchOutlined } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const uri = useSelector(state => state.UriReducer.uri);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState('');

  // Replace this with your actual agent subdomain endpoint URL
  const AGENT_SUBDOMAIN_URL = "https://agent.cvproperties.co"; 

  useEffect(() => {    
    const params = new URLSearchParams(location.search);
    const errorParam = params.get('error');    
    if (errorParam) {
      setErr(errorParam);
    }
  }, [location.search]);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: ''      
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setError('');
      setIsLoading(true);
      axios.post(`${uri}auth/login`, values)
      .then((res)=>{
        if (res.data?.role == "customer") {
          sessionStorage.setItem("userToken", res.data.token);
          sessionStorage.setItem("route", "/user");
          navigate("/user");
        } else {
          setIsLoading(false);
          setError("Access restricted: This portal is exclusively for registered CV Properties Buyers or Renters.");
        }        
      })
      .catch((err)=>{
        setIsLoading(false);
        console.log(err);
        err.response ? setError(err.response.data.message) : setError('An error occurred');
      });
    }
  });

  const verifyNow = (e) => {
    e.preventDefault();
    sessionStorage.setItem('tempUserEmail', values.email);
    navigate('/create-account/verify');
  };

  return (
    <>        
      <div
        className="d-flex justify-content-center align-items-center py-4 position-relative"
        style={{ minHeight: "100vh" }}
      >
        {/* ESCAPE CONTAINER: BACK TO MAIN HOMEPAGE LINK */}
        <div 
          onClick={() => navigate('/')} 
          className="position-absolute d-flex align-items-center gap-2 text-muted fw-semibold"
          style={{ top: "24px", left: "24px", cursor: "pointer", fontSize: "14px" }}
        >
          <ArrowBackOutlined sx={{ fontSize: 16 }} /> Back to Homepage
        </div>

        <div
          className="bg-white"
          style={{                    
            padding: "40px 32px",
            width: "100%",
            maxWidth: "440px",
          }}
        >
          {/* Header */}
          <h4 className="text-center fw-bold mb-1" style={{ color: "#111827" }}>Sign In Account</h4>
          <p
            className="text-center text-muted mb-4"
            style={{ fontSize: "14px" }}
          >
            Welcome back! Please enter your details.
          </p>

          {/* AGENT ROUTING BANNER NOTICE */}
          <Alert 
            severity="info" 
            className="mb-4"
            sx={{ 
              borderRadius: "8px", 
              fontSize: "12.5px", 
              fontWeight: 500,
              "& .MuiAlert-message": { width: "100%" } 
            }}
          >
            Are you a property manager or agent?{" "}
            <a 
              href={AGENT_SUBDOMAIN_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="fw-bold text-decoration-none d-inline-flex align-items-center gap-1"
              style={{ color: "#0284c7" }}
            >
              Go to Agent Portal <LaunchOutlined sx={{ fontSize: 11 }} />
            </a>
          </Alert>

          {/* Social Buttons */}
          <div className="d-grid gap-2 mb-3">
            <button
              type="button"
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
              type="button"
              onClick={() => window.location.href = `${uri}auth/google/login`}
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
            {error && (
              <Alert severity="error" className="mb-3" sx={{ borderRadius: "8px" }}>
                {error}. {error.toLowerCase().includes('verify your email') && (
                  <a 
                    href="#verify"
                    onClick={verifyNow}
                    className="fw-bold"
                    style={{ cursor: "pointer", color: "#ef4444" }}
                  >
                    Click here
                  </a>
                )}
              </Alert>
            )}
            
            {err && <Alert severity="error" className="mb-3" sx={{ borderRadius: "8px" }}>{err}</Alert>}
            
            <div className="mb-3">
              <label className="form-label fw-medium" style={{ fontSize: "13px", color: "#4b5563" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                placeholder="falanayemi@example.com"
                style={{
                  border: "1px solid #e5e7eb",
                  height: "42px",
                  fontSize: "14px",
                  borderRadius: "6px"
                }}
              />              
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label fw-medium" style={{ fontSize: "13px", color: "#4b5563" }}>
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
                  border: "1px solid #e5e7eb",
                  height: "42px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  paddingRight: "40px"
                }}
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "38px",
                  cursor: "pointer",
                  color: "#9ca3af",
                  zIndex: 5
                }}
              />              
            </div>          

            <button
              type="submit"
              className="btn w-100 fw-semibold mt-2"
              disabled={isLoading}
              style={{
                backgroundColor: "#004225",
                color: "#fff",
                borderRadius: "6px",
                height: "45px",
                fontSize: "15px"
              }}
            >
              {isLoading ? 'Please wait...' : 'Login'}
            </button>

            <p className="text-center mt-3 mb-0" style={{ fontSize: "13px", color: "#4b5563" }}>
              No account?{" "}
              <Link to={'/create-account'} className="fw-semibold text-success text-decoration-none">
                Create Account
              </Link>
            </p>
            <p className="text-center mt-2 mb-0" style={{ fontSize: "13px" }}>
              <Link to={'/forgot-password'} className="fw-semibold text-muted text-decoration-none">
                Forgot Password?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;