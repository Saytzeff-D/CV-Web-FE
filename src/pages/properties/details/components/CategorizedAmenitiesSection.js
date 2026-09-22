import React from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  LightbulbOutlined,
  WaterDropOutlined,
  KitchenOutlined,
  Bolt,
  VideocamOutlined,
  SecurityOutlined,
  LocalParkingOutlined,
  PoolOutlined,
  ElevatorOutlined,
} from "@mui/icons-material";

const CATEGORIZED_DEFAULT = [
  {
    category: "COMFORT",
    items: [
      { name: "Smart Lighting System", icon: <LightbulbOutlined /> },
      { name: "Water Heater & Treatment", icon: <WaterDropOutlined /> },
      { name: "Fully Fitted Kitchen", icon: <KitchenOutlined /> },
    ],
  },
  {
    category: "SAFETY & UTILITIES",
    items: [
      { name: "24/7 Power Supply", icon: <Bolt /> },
      { name: "CCTV Surveillance", icon: <VideocamOutlined /> },
      { name: "Uniformed Security", icon: <SecurityOutlined /> },
    ],
  },
  {
    category: "ACCESS & FACILITIES",
    items: [
      { name: "Dedicated Underground Parking", icon: <LocalParkingOutlined /> },
      { name: "Infinity Swimming Pool", icon: <PoolOutlined /> },
      { name: "Private Elevator", icon: <ElevatorOutlined /> },
    ],
  },
];

const CategorizedAmenitiesSection = ({ property }) => {
  const type = (property?.type || "").toLowerCase().trim();
  const amenitiesList = property?.amenities || [];
  const isApartment = type === "apartment" || type === "house";

  const title = type === "event_center" ? "Event Facilities & Amenities" : "Amenities";

  if (isApartment) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2.5 }}>
          {title}
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {CATEGORIZED_DEFAULT.map((cat, idx) => (
            <Box key={idx}>
              <Typography
                variant="caption"
                sx={{ color: "#017E53", fontWeight: 800, fontSize: "11px", letterSpacing: "0.5px", display: "block", mb: 1.5 }}
              >
                {cat.category}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {cat.items.map((item, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                    <Box sx={{ color: "#017E53", display: "flex", "& svg": { fontSize: 18 } }}>{item.icon}</Box>
                    <Typography variant="body2" sx={{ color: "#334155", fontSize: "12.5px", fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          variant="outlined"
          size="small"
          sx={{
            mt: 3,
            textTransform: "none",
            color: "#334155",
            borderColor: "#CBD5E1",
            borderRadius: "10px",
            fontWeight: 700,
            fontSize: "12px",
            px: 2,
            py: 0.8,
            "&:hover": { borderColor: "#94A3B8" },
          }}
        >
          Show all 18 amenities
        </Button>
      </Box>
    );
  }

  // Standard Pill Layout (Event Centers, Hostels, Hotels)
  const fallbackList = [
    "24/7 Electricity",
    "Bar",
    "Bridal Suite",
    "Catering Kitchen",
    "CCTV Surveillance",
    "Dance Floor",
    "Air Conditioning",
    "Sound System",
  ];

  const displayList = amenitiesList.length > 0 ? amenitiesList.map((a) => (typeof a === "string" ? a : a.name)) : fallbackList;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 1.5 }}>
        {displayList.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              p: 1.6,
              borderRadius: "14px",
              bgcolor: "#F8FAFC",
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              border: "1px solid #F1F5F9",
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                bgcolor: "#ECFDF5",
                color: "#017E53",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              ✓
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155", fontSize: "12.5px" }}>
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorizedAmenitiesSection;