import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createAccountSchema } from "../../../schemas";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert } from "@mui/material";

const CreateAccount = () => {
    const uri = useSelector(state=>state.uri)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgent: false,
      professional_type: '',
      experience_level: '',
      phone_number: ''
    },
    validationSchema: createAccountSchema,
    onSubmit: (values) => {
      setError('')
      setIsSubmitting(true);
      axios.post(`${uri}auth/register`, values)
      .then((res)=>{
        setIsSubmitting(false);
        console.log(res.data);
        sessionStorage.setItem('tempUserEmail', values.email);
        navigate('/create-account/verify')
      })
      .catch((err)=>{
        setIsSubmitting(false);
        console.log(err);
        err.response ? setError(err.response.data.message) : setError('An error occurred')
      })
    }
  })  

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
                    {error &&
                        <Alert severity="error" className="mb-3">
                            {error}
                        </Alert>
                    }
                <div className="row">
                    <div className="col-6 mb-3">
                    <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        className={`form-control ${touched.firstname && errors.firstname ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        name="lastname"
                        className={`form-control ${touched.lastname && errors.lastname ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    name="email"                
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
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
                    name="isAgent"
                    id="agentSwitch"
                    checked={values.isAgent}
                    onChange={handleChange}
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
                {values.isAgent && (
                    <>
                    <div className="mb-3">
                        <label
                        className="form-label fw-medium"
                        style={{ fontSize: "13px" }}
                        >
                        Professional Type
                        </label>
                        <select
                        name="professional_type"
                        className={`form-select ${touched.professional_type && errors.professional_type ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            border: "1px solid #e9e9e9",
                            height: "42px",
                            fontSize: "14px",
                        }}
                        >
                        <option defaultValue value={''}>Select your category</option>
                        <option value={'real_estate_agent'}>Real Estate Agent</option>
                        <option value={'property_manager'}>Property Manager</option>
                        <option value={'developer'}>Developer</option>
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
                        name="experience_level"
                        className={`form-select ${touched.experience_level && errors.experience_level ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{
                            border: "1px solid #e9e9e9",
                            height: "42px",
                            fontSize: "14px",
                        }}
                        >
                        <option defaultValue value={''}>Select level</option>
                        <option value={'Beginner'}>Beginner</option>
                        <option value={'Intermediate'}>Intermediate</option>
                        <option value={'Expert'}>Expert</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-medium" style={{ fontSize: "13px" }}>
                        Phone Number
                        </label>
                        <input
                        name="phone_number"
                        type="tel"
                        className={`form-control ${touched.phone_number && errors.phone_number ? 'is-invalid' : ''}`}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                    onClick={handleSubmit}
                    type="submit"
                    className="btn w-100 fw-semibold"
                    disabled={isSubmitting}
                    style={{
                    backgroundColor: "#004225",
                    color: "#fff",
                    borderRadius: "6px",
                    height: "45px",
                    }}
                >
                    {isSubmitting ? 'Please wait...' : 'Create Account'}
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