import React from "react";
import { Box, Paper, Typography, Chip, IconButton } from "@mui/material";
import {
  LocationOnOutlined,
  CheckCircleOutline,
  Tune,
  Bolt,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { encodePropertyId } from "../../../utils/idObfuscator";

// Clean snake_case/raw strings to clean readable labels
const cleanLabel = (val) => {
  if (!val || typeof val !== "string") return "";
  return val
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
};

export const formatNgn = (val) => {
  const num = Number(val || 0);
  return `₦${Math.round(num).toLocaleString("en-NG")}`;
};

// Ribbon pill at the bottom-left of the image banner
const getStatusRibbon = (item) => {
  if (item.type === "event_center") return "Top Rated";
  if (item.type === "hostel") return "Student-Friendly";
  if (item.type === "hotel") return "Luxury";
  if (item.type === "land") return "Investment";
  if (item.category === "sale") return "Premium";
  return "Verified";
};

// Selects 3 distinct, type-appropriate string features (strictly avoiding beds/baths)
const getDynamicFeatures = (property) => {
  const type = (property?.type || "").toLowerCase().trim();
  const amenitiesList = Array.isArray(property?.amenities) ? property.amenities : [];
  let specs = [];

  switch (type) {
    case "event_center":
    case "event center":
      if (property.capacity) specs.push(`${Number(property.capacity).toLocaleString()} Capacity`);
      if (property.hall_type) specs.push(cleanLabel(property.hall_type));
      if (property.arrangement) specs.push(`${cleanLabel(property.arrangement)} Setup`);
      if (property.event_type_supported) specs.push(cleanLabel(property.event_type_supported));
      break;

    case "land":
      if (property.land_size) {
        const isNum = !isNaN(Number(property.land_size));
        specs.push(isNum ? `${Number(property.land_size).toLocaleString()} SQM` : property.land_size);
      }
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      if (property.category) specs.push(`For ${cleanLabel(property.category)}`);
      break;

    case "shortlet":
    case "hotel":
      if (property.furnishing_level) specs.push(cleanLabel(property.furnishing_level));
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;

    case "hostel":
      if (property.gender_preference) specs.push(`${cleanLabel(property.gender_preference)} Only`);
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;

    case "apartment":
    case "house":
    default:
      if (property.furnishing_level) specs.push(cleanLabel(property.furnishing_level));
      if (property.bathroom_type) specs.push(`${cleanLabel(property.bathroom_type)} Bath`);
      if (property.vacancy_status) specs.push(cleanLabel(property.vacancy_status));
      break;
  }

  // Backfill with available amenities if under 3 features
  amenitiesList.forEach((amenity) => {
    const label = typeof amenity === "string" ? amenity : amenity?.name;
    if (label && specs.length < 3 && !specs.includes(label)) {
      specs.push(label);
    }
  });

  // Fallback items to ensure exactly up to 3 pills appear
  const defaults = ["Verified Space", "Ample Parking", "24/7 Power"];
  defaults.forEach((def) => {
    if (specs.length < 3 && !specs.includes(def)) {
      specs.push(def);
    }
  });

  return specs.slice(0, 3);
};

const PropertyListingCard = ({ property }) => {
  const navigate = useNavigate();

  if (!property) return null;

  const {
    id,
    name,
    title,
    address,
    location,
    category,
    type,
    total_price,
    price_per_year,
    price_per_night,
    price_per_day,
    base_price,
    main_photo,
    pricing_type,
  } = property;

  const displayName = name || title || "Property Listing";
  const displayAddress = (address || location || "Nigeria").toUpperCase();
  const statusRibbon = getStatusRibbon(property);

  // Price resolution
  const resolvedPrice =
    category === "rent" && Number(price_per_year) > 0
      ? price_per_year
      : category === "shortlet" && Number(price_per_night) > 0
      ? price_per_night
      : type === "event_center" && Number(price_per_day) > 0
      ? price_per_day
      : total_price ?? base_price ?? 0;

  const displayPrice = formatNgn(resolvedPrice);

  // Suffix formatting matching Figma
  const priceSuffix =
    pricing_type
      ? `/ ${pricing_type}`
      : category === "rent"
      ? "/ per year"
      : category === "shortlet"
      ? "/ per night"
      : type === "event_center"
      ? "/ per day"
      : type === "land"
      ? "/ per plot"
      : "";

  const features = getDynamicFeatures(property);

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`/property/${encodePropertyId(id)}`)}
      sx={{
        borderRadius: "28px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        bgcolor: "#F8FAFC",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s ease",
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 14px 30px rgba(0,0,0,0.08)",
        },
      }}
    >
      {/* 1. IMAGE BANNER */}
      <Box sx={{ position: "relative", height: 230, width: "100%", bgcolor: "#E2E8F0" }}>
        {main_photo ? (
          <Box
            component="img"
            src={main_photo}
            alt={displayName}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box sx={{ width: "100%", height: "100%", bgcolor: "#E2E8F0" }} />
        )}

        {/* Top-Left Category & Type Badges */}
        <Box
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.8,
          }}
        >
          {category && (
            <Chip
              label={category.toUpperCase()}
              size="small"
              sx={{
                bgcolor: "#017E53",
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "10.5px",
                height: 24,
                borderRadius: "8px",
                px: 0.5,
              }}
            />
          )}
          {type && (
            <Chip
              label={cleanLabel(type).toUpperCase()}
              size="small"
              sx={{
                bgcolor: "rgba(238, 242, 246, 0.95)",
                color: "#1E293B",
                fontWeight: 800,
                fontSize: "10.5px",
                height: 24,
                borderRadius: "8px",
                px: 0.5,
                backdropFilter: "blur(4px)",
              }}
            />
          )}
        </Box>

        {/* Top-Right Filter / Tune Button */}
        <Box sx={{ position: "absolute", top: 14, right: 14 }}>
          <IconButton
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: 38,
              height: 38,
              bgcolor: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: "#FFFFFF" },
            }}
          >
            <Tune sx={{ fontSize: 18, color: "#1E293B" }} />
          </IconButton>
        </Box>

        {/* Bottom-Left Status Banner */}
        <Box sx={{ position: "absolute", bottom: 12, left: 14 }}>
          <Chip
            label={statusRibbon}
            size="small"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.55)",
              backdropFilter: "blur(8px)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "11px",
              height: 22,
              borderRadius: "8px",
              px: 0.5,
            }}
          />
        </Box>
      </Box>

      {/* 2. CARD CONTENT */}
      <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1, bgcolor: "#F8FAFC" }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 900,
            color: "#0F172A",
            fontSize: "18px",
            mb: 0.4,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.3px",
          }}
        >
          {displayName}
        </Typography>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, mb: 2 }}>
          <LocationOnOutlined sx={{ fontSize: 15, color: "#017E53", flexShrink: 0 }} />
          <Typography
            variant="caption"
            sx={{
              fontSize: "11px",
              color: "#64748B",
              fontWeight: 800,
              letterSpacing: "0.5px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {displayAddress}
          </Typography>
        </Box>

        {/* Feature Pills */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
          {features.map((feat, idx) => (
            <Box
              key={idx}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                bgcolor: "#EFF2F6",
                px: 1.4,
                py: 0.6,
                borderRadius: "14px",
              }}
            >
              <CheckCircleOutline sx={{ fontSize: 13, color: "#017E53" }} />
              <Typography
                variant="caption"
                sx={{
                  fontSize: "11.5px",
                  color: "#334155",
                  fontWeight: 700,
                }}
              >
                {feat}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Pricing Strategy Footer */}
        <Box
          sx={{
            mt: "auto",
            pt: 2,
            borderTop: "1px solid #E2E8F0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: "#94A3B8",
                fontSize: "10px",
                letterSpacing: "0.5px",
                display: "block",
                textTransform: "uppercase",
                mb: 0.3,
              }}
            >
              PRICING STRATEGY
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "#017E53",
                  fontSize: "22px",
                  letterSpacing: "-0.5px",
                }}
              >
                {displayPrice}
              </Typography>
              {priceSuffix && (
                <Typography
                  variant="caption"
                  sx={{ color: "#64748B", fontWeight: 700, fontSize: "12px" }}
                >
                  {priceSuffix}
                </Typography>
              )}
            </Box>
          </div>

          {/* Green Bolt Action Circle */}
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "#E8F5E9",
              color: "#017E53",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bolt sx={{ fontSize: 22 }} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PropertyListingCard;