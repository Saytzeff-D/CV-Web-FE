import React from "react";
import { Box, Typography } from "@mui/material";
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
  AcUnitOutlined,
  Wifi,
  TvOutlined,
  FitnessCenterOutlined,
  LocalLaundryServiceOutlined,
  CheckCircleOutline,
  BalconyOutlined,
  SpeakerOutlined,
  BathtubOutlined,
  LocalBarOutlined,
} from "@mui/icons-material";

// Categorization keyword rules
const CATEGORY_MAP = [
  {
    category: "COMFORT & LIVING",
    keywords: [
      "air conditioning", "ac", "heater", "water heater", "kitchen", "refrigerator",
      "microwave", "light", "lighting", "balcony", "furnished", "bed", "living", "bath", "bathroom"
    ],
  },
  {
    category: "SAFETY & UTILITIES",
    keywords: [
      "power", "electricity", "generator", "solar", "cctv", "security",
      "guard", "water treatment", "water supply", "smoke detector", "fire extinguisher"
    ],
  },
  {
    category: "ACCESS & RECREATION",
    keywords: [
      "parking", "pool", "swimming", "gym", "fitness", "elevator", "lift",
      "wifi", "internet", "tv", "dstv", "sound", "speaker", "bar", "lounge", "laundry", "washing"
    ],
  },
];

// Contextual Icon mapping based on amenity name
const getAmenityIcon = (name = "") => {
  const lower = name.toLowerCase();

  if (lower.includes("ac") || lower.includes("air condition")) return <AcUnitOutlined />;
  if (lower.includes("wifi") || lower.includes("internet")) return <Wifi />;
  if (lower.includes("power") || lower.includes("electricity") || lower.includes("generator") || lower.includes("solar")) return <Bolt />;
  if (lower.includes("cctv") || lower.includes("surveillance") || lower.includes("camera")) return <VideocamOutlined />;
  if (lower.includes("security") || lower.includes("guard")) return <SecurityOutlined />;
  if (lower.includes("pool") || lower.includes("swimming")) return <PoolOutlined />;
  if (lower.includes("parking") || lower.includes("garage")) return <LocalParkingOutlined />;
  if (lower.includes("gym") || lower.includes("fitness")) return <FitnessCenterOutlined />;
  if (lower.includes("kitchen") || lower.includes("microwave") || lower.includes("fridge")) return <KitchenOutlined />;
  if (lower.includes("elevator") || lower.includes("lift")) return <ElevatorOutlined />;
  if (lower.includes("water")) return <WaterDropOutlined />;
  if (lower.includes("light")) return <LightbulbOutlined />;
  if (lower.includes("tv") || lower.includes("dstv") || lower.includes("cable")) return <TvOutlined />;
  if (lower.includes("laundry") || lower.includes("washer") || lower.includes("dryer")) return <LocalLaundryServiceOutlined />;
  if (lower.includes("balcony") || lower.includes("terrace")) return <BalconyOutlined />;
  if (lower.includes("sound") || lower.includes("speaker") || lower.includes("audio")) return <SpeakerOutlined />;
  if (lower.includes("bar") || lower.includes("lounge")) return <LocalBarOutlined />;
  if (lower.includes("bath") || lower.includes("shower") || lower.includes("tub")) return <BathtubOutlined />;

  return <CheckCircleOutline />;
};

// Auto-group flat array of strings into mapped categories
const categorizeAmenities = (items) => {
  const groups = {
    "COMFORT & LIVING": [],
    "SAFETY & UTILITIES": [],
    "ACCESS & RECREATION": [],
    "OTHER AMENITIES": [],
  };

  items.forEach((item) => {
    const rawName = typeof item === "string" ? item : item?.name;
    if (!rawName) return;

    const lower = rawName.toLowerCase();
    let matchedCategory = null;

    for (const rule of CATEGORY_MAP) {
      if (rule.keywords.some((k) => lower.includes(k))) {
        matchedCategory = rule.category;
        break;
      }
    }

    if (matchedCategory) {
      groups[matchedCategory].push(rawName);
    } else {
      groups["OTHER AMENITIES"].push(rawName);
    }
  });

  // Filter out categories that have no items
  return Object.entries(groups)
    .filter(([_, groupItems]) => groupItems.length > 0)
    .map(([category, groupItems]) => ({ category, items: groupItems }));
};

const CategorizedAmenitiesSection = ({ property }) => {
  const rawList = property?.amenities || [];
  const type = (property?.type || "").toLowerCase().trim();

  // Clean strings
  const stringAmenities = rawList
    .map((item) => (typeof item === "string" ? item.trim() : item?.name?.trim()))
    .filter(Boolean);

  // Return nothing or clean notice if the API sends empty array
  if (stringAmenities.length === 0) {
    return null;
  }

  const title =
    type === "event_center" || type === "event center"
      ? "Event Facilities & Amenities"
      : "Amenities & Features";

  const groupedAmenities = categorizeAmenities(stringAmenities);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2.5 }}>
        {title} ({stringAmenities.length})
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: groupedAmenities.length > 1 ? "repeat(2, 1fr)" : "1fr",
            md: groupedAmenities.length >= 3 ? "repeat(3, 1fr)" : `repeat(${groupedAmenities.length}, 1fr)`,
          },
          gap: 3,
        }}
      >
        {groupedAmenities.map((group, idx) => (
          <Box key={idx}>
            <Typography
              variant="caption"
              sx={{
                color: "#017E53",
                fontWeight: 800,
                fontSize: "11px",
                letterSpacing: "0.5px",
                display: "block",
                mb: 1.5,
              }}
            >
              {group.category}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {group.items.map((itemName, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                  <Box
                    sx={{
                      color: "#017E53",
                      display: "flex",
                      alignItems: "center",
                      "& svg": { fontSize: 18 },
                    }}
                  >
                    {getAmenityIcon(itemName)}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#334155",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {itemName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategorizedAmenitiesSection;