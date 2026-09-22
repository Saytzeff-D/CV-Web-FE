// src/pages/properties/details/components/PropertyNotFound.jsx
import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { HomeOutlined, SearchOutlined, ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PropertyNotFound = ({ message = "Property Unavailable or Expired" }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "75vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: 480,
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          textAlign: "center",
          bgcolor: "#FFFFFF",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "#FEF2F2",
            color: "#EF4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2.5,
          }}
        >
          <ErrorOutline sx={{ fontSize: 32 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: "#0F172A", mb: 1 }}>
          {message}
        </Typography>

        <Typography variant="body2" sx={{ color: "#64748B", mb: 3.5, lineHeight: 1.6 }}>
          The property listing you are trying to view has been moved, unlisted, or the link has an
          invalid identifier.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.5 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<SearchOutlined />}
            onClick={() => navigate("/properties")}
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              fontWeight: 700,
              borderRadius: "12px",
              py: 1.2,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Browse Properties
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<HomeOutlined />}
            onClick={() => navigate("/")}
            sx={{
              borderColor: "#E2E8F0",
              color: "#334155",
              fontWeight: 700,
              borderRadius: "12px",
              py: 1.2,
              textTransform: "none",
              "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PropertyNotFound;