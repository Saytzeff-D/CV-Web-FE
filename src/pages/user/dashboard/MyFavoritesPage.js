import React, { useState } from "react";
import { IconButton, Box, Typography, Card, CardContent, Divider, Pagination } from "@mui/material";
import { Favorite, BedOutlined, BathtubOutlined, AspectRatioOutlined, VisibilityOutlined, ChevronRight } from "@mui/icons-material";

const MyFavoritesPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Buy", "Shortlet", "Rent"];

  const properties = [
    {
      id: 1,
      tag: "Rent",
      type: "Apartment",
      rating: "4.9",
      title: "Woodland Emerald Apartment",
      location: "1012 Ocean Avenue, Victoria Island, Lagos",
      beds: 3,
      baths: 2,
      size: "1,850 Sqft",
      price: "₦1,250,000/yr",
      views: "1.2k views",
      trend: "+12% this week",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80",
    },
    {
      id: 2,
      tag: "Buy",
      type: "Hotel",
      rating: "5.0",
      title: "The Grand Marquis Villa",
      location: "Plot 45, Banana Island Road, Ikoyi, Lagos",
      beds: 5,
      baths: 6,
      size: "4,200 Sqft",
      price: "₦450,000,000",
      views: "890 views",
      trend: "+12% this week",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
    },
    {
      id: 3,
      tag: "Shortlet",
      type: "Apartment",
      rating: "4.7",
      title: "Skyline Shortlet Studio",
      location: "Tower B, Eko Atlantic City, Lagos",
      beds: 1,
      baths: 1,
      size: "550 Sqft",
      price: "₦85,000/night",
      views: "2.5k views",
      trend: "+12% this week",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
    },
    {
      id: 4,
      tag: "Rent",
      type: "House",
      rating: "4.8",
      title: "Terrace Garden House",
      location: "No 12, Lekki Phase 1, Opposite Filmhouse",
      beds: 4,
      baths: 4,
      size: "2,100 Sqft",
      price: "₦4,500,000/yr",
      views: "1.1k views",
      trend: "+12% this week",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
    {
      id: 5,
      tag: "Buy",
      type: "Penthouse",
      rating: "4.9",
      title: "Penthouse at The Palms",
      location: "Upper Floor, Wuse II, Abuja",
      beds: 3,
      baths: 4,
      size: "2,800 Sqft",
      price: "₦120,000,000",
      views: "2.2k views",
      trend: "+12% this week",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80",
    },
  ];

  return (
    <div className="container-fluid px-0 py-4">
      {/* 1. TOP TITLE HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">My Favorites</h3>
          <Typography variant="body2" color="text.secondary">
            You have {properties.length} premium properties saved in your portfolio.
          </Typography>
        </div>

        {/* Action Toggle Filters */}
        <div className="bg-white p-1.5 rounded-pill d-flex gap-1 shadow-sm border border-light">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn rounded-pill px-3 py-1.5 border-0 text-capitalize"
              style={{
                fontSize: "13px",
                fontWeight: activeTab === tab ? "600" : "400",
                backgroundColor: activeTab === tab ? "#22C55E" : "transparent",
                color: activeTab === tab ? "#fff" : "#6C757D",
                transition: "all 0.2s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. CORE SYSTEM GRID LAYOUT CONTAINER */}
      <div className="row g-4">
        
        {/* LEFT COMPONENT COLUMN: PROPERTIES LIST STACK */}
        <div className="col-xl-8 col-lg-7">
          <div className="d-flex flex-column gap-3">
            {properties.map((item) => (
              <Card 
                key={item.id} 
                elevation={0} 
                className="rounded-4 border-0 shadow-sm overflow-hidden"
                sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, border: "1px solid #F3F4F6" }}
              >
                {/* Property Image Block */}
                <Box className="position-relative" sx={{ width: { xs: "100%", sm: "240px" }, height: "200px", flexShrink: 0 }}>
                  <img src={item.image} alt={item.title} className="w-100 h-100 object-fit-cover" />
                  <span 
                    className="position-absolute badge rounded-pill fw-semibold px-3 py-1.5"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", color: "#111827", fontSize: "11px", left: "15px", top: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
                  >
                    {item.tag}
                  </span>
                </Box>

                {/* Property Details Column */}
                <CardContent sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    {/* Tags row layout */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex gap-2 align-items-center">
                        <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: "10px", fontWeight: "600" }}>{item.type}</span>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#FBBF24" }}>★ {item.rating}</span>
                      </div>
                      <IconButton size="small" sx={{ color: "#EF4444", backgroundColor: "#FEF2F2", "&:hover": { backgroundColor: "#FEE2E2" } }}>
                        <Favorite fontSize="small" />
                      </IconButton>
                    </div>

                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "16px", color: "#111827", mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", mb: 3 }}>
                      📍 {item.location}
                    </Typography>

                    {/* Meta Specifications row */}
                    <div className="d-flex gap-4 text-muted mb-3 flex-wrap" style={{ fontSize: "13px" }}>
                      <div className="d-flex align-items-center gap-1"><BedOutlined fontSize="small" /> {item.beds} Beds</div>
                      <div className="d-flex align-items-center gap-1"><BathtubOutlined fontSize="small" /> {item.baths} Baths</div>
                      <div className="d-flex align-items-center gap-1"><AspectRatioOutlined fontSize="small" /> {item.size}</div>
                    </div>
                  </div>

                  <Divider sx={{ my: 1.5, borderColor: "#F3F4F6" }} />

                  {/* Financials & Action Bottom Row */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                      <small className="text-uppercase text-muted d-block" style={{ fontSize: "10px", fontWeight: 600 }}>Price Range</small>
                      <span className="fw-bold text-success" style={{ fontSize: "16px" }}>{item.price}</span>
                    </div>

                    <div className="d-flex align-items-center gap-4">
                      <div className="text-end d-none d-md-block">
                        <small className="text-muted d-block" style={{ fontSize: "12px" }}>
                          <VisibilityOutlined sx={{ fontSize: 14, verticalAlign: "middle", mr: 0.5 }} />
                          {item.views}
                        </small>
                        <span className="text-success d-block" style={{ fontSize: "11px", fontWeight: 500 }}>{item.trend}</span>
                      </div>
                      <button className="btn btn-outline-dark rounded-pill px-3.5 py-1.5 fw-semibold" style={{ fontSize: "13px", borderColor: "#E5E7EB" }}>
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: INTERACTIVE MARKETING SIDEBAR WIDGETS */}
        <div className="col-xl-4 col-lg-5">
          <div className="d-flex flex-column gap-4 position-sticky" style={{ top: "24px" }}>
            
            {/* Widget Box A: Property Listing CTA Banner */}
            <div 
              className="card border-0 p-4 text-white rounded-4 shadow-sm position-relative overflow-hidden" 
              style={{ 
                backgroundColor: "#0B2545", 
                backgroundImage: "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent)",
                minHeight: "220px" 
              }}
            >
              <h5 className="fw-bold mb-2 style-title" style={{ maxWidth: "200px", lineHeight: "1.4" }}>
                Want to list your own property?
              </h5>
              <p className="mb-4" style={{ fontSize: "12px", opacity: 0.7, maxWidth: "240px" }}>
                Earn up to ₦2.5M monthly by listing your property with our premium tools.
              </p>
              <button 
                className="btn w-100 rounded-pill py-2.5 fw-bold text-white shadow-sm" 
                style={{ backgroundColor: "#22C55E", border: 0, fontSize: "14px" }}
              >
                Get Started Now
              </button>
            </div>

            {/* Widget Box B: Market Insights Newsletter Module */}
            <div className="card border-0 p-4 rounded-4 shadow-sm bg-white" style={{ border: "1px solid #F3F4F6" }}>
              <div className="d-flex gap-2.5 align-items-start mb-3">
                <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#EFF6FF", color: "#3B82F6" }}>
                  📬
                </div>
                <div>
                  <h6 className="fw-bold text-dark mb-0.5" style={{ fontSize: "14px" }}>Market Insights</h6>
                  <small className="text-muted" style={{ fontSize: "11px" }}>Daily property trends & price changes</small>
                </div>
              </div>

              <div className="mb-3">
                <input 
                  type="email" 
                  className="form-control rounded-3 py-2 px-3 border-light-subtle" 
                  placeholder="email@example.com" 
                  style={{ fontSize: "13px", backgroundColor: "#FAFAFA" }}
                />
              </div>
              <button className="btn btn-light text-secondary w-100 rounded-pill py-2 fw-semibold" style={{ fontSize: "13px", backgroundColor: "#E5E7EB", border: 0 }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PAGINATION INTERFACE FOOTER */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Pagination
          count={12}
          shape="rounded"
          size="medium"
          sx={{
            "& .MuiPaginationItem-root": {
              fontWeight: 600,
              fontSize: "13px",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              mx: 0.5,
              background: "#fff",
              "&.Mui-selected": {
                backgroundColor: "#111827",
                color: "#ffffff",
                borderColor: "#111827",
                "&:hover": {
                  backgroundColor: "#1F2937",
                },
              },
            },
          }}
        />
      </Box>
    </div>
  );
};

export default MyFavoritesPage;