import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { newsletterSchema } from "../schemas";

const Newsletter = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const [feedback, setFeedback] = useState({ message: "", isError: false });
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  // Formik & Yup Validation Setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: newsletterSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmittingState(true);
      setFeedback({ message: "", isError: false });

      axios
        .post(`${uri}newsletter/subscribe`, values)
        .then((res) => {
          setFeedback({
            message: res.data.message || "Thank you for subscribing! 🎉",
            isError: false,
          });
          resetForm();
        })
        .catch((err) => {
          console.error("Newsletter submission error:", err);
          setFeedback({
            message: err.response?.data?.message || "Something went wrong. Please try again.",
            isError: true,
          });
        })
        .finally(() => {
          setIsSubmittingState(false);
        });
    },
  });

  return (
    <div className="mx-md-5 my-5 bg-newsletter p-md-4">
      <div className="newsletter rounded-md-5">
        <div className="inner-box d-flex justify-content-center p-md-5 p-3 rounded-md-5">
          <div className="col-lg-5 col-md-7 col-12 py-5">
            <h1 className="text-center fs-1 fw-bold">Stay in the loop</h1>
            <p className="text-center text-grey fs-6 mb-4">
              Subscribe to our newsletter for the latest property updates
            </p>

            {/* Form Wrap */}
            <form onSubmit={formik.handleSubmit}>
              <div className="d-flex justify-content-center newsletter-input-wrapper position-relative">
                <input
                  type="email"
                  name="email"
                  className={`form-control form-control-lg me-2 rounded-5 ${
                    formik.touched.email && formik.errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Enter your email address"
                  aria-label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={isSubmittingState}
                />
                <button 
                  className="btn send-btn me-1" 
                  type="submit"
                  disabled={isSubmittingState}
                >
                  {isSubmittingState ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <i className="fa fa-arrow-right"></i>
                  )}
                </button>
              </div>

              {/* Validation Client Error Message */}
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger small text-center mt-2 fw-medium">
                  {formik.errors.email}
                </div>
              )}

              {/* Backend Feedback Messages */}
              {feedback.message !== '' && (
                <div 
                  className={`small text-center mt-2 fw-bold ${
                    feedback.isError ? "text-danger" : "text-success"
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;