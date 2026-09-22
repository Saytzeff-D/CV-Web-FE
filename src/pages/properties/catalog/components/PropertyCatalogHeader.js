import React from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { GridViewOutlined, ViewListOutlined, Close } from "@mui/icons-material";

const PropertyCatalogHeader = ({
  count = 0,
  filters,
  onRemoveCategory,
  onRemoveType,
  onRemoveAmenity,
  onClearAll,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.type) ||
    Boolean(filters.search) ||
    filters.amenities?.length > 0;

  return (
    <Box sx={{ mb: 2.5 }}>
      {/* Top Row: Title, View Switcher & Sorting */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 1,
        }}
      >
        <div>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
            Property Listings
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "13px" }}>
            Found {count} premium properties in Lagos, Abuja & nationwide
          </Typography>
        </div>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Grid / List switcher */}
          <Box sx={{ display: "flex", bgcolor: "#FFFFFF", borderRadius: "10px", border: "1px solid #E2E8F0", p: 0.3 }}>
            <IconButton
              size="small"
              onClick={() => onViewModeChange("grid")}
              sx={{
                borderRadius: "8px",
                bgcolor: viewMode === "grid" ? "#ECFDF5" : "transparent",
                color: viewMode === "grid" ? "#017E53" : "#94A3B8",
              }}
            >
              <GridViewOutlined sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onViewModeChange("list")}
              sx={{
                borderRadius: "8px",
                bgcolor: viewMode === "list" ? "#ECFDF5" : "transparent",
                color: viewMode === "list" ? "#017E53" : "#94A3B8",
              }}
            >
              <ViewListOutlined sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          {/* Sort By Dropdown */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              displayEmpty
              sx={{
                borderRadius: "10px",
                bgcolor: "#FFFFFF",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "#1E293B",
                "& fieldset": { borderColor: "#E2E8F0" },
              }}
            >
              <MenuItem value="recommended" sx={{ fontSize: "12.5px" }}>Recommended</MenuItem>
              <MenuItem value="price_asc" sx={{ fontSize: "12.5px" }}>Price: Low to High</MenuItem>
              <MenuItem value="price_desc" sx={{ fontSize: "12.5px" }}>Price: High to Low</MenuItem>
              <MenuItem value="newest" sx={{ fontSize: "12.5px" }}>Newest Listed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Bottom Row: Active Filter Pills */}
      {hasActiveFilters && (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, pt: 0.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#94A3B8", fontSize: "10.5px", mr: 0.5 }}>
            ACTIVE:
          </Typography>

          {filters.category && (
            <Chip
              label={`For ${filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}`}
              size="small"
              onDelete={onRemoveCategory}
              deleteIcon={<Close sx={{ fontSize: "13px !important", color: "#017E53 !important" }} />}
              sx={{
                bgcolor: "#ECFDF5",
                color: "#017E53",
                fontWeight: 700,
                fontSize: "11px",
                borderRadius: "8px",
                border: "1px solid #A7F3D0",
              }}
            />
          )}

          {filters.type && (
            <Chip
              label={filters.type.replace("_", " ").toUpperCase()}
              size="small"
              onDelete={onRemoveType}
              deleteIcon={<Close sx={{ fontSize: "13px !important", color: "#017E53 !important" }} />}
              sx={{
                bgcolor: "#ECFDF5",
                color: "#017E53",
                fontWeight: 700,
                fontSize: "11px",
                borderRadius: "8px",
                border: "1px solid #A7F3D0",
              }}
            />
          )}

          {filters.amenities.map((am) => (
            <Chip
              key={am}
              label={am}
              size="small"
              onDelete={() => onRemoveAmenity(am)}
              deleteIcon={<Close sx={{ fontSize: "13px !important", color: "#017E53 !important" }} />}
              sx={{
                bgcolor: "#ECFDF5",
                color: "#017E53",
                fontWeight: 700,
                fontSize: "11px",
                borderRadius: "8px",
                border: "1px solid #A7F3D0",
              }}
            />
          ))}

          <Typography
            variant="caption"
            onClick={onClearAll}
            sx={{
              color: "#017E53",
              fontWeight: 800,
              fontSize: "11px",
              cursor: "pointer",
              ml: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            CLEAR ALL
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PropertyCatalogHeader;