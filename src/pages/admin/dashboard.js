import React from "react";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="bg-admin">
        <div className="inner-bg-admin">
            <Navbar />
            <div className="container py-5">
            {/* ===== Header ===== */}
            <header className="mb-5">            
                <p className="gradient-text fw-semibold display-3 py-md-5 py-3 about-text">
                    Administrator<br /> Dashboard
                </p>
            </header>

            {/* ===== Property / Content Management ===== */}
            <section className="mb-5">
                <h4 className="fw-semibold mb-4 text-success">
                Property / Content Management
                </h4>
                <div className="row g-4 w-100">
                {[
                    "Add Property",
                    "Edit Property",
                    "Delete Property",
                    "Add Blog",
                    "Edit Blog",
                    "Delete Blog",
                    "Manage FAQ/About",
                    "Management Review",
                ].map((title, i) => (
                    <div key={i} className="col-6 col-md-3 px-md-5 px-2">
                    <div
                        className="card text-center fw-semibold shadow-sm border-success card-custom"                                
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >
                        <div className="card-body py-4">
                        <p className="card-title fw-medium mb-2">{title}</p>
                        <i className="bi bi-plus-lg text-success fs-5"></i>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>

            {/* ===== Agent Management ===== */}
            <section className="mb-5">
                <h4 className="fw-semibold mb-4 text-success">Agent Management</h4>
                <div className="row g-4 w-100">
                {[
                    "Add / Verify New Agent",
                    "Suspend / Remove Agent",
                    "Assign Properties to Agent",
                    "Accept / Reject Agent Registration",
                    "Verify Agent Document",
                    "Flag / Remove Agent Properties",
                ].map((title, i) => (
                    <div key={i} className="col-6 col-md-3 px-md-5 px-2">
                    <div
                        className="card text-center fw-semibold shadow-sm border-success card-custom"                
                    >
                        <div className="card-body py-4">
                        <p className="card-title fw-medium mb-2">{title}</p>
                        <i className="bi bi-person-check text-success fs-5"></i>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>

            {/* ===== Transaction / Payment Management ===== */}
            <section>
                <h4 className="fw-semibold mb-4 text-success">
                Transaction / Payment Management
                </h4>
                <div className="row g-4 w-100">
                {[
                    "Approve / Reject Agent Payment",
                    "Management Property Listing Payment",
                    "Track Property Performance",
                    "View All Property Inquiries",
                    "View Financial Report",
                ].map((title, i) => (
                    <div key={i} className="col-6 col-md-3 px-md-5 px-2">
                    <div
                        className="card text-center fw-semibold shadow-sm border-success card-custom"                
                    >
                        <div className="card-body py-4">
                        <p className="card-title fw-medium mb-2">{title}</p>
                        <i className="bi bi-credit-card text-success fs-5"></i>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </section>
            </div>
        </div>
    </div>
  );
}

export default AdminDashboard;