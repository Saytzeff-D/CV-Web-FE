// src/pages/properties/catalog/components/PropertyGridList.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import PropertyListingCard from "../../components/PropertyListingCard";

const PropertyGridList = ({ properties = [], viewMode = "grid" }) => {
  if (!properties || properties.length === 0) {
    return (
      <Box
        sx={{
          p: 6,
          textAlign: "center",
          bgcolor: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid #E2E8F0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#1E293B", mb: 1 }}>
          No properties match your filters
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", maxWidth: 400, mx: "auto" }}>
          Try clearing some filters or searching for a different neighborhood or property type.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns:
          viewMode === "grid"
            ? {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              }
            : "1fr",
        gap: 2.5,
        boxSizing: "border-box",
      }}
    >
      {properties.map((property) => (
        <PropertyListingCard key={property.id} property={property} />
      ))}
    </Box>
  );
};

export default PropertyGridList;