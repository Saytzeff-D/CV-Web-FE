import React from "react";
import { 
  Avatar, 
  Chip, 
  IconButton, 
  Typography, 
  Box 
} from "@mui/material";
import { 
  ChevronRight, 
  LocationOnOutlined, 
  FavoriteBorder, 
  Favorite,
  HeadsetMicOutlined,
  PersonOutlineOutlined
} from "@mui/icons-material";
import { Table, TableBody, TableCell, TableContainer, TableHead, Row } from "@mui/material";
import { useNavigate } from "react-router-dom";
const propertyThumb = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=100&auto=format&fit=crop&q=60";
const propertyHero1 = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60";
const propertyHero2 = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60";

const GridDashboard = (props) => {
  const { userData, bookings, savedProperties, transactions } = props
  const navigate = useNavigate()  

  return (
    <div className="container-fluid px-0 mt-5">
      {/* ROW 1: Recent Bookings & Client Profile */}
      <div className="row g-4">
        {/* Recent Bookings Card Container */}
        <div className="col-xl-8 col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-1">Recent Bookings</h5>
                <small className="text-muted">Manage your active and upcoming property visits</small>
              </div>
              <button className="btn btn-link text-dark fw-bold text-decoration-none d-flex align-items-center gap-1 btn-sm">
                View All <ChevronRight fontSize="small" />
              </button>
            </div>

            {/* Bookings Stack */}
            <div className="d-flex flex-column gap-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="d-flex align-items-center justify-content-between p-2 rounded-3 hover-bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <img 
                      src={propertyThumb} 
                      alt={booking.title} 
                      className="rounded-3 object-fit-cover" 
                      style={{ width: 56, height: 56 }}
                    />
                    <div>
                      <h6 className="fw-bold mb-1" style={{ fontSize: "15px" }}>{booking.title}</h6>
                      <small className="text-muted d-block" style={{ fontSize: "12px" }}>
                        📅 {booking.date}
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <span className="fw-bold d-block" style={{ fontSize: "15px" }}>{booking.price}</span>
                    <Chip 
                      label={booking.status} 
                      size="small" 
                      color={booking.color}
                      variant="soft"
                      sx={{ 
                        mt: 0.5, 
                        fontSize: "11px", 
                        fontWeight: 600,
                        backgroundColor: booking.color === "success" ? "#E8F5E9" : "#FFF3E0",
                        color: booking.color === "success" ? "#2E7D32" : "#E65100"
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Profile Card Container */}
        <div className="col-xl-4 col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 text-center overflow-hidden h-100">
            <div style={{ background: "#F3F4F6", height: "90px" }} />
            <div className="px-4 pb-4 position-relative" style={{ marginTop: "-45px" }}>
              <Avatar
                src={userData?.avatar}
                sx={{ width: 90, height: 90, margin: "0 auto", border: "4px solid white", boxShadow: "0px 4px 12px rgba(0,0,0,0.05)" }}
              />
              <h5 className="fw-bold mt-3 mb-1">{userData?.firstname} {userData?.lastname}</h5>
              <small className="text-muted d-block mb-4">Premium Client since 2022</small>

              <div className="row bg-light rounded-4 py-3 px-2 g-0 mb-4">
                <div className="col-6 border-end">
                  <span className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>KYC Status</span>
                  <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>Verified</span>
                </div>
                <div className="col-6">
                  <span className="text-muted d-block text-uppercase fw-semibold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>Tier</span>
                  <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>Gold Elite</span>
                </div>
              </div>

              <button onClick={()=>navigate('/user/profile')} className="btn btn-dark w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2">
                <PersonOutlineOutlined fontSize="small" /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Saved Properties & Need Help Support Module */}
      <div className="row g-4 mt-4">
        {/* Left Sub-Header Section */}
        <div className="col-10">
          <h5 className="fw-bold mb-1">Saved Properties</h5>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-link text-muted fw-semibold text-decoration-none btn-sm">
            Manage Favorites
          </button>
        </div>

        {/* Properties Cards Stack */}
        {savedProperties.map((property) => (
          <div className="col-xl-4 col-md-6" key={property.id}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
              {/* Media Container Box */}
              <Box className="position-relative" style={{ height: "200px" }}>
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-100 h-100 object-fit-cover"
                />
                {/* Scrim Mask Layer */}
                <Box 
                  className="position-absolute top-0 start-0 w-100 h-100"
                  sx={{ background: "linear-gradient(180deg, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.75) 100%)" }}
                />
                
                {/* Available Status Chip */}
                <span 
                  className="position-absolute top-3 start-3 badge rounded-pill fw-bold px-3 py-2"
                  style={{ backgroundColor: "rgba(0,180,216,0.85)", backdropFilter: "blur(4px)", fontSize: "11px", left: "15px", top: "15px" }}
                >
                  {property.status}
                </span>

                {/* Price and Content Layer over Media bounding frame */}
                <div className="position-absolute bottom-0 start-0 p-3 text-white">
                  <h4 className="fw-bold mb-0">{property.price}</h4>
                  <small style={{ opacity: 0.85 }}>{property.title}</small>
                </div>
              </Box>

              {/* Lower Details Row */}
              <div className="card-body px-3 py-3 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center text-muted gap-1">
                  <LocationOnOutlined fontSize="small" />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>{property.location}</span>
                </div>
                <IconButton size="small" sx={{ color: "#EF4444" }}>
                  <Favorite fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        ))}

        {/* Right CTA Container: Need Help Block */}
        <div className="col-xl-4 col-md-12">
          <div 
            className="card border-0 p-4 h-100 text-center d-flex flex-column justify-content-center align-items-center text-white rounded-4"
            style={{ backgroundColor: "#11141A", minHeight: "260px" }}
          >
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{ width: 50, height: 50, background: "rgba(255,255,255,0.06)" }}
            >
              <HeadsetMicOutlined sx={{ color: "#fff" }} />
            </div>
            <h5 className="fw-bold mb-2">Need any help?</h5>
            <p className="text-muted px-3 mb-4" style={{ fontSize: "13px", lineHeight: "1.5" }}>
              Our 24/7 support team is here for your real estate concerns.
            </p>
            <button 
              className="btn w-100 rounded-pill py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
  
    <div className="container-fluid px-0 mt-5">
      {/* TRANSACTION HISTORY SECTION */}
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
            {/* Header row inside card */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Transaction History</h5>
              <button className="btn btn-link text-dark fw-bold text-decoration-none d-flex align-items-center gap-1 btn-sm">
                View All <ChevronRight fontSize="small" />
              </button>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="table-responsive">
              <table className="table table-borderless align-middle mb-0">
                <thead>
                  <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <th className="text-muted fw-semibold pb-3" style={{ fontSize: "13px" }}>Date</th>
                    <th className="text-muted fw-semibold pb-3" style={{ fontSize: "13px" }}>Type</th>
                    <th className="text-muted fw-semibold pb-3" style={{ fontSize: "13px" }}>Amount</th>
                    <th className="text-muted fw-semibold pb-3" style={{ fontSize: "13px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="py-3 text-secondary" style={{ fontSize: "14px" }}>{tx.date}</td>
                      <td className="py-3 fw-bold text-dark" style={{ fontSize: "14px" }}>{tx.type}</td>
                      <td 
                        className="py-3 fw-bold" 
                        style={{ 
                          fontSize: "14px", 
                          color: tx.isNegative ? "#000000" : "#2E7D32" 
                        }}
                      >
                        {tx.amount}
                      </td>
                      <td className="py-3">
                        {tx.status === "Successful" ? (
                          <Chip 
                            label="Successful" 
                            size="small"
                            sx={{ 
                              fontSize: "12px", 
                              fontWeight: 500,
                              backgroundColor: "#EAEAEA", 
                              color: "#4A4A4A" 
                            }} 
                          />
                        ) : (
                          <span className="text-muted fw-semibold" style={{ fontSize: "13px" }}>
                            Processing
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default GridDashboard;