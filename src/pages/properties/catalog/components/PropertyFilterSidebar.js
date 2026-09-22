import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Slider,
  Button,
  Divider,
} from "@mui/material";
import { TuneOutlined, SearchOutlined } from "@mui/icons-material";

const CATEGORIES = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "Rent" },
  { value: "shortlet", label: "Shortlet" },
];

const PROPERTY_TYPES = [
  { value: "land", label: "Land" },
  { value: "apartment", label: "Apartment" },
  { value: "event_center", label: "Event Center" },
  { value: "hostel", label: "Hostel" },
  { value: "hotel", label: "Hotel" },
];

const COMMON_AMENITIES = [
  "Swimming Pool",
  "24/7 Electricity",
  "Armed Security",
  "Gym",
  "Fitted Kitchen",
];

const PropertyFilterSidebar = ({
  activeFilters,
  onApply,
  onReset,
}) => {
  // Staged local state: updates here do NOT trigger network calls
  const [stagedFilters, setStagedFilters] = useState(activeFilters);

  // Sync staged state when active filters are cleared or altered externally
  useEffect(() => {
    setStagedFilters(activeFilters);
  }, [activeFilters]);

  const handleCategoryToggle = (val) => {
    setStagedFilters((prev) => ({
      ...prev,
      category: prev.category === val ? "" : val,
    }));
  };

  const handleTypeToggle = (val) => {
    setStagedFilters((prev) => ({
      ...prev,
      type: prev.type === val ? "" : val,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setStagedFilters((prev) => {
      const exists = prev.amenities.includes(amenity);
      const updated = exists
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updated };
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        border: "1px solid #E2E8F0",
        bgcolor: "#FFFFFF",
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TuneOutlined sx={{ color: "#017E53", fontSize: 20 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Filters
          </Typography>
        </Box>
        <Typography
          variant="caption"
          onClick={onReset}
          sx={{
            color: "#017E53",
            fontWeight: 700,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Clear all
        </Typography>
      </Box>

      {/* 1. Category */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", letterSpacing: "0.5px", display: "block", mb: 1 }}>
          CATEGORY
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {CATEGORIES.map((cat) => (
            <FormControlLabel
              key={cat.value}
              control={
                <Checkbox
                  checked={stagedFilters.category === cat.value}
                  onChange={() => handleCategoryToggle(cat.value)}
                  size="small"
                  sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#017E53" } }}
                />
              }
              label={<Typography sx={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>{cat.label}</Typography>}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 2. Property Type */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", letterSpacing: "0.5px", display: "block", mb: 1 }}>
          PROPERTY TYPE
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {PROPERTY_TYPES.map((pt) => (
            <FormControlLabel
              key={pt.value}
              control={
                <Checkbox
                  checked={stagedFilters.type === pt.value}
                  onChange={() => handleTypeToggle(pt.value)}
                  size="small"
                  sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#017E53" } }}
                />
              }
              label={<Typography sx={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>{pt.label}</Typography>}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 3. Location Search */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", letterSpacing: "0.5px", display: "block", mb: 1 }}>
          LOCATION
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter neighborhood..."
          value={stagedFilters.search}
          onChange={(e) => setStagedFilters({ ...stagedFilters, search: e.target.value })}
          InputProps={{
            startAdornment: <SearchOutlined sx={{ fontSize: 18, color: "#94A3B8", mr: 1 }} />,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#F8FAFC",
              fontSize: "12.5px",
              "& fieldset": { borderColor: "#E2E8F0" },
            },
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 4. Price Range */}
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", letterSpacing: "0.5px", display: "block", mb: 1 }}>
          PRICE RANGE
        </Typography>
        <Slider
          value={[stagedFilters.min_price, stagedFilters.max_price]}
          onChange={(e, val) =>
            setStagedFilters({ ...stagedFilters, min_price: val[0], max_price: val[1] })
          }
          min={500000}
          max={500000000}
          step={500000}
          sx={{ color: "#017E53", mb: 1 }}
        />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1, p: 1, border: "1px solid #E2E8F0", borderRadius: "8px", textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10px", display: "block" }}>MIN</Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#0F172A" }}>
              ₦{(stagedFilters.min_price / 1000).toLocaleString()}k
            </Typography>
          </Box>
          <Box sx={{ flex: 1, p: 1, border: "1px solid #E2E8F0", borderRadius: "8px", textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "10px", display: "block" }}>MAX</Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#0F172A" }}>
              ₦{(stagedFilters.max_price / 1000000).toLocaleString()}M+
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* 5. Amenities */}
      <Box sx={{ mb: 3.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 800, color: "#64748B", letterSpacing: "0.5px", display: "block", mb: 1 }}>
          AMENITIES
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {COMMON_AMENITIES.map((am) => (
            <FormControlLabel
              key={am}
              control={
                <Checkbox
                  checked={stagedFilters.amenities.includes(am)}
                  onChange={() => handleAmenityToggle(am)}
                  size="small"
                  sx={{ color: "#CBD5E1", "&.Mui-checked": { color: "#017E53" } }}
                />
              }
              label={<Typography sx={{ fontSize: "13px", color: "#334155", fontWeight: 500 }}>{am}</Typography>}
            />
          ))}
        </Box>
      </Box>

      {/* APPLY FILTERS BUTTON: Dispatches changes only here */}
      <Button
        fullWidth
        variant="contained"
        onClick={() => onApply(stagedFilters)}
        sx={{
          bgcolor: "#017E53",
          color: "#FFFFFF",
          fontWeight: 800,
          borderRadius: "12px",
          py: 1.2,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { bgcolor: "#016744" },
        }}
      >
        Apply Filters
      </Button>
    </Paper>
  );
};

export default PropertyFilterSidebar;