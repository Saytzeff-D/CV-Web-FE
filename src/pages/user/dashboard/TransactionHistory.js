import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  Pagination,
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
  CreditCard,
  CallMade,
  AccessTime,
  ErrorOutline,
  FileDownloadOutlined,
  DeleteOutline,
  ChevronRight,
  ArrowDownward,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const TransactionHistory = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");

  // State Management
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTransactions: "₦0",
    successfulTransactions: "₦0",
    pendingTransactions: "₦0",
    failedTransactions: "₦0",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [timeFilter, setTimeFilter] = useState("Today");
  
    // Pagination Configuration State
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;

  // Fetch Data Lifecycle
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${uri}customer/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Fallback checks to prevent parsing crashes
        setTransactions(res.data.transactions || []);
        if (res.data.metrics) {
          setMetrics(res.data.metrics);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transaction data:", err);
        setIsLoading(false);
      });
  }, [uri, token]);

  // Table Selection Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(transactions.map((tx) => tx.id));
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

  // 5. CLIENT-SIDE FILTER TIMELINE EVALUATION
  const filteredTransactions = transactions.filter((item) => {
    if (timeFilter === "Today") return true; // Adjust matching parameters if your API passes detailed timestamp fields
    return true; 
  });

  // 6. MATHEMATICAL PAGINATION CONSTANTS
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);

  // Helper Badge Color Class Assigners
  const getTypeBadgeStyles = (type) => {
    switch (type?.toUpperCase()) {
      case "PAYMENT": return { bg: "#E3F2FD", text: "#1E88E5" };
      case "REFUND": return { bg: "#FFF3E0", text: "#E65100" };
      case "PAYOUT": return { bg: "#F3E5F5", text: "#8E24AA" };
      case "TOP-UP": return { bg: "#E8F5E9", text: "#2E7D32" };
      default: return { bg: "#F5F5F5", text: "#616161" };
    }
  };

  const getStatusChipStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "successful": return { bg: "#E8F5E9", text: "#2E7D32" };
      case "pending": return { bg: "#FFFDE7", text: "#F57F17" };
      case "failed": return { bg: "#FFEBEE", text: "#C62828" };
      default: return { bg: "#F5F5F5", text: "#212121" };
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress sx={{ color: "#23663E" }} />
      </Box>
    );
  }

  // hardcoded mapping matching metric specifications from image
  const cardMetricsData = [
    { title: "TOTAL TRANSACTIONS", value: metrics.totalTransactions || "₦4,250,000", change: "+12.5%", icon: <CreditCard sx={{ color: "#2563EB" }} />, bg: "#EFF6FF", tagColor: "success" },
    { title: "SUCCESSFUL TRANSACTIONS", value: metrics.successfulTransactions || "₦3,120,000", change: "+8.2%", icon: <CallMade sx={{ color: "#16A34A" }} />, bg: "#F0FDF4", tagColor: "success" },
    { title: "PENDING TRANSACTIONS", value: metrics.pendingTransactions || "₦185,000", change: "-2.4%", icon: <AccessTime sx={{ color: "#EA580C" }} />, bg: "#FFF7ED", tagColor: "warning" },
    { title: "FAILED TRANSACTIONS", value: metrics.failedTransactions || "₦95,400", change: "+5.2%", icon: <ErrorOutline sx={{ color: "#DC2626" }} />, bg: "#FEF2F2", tagColor: "success" },
  ];

  return (
    <div className="container-fluid px-0 py-4">
      {/* 1. TYPOGRAPHY TITLE */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark mb-1">Transaction History</h3>
        <Typography variant="body2" color="text.secondary">
          Monitor all financial movements, payouts, and customer payments.
        </Typography>
      </div>

      {/* 2. STATS UPPER ROW OVERVIEW CARDS */}
      <div className="row g-3 mb-4">
        {cardMetricsData.map((card, idx) => (
          <div className="col-xl-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 p-3 bg-white h-100">
              <div className="d-flex justify-content-between align-items-start">
                <Box sx={{ p: 1.5, bgcolor: card.bg, borderRadius: "12px", display: "flex" }}>
                  {card.icon}
                </Box>
                <span className={`badge rounded-pill px-2.5 py-1 text-success fw-bold bg-success-subtle`} style={{ fontSize: "11px" }}>
                  {card.change}
                </span>
              </div>
              <div className="mt-3">
                <small className="text-muted fw-semibold text-uppercase d-block" style={{ fontSize: "11px", letterSpacing: "0.3px" }}>
                  {card.title}
                </small>
                <h4 className="fw-bold text-dark mt-1 mb-0">{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. FILTER ACTIONS SUBBAR ROW CONTAINER */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="d-flex flex-wrap justify-content-between align-items-center g-3">
          {/* Dropdown Select Forms */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <select className="form-select form-select-sm rounded-3 py-2 px-3 border-light-subtle text-muted" style={{ width: "130px", fontSize: "13px" }}>
              <option>Type:</option>
            </select>
            <select className="form-select form-select-sm rounded-3 py-2 px-3 border-light-subtle text-muted" style={{ width: "130px", fontSize: "13px" }}>
              <option>Status:</option>
            </select>
            
            {/* Timeline Filter Pills */}
            <div className="bg-light p-1 rounded-pill d-flex gap-1 ms-sm-2">
              {["Today", "This week", "This month"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeFilter(tab)}
                  className="btn rounded-pill px-3 py-1 border-0"
                  style={{
                    fontSize: "12px",
                    fontWeight: timeFilter === tab ? "600" : "400",
                    backgroundColor: timeFilter === tab ? "#fff" : "transparent",
                    color: timeFilter === tab ? "#000" : "#6C757D",
                    boxShadow: timeFilter === tab ? "0px 2px 4px rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Action Click Elements */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
            {/* <button className="btn btn-outline-dark rounded-pill px-3.5 py-2 d-flex align-items-center gap-2 fw-semibold border-light-subtle" style={{ fontSize: "13px" }}>
              <FileDownloadOutlined fontSize="small" /> Export CSV
            </button> */}
            <button className="btn btn-dark rounded-pill px-3.5 py-2 d-flex align-items-center gap-2 fw-semibold" style={{ fontSize: "13px" }}>
              <DeleteOutline fontSize="small" /> Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* 4. RECTIFIED CORE DATA GRID INTERFACE */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          overflowX: "auto", // Crucial for mobile horizontal swiping
          borderRadius: "16px",
          border: "1px solid #F3F4F6",
        }}
      >
        <Table sx={{ minWidth: 950 }}>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow sx={{ borderBottom: "1px solid #F3F4F6" }}>
              <TableCell padding="checkbox" sx={{ pl: 3, width: "50px" }}>
                <Checkbox
                  size="small"
                  checked={selectedRows.length === transactions.length && transactions.length > 0}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < transactions.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>DATE & TIME</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>TYPE</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>REFERENCE / TXN ID</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>RELATED ITEM</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>AMOUNT</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>BALANCE</TableCell>
              <TableCell sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280" }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontSize: "12px", fontWeight: 600, color: "#6B7280", pr: 3 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((tx) => {
              const isChecked = selectedRows.includes(tx.id);
              const typeStyle = getTypeBadgeStyles(tx.type);
              const statusStyle = getStatusChipStyles(tx.status);
              const isPositive = tx.amount?.startsWith("+");

              return (
                <TableRow key={tx.id} hover selected={isChecked} sx={{ borderBottom: "1px solid #F9FAFB" }}>
                  <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                      size="small"
                      checked={isChecked}
                      onChange={() => handleSelectRow(tx.id)}
                      sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                    />
                  </TableCell>
                  
                  {/* Date & Time block */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "13.5px" }}>{tx.date || "May 12"}</Typography>
                    <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{tx.year || "2024"}</Typography>
                  </TableCell>

                  {/* Type Tag Cell */}
                  <TableCell>
                    <Box component="span" sx={{ px: 2, py: 0.5, borderRadius: "50px", fontSize: "11px", fontWeight: 700, bgcolor: typeStyle.bg, color: typeStyle.text }}>
                      {tx.type || "PAYMENT"}
                    </Box>
                  </TableCell>

                  {/* Reference Meta Data */}
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "13.5px" }}>{tx.txnId || "TXN-89021"}</Typography>
                    <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{tx.method || "Bank Transfer"}</Typography>
                  </TableCell>

                  {/* Related Asset Title */}
                  <TableCell sx={{ color: "#4B5563", fontSize: "13.5px", fontWeight: 500 }}>
                    {tx.relatedItem || "Azure Heights Penthouse"}
                  </TableCell>

                  {/* Transaction Amount Value indicator */}
                  <TableCell sx={{ fontWeight: 700, fontSize: "14px", color: isPositive ? "#16A34A" : "#DC2626" }}>
                    {tx.amount || "-₦850,000"}
                  </TableCell>

                  {/* Vault Balance field context */}
                  <TableCell sx={{ color: "#111827", fontWeight: 600, fontSize: "13.5px" }}>
                    {tx.balance || "₦2,450,000"}
                  </TableCell>

                  {/* Status Processing Chip */}
                  <TableCell>
                    <Chip label={tx.status || "Successful"} size="small" sx={{ fontSize: "11px", fontWeight: 600, height: "22px", bgcolor: statusStyle.bg, color: statusStyle.text }} />
                  </TableCell>

                  {/* Context Actions Buttons Grid */}
                  <TableCell align="right" sx={{ pr: 3 }}>
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <IconButton size="small" sx={{ color: "#9CA3AF" }}><ChevronRight fontSize="small" /></IconButton>
                      <IconButton size="small" sx={{ color: "#9CA3AF" }}><ArrowDownward fontSize="small" /></IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* 5. DATA NAVIGATION PAGINATION SLIDER FOOTER */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", px: 3, py: 2, bgcolor: "#ffffff", borderTop: "1px solid #ECECEC", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "14px" }}>
            Rows per page: <Box component="span" sx={{ color: "#111827", fontWeight: 600, mr: 4 }}>{rowsPerPage}</Box>
            Showing {filteredTransactions.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredTransactions.length)} of {filteredTransactions.length} results
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
    </div>
  );
};

export default TransactionHistory;