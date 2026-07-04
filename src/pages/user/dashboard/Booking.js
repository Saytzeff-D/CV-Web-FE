import React, { Fragment, useState } from "react";
import {
  IconButton,
  Checkbox,
  Pagination,
  Box,
} from "@mui/material";
import {
  ChevronRight,
  FileDownloadOutlined,
  Add,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  CalendarMonthOutlined,
  AccessTimeOutlined,
  ChatBubbleOutlineRounded,
  CheckCircleOutlineRounded,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import DashboardFooter from "../../../components/DashboardFooter";

const stats = [
  {
    title: "TOTAL BOOKINGS",
    value: "148",
    icon: <CalendarMonthOutlined />,
    iconColor: "#2563EB",
    trend: "+12%",
    trendColor: "#16A34A",
    trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
  },
  {
    title: "UPCOMING CHECK-INS",
    value: "12",
    icon: <AccessTimeOutlined />,
    iconColor: "#F97316",
    trend: "Next 7 days",
    trendColor: "#6B7280",
    trendIcon: null,
  },
  {
    title: "PENDING REQUESTS",
    value: "05",
    icon: <ChatBubbleOutlineRounded />,
    iconColor: "#A855F7",
    trend: "-2.4%",
    trendColor: "#6B7280",
    trendIcon: <TrendingDown sx={{ fontSize: 14 }} />,
  },
  {
    title: "COMPLETED THIS MONTH",
    value: "24",
    icon: <CheckCircleOutlineRounded />,
    iconColor: "#16A34A",
    trend: "+5.2%",
    trendColor: "#16A34A",
    trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
  },
];

const bookingsData = [
    {
      id: 1,
      title: "Azure Heights Penthouse",
      location: "Lekki Phase 1",
      type: "BOOKING",
      typeColor: "#E3F2FD",
      typeTextColor: "#1E88E5",
      client: "Sarah Thompson",
      subtitle: "4 Guests",
      date: "May 12 - May 24, 2024",
      amount: "₦850,000",
      status: "Confirmed",
      statusSubtitle: "Paid Payment",
      statusColor: "success",
    },
    {
      id: 2,
      title: "Greenview Modern Studio",
      location: "Victoria Island",
      type: "BOOKING",
      typeColor: "#E3F2FD",
      typeTextColor: "#1E88E5",
      client: "Michael Chen",
      subtitle: "2 Guests",
      date: "Jun 02 - Jun 05, 2024",
      amount: "₦120,000",
      status: "Pending",
      statusSubtitle: "Pending Payment",
      statusColor: "warning",
    },
    {
      id: 3,
      title: "Facility Maintenance",
      location: "Silicon Plaza",
      type: "SERVICE",
      typeColor: "#F3E5F5",
      typeTextColor: "#8E24AA",
      client: "TechHub Ltd",
      subtitle: "-",
      date: "Jul 10, 2024",
      amount: "₦45,000",
      status: "Completed",
      statusSubtitle: "Paid Payment",
      statusColor: "default",
    },
    {
      id: 4,
      title: "Oceanic Villa Tour",
      location: "Lekki Phase 1",
      type: "INQUIRY",
      typeColor: "#EDE7F6",
      typeTextColor: "#5E35B1",
      client: "James Adewale",
      subtitle: "1 Guest",
      date: "Aug 15, 2024",
      amount: "₦0",
      status: "New",
      statusSubtitle: "· Payment",
      statusColor: "primary",
    },
  ];

const Bookings = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [filterTime, setFilterTime] = useState("Today");

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(bookingsData.map((row) => row.id));
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

  // Status Badge Custom Styling Mapper
  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed":
        return { bg: "#E8F5E9", text: "#2E7D32" };
      case "Pending":
        return { bg: "#FFF3E0", text: "#E65100" };
      case "Completed":
        return { bg: "#F5F5F5", text: "#616161" };
      case "New":
        return { bg: "#E3F2FD", text: "#0D47A1" };
      default:
        return { bg: "#F5F5F5", text: "#212121" };
    }
  };
  return (
    <div className="mt-4">
        <Typography variant="h4" fontWeight={700}>
            Bookings
        </Typography>

        <Typography color="text.secondary" mb={4}>
            Manage and track all property reservations and service requests.
        </Typography>
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
                "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                },
                }}
            >
                <CardContent>

                {/* Top Row */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Avatar
                    sx={{
                        bgcolor: `${item.iconColor}15`,
                        color: item.iconColor,
                        width: 46,
                        height: 46,
                    }}
                    >
                    {item.icon}
                    </Avatar>

                    <Chip
                    size="small"
                    label={item.trend}
                    icon={item.trendIcon}
                    sx={{
                        bgcolor:
                        item.trendColor === "#16A34A"
                            ? "#ECFDF3"
                            : "#F3F4F6",
                        color: item.trendColor,
                        fontWeight: 600,
                        fontSize: 11,
                    }}
                    />
                </Stack>

                {/* Title */}

                <Typography
                    variant="caption"
                    sx={{
                    color: "#98A2B3",
                    fontWeight: 700,
                    letterSpacing: ".5px",
                    }}
                >
                    {item.title}
                </Typography>

                {/* Value */}

                <Typography
                    variant="h4"
                    sx={{
                    fontWeight: 700,
                    mt: .5,
                    color: "#111827",
                    }}
                >
                    {item.value}
                </Typography>

                </CardContent>
            </Card>
            </div>
        ))}
        </div>

    <div className="container-fluid px-0 py-4">
      {/* 1. TOP HEADER PANEL ACTIONS */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center g-3">
          {/* Leftside: Filter Toggle Tabs */}
          <div className="d-flex align-items-center gap-2">
            <div className="bg-light p-1 rounded-pill d-flex gap-1">
              {["Today", "This week", "This month"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTime(tab)}
                  className={`btn rounded-pill px-3 py-1.5 border-0 text-capitalize font-weight-bold`}
                  style={{
                    fontSize: "13px",
                    fontWeight: filterTime === tab ? "600" : "400",
                    backgroundColor: filterTime === tab ? "#fff" : "transparent",
                    boxShadow: filterTime === tab ? "0px 2px 6px rgba(0,0,0,0.06)" : "none",
                    color: filterTime === tab ? "#000" : "#6C757D",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Rightside Action Trigger Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold style-link" style={{ fontSize: "14px", borderColor: "#E5E7EB" }}>
              <FileDownloadOutlined fontSize="small" /> Export CSV
            </button>
            <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold" style={{ fontSize: "14px" }}>
              <Add fontSize="small" /> Approve Selected
            </button>
          </div>
        </div>
      </div>

      {/* 2. TABLE DATA BINDING VIEW CONTAINER */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0">
            <thead>
              <tr className="bg-light-subtle" style={{ borderBottom: "1px solid #F3F4F6" }}>
                <th style={{ width: "50px", paddingLeft: "24px" }}>
                  <Checkbox
                    size="small"
                    checked={selectedRows.length === bookingsData.length}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < bookingsData.length}
                    onChange={handleSelectAll}
                    sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                  />
                </th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Booking Info</th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Type</th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Client</th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Date & Time</th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Amount</th>
                <th className="text-muted fw-semibold py-3 text-uppercase" style={{ fontSize: "12px", letterSpacing: "0.5px" }}>Status</th>
                <th className="text-muted fw-semibold py-3 text-uppercase text-end" style={{ fontSize: "12px", letterSpacing: "0.5px", paddingRight: "24px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingsData.map((row) => {
                const isChecked = selectedRows.includes(row.id);
                const statusTheme = getStatusStyles(row.status);

                return (
                  <tr key={row.id} style={{ borderBottom: "1px solid #F9FAFB" }} className={isChecked ? "bg-light-subtle" : ""}>
                    {/* Checkbox Frame */}
                    <td style={{ paddingLeft: "24px" }}>
                      <Checkbox
                        size="small"
                        checked={isChecked}
                        onChange={() => handleSelectRow(row.id)}
                        sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                      />
                    </td>

                    {/* Booking Info Column */}
                    <td className="py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-3" style={{ width: 44, height: 44, backgroundColor: "#E5E7EB" }} />
                        <div>
                          <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>{row.title}</span>
                          <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: "12px" }}>
                            <LocationOnOutlined sx={{ fontSize: 14 }} /> {row.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type Tag Column */}
                    <td>
                      <span
                        className="badge px-2.5 py-1.5 rounded-pill font-weight-bold"
                        style={{ backgroundColor: row.typeColor, color: row.typeTextColor, fontSize: "11px", fontWeight: "700" }}
                      >
                        {row.type}
                      </span>
                    </td>

                    {/* Client Identity Meta */}
                    <td>
                      <div>
                        <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>{row.client}</span>
                        <span className="text-muted" style={{ fontSize: "12px" }}>{row.subtitle}</span>
                      </div>
                    </td>

                    {/* Date Scope Value */}
                    <td className="text-secondary" style={{ fontSize: "14px" }}>
                      {row.date}
                    </td>

                    {/* Amount Block */}
                    <td className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                      {row.amount}
                    </td>

                    {/* Status Structural Badging */}
                    <td>
                      <div>
                        <Chip
                          label={row.status}
                          size="small"
                          sx={{
                            fontSize: "11px",
                            fontWeight: 600,
                            height: "22px",
                            backgroundColor: statusTheme.bg,
                            color: statusTheme.text,
                          }}
                        />
                        <span className="text-muted d-block mt-0.5" style={{ fontSize: "11px" }}>{row.statusSubtitle}</span>
                      </div>
                    </td>

                    {/* Chevron Link Trigger */}
                    <td className="text-end" style={{ paddingRight: "24px" }}>
                      <IconButton size="small" sx={{ color: "#9CA3AF" }}>
                        <ChevronRight fontSize="small" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 3. PAGINATION ROW COMPONENT FOOTER */}
        <div className="d-flex flex-wrap justify-content-between align-items-center px-4 py-3 bg-white" style={{ borderTop: "1px solid #F3F4F6" }}>
          <div className="text-muted" style={{ fontSize: "14px" }}>
            Rows per page: <span className="text-dark fw-semibold me-4">10</span> 
            Showing 1-10 of 148 results
          </div>
          <div>
            {/* Native clean configuration override matching mockup circles */}
            <Pagination
              count={3}
              shape="rounded"
              size="medium"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  fontSize: "13px",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  mx: 0.5,
                  "&.Mui-selected": {
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    borderColor: "#000000",
                    "&:hover": {
                      backgroundColor: "#1F2937",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
    <DashboardFooter />
    </div>
  );
};

export default Bookings;