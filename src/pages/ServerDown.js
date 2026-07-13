import React, { useEffect } from "react";
import { TimerOutlined, ArrowBackOutlined } from "@mui/icons-material";
import { Box, Typography, Button, Paper } from "@mui/material";

const ServerDown = () => {
    useEffect(() => {
        document.title = "500 - Too Many Requests";
    }, []);

    const handleRefreshRetry = () => {
        const savedPath = sessionStorage.getItem("lastAttemptedPath");
        
        // Clear it out so it doesn't loop infinitely later
        sessionStorage.removeItem("lastAttemptedPath"); 
        
        // Redirect back to their original page or the homepage fallback
        window.location.href = savedPath || "/";
    };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F9FAFB",
        px: 2,
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "480px",
          width: "100%",
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: "24px",
          border: "1px solid #E5E7EB",
          bgcolor: "#ffffff",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        }}
      >
        {/* Warning Icon Box */}
        <Box
          sx={{
            display: "inline-flex",
            p: 2,
            borderRadius: "50%",
            bgcolor: "#FEF2F2",
            color: "#EF4444",
            mb: 3,
          }}
        >
          <TimerOutlined sx={{ fontSize: 40 }} />
        </Box>

        <Typography variant="h5" sx={{fontWeight: 800, color: "#111827", mb: 1.5, letterSpacing: "-0.5px", fontFamily: "Poppins, sans-serif", }}>
          Too Many Requests
        </Typography>

        <Typography variant="body2" sx={{ color: "#4B5563", lineHeight: 1.6, mb: 4, fontFamily: "Poppins, sans-serif", }}>
          Our servers are receiving unusually high traffic right now. To maintain system stability, access has been temporarily restricted. Please wait a minute or two and try refreshing the page.
        </Typography>

        <div className="d-flex flex-column gap-2">
          <Button
            onClick={() => handleRefreshRetry()}
            variant="contained"
            sx={{
              bgcolor: "#004225",
              color: "#ffffff",
              py: 1.2,
              borderRadius: "10px",
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "none",
              fontFamily: "Poppins, sans-serif",
              "&:hover": { bgcolor: "#002917", boxShadow: "none" }
            }}
          >
            Refresh Page & Try Again
          </Button>          
        </div>
      </Paper>
    </Box>
  );
};

export default ServerDown;