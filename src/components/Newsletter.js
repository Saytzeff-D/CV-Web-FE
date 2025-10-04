import React from "react";

const Newsletter = () => {
    return (
        <div className="mx-md-5 my-5 bg-newsletter p-md-4">
            <div className="newsletter rounded-md-5">
                <div className="inner-box d-flex justify-content-center p-md-5 p-3 rounded-md-5">
                    <div className="col-lg-4 col-md-6 col-12 py-5">
                        <h1 className="text-center fs-1 fw-bold">Stay in the loop</h1>
                        <p className="text-center text-grey fs-6 mb-4">
                            Subscribe to our newsletter
                        </p>
                        <div className="d-flex justify-content-center newsletter-input-wrapper">                            
                            <input
                                type="email"
                                className="form-control form-control-lg me-2 rounded-5"
                                placeholder="Email address"
                                aria-label="Email"
                            />
                            <button className="btn send-btn me-1" type="submit">
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;