import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import { LocationOn, VerifiedUserOutlined } from "@mui/icons-material";

const PropertyLocationAndTrust = ({ property }) => {
  const address = property?.address || "Ikate Lekki, Lagos";
  const latitude = property?.latitude || 6.442287;
  const longitude = property?.longitude || 3.487438;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2 }}>
        Location Insight
      </Typography>

      {/* Map Container with Floating Card */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 260, sm: 320 },
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid #E2E8F0",
          bgcolor: "#EBF0F5",
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          p: { xs: 1.5, sm: 3 },
          boxSizing: "border-box",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: 2,
            borderRadius: "18px",
            bgcolor: "rgba(255,255,255,0.96)",
            backdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                bgcolor: "#017E53",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocationOn sx={{ fontSize: 22 }} />
            </Box>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13.5px" }}>
                {address}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11.5px" }}>
                Coordinates: {latitude?.toFixed(4)}, {longitude?.toFixed(4)}
              </Typography>
            </div>
          </Box>

          <Button
            variant="outlined"
            onClick={() => window.open(googleMapsUrl, "_blank")}
            sx={{
              color: "#017E53",
              borderColor: "#017E53",
              fontWeight: 800,
              fontSize: "12px",
              borderRadius: "12px",
              px: 2,
              py: 0.9,
              textTransform: "none",
              "&:hover": { bgcolor: "#ECFDF5", borderColor: "#017E53" },
            }}
          >
            Get Directions
          </Button>
        </Paper>
      </Box>

      {/* Trust & Legal Verification Guarantee */}
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: 3,
          borderRadius: "20px",
          bgcolor: "#F0FDF4",
          border: "1px solid #DCFCE7",
          display: "flex",
          gap: 2.2,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            bgcolor: "#DCFCE7",
            color: "#017E53",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <VerifiedUserOutlined sx={{ fontSize: 24 }} />
        </Box>
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#065F46", fontSize: "15px", mb: 0.4 }}>
            Verified by CVProperties Legal
          </Typography>
          <Typography variant="body2" sx={{ color: "#047857", fontSize: "12.5px", lineHeight: 1.6 }}>
            This property listing has passed our 25-point premium verification check. Our team has physically inspected the premises, verified structural integrity, utilities reliability, and official property documentation. Rent and buy with absolute confidence.
          </Typography>
        </div>
      </Paper>
    </Box>
  );
};

export default PropertyLocationAndTrust;