import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import { LocationOnOutlined, AccessTime } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { decodePropertyId } from "../../../utils/idObfuscator";
import PropertyDetailsGallery from "./components/PropertyDetailsGallery";
import PropertyHighlightsGrid from "./components/PropertyHighlightsGrid";
import HotelRoomTypesSection from "./components/HotelRoomTypesSection";
import CategorizedAmenitiesSection from "./components/CategorizedAmenitiesSection";
import PropertySidebarBooking from "./components/PropertySidebarBooking";
import PropertyLocationAndTrust from "./components/PropertyLocationAndTrust";
import Navbar from "../../../components/Navbar";

// Import your unused PropertyNotFound component
import PropertyNotFound from "./components/PropertyNotFound"; // <-- Update this import path to match your file location

const PropertyDetailsMain = () => {
  const { id } = useParams();  
  const uri = useSelector((state) => state.UriReducer?.uri);

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const realId = decodePropertyId(id);

      // If the ID was tampered with and decodePropertyId returned null/undefined/NaN
      if (!realId || isNaN(Number(realId))) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      fetchPropertyDetails(realId);
    } catch (decodeErr) {
      console.warn("Invalid or tampered property ID parameter:", decodeErr);
      setNotFound(true);
      setLoading(false);
    }
  }, [id, uri]);

  const fetchPropertyDetails = async (propertyId) => {
    try {
      setLoading(true);
      setNotFound(false);
      
      const res = await axios.get(`${uri}property/${propertyId}`);

      const propData = res.data?.data || res.data;

      if (!propData) {
        setNotFound(true);
      } else {
        setProperty(propData);
      }
    } catch (err) {
      console.error("Failed to load property details:", err);

      // 404 (Not Found), 400 (Bad Request), or 422 (Unprocessable) -> Trigger Not Found
      if (err.response?.status === 404 || err.response?.status === 400 || err.response?.status === 422) {
        setNotFound(true);        
      } else {
        // Other unexpected errors (e.g. 500 server down) can also route to not-found
        setNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#FFFFFF" }}>
        <Navbar />
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <CircularProgress sx={{ color: "#017E53" }} />
        </Box>
      </Box>
    );
  }

  // 2. Tampered ID or Property Not Found
  if (notFound || !property) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#FAFBFC" }}>
        <Navbar />
        <PropertyNotFound />
      </Box>
    );
  }

  // 3. Regular Property Details
  const type = (property?.type || "").toLowerCase().trim();
  const isHotel = type === "hotel";
  const isEventCenter = type === "event_center" || type === "event center";

  const descriptionTitle = isEventCenter ? "Venue Description" : "Description";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1300,
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        boxSizing: "border-box",
        bgcolor: "#FFFFFF",
      }}
    >
      <Navbar />

      {/* 1. Header & Image Gallery */}
      <PropertyDetailsGallery property={property} />

      {/* 2. Main Details & Sidebar Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: isHotel ? "1fr 300px" : "1fr 380px" },
          gap: { xs: 4, lg: 6 },
          alignItems: "start",
        }}
      >
        {/* Left Section */}
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1, flexWrap: "wrap" }}>
            <Chip
              label={
                isHotel
                  ? "LUXURY HOTEL"
                  : isEventCenter
                  ? "BANQUET HALL"
                  : `${property?.category?.toUpperCase() || "RENT"} • ${property?.type?.toUpperCase() || "APARTMENT"}`
              }
              size="small"
              sx={{ bgcolor: "#ECFDF5", color: "#017E53", fontWeight: 800, fontSize: "10px", height: 22, borderRadius: "6px" }}
            />
            <Typography variant="caption" sx={{ color: "#94A3B8", display: "flex", alignItems: "center", gap: 0.5, fontSize: "11px" }}>
              <AccessTime sx={{ fontSize: 13 }} />
              {isEventCenter ? "Open for Bookings" : isHotel ? "Available Now" : "Available Immediately"}
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", fontSize: { xs: "24px", sm: "32px" }, mb: 1 }}>
            {property?.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#64748B", mb: 3.5 }}>
            <LocationOnOutlined sx={{ fontSize: 16, color: "#017E53" }} />
            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 500 }}>
              {property?.address || "Lagos, Nigeria"}
            </Typography>
          </Box>

          <PropertyHighlightsGrid property={property} />

          {isHotel && <HotelRoomTypesSection rooms={property.room_types} />}

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2 }}>
              {descriptionTitle}
            </Typography>
            <Box
              sx={{
                p: isEventCenter ? 3 : 0,
                borderRadius: isEventCenter ? "16px" : 0,
                border: isEventCenter ? "1px solid #E2E8F0" : "none",
                bgcolor: isEventCenter ? "#FAFAFA" : "transparent",
                "& p": { m: 0, mb: 1, fontSize: "13px", color: "#475569", lineHeight: 1.7 },
              }}
            >
              {property?.about ? (
                <div dangerouslySetInnerHTML={{ __html: property.about }} />
              ) : (
                <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px", lineHeight: 1.7 }}>
                  {property?.description ||
                    `${property?.name} is designed to cater to sophisticated gatherings and quality living. Located in a prime area, it combines aesthetics, security, and professional management.`}
                </Typography>
              )}
            </Box>
          </Box>

          {!isHotel && <CategorizedAmenitiesSection property={property} />}

          <PropertyLocationAndTrust property={property} />
        </Box>

        {/* Right Section */}
        <PropertySidebarBooking property={property} />
      </Box>
    </Box>
  );
};

export default PropertyDetailsMain;