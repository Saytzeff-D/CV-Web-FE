import React from "react";
import { Box, Paper, Typography, Button, Avatar } from "@mui/material";
import {
  CalendarMonthOutlined,
  SearchOutlined,
  CallOutlined,
  ChatBubbleOutline,
  CheckCircle,
  GroupsOutlined,
  ChevronRight,
  BookmarkBorder,
} from "@mui/icons-material";

const formatNgn = (val) => `₦${Math.round(Number(val || 0)).toLocaleString("en-NG")}`;

const PropertySidebarBooking = ({ property }) => {
  const type = (property?.type || "").toLowerCase().trim();
  const price = property?.total_price || property?.base_price || 500000;
  const cautionFee = property?.caution_fee || property?.caution_deposit || property?.security_deposit || 150000;

  const ownerName = [property?.owner_firstname, property?.owner_lastname].filter(Boolean).join(" ") || "Segun Arinze";
  const ownerAvatar = property?.owner_avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100";

  // 1. HOTEL TOP BUTTON ONLY VIEW
  if (type === "hotel") {
    return (
      <Box sx={{ position: { lg: "sticky" }, top: 20 }}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "20px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "12px",
              py: 1.4,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Reserve Room
          </Button>
        </Paper>
      </Box>
    );
  }

  // 2. EVENT CENTER SIDEBAR VIEW
  if (type === "event_center" || type === "event center") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, position: { lg: "sticky" }, top: 20 }}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
          <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "10px", letterSpacing: "0.5px" }}>
            VENUE HIRE RATE
          </Typography>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8, my: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#017E53", fontSize: "28px" }}>
              {formatNgn(price)}
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700 }}>
              / Per Day
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<CalendarMonthOutlined />}
            sx={{
              bgcolor: "#017E53",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "13.5px",
              borderRadius: "12px",
              py: 1.3,
              textTransform: "none",
              boxShadow: "none",
              mb: 1.2,
              "&:hover": { bgcolor: "#016744" },
            }}
          >
            Check Date Availability
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<BookmarkBorder />}
            sx={{
              color: "#0F172A",
              borderColor: "#E2E8F0",
              fontWeight: 800,
              fontSize: "13px",
              borderRadius: "12px",
              py: 1.2,
              textTransform: "none",
              mb: 2,
              "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
            }}
          >
            Book Event Center
          </Button>

          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.2, mb: 3 }}>
            <Button
              variant="outlined"
              startIcon={<SearchOutlined sx={{ fontSize: 16 }} />}
              sx={{ color: "#334155", borderColor: "#E2E8F0", fontWeight: 700, fontSize: "12px", borderRadius: "10px", py: 1, textTransform: "none", bgcolor: "#F8FAFC" }}
            >
              Book Inspection
            </Button>
            <Button
              variant="outlined"
              startIcon={<CallOutlined sx={{ fontSize: 16 }} />}
              sx={{ color: "#334155", borderColor: "#E2E8F0", fontWeight: 700, fontSize: "12px", borderRadius: "10px", py: 1, textTransform: "none", bgcolor: "#F8FAFC" }}
            >
              Contact Manager
            </Button>
          </Box>

          {/* Venue Manager */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: "14px", bgcolor: "#F8FAFC", mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar src={ownerAvatar} sx={{ width: 42, height: 42, borderRadius: "10px" }} />
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}>
                  Venue Manager
                </Typography>
                <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11px" }}>
                  <span style={{ color: "#017E53", fontWeight: 700 }}>● Online</span> - Typical reply: 15 mins
                </Typography>
              </div>
            </Box>
            <ChatBubbleOutline sx={{ fontSize: 18, color: "#017E53", cursor: "pointer" }} />
          </Box>

          {/* Guarantee Badge */}
          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0", display: "flex", gap: 1.2, alignItems: "flex-start" }}>
            <CheckCircle sx={{ fontSize: 16, color: "#017E53", mt: 0.2 }} />
            <div>
              <Typography variant="caption" sx={{ fontWeight: 800, color: "#017E53", fontSize: "10px", display: "block" }}>
                CVPROPERTY GUARANTEE™
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11px", lineHeight: 1.4 }}>
                Your deposit is held in escrow until the booking date. Secure payments only.
              </Typography>
            </div>
          </Box>
        </Paper>

        {/* Large Event Callout */}
        <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1.5px dashed #A7F3D0", bgcolor: "#F0FDF4", textAlign: "center" }}>
          <Box sx={{ width: 44, height: 44, borderRadius: "50%", bgcolor: "#DCFCE7", color: "#017E53", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1.5 }}>
            <GroupsOutlined sx={{ fontSize: 24 }} />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#065F46", fontSize: "15px", mb: 0.5 }}>
            Hosting a large event?
          </Typography>
          <Typography variant="body2" sx={{ color: "#047857", fontSize: "12px", lineHeight: 1.5, mb: 2 }}>
            Get personalized concierge support for events with over 1,000 guests.
          </Typography>
          <Button endIcon={<ChevronRight />} sx={{ color: "#017E53", fontWeight: 800, fontSize: "12.5px", textTransform: "none", p: 0 }}>
            Chat with Event Specialist
          </Button>
        </Paper>
      </Box>
    );
  }

  // 3. APARTMENT SIDEBAR VIEW
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, position: { lg: "sticky" }, top: 20 }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#FFFFFF" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <div>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "10px", letterSpacing: "0.5px" }}>
              PRICING GUIDE
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#0F172A", fontSize: "26px" }}>
                {formatNgn(price)}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700 }}>
                / year
              </Typography>
            </Box>
          </div>

          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
              CAUTION FEE
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "14px" }}>
              {formatNgn(cautionFee)}
            </Typography>
          </Box>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#045335",
            color: "#FFFFFF",
            fontWeight: 800,
            fontSize: "13.5px",
            borderRadius: "12px",
            py: 1.4,
            textTransform: "none",
            boxShadow: "none",
            mb: 1.2,
            "&:hover": { bgcolor: "#142820" },
          }}
        >
          Book Inspection
        </Button>

        <Button
          fullWidth
          variant="outlined"
          sx={{
            color: "#0F172A",
            borderColor: "#E2E8F0",
            fontWeight: 800,
            fontSize: "13px",
            borderRadius: "12px",
            py: 1.3,
            textTransform: "none",
            mb: 2.5,
            "&:hover": { bgcolor: "#F8FAFC", borderColor: "#CBD5E1" },
          }}
        >
          Proceed to Check Out
        </Button>

        {/* Agent Card */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: "14px", bgcolor: "#F8FAFC", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar src={ownerAvatar} sx={{ width: 42, height: 42, borderRadius: "10px" }} />
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "13px" }}>
                {ownerName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11px" }}>
                ☆ 4.9 • CV Properties Verified Agent
              </Typography>
            </div>
          </Box>
          <ChatBubbleOutline sx={{ fontSize: 18, color: "#017E53", cursor: "pointer" }} />
        </Box>

        {/* Protected Badge */}
        <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0", display: "flex", gap: 1.2, alignItems: "flex-start" }}>
          <CheckCircle sx={{ fontSize: 16, color: "#017E53", mt: 0.2 }} />
          <div>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "11px", display: "block" }}>
              CVProperties™ Protected
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", fontSize: "11px" }}>
              Your inspection fee is 100% refundable.
            </Typography>
          </div>
        </Box>
      </Paper>

      {/* Comparable Units Callout */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: "24px", border: "1px solid #E2E8F0", bgcolor: "#F8FAFC", textAlign: "center" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#065F46", fontSize: "15px", mb: 0.5 }}>
          Want to see more?
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748B", fontSize: "12px", mb: 2 }}>
          Explore 24+ similar luxury listings in the Lagos.
        </Typography>
        <Button endIcon={<ChevronRight />} sx={{ color: "#017E53", fontWeight: 800, fontSize: "12.5px", textTransform: "none", p: 0 }}>
          View Comparable Units
        </Button>
      </Paper>
    </Box>
  );
};

export default PropertySidebarBooking;