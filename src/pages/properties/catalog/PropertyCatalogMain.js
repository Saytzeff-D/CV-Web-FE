import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Alert,
  Drawer,
  IconButton,
  Button,
  Badge,
  Typography,
} from "@mui/material";
import { Menu, Close, TuneOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PropertyFilterSidebar from "./components/PropertyFilterSidebar";
import PropertyCatalogHeader from "./components/PropertyCatalogHeader";
import PropertyGridList from "./components/PropertyGridList";
import PropertyPagination from "./components/PropertyPagination";
import Navbar from "../../../components/Navbar";

const defaultFilters = {
  category: "",
  type: "",
  search: "",
  min_price: 500000,
  max_price: 500000000,
  amenities: [],
};

const PropertyCatalogMain = () => {
  const [searchParams] = useSearchParams();
  const uri = useSelector((state) => state.UriReducer?.uri);

  const initialType = searchParams.get("type") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
  const initialMinPrice = Number(searchParams.get("min_price")) || 500000;
  const initialMaxPrice = Number(searchParams.get("max_price")) || 500000000;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // Active filters dispatched to backend
  const [activeFilters, setActiveFilters] = useState({
    category: initialCategory,
    type: initialType,
    search: initialSearch,
    min_price: initialMinPrice,
    max_price: initialMaxPrice,
    amenities: searchParams.get("amenities") ? searchParams.get("amenities").split(",") : [],
  });;
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const limit = 12;

  // Mobile Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Count active applied filters for the hamburger badge
  const activeCount =
    (activeFilters.category ? 1 : 0) +
    (activeFilters.type ? 1 : 0) +
    (activeFilters.search ? 1 : 0) +
    (activeFilters.amenities?.length || 0) +
    (activeFilters.min_price > 500000 || activeFilters.max_price < 500000000 ? 1 : 0);

  const fetchProperties = useCallback(
    async (filtersToUse = activeFilters, targetPage = page, sortOption = sortBy) => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: targetPage,
          limit,
          sort: sortOption,
        };

        if (filtersToUse.category) params.category = filtersToUse.category;
        if (filtersToUse.type) params.type = filtersToUse.type;
        if (filtersToUse.search) params.search = filtersToUse.search;
        if (filtersToUse.min_price > 500000) params.min_price = filtersToUse.min_price;
        if (filtersToUse.max_price < 500000000) params.max_price = filtersToUse.max_price;
        if (filtersToUse.amenities.length > 0) {
          params.amenities = filtersToUse.amenities.join(",");
        }

        const baseUrl = uri ? uri.replace(/\/+$/, "") : "";
        const res = await axios.get(`${baseUrl}/property/all`, { params });

        const data = res.data?.data || [];
        setProperties(data);
        setTotalCount(res.data?.count || data.length);
      } catch (err) {
        console.error("Failed to load properties:", err);
        setError(err.response?.data?.message || "Could not retrieve property listings.");
      } finally {
        setLoading(false);
      }
    },
    [uri, page, sortBy, activeFilters]
  );

  useEffect(() => {
    fetchProperties(activeFilters, 1, "recommended");
  }, []);

  const handleApplyFilters = (newFilters) => {
    setActiveFilters(newFilters);
    setPage(1);
    setMobileFilterOpen(false); // Closes drawer automatically on mobile
    fetchProperties(newFilters, 1, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearAll = () => {
    setActiveFilters(defaultFilters);
    setPage(1);
    setMobileFilterOpen(false);
    fetchProperties(defaultFilters, 1, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveCategory = () => {
    const updated = { ...activeFilters, category: "" };
    setActiveFilters(updated);
    fetchProperties(updated, page, sortBy);
  };

  const handleRemoveType = () => {
    const updated = { ...activeFilters, type: "" };
    setActiveFilters(updated);
    fetchProperties(updated, page, sortBy);
  };

  const handleRemoveAmenity = (amenity) => {
    const updated = {
      ...activeFilters,
      amenities: activeFilters.amenities.filter((a) => a !== amenity),
    };
    setActiveFilters(updated);
    fetchProperties(updated, page, sortBy);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    fetchProperties(activeFilters, page, newSort);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchProperties(activeFilters, newPage, sortBy);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        bgcolor: "#FAFBFC",
        minHeight: "100vh",
        p: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 5, md: 4 },
        width: "100%",
        boxSizing: "border-box",
      }}
    >
        <Navbar />
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* MOBILE TRIGGER BAR: Shown exclusively on mobile (<900px) */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          mt: 5,
          p: 1.5,
          bgcolor: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Badge badgeContent={activeCount} color="success">
            <TuneOutlined sx={{ color: "#017E53", fontSize: 20 }} />
          </Badge>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#0F172A" }}>
            Filter Listings
          </Typography>
        </Box>

        <IconButton
          onClick={() => setMobileFilterOpen(true)}
          sx={{
            bgcolor: "#F1F5F9",
            borderRadius: "10px",
            color: "#1E293B",
            "&:hover": { bgcolor: "#E2E8F0" },
          }}
        >
          <Menu sx={{ fontSize: 22 }} />
        </IconButton>
      </Box>

      {/* MAIN CONTAINER */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: { xs: 3, md: 3.5 },
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          mt: { xs: 0, md: 5 },
          pt: { xs: 0, md: 2 },
        }}
      >
        {/* DESKTOP FILTER SIDEBAR: Hidden on mobile */}
        <Box
          sx={{
            width: { md: 280, lg: 300 },
            flexShrink: 0,
            display: { xs: "none", md: "block" },    
          }}
        >
          <PropertyFilterSidebar
            activeFilters={activeFilters}
            onApply={handleApplyFilters}
            onReset={handleClearAll}
          />
        </Box>

        {/* MOBILE SLIDE-OUT DRAWER */}
        <Drawer
          anchor="left"
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          PaperProps={{
            sx: {
              width: "88%",
              maxWidth: 360,
              p: 2,
              bgcolor: "#FAFBFC",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, px: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "17px" }}>
              Filter Properties
            </Typography>
            <IconButton onClick={() => setMobileFilterOpen(false)} size="small">
              <Close sx={{ fontSize: 20, color: "#64748B" }} />
            </IconButton>
          </Box>

          <Box sx={{ overflowY: "auto", pb: 3 }}>
            <PropertyFilterSidebar
              activeFilters={activeFilters}
              onApply={handleApplyFilters}
              onReset={handleClearAll}
            />
          </Box>
        </Drawer>

        {/* RIGHT COLUMN: Takes full width on mobile and remainder on desktop */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PropertyCatalogHeader
            count={totalCount}
            filters={activeFilters}
            onRemoveCategory={handleRemoveCategory}
            onRemoveType={handleRemoveType}
            onRemoveAmenity={handleRemoveAmenity}
            onClearAll={handleClearAll}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 350,
                width: "100%",
              }}
            >
              <CircularProgress sx={{ color: "#017E53" }} />
            </Box>
          ) : (
            <>
              <PropertyGridList properties={properties} viewMode={viewMode} />
              <PropertyPagination
                count={Math.ceil(totalCount / limit)}
                page={page}
                onChange={(e, p) => handlePageChange(p)}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyCatalogMain;