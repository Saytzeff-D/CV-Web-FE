import React, { useState, useEffect } from "react";
import { IconButton, Box, Typography, Card, CardContent, Divider, Pagination, CircularProgress } from "@mui/material";
import { Favorite, BedOutlined, BathtubOutlined, AspectRatioOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const MyFavoritesPage = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem('userToken')

  // State Management
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  
  // Pagination State
  const [page, setPage] = useState(1);
  const rowsPerPage = 4; // Set how many items you want displayed per view frame

  const filterTabs = ["All", "Buy", "Shortlet", "Rent"];

  // 1. DATA LIFECYCLE: Fetch Saved Portfolio Properties via Axios
  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    axios
      .get(`${uri}customer/saved-properties`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Fetched favorites portfolio data:", res.data);
        // Fallback checks to prevent blank screen structure failures
        setProperties(res.data.savedProperties);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorites portfolio data:", err);
        setIsLoading(false);
      });
  }, [uri, token]);

  // 2. FILTER MECHANIC: Filter properties list based on active structural tags
  const filteredProperties = properties.filter((item) => {
    if (activeTab === "All") return true;
    return item.tag?.toLowerCase() === activeTab.toLowerCase();
  });

  // 3. PAGINATION CALCULATION MECHANICS: Slice filtered properties array index positions
  const totalPages = Math.ceil(filteredProperties.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + rowsPerPage);

  // Tab switch modifier reset handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // Reset back to page 1 on active tab modifications
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress sx={{ color: "#22C55E" }} />
      </Box>
    );
  }

  return (
    <div className="container-fluid px-0 py-4">
      {/* TITLE HEADER */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h3 className="fw-bold text-dark mb-1">My Favorites</h3>
          <Typography variant="body2" color="text.secondary">
            You have {filteredProperties.length} premium properties saved under this view filter.
          </Typography>
        </div>

        {/* Action Toggle Filters */}
        <div className="bg-white p-1.5 rounded-pill d-flex gap-1 shadow-sm border border-light">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
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

      {/* CORE SYSTEM GRID LAYOUT CONTAINER */}
      <div className="row g-4">
        
        {/* LEFT COLUMN: PAGINATED PROPERTIES LIST */}
        <div className="col-xl-8 col-lg-7">
          <div className="d-flex flex-column gap-3">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((item) => (
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
              ))
            ) : (
              <Box className="text-center py-5 bg-white rounded-4 border shadow-sm">
                <Typography color="text.secondary">No matching favorite properties found.</Typography>
              </Box>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MARKETING SIDEBAR WIDGETS */}
        <div className="col-xl-4 col-lg-5">
          <div className="d-flex flex-column gap-4 position-sticky" style={{ top: "24px" }}>
            <div 
              className="card border-0 p-4 text-white rounded-4 shadow-sm position-relative overflow-hidden" 
              style={{ 
                backgroundColor: "#0B2545", 
                backgroundImage: "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent)",
                minHeight: "220px" 
              }}
            >
              <h5 className="fw-bold mb-2 style-title" style={{ maxWidth: "200px", lineHeight: "1.4" }}>Want to list your own property?</h5>
              <p className="mb-4" style={{ fontSize: "12px", opacity: 0.7, maxWidth: "240px" }}>Earn up to ₦2.5M monthly by listing your property with our premium tools.</p>
              <button className="btn w-100 rounded-pill py-2.5 fw-bold text-white shadow-sm" style={{ backgroundColor: "#22C55E", border: 0, fontSize: "14px" }}>
                Get Started Now
              </button>
            </div>

            <div className="card border-0 p-4 rounded-4 shadow-sm bg-white" style={{ border: "1px solid #F3F4F6" }}>
              <div className="d-flex gap-2.5 align-items-start mb-3">
                <div className="rounded-3 p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#EFF6FF", color: "#3B82F6" }}>📬</div>
                <div>
                  <h6 className="fw-bold text-dark mb-0.5" style={{ fontSize: "14px" }}>Market Insights</h6>
                  <small className="text-muted" style={{ fontSize: "11px" }}>Daily property trends & price changes</small>
                </div>
              </div>
              <div className="mb-3">
                <input type="email" className="form-control rounded-3 py-2 px-3 border-light-subtle" placeholder="email@example.com" style={{ fontSize: "13px", backgroundColor: "#FAFAFA" }} />
              </div>
              <button className="btn btn-light text-secondary w-100 rounded-pill py-2 fw-semibold" style={{ fontSize: "13px", backgroundColor: "#E5E7EB", border: 0 }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PAGINATION BLOCK */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
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
                  "&:hover": { backgroundColor: "#1F2937" },
                },
              },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default MyFavoritesPage;