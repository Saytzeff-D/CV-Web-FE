import React from "react";
import { Box, Typography, Button, Stack, Chip, Avatar } from "@mui/material";
import { ArrowForwardOutlined, VerifiedUserOutlined, PeopleAltOutlined } from "@mui/icons-material";
import BackdropImage from '../assets/roommate-img.jpg'
import { useNavigate } from "react-router-dom";

const RoommateSection = () => {
  const navigate = useNavigate()
  return (
    <Box 
      className="container-fluid mt-5 position-relative text-white"
      sx={{
        backgroundImage: `url(${BackdropImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "24px",
        overflow: "hidden",
        padding: { xs: "40px 20px", sm: "60px 45px" },
        minHeight: "400px"
      }}
    >
      {/* Dark Backdrop Mask Layer */}
      <Box 
        className="position-absolute top-0 start-0 w-100 h-100" 
        sx={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1
        }} 
      />

      {/* BOOTSTRAP ROW GRID (Handles vertical/horizontal centering on all screens) */}
      <div className="row align-items-center position-relative g-4 h-100" style={{ zIndex: 2 }}>
        
        {/* LEFT COLUMN: TEXT CONTENT (Bootstrap handles col size and responsive alignment alignment) */}
        <div className="col-12 col-lg-7 text-center text-lg-start">
          <Chip 
            label="New Feature" 
            size="small" 
            sx={{ 
              bgcolor: "#22C55E", 
              color: "#fff", 
              fontWeight: 700, 
              fontSize: "11px", 
              borderRadius: "6px", 
              mb: 2.5,
              height: "22px"
            }} 
          />

          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: "28px", sm: "36px", md: "42px" }, 
              letterSpacing: "-1px",
              mb: 2 
            }}
          >
            Need a roommate?
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: "rgba(255,255,255,0.85)", 
              fontSize: { xs: "14px", sm: "16px" }, 
              lineHeight: 1.6, 
              maxWidth: "540px", 
              mx: { xs: "auto", lg: "0" },
              mb: 4 
            }}
          >
            Connect with verified individuals who match your lifestyle. Find the perfect balance between privacy and community.
          </Typography>

          {/* MUI BUTTON CLUSTER */}
          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent={{ xs: "center", lg: "flex-start" }}
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Button
              onClick={()=> navigate('/buy/all')}
              variant="contained"
              endIcon={<ArrowForwardOutlined />}
              sx={{
                bgcolor: "#22C55E",
                color: "#ffffff",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                px: 3.5,
                py: 1.4,
                boxShadow: "none",
                width: { xs: "100%", sm: "auto" },
                "&:hover": { bgcolor: "#16A34A", boxShadow: "none" }
              }}
            >
              Find a Roommate
            </Button>

            <Button
              onClick={()=> window.open('https://agent.cvproperties.co')}
              variant="outlined"
              sx={{
                color: "#ffffff",
                borderColor: "rgba(255,255,255,0.4)",
                bgcolor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: 700,
                fontSize: "14px",
                px: 3.5,
                py: 1.4,
                width: { xs: "100%", sm: "auto" },
                "&:hover": { borderColor: "#ffffff", bgcolor: "rgba(255,255,255,0.2)" }
              }}
            >
              Advertise your room
            </Button>
          </Stack>

          {/* FOOTER METADATA TRUST MARK */}
          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center" 
            justifyContent={{ xs: "center", lg: "flex-start" }}
            sx={{ color: "rgba(255,255,255,0.5)", mt: 2 }}
          >
            <VerifiedUserOutlined sx={{ fontSize: 15, color: "#22C55E" }} />
            <Typography variant="caption" sx={{ mt: 0.2, fontWeight: 600, fontSize: "12px", letterSpacing: "0.2px" }}>
              100% verified profiles & secure messaging
            </Typography>
          </Stack>
        </div>

        {/* RIGHT COLUMN: PERMANENTLY CENTERED AVATAR GLASS CARD */}
        {/* Bootstrap flex classes handle absolute cross-axis alignment centering perfectly */}
        <div className="col-12 col-lg-5 d-flex justify-content-center align-items-center">
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              webkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: "20px",
              p: 4,
              textAlign: "center",
              width: "100%",
              maxWidth: "280px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
          >
            {/* OVERLAPPING AVATAR MATRIX */}
            <Stack direction="row" justifyContent="center" sx={{ mb: 2, pl: 2 }}>
              {[
                "https://i.pravatar.cc/100?img=11",
                "https://i.pravatar.cc/100?img=32",
                "https://i.pravatar.cc/100?img=47"
              ].map((src, i) => (
                <Avatar
                  key={i}
                  src={src}
                  sx={{
                    width: 48,
                    height: 48,
                    border: "3px solid rgba(255,255,255,0.2)",
                    marginLeft: "-14px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                  }}
                />
              ))}
            </Stack>

            {/* LIVE DATA MATRICES INDICATOR */}
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 0.5 }}>
              <PeopleAltOutlined sx={{ color: "#22C55E", fontSize: 18 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "18px", color: "#ffffff" }}>
                120+
              </Typography>
            </Stack>
            
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, fontSize: "11px", letterSpacing: "0.3px" }}>
              Active matches today
            </Typography>
          </Box>
        </div>

      </div>
    </Box>
  );
};

export default RoommateSection;