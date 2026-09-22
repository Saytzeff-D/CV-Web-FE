import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, CircularProgress } from "@mui/material";
import { LocationOnOutlined, AccessTime } from "@mui/icons-material";
import { useParams } from "react-router-dom";
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

const PropertyDetailsMain = () => {
  const { id } = useParams();
  const uri = useSelector((state) => state.UriReducer?.uri);

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  useEffect(() => {
    if (id) {
      const realId = decodePropertyId(id);
      fetchPropertyDetails(realId);
    }
  }, [id]);

  // Unauthenticated public request
  const fetchPropertyDetails = async (propertyId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${uri}property/${propertyId}`);
      setProperty(res.data?.data || res.data);
    } catch (err) {
      console.error("Failed to load property details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !property) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
        <Navbar />
        <CircularProgress sx={{ color: "#017E53" }} />
      </Box>
    );
  }

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

      {/* 1. Header & Image Gallery with Save Feature */}
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
          {/* Top Pill and Availability Indicator */}
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

          {/* Property Name */}
          <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", fontSize: { xs: "24px", sm: "32px" }, mb: 1 }}>
            {property?.name}
          </Typography>

          {/* Address */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#64748B", mb: 3.5 }}>
            <LocationOnOutlined sx={{ fontSize: 16, color: "#017E53" }} />
            <Typography variant="body2" sx={{ fontSize: "13px", fontWeight: 500 }}>
              {property?.address || "Lagos, Nigeria"}
            </Typography>
          </Box>

          {/* Dynamic Property Highlights Grid */}
          <PropertyHighlightsGrid property={property} />

          {/* Hotel Specific: Room Types & Pricing */}
          {isHotel && <HotelRoomTypesSection rooms={property.room_types} />}

          {/* Description Section */}
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

          {/* Dynamic Categorized or Pill Amenities */}
          {!isHotel && <CategorizedAmenitiesSection property={property} />}

          {/* Location Map Insight & Trust Badge */}
          <PropertyLocationAndTrust property={property} />
        </Box>

        {/* Right Section: Type-Specific Sidebar */}
        <PropertySidebarBooking property={property} />
      </Box>
    </Box>
  );
};

export default PropertyDetailsMain;