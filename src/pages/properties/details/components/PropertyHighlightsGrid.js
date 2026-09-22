import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  InfoOutlined,
  PeopleAltOutlined,
  WeekendOutlined,
  MeetingRoomOutlined,
  CheckCircleOutline,
  CategoryOutlined,
  AccessTime,
  SquareFootOutlined,
  LocalParkingOutlined,
  WcOutlined,
  HomeWorkOutlined,
  ShieldOutlined,
  CalendarMonthOutlined,
  HotelOutlined,
} from "@mui/icons-material";

const clean = (val) => {
  if (!val || typeof val !== "string") return "";
  return val.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
};

const getHighlightsConfig = (property = {}) => {  
  const type = (property?.type || "").toLowerCase().trim();

  // 1. EVENT CENTER (8 items)
  if (type === "event_center" || type === "event center") {
    return {
      title: "Event Center Highlights",
      items: [
        { label: "CAPACITY (MAX PEOPLE)", value: property.capacity ? `${Number(property.capacity).toLocaleString()} People` : "1,500 People", icon: <PeopleAltOutlined /> },
        { label: "SETTING ARRANGEMENT", value: clean(property.arrangement) || "Banquet", icon: <WeekendOutlined /> },
        { label: "HALL TYPE", value: clean(property.hall_type) || "Banquet Hall", icon: <MeetingRoomOutlined /> },
        { label: "INDOOR / OUTDOOR", value: property.indoor ? "Indoor" : "Indoor / Outdoor", icon: <HomeWorkOutlined /> },
        { label: "EVENT TYPES SUPPORTED", value: clean(property.event_type_supported) || "Weddings, Conferences, Corporate Events, Gala Nights", icon: <CheckCircleOutline /> },
        { label: "PARKING SPACE", value: property.parking_space ? `${property.parking_space} Vehicles` : "50 Vehicles", icon: <LocalParkingOutlined /> },
        { label: "CATEGORY", value: clean(property.category) || "Rent", icon: <CategoryOutlined /> },
        { label: "AVAILABILITY STATUS", value: clean(property.vacancy_status) || "Available Now", icon: <AccessTime /> },
      ],
      columns: { xs: "1fr", sm: "repeat(2, 1fr)" },
    };
  }

  // 2. HOTEL / SHORTLET (4 items)
  if (type === "hotel" || type === "shortlet") {
    return {
      title: "Hotel Highlights",
      items: [
        { label: "AVAILABILITY", value: clean(property.vacancy_status) || "Available Now", icon: <AccessTime /> },
        { label: "ROOM TYPES AVAILABLE", value: `${property.room_types.length} Rooms`, icon: <HotelOutlined /> },
        { label: "MINIMUM STAY", value: `${property.min_booking || 1} Night`, icon: <CalendarMonthOutlined /> },
        { label: "OCCUPANCY", value: property.capacity ? `${property.capacity} Guests per Room` : "2 Guests per Room", icon: <PeopleAltOutlined /> },
      ],
      columns: { xs: "1fr", sm: "repeat(2, 1fr)" },
    };
  }

  // 3. APARTMENT / HOUSE (10 items)
  if (type === "apartment"|| type === "land") {    
    return {
      title: "Property Highlights",
      items: [
        { label: "CATEGORY", value: clean(property.category) || "Rent", icon: <CategoryOutlined /> },        
        { label: "PROPERTY TYPE", value: clean(property.type) || "Apartment", icon: <HomeWorkOutlined /> },        
        { label: "LISTING STATUS", value: clean(property.vacancy_status) || `Available / For ${clean(property.category) || "Rent"}`, icon: <AccessTime /> },
        ...type === "land" ? [{ label: "LAND SIZE", value: property.land_size ? `${property.land_size} sq. m` : "500 sq. m", icon: <SquareFootOutlined /> }] : [],
        { label: "LOCATION", value: property.address || "Lekki Phase 1, Lagos", icon: <HomeWorkOutlined /> },
        { label: "YEAR BUILT", value: property.year_established || "2025", icon: <CalendarMonthOutlined /> },
        { label: "FURNISHING", value: clean(property.furnishing_level) || "Fully Furnished", icon: <WeekendOutlined /> },
        { label: "UTILITIES", value: "24/7 Power & Water", icon: <CheckCircleOutline /> },
      ],
      columns: { xs: "1fr", sm: "repeat(2, 1fr)" },
    };    
  }

  // 4. HOSTEL (8 items)
  return {
    title: "Hostel Highlights",
    items: [
      { label: "CAPACITY", value: property.capacity ? `${property.capacity} People` : "120 People", icon: <PeopleAltOutlined /> },
      { label: "FURNISHING LEVEL", value: clean(property.furnishing_level) || "Fully Furnished", icon: <WeekendOutlined /> },
      { label: "GENDER PREFERENCE", value: clean(property.gender_preference) || "Mixed", icon: <WcOutlined /> },
      { label: "NUMBER OF ROOMS", value: property.room_numbers ? `${property.room_numbers} Rooms` : "25 Rooms", icon: <MeetingRoomOutlined /> },
      { label: "BATHROOM TYPE", value: clean(property.bathroom_type) || "En-suite", icon: <WeekendOutlined /> },
      { label: "AVAILABLE UNITS", value: property.available_units ? `${property.available_units} Units` : "10 Units", icon: <CheckCircleOutline /> },
      { label: "CATEGORY", value: clean(property.category) || "Rent", icon: <CategoryOutlined /> },
      { label: "STATUS", value: clean(property.vacancy_status) || "Available Now", icon: <AccessTime /> },
    ],
    columns: { xs: "1fr", sm: "repeat(2, 1fr)" },
  };
};

const PropertyHighlightsGrid = ({ property }) => {
  const { title, items, columns } = getHighlightsConfig(property);

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Banner Header */}
        <Box
          sx={{
            px: 2.5,
            py: 1.6,
            bgcolor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <InfoOutlined sx={{ fontSize: 18, color: "#017E53" }} />
          <Typography sx={{ fontWeight: 800, color: "#017E53", fontSize: "14.5px" }}>
            {title}
          </Typography>
        </Box>

        {/* Grid Cells */}
        <Box sx={{ display: "grid", gridTemplateColumns: columns }}>
          {items.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                p: 2.2,
                display: "flex",
                alignItems: "flex-start",
                gap: 1.8,
                borderBottom: "1px solid #F1F5F9",
                borderRight: { sm: idx % 2 === 0 ? "1px solid #F1F5F9" : "none" },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  bgcolor: "#F0FDF4",
                  color: "#017E53",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  "& svg": { fontSize: 18 },
                }}
              >
                {item.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#94A3B8",
                    fontWeight: 800,
                    fontSize: "9.5px",
                    letterSpacing: "0.5px",
                    display: "block",
                    textTransform: "uppercase",
                    mb: 0.3,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#0F172A",
                    fontWeight: 700,
                    fontSize: "13px",
                    lineHeight: 1.35,
                    wordBreak: "break-word",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default PropertyHighlightsGrid;