const Booking = (props) => {
    const { type } = props;
    return (
        <div>
            {
                type == 'rent'
                ?
                <div className="">
                    <div
                        className="card booking-card shadow-sm sticky-top border-0"
                        style={{ top: 100, borderRadius: "12px" }}
                    >
                        <div className="card-body p-0">
                        {/* DATE INPUTS */}
                        <div className="p-4 border-bottom">
                            <div class="mb-1">
                                <label class="form-label small text-muted mb-1">Start</label>
                                <input type="date" class="form-control rounded-2" value="2024-10-07" />
                            </div>
                            <div>
                                <label class="form-label small text-muted mb-1">End</label>
                                <input type="date" class="form-control rounded-2" value="2025-10-07" />
                            </div>
                        </div>

                        <div className="bg-light">

                            <div className="px-4 py-3 bg-light">
                                <span className="fw-bold mb-0 h4">₦4,000,000</span>
                                <span className="text-muted">/ per year</span>

                                <button className="btn btn-success w-100 my-3">
                                Check Availability
                                </button>

                                <button className="btn btn-outline-dark w-100">
                                Contact Agent
                                </button>
                            </div>

                            <p className="small text-center text-muted mt-1">
                                You won’t be charged yet
                            </p>

                            {/* PRICE DETAILS */}
                            <div className="px-4 py-3 border-top">
                                <h6 className="fw-bold small mb-2">Price Details</h6>
                                <div className="d-flex justify-content-between small mb-1">
                                <span>Apartment rent × 1 year</span>
                                <span className="fw-semibold">₦3,500,000</span>
                                </div>
                                <div className="d-flex justify-content-between small mb-1">
                                <span>Agent & Cleaning Fee</span>
                                <span className="fw-semibold">₦40,000</span>
                                </div>
                                <div className="d-flex justify-content-between small">
                                <span>C&V Services Fee</span>
                                <span className="fw-semibold">₦10,000</span>
                                </div>
                            </div>

                            {/* BENEFITS */}
                            <div className="px-4 py-3 border-top">
                                <h6 className="fw-bold small mb-2">Benefits</h6>
                                <ul className="list-unstyled small text-muted mb-0">
                                <li>✔ First-hand Experience of the Property</li>
                                <li>✔ High-Speed Wi-Fi & Smart Amenities</li>
                                <li>✔ 24/7 Support & Security</li>
                                <li>✔ Privacy and Comfort</li>
                                </ul>
                            </div>
                        </div>                        
                        </div>
                    </div>
                </div>
                :
                <div className="card booking-card shadow-sm sticky-top" style={{ top: 100 }}>
                    <div className="card-body p-0">
                        <div className="px-4 pt-4">
                        <span className="h4 fw-bold mb-0">₦30,000,000</span>
                        <small className="text-muted">outright</small>
                        <p className="my-0">
                            Ibeju land for {type}
                        </p>
                        <p className="text-muted py-0">
                            Harmony Estate, GRA Phase 1, Magodo, Lagos
                        </p>
                        </div>

                        <div className="mt-3 bg-light p-3">
                        <span className="fw-bold h4">₦5,000</span>
                        <span className="small text-muted mb-2"> / inspection</span>
                        <button className="btn btn-success w-100 mb-3 mt-2">Schedule for Inspection</button>
                        <button className="btn btn-outline-dark w-100">Contact Agent</button>
                        <p className="small py-2 text-center">
                            You won’t be charged yet
                        </p>                  
                        <h6 className="fw-bold small mb-2">Schedule for inspection</h6>
                        <ul className="small text-muted mb-0 ps-3 booking">
                            <li className="booking-features">
                            First-hand experience of the property
                            </li>
                            <li className="booking-features">
                            Assess land features
                            </li>
                            <li className="booking-features">
                            Verify zoning and land use
                            </li>
                            <li className="booking-features">
                            Identify any land issues
                            </li>
                        </ul>
                        </div>

                    </div>
                </div>
            }

        </div>
    )
}

export default Booking;