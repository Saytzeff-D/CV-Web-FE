import React from "react";

const Newsletter = () => {
    return (
        <div className="container my-5 bg-newsletter p-4">
            <div className="newsletter p-5 rounded-5 d-flex justify-content-center">
                <div className="col-md-4 py-5">
                    <h1 className="text-center fs-1 fw-bold">Stay in the loop</h1>
                    <p className="text-center fs-6 mb-4">
                        Subscribe to our newsletter
                    </p>
                    <div className="d-flex justify-content-center">
                        <input
                            type="email"
                            className="form-control me-2 rounded-5"
                            placeholder="Email address"
                            aria-label="Email"
                        />
                        <button className="btn bg-theme" type="submit">
                            <i className="fa fa-arrow-up"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;