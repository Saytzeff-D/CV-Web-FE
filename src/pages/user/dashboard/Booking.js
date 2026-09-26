import React, { Fragment, useState, useEffect } from "react";
import {
  IconButton,
  Checkbox,
  Pagination,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,      
  CircularProgress,
} from "@mui/material";
import {
  ChevronRight,
  FileDownloadOutlined,
  Add,
  LocationOnOutlined,
  CalendarMonthOutlined,
  AccessTimeOutlined,
  ChatBubbleOutlineRounded,
  CheckCircleOutlineRounded,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardFooter from "../../../components/DashboardFooter";

const Bookings = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");
  const navigate = useNavigate();

  // Core Data & State Management
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterTime, setFilterTime] = useState("Today");

  // Pagination Configuration State
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // 1. ROUTE ACCESS GUARD
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // 2. DATA FETCHER LIFE-CYCLE
  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    axios
      .get(`${uri}customer/all-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data.bookings || []);        
        if (res.data.metrics) {
          setMetrics(res.data.metrics);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings database:", err);
        setIsLoading(false);
      });
  }, [uri, token]);

  // 3. SELECTION UTILS HANDLERS
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedBookings.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // 4. STATISTICAL COMPILATION OBJECT MAPPING
  const stats = [
    {
      title: "TOTAL BOOKINGS",
      value: metrics?.total_bookings?.count ?? 0,
      icon: <CalendarMonthOutlined />,
      iconColor: "#2563EB",
      trend: metrics?.total_bookings?.change,
      trendColor: "#16A34A",
      trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
    },
    {
      title: "UPCOMING CHECK-INS",
      value: metrics?.upcoming_checkins?.count ?? 0,
      icon: <AccessTimeOutlined />,
      iconColor: "#F97316",
      trend: metrics?.upcoming_checkins?.change,
      trendColor: "#6B7280",
      trendIcon: null,
    },
    {
      title: "PENDING REQUESTS",
      value: metrics?.pending_requests?.count ?? 0,
      icon: <ChatBubbleOutlineRounded />,
      iconColor: "#A855F7",
      trend: metrics?.pending_requests?.change,
      trendColor: "#6B7280",
      trendIcon: <TrendingDown sx={{ fontSize: 14 }} />,
    },
    {
      title: "COMPLETED THIS MONTH",
      value: metrics?.completed_this_month?.count ?? 0,
      icon: <CheckCircleOutlineRounded />,
      iconColor: "#16A34A",
      trend: metrics?.completed_this_month?.change,
      trendColor: "#16A34A",
      trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
    },
  ];

  // 5. CLIENT-SIDE FILTER TIMELINE EVALUATION
  const filteredBookings = bookings.filter((item) => {
    if (filterTime === "Today") return true;
    return true; 
  });

  // 6. MATHEMATICAL PAGINATION CONSTANTS
  const totalPages = Math.ceil(filteredBookings.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + rowsPerPage);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed": return { bg: "#E8F5E9", text: "#2E7D32" };
      case "Pending": return { bg: "#FFF3E0", text: "#E65100" };
      case "Completed": return { bg: "#F5F5F5", text: "#616161" };
      case "New": return { bg: "#E3F2FD", text: "#0D47A1" };
      default: return { bg: "#F5F5F5", text: "#212121" };
    }
  };

  const handleTabChange = (tab) => {
    setFilterTime(tab);
    setPage(1);
    setSelectedRows([]);
  };

  // 7. LOADING FEEDBACK GATEWAY GUARD
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress sx={{ color: "#22C55E" }} />
      </Box>
    );
  }

  return (
    <Box
      className="mt-4 wrapper-box"
      sx={{
        width: "100%",
        maxWidth: "100vw", // Enforces strict screen bounds
        overflowX: "hidden", // Cuts off negative margins from Bootstrap .row
        boxSizing: "border-box",
        px: { xs: 1.5, sm: 2, md: 0 }, // Prevents cards touching edge on mobile
      }}
    >
      <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "22px", sm: "28px" } }}>
        Bookings
      </Typography>
      <Typography color="text.secondary" mb={3} sx={{ fontSize: { xs: "13px", sm: "14px" } }}>
        Manage and track all property reservations and service requests.
      </Typography>

      {/* METRIC CARDS: Use m: 0 and gutter padding to eliminate Bootstrap negative margins */}
      <Box
        className="row g-3"
        sx={{
          mx: 0,
          width: "100%",
          mb: 3,
        }}
      >
        {stats.map((item) => (
          <div className="col-12 col-sm-6 col-lg-3 px-1" key={item.title}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid #ECECEC",
                height: "100%",
                transition: ".3s",
                "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,.08)" },
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: `${item.iconColor}15`, color: item.iconColor, width: 42, height: 42 }}>
                    {item.icon}
                  </Avatar>
                  {item.trend && (
                    <Chip
                      size="small"
                      label={item.trend}
                      icon={item.trendIcon || undefined}
                      sx={{
                        bgcolor: item.trendColor === "#16A34A" ? "#ECFDF3" : "#F3F4F6",
                        color: item.trendColor,
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                  )}
                </Stack>
                <Typography variant="caption" sx={{ color: "#98A2B3", fontWeight: 700, letterSpacing: ".5px" }}>
                  {item.title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: "#111827" }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Box>

      {/* ACTION FILTERS TOOLBAR CONTAINER */}
      <Box
        sx={{
          bgcolor: "#fff",
          border: "1px solid #ECECEC",
          borderRadius: "16px",
          p: { xs: 1.5, sm: 2 },
          mb: 3,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            gap: 1.5,
          }}
        >
          {/* Scrollable pill filter bar on mobile */}
          <Box
            sx={{
              bgcolor: "#F9FAFB",
              p: 0.5,
              borderRadius: "50px",
              display: "flex",
              gap: 0.5,
              overflowX: "auto",
              maxWidth: "100%",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {["Today", "This week", "This month"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="btn rounded-pill px-3 py-1 border-0"
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  fontWeight: filterTime === tab ? "600" : "400",
                  backgroundColor: filterTime === tab ? "#fff" : "transparent",
                  color: filterTime === tab ? "#111827" : "#6B7280",
                  boxShadow: filterTime === tab ? "0px 2px 6px rgba(0,0,0,0.06)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </Box>

          <button
            className="btn btn-dark rounded-pill px-3 py-1.5 d-flex align-items-center justify-content-center gap-1.5 fw-semibold"
            style={{ fontSize: "12.5px" }}
            disabled={selectedRows.length === 0}
          >
            <Add fontSize="small" /> Delete Selected ({selectedRows.length})
          </button>
        </Box>
      </Box>

      {/* ISOLATED TABLE OVERFLOW WRAPPER */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0, // CRITICAL: forces flex child to respect parent width rather than table child width
          overflow: "hidden",
          borderRadius: "16px",
          border: "1px solid #ECECEC",
          bgcolor: "#FFFFFF",
          mb: 5,
        }}
      >
        <TableContainer
          sx={{
            width: "100%",
            maxWidth: "100%",
            overflowX: "auto",
            display: "block",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Table sx={{ minWidth: 700, width: "100%" }}>
            <TableHead sx={{ bgcolor: "#FAFAFA" }}>
              <TableRow sx={{ borderBottom: "1px solid #ECECEC" }}>
                <TableCell padding="checkbox" sx={{ pl: 2, width: "40px" }}>
                  <Checkbox
                    size="small"
                    checked={paginatedBookings.length > 0 && selectedRows.length === paginatedBookings.length}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedBookings.length}
                    onChange={handleSelectAll}
                    sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>BOOKING INFO</TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>TYPE</TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>AGENT</TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>DATE & TIME</TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>AMOUNT</TableCell>
                <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", whiteSpace: "nowrap" }}>STATUS</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((row) => {
                  const isChecked = selectedRows.includes(row.id);
                  const statusTheme = getStatusStyles(row.status);

                  return (
                    <TableRow key={row.id} hover selected={isChecked} sx={{ borderBottom: "1px solid #F9FAFB" }}>
                      <TableCell padding="checkbox" sx={{ pl: 2 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked}
                          onChange={() => handleSelectRow(row.id)}
                          sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                        />
                      </TableCell>

                      <TableCell sx={{ py: 1.5, minWidth: 200 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: "#E5E7EB",
                              borderRadius: "8px",
                              flexShrink: 0,
                              backgroundImage: `url(${row.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 700,
                                color: "#111827",
                                fontSize: "13px",
                                lineHeight: 1.2,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 160,
                              }}
                            >
                              {row.display_name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#9CA3AF", mt: 0.3 }}>
                              <LocationOnOutlined sx={{ fontSize: 13, flexShrink: 0 }} />
                              <Typography variant="caption" sx={{ fontSize: "11px" }} noWrap>
                                {row.location}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Box
                          component="span"
                          sx={{
                            px: 1.5,
                            py: 0.4,
                            borderRadius: "50px",
                            fontSize: "11px",
                            fontWeight: 700,
                            backgroundColor: row.typeColor || "#F3F4F6",
                            color: row.typeTextColor || "#4B5563",
                          }}
                        >
                          {row.type}
                        </Box>
                      </TableCell>

                      <TableCell sx={{ minWidth: 150 }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "12.5px" }} noWrap>
                            {row.agent?.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", fontSize: "10.5px" }} noWrap>
                            {row.agent?.email}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell sx={{ color: "#4B5563", fontSize: "12.5px", whiteSpace: "nowrap" }}>
                        {row.date_time}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 700, color: "#111827", fontSize: "12.5px", whiteSpace: "nowrap" }}>
                        {row.amount}
                      </TableCell>

                      <TableCell sx={{ whiteSpace: "nowrap" }}>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            fontSize: "10.5px",
                            fontWeight: 600,
                            height: "22px",
                            backgroundColor: statusTheme.bg,
                            color: statusTheme.text,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                    <Typography color="text.secondary" sx={{ fontSize: "13px" }}>
                      No reservations found matching your specifications.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* PAGINATION */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, sm: 3 },
            py: 2,
            bgcolor: "#ffffff",
            borderTop: "1px solid #ECECEC",
            gap: 1.5,
          }}
        >
          <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "12px" }}>
            Showing {filteredBookings.length === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + rowsPerPage, filteredBookings.length)} of {filteredBookings.length} results
          </Typography>

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  fontSize: "12px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  mx: 0.3,
                  background: "#fff",
                  "&.Mui-selected": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    borderColor: "#000000",
                    "&:hover": { backgroundColor: "#1F2937" },
                  },
                },
              }}
            />
          )}
        </Box>
      </Box>

      <DashboardFooter />
    </Box>
  );
};

export default Bookings;