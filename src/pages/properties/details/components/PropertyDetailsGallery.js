import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Breadcrumbs,
  Link,
  Modal,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  ShareOutlined,
  BookmarkBorder,
  Bookmark,
  Close,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { RWebShare } from "react-web-share";
import { useSelector } from "react-redux";
import axios from "axios";

const PropertyDetailsGallery = ({ property }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currency = useSelector((state) => state.CurrencyReducer.currency);
  const rates = useSelector((state) => state.CurrencyReducer.rates);
  const uri = useSelector((state) => state.UriReducer?.uri);
  const currentUser = useSelector((state) => state.UserReducer?.userInfo);

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(property?.saves_count || 0);
  const [actionLoading, setActionLoading] = useState(false);
  const token = sessionStorage.getItem("userToken");

  // Synchronize count and inspect the backend's injected saved array
  useEffect(() => {
    if (location.state?.autoSave && token && property?.id) {
      handleSaveToggle();
      // Clear history state so a page refresh doesn't trigger it again
      window.history.replaceState({}, document.title);
    }
    if (property?.saves_count !== undefined) {
      setSavesCount(property.saves_count);
    }
    
    if (!token || !currentUser?.id) {
      setIsSaved(false);
      return;
    }

    // Injected array from backend: supports numbers [1, 2], strings ['1', '2'], or objects [{ user_id: 1 }]
    const savedList =
      property?.saved_by_users ||
      property?.saved_users ||
      property?.saved_by ||
      [];

    const currentUserId = Number(currentUser.id);

    const hasSaved = Array.isArray(savedList)
      ? savedList.some((item) => {
          if (typeof item === "number" || typeof item === "string") {
            return Number(item) === currentUserId;
          }
          return (
            Number(item?.user_id || item?.id) === currentUserId ||
            item?.email === currentUser.email
          );
        })
      : Boolean(property?.is_saved ?? property?.saved);

    setIsSaved(hasSaved);
  }, [property, currentUser]);

  // Handle Save / Unsave Action
  const handleSaveToggle = async () => {   
    // Route unauthenticated visitors to login
    if (!token) {
      navigate("/login", {
        state: { returnUrl: location.pathname + location.search, autoSave: true },
      });
      return;
    }

    const previousSavedState = isSaved;
    const nextSavedState = !previousSavedState;

    // Optimistic UI updates
    setIsSaved(nextSavedState);
    setSavesCount((prev) => (nextSavedState ? prev + 1 : Math.max(0, prev - 1)));

    try {
      setActionLoading(true);
      await axios.post(
        `${uri}customer/save-property`,
        { property_id: property?.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Save/Unsave operation failed:", err);
      // Rollback on network/server error
      setIsSaved(previousSavedState);
      setSavesCount((prev) => (previousSavedState ? prev + 1 : Math.max(0, prev - 1)));
    } finally {
      setActionLoading(false);
    }
  };

  const mainPhoto =
    property?.main_photo ||
    property?.resources?.[0]?.url ||
    "/placeholder-property.jpg";

  const resourceImages = (property?.resources || [])
    .filter((r) => r.type === "image" || !r.type)
    .map((r) => (typeof r === "string" ? r : r.url))
    .filter(Boolean);

  const thumb1 = resourceImages[0] || mainPhoto;
  const thumb2 = resourceImages[1] || mainPhoto;
  const thumb3 = resourceImages[2] || mainPhoto;
  const thumb4 = resourceImages[3] || mainPhoto;
  const remainingCount = Math.max(0, resourceImages.length - 4);

  const allGalleryImages = Array.from(new Set([mainPhoto, ...resourceImages]));

  return (
    <Box sx={{ mt: 5, pt: 4, mb: 4, width: "100%" }}>
      {/* Top Breadcrumbs & Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Breadcrumbs separator="›" sx={{ fontSize: "12.5px", color: "#64748B" }}>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate("/properties")}
            sx={{ cursor: "pointer" }}
          >
            Properties
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() => navigate(`/properties?type=${property?.type}`)}
            sx={{ cursor: "pointer", textTransform: "capitalize" }}
          >
            {property?.type ? `${property.type}s` : "Listings"}
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "12.5px", fontWeight: 700 }}>
            {property?.name}
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", gap: 1 }}>
          <RWebShare
            data={{
              text: `Check out this property: ${property?.name}, located at ${property?.address}. Price: ${Number(
                (property?.total_price || 0) * (rates?.[currency] || 1)
              ).toLocaleString("en-NG", { style: "currency", currency })}.`,
              url: window.location.href,
              title: "CV Properties",
            }}
          >
            <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Share">
              <ShareOutlined sx={{ fontSize: 16 }} /> Share Listing
            </button>
          </RWebShare>

          <Button
            variant={isSaved ? "contained" : "outlined"}
            size="small"
            disabled={actionLoading}
            onClick={handleSaveToggle}
            startIcon={
              actionLoading ? (
                <CircularProgress size={14} color="inherit" />
              ) : isSaved ? (
                <Bookmark sx={{ fontSize: 16 }} />
              ) : (
                <BookmarkBorder sx={{ fontSize: 16 }} />
              )
            }
            sx={{
              textTransform: "none",
              color: isSaved ? "#FFFFFF" : "#334155",
              bgcolor: isSaved ? "#017E53" : "transparent",
              borderColor: isSaved ? "#017E53" : "#E2E8F0",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "12px",
              boxShadow: "none",
              "&:hover": {
                bgcolor: isSaved ? "#016744" : "#F8FAFC",
                borderColor: isSaved ? "#016744" : "#CBD5E1",
                boxShadow: "none",
              },
            }}
          >
            {isSaved ? "Saved" : "Save"} ({savesCount})
          </Button>
        </Box>
      </Box>

      {/* Main 5-Photo Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2.3fr 1fr 1fr" },
          gridTemplateRows: { xs: "auto", md: "210px 210px" },
          gap: 1.6,
          width: "100%",
        }}
      >
        {/* 1. Main Photo */}
        <Box
          onClick={() => setGalleryOpen(true)}
          sx={{
            gridColumn: { xs: "auto", md: "1 / 2" },
            gridRow: { xs: "auto", md: "1 / 3" },
            position: "relative",
            height: { xs: 260, md: "100%" },
            borderRadius: "18px",
            overflow: "hidden",
            bgcolor: "#E2E8F0",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={mainPhoto}
            alt={property?.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <Chip
            label="FEATURED LISTING"
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "#124233",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "10px",
              height: 24,
              borderRadius: "12px",
              px: 0.6,
            }}
          />
        </Box>

        {/* 2. Top-Left Resource */}
        <Box
          onClick={() => setGalleryOpen(true)}
          sx={{
            gridColumn: { xs: "auto", md: "2 / 3" },
            gridRow: { xs: "auto", md: "1 / 2" },
            display: { xs: "none", md: "block" },
            borderRadius: "18px",
            overflow: "hidden",
            bgcolor: "#E2E8F0",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={thumb1}
            alt="Resource 1"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
        </Box>

        {/* 3. Top-Right Resource */}
        <Box
          onClick={() => setGalleryOpen(true)}
          sx={{
            gridColumn: { xs: "auto", md: "3 / 4" },
            gridRow: { xs: "auto", md: "1 / 2" },
            display: { xs: "none", md: "block" },
            borderRadius: "18px",
            overflow: "hidden",
            bgcolor: "#E2E8F0",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={thumb2}
            alt="Resource 2"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
        </Box>

        {/* 4. Bottom-Left Resource */}
        <Box
          onClick={() => setGalleryOpen(true)}
          sx={{
            gridColumn: { xs: "auto", md: "2 / 3" },
            gridRow: { xs: "auto", md: "2 / 3" },
            display: { xs: "none", md: "block" },
            borderRadius: "18px",
            overflow: "hidden",
            bgcolor: "#E2E8F0",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={thumb3}
            alt="Resource 3"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.25s ease",
              "&:hover": { transform: "scale(1.04)" },
            }}
          />
        </Box>

        {/* 5. Bottom-Right Resource with +X More Overlay */}
        <Box
          onClick={() => setGalleryOpen(true)}
          sx={{
            gridColumn: { xs: "auto", md: "3 / 4" },
            gridRow: { xs: "auto", md: "2 / 3" },
            display: { xs: "none", md: "block" },
            position: "relative",
            borderRadius: "18px",
            overflow: "hidden",
            bgcolor: "#E2E8F0",
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src={thumb4}
            alt="Resource 4"
            sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              bgcolor: "rgba(100, 105, 112, 0.88)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "rgba(80, 85, 92, 0.95)" },
            }}
          >
            <Typography sx={{ fontWeight: 800, fontSize: "20px" }}>
              +{remainingCount > 0 ? remainingCount : 1} More
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Lightbox Modal */}
      <Modal
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1.5, md: 3 },
          backdropFilter: "blur(8px)",
          bgcolor: "rgba(10, 15, 20, 0.85)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1100,
            maxHeight: "92vh",
            bgcolor: "#0F172A",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              py: 2,
              borderBottom: "1px solid #1E293B",
            }}
          >
            <div>
              <Typography sx={{ color: "#FFFFFF", fontWeight: 800, fontSize: "16px" }}>
                {property?.name}
              </Typography>
              <Typography sx={{ color: "#94A3B8", fontSize: "12px" }}>
                All Photos ({allGalleryImages.length})
              </Typography>
            </div>
            <IconButton onClick={() => setGalleryOpen(false)} sx={{ color: "#FFFFFF" }}>
              <Close sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              p: 3,
              overflowY: "auto",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 2,
            }}
          >
            {allGalleryImages.map((img, i) => (
              <Box
                key={i}
                sx={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  height: 220,
                  bgcolor: "#1E293B",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={img}
                  alt={`Photo ${i + 1}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PropertyDetailsGallery;