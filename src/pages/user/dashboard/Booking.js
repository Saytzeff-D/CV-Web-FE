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
        console.log(res.data)
        // Fallback protections to secure execution if data layout properties vary
        setBookings(res.data.bookings);        
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
      value: metrics?.total_bookings?.count,
      icon: <CalendarMonthOutlined />,
      iconColor: "#2563EB",
      trend: metrics?.total_bookings?.change,
      trendColor: "#16A34A",
      trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
    },
    {
      title: "UPCOMING CHECK-INS",
      value: metrics?.upcoming_checkins?.count,
      icon: <AccessTimeOutlined />,
      iconColor: "#F97316",
      trend: metrics?.upcoming_checkins?.change,
      trendColor: "#6B7280",
      trendIcon: null,
    },
    {
      title: "PENDING REQUESTS",
      value: metrics?.pending_requests?.count,
      icon: <ChatBubbleOutlineRounded />,
      iconColor: "#A855F7",
      trend: metrics?.pending_requests?.change,
      trendColor: "#6B7280",
      trendIcon: <TrendingDown sx={{ fontSize: 14 }} />,
    },
    {
      title: "COMPLETED THIS MONTH",
      value: metrics?.completed_this_month?.count,
      icon: <CheckCircleOutlineRounded />,
      iconColor: "#16A34A",
      trend: metrics?.completed_this_month?.change,
      trendColor: "#16A34A",
      trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
    },
  ];

  // 5. CLIENT-SIDE FILTER TIMELINE EVALUATION
  const filteredBookings = bookings.filter((item) => {
    if (filterTime === "Today") return true; // Adjust matching parameters if your API passes detailed timestamp fields
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
    setSelectedRows([]); // Clear checks on navigation view mutation loops
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
    <div className="mt-4">
      <Typography variant="h4" fontWeight={700}>
        Bookings
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Manage and track all property reservations and service requests.
      </Typography>

      {/* METRIC CARDS OVERVIEW PANEL */}
      <div className="row g-4">
        {stats.map((item) => (
          <div className="col-lg-3 col-md-6" key={item.title}>
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
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Avatar sx={{ bgcolor: `${item.iconColor}15`, color: item.iconColor, width: 46, height: 46 }}>
                    {item.icon}
                  </Avatar>
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
                </Stack>
                <Typography variant="caption" sx={{ color: "#98A2B3", fontWeight: 700, letterSpacing: ".5px" }}>
                  {item.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mt: .5, color: "#111827" }}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* ACTION FILTERS TOOLBAR BAR CONTAINER */}
      <Box sx={{ bgcolor: "#fff", border: "1px solid #ECECEC", borderRadius: "16px", p: 2, my: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          <Box sx={{ bgcolor: "#F9FAFB", p: 0.5, borderRadius: "50px", display: "flex", gap: 0.5 }}>
            {["Today", "This week", "This month"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="btn rounded-pill px-3 py-1.5 border-0"
                style={{
                  fontSize: "13px",
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

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* <button className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold border-light-subtle" style={{ fontSize: "14px" }}>
              <FileDownloadOutlined fontSize="small" /> Export CSV
            </button> */}
            <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold" style={{ fontSize: "14px" }}>
              <Add fontSize="small" /> Delete Selected
            </button>
          </Box>
        </Box>
      </Box>

      {/* CORE DATA TABLE WITH ENABLED SWIPING OVERFLOW */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ width: "100%", overflowX: "auto", borderRadius: "16px", border: "1px solid #ECECEC", mb: 5 }}
      >
        <Table sx={{ minWidth: 850 }}>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow sx={{ borderBottom: "1px solid #ECECEC" }}>
              <TableCell padding="checkbox" sx={{ pl: 3, width: "50px" }}>
                <Checkbox
                  size="small"
                  checked={paginatedBookings.length > 0 && selectedRows.length === paginatedBookings.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedBookings.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>BOOKING INFO</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>TYPE</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>CLIENT</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>DATE & TIME</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>AMOUNT</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 700, color: "#6B7280", pr: 3 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedBookings.length > 0 ? (
              paginatedBookings.map((row) => {
                const isChecked = selectedRows.includes(row.id);
                const statusTheme = getStatusStyles(row.status);

                return (
                  <TableRow key={row.id} hover selected={isChecked} sx={{ borderBottom: "1px solid #F9FAFB" }}>
                    <TableCell padding="checkbox" sx={{ pl: 3 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked}
                        onChange={() => handleSelectRow(row.id)}
                        sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                      />
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ width: 44, height: 44, bgcolor: "#E5E7EB", borderRadius: "8px", flexShrink: 0, backgroundImage: `url(${row.image})`, backgroundSize: 'cover' }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", fontSize: "14px", lineHeight: 1.2 }}>
                            {row.title}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#9CA3AF", mt: 0.5 }}>
                            <LocationOnOutlined sx={{ fontSize: 14 }} />
                            <Typography variant="caption" sx={{ fontSize: "12px" }}>{row.location}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box component="span" sx={{ px: 1.5, py: 0.5, borderRadius: "50px", fontSize: "11px", fontWeight: 700, backgroundColor: row.typeColor || "#F3F4F6", color: row.typeTextColor || "#4B5563" }}>
                        {row.type}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "14px" }}>
                          {/* {row.client} */}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block" }}>
                          {row.subtitle}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ color: "#4B5563", fontSize: "14px" }}>{row.date}</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: "#111827", fontSize: "14px" }}>{row.amount}</TableCell>

                    <TableCell>
                      <Box>
                        <Chip label={row.status} size="small" sx={{ fontSize: "11px", fontWeight: 600, height: "22px", backgroundColor: statusTheme.bg, color: statusTheme.text }} />
                        <Typography variant="caption" sx={{ color: "#9CA3AF", display: "block", mt: 0.5, fontSize: "11px" }}>
                          {row.statusSubtitle}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 3 }}>
                      <IconButton size="small" sx={{ color: "#9CA3AF" }}>
                        <ChevronRight fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <Typography color="text.secondary">No reservations found matching your specifications.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* DYNAMIC CALCULATION PAGINATION SLIDER ROW CONTROLS */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", px: 3, py: 2, bgcolor: "#ffffff", borderTop: "1px solid #ECECEC", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "14px" }}>
            Rows per page: <Box component="span" sx={{ color: "#111827", fontWeight: 600, mr: 4 }}>{rowsPerPage}</Box>
            Showing {filteredBookings.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredBookings.length)} of {filteredBookings.length} results
          </Typography>
          
          {totalPages > 1 && (
            <Box>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                shape="rounded"
                size="medium"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    fontSize: "13px",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    mx: 0.5,
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
            </Box>
          )}
        </Box>
      </TableContainer>

      <DashboardFooter />
    </div>
  );
};

export default Bookings;