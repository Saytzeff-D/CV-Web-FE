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
  CreditCardOutlined,
  CallMadeOutlined,
  AccessTimeOutlined,
  BookmarkBorderOutlined,
  FileDownloadOutlined,
  DeleteOutline,
  ChevronRight,
  ArrowDownward,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";

const TransactionHistoryPage = () => {
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");

  // State Management
  const [transactions, setTransactions] = useState([]);
  const [metrics, setMetrics] = useState({
    totalTransactions: null,
    netInflow: null,
    pendingWithdrawals: null,
    feesCollected: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [timeFilter, setTimeFilter] = useState("Today");

  // Pagination Configuration State
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // 1. DATA LIFECYCLE ROUTINE
  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    axios
      .get(`${uri}customer/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTransactions(res.data.transactions);
        if (res.data.metrics) {
          setMetrics(res.data.metrics);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions payload:", err);
        setIsLoading(false);
      });
  }, [uri, token]);

  // 2. CHECKBOX MULTI-SELECT HANDLERS
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedTransactions.map((tx) => tx.id));
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

  // 3. BADGE STYLE RESOLVERS & DATA FORMATTERS
  const getTypeBadgeStyles = (type) => {
    const formattedType = type?.toLowerCase() || "";
    if (formattedType.includes("fee") || formattedType.includes("inspection")) {
      return { bg: "#E3F2FD", text: "#1E88E5", display: "INSPECTION" };
    }
    switch (formattedType) {
      case "payment": case "rent_payment": return { bg: "#E3F2FD", text: "#1E88E5", display: "PAYMENT" };
      case "refund": return { bg: "#FFF3E0", text: "#E65100", display: "REFUND" };
      case "payout": return { bg: "#F3E5F5", text: "#8E24AA", display: "PAYOUT" };
      case "top-up": case "top_up": return { bg: "#E8F5E9", text: "#2E7D32", display: "TOP-UP" };
      default: return { bg: "#F5F5F5", text: "#616161", display: type?.toUpperCase()?.replace("_", " ") || "PAYMENT" };
    }
  };

  const getStatusChipStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "successful": case "success": return { bg: "#E8F5E9", text: "#2E7D32" };
      case "pending": return { bg: "#FFFDE7", text: "#F57F17" };
      case "failed": return { bg: "#FFEBEE", text: "#C62828" };
      default: return { bg: "#F5F5F5", text: "#212121" };
    }
  };

  const formatCurrency = (amount, currencyCode = "NGN") => {
    const symbol = currencyCode === "USD" ? "$" : "₦";
    return `${symbol}${Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  // 4. PAGINATION ARRAYS MATHEMATICS
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <CircularProgress sx={{ color: "#22C55E" }} />
      </Box>
    );
  }

  // Dashboard Overview Upper metrics data configuration matching card designs
  const cardsOverviewData = [
    { title: "TOTAL TRANSACTIONS", value: metrics.totalTransactions ? formatCurrency(metrics.totalTransactions) : "₦4,250,000", change: "+12.5%", icon: <CreditCardOutlined sx={{ color: "#2563EB" }} />, bg: "#EFF6FF" },
    { title: "NET INFLOW", value: metrics.netInflow ? formatCurrency(metrics.netInflow) : "₦3,120,000", change: "+8.2%", icon: <CallMadeOutlined sx={{ color: "#16A34A" }} />, bg: "#F0FDF4" },
    { title: "PENDING WITHDRAWALS", value: metrics.pendingWithdrawals ? formatCurrency(metrics.pendingWithdrawals) : "₦185,000", change: "-2.4%", icon: <AccessTimeOutlined sx={{ color: "#EA580C" }} />, bg: "#FFF7ED" },
    { title: "FEES COLLECTED", value: metrics.feesCollected ? formatCurrency(metrics.feesCollected) : "₦95,400", change: "+5.2%", icon: <BookmarkBorderOutlined sx={{ color: "#A855F7" }} />, bg: "#F3E8FF" },
  ];

  return (
    <div className="container-fluid px-0 py-4">
      {/* 1. TYPOGRAPHY TITLES HEADERS */}
      <div className="mb-4">
        <h3 className="fw-bold text-dark mb-1">Transaction History</h3>
        <Typography variant="body2" color="text.secondary">
          Monitor all financial movements, payouts, and customer payments.
        </Typography>
      </div>

      {/* 2. STATS UPPER OVERVIEW CARDS ROW */}
      <div className="row g-3 mb-4">
        {cardsOverviewData.map((card, idx) => (
          <div className="col-xl-3 col-md-6" key={idx}>
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100" style={{ border: "1px solid #F3F4F6" }}>
              <div className="d-flex justify-content-between align-items-start">
                <Box sx={{ p: 1.5, bgcolor: card.bg, borderRadius: "12px", display: "flex" }}>
                  {card.icon}
                </Box>
                <span className="badge rounded-pill px-2.5 py-1 text-success fw-bold" style={{ backgroundColor: "#ECFDF3", fontSize: "11px", color: "#16A34A" }}>
                  {card.change}
                </span>
              </div>
              <div className="mt-4">
                <small className="text-muted fw-semibold text-uppercase d-block" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                  {card.title}
                </small>
                <h3 className="fw-bold text-dark mt-1 mb-0" style={{ fontSize: "22px" }}>{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. SUBBAR CONTROL ACTION PANELS FILTER CONTAINER */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white" style={{ border: "1px solid #F3F4F6" }}>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          {/* Timeline Filter Pills & Forms Select Inputs */}
          <div className="d-flex flex-wrap align-items-center gap-2">
            <select className="form-select form-select-sm rounded-3 py-2 px-3 border-light-subtle text-muted" style={{ width: "130px", fontSize: "13px", backgroundColor: "#FAFAFA" }}>
              <option>Type:</option>
            </select>
            <select className="form-select form-select-sm rounded-3 py-2 px-3 border-light-subtle text-muted" style={{ width: "130px", fontSize: "13px", backgroundColor: "#FAFAFA" }}>
              <option>Status:</option>
            </select>
            
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

          {/* Action Trigger Elements Group Button Block */}
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold border-light-subtle" style={{ fontSize: "13px" }}>
              <FileDownloadOutlined fontSize="small" /> Export CSV
            </button>
            <button className="btn btn-dark rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-semibold" style={{ fontSize: "13px" }}>
              <DeleteOutline fontSize="small" /> Delete Selected
            </button>
          </div>
        </div>
      </div>

      {/* 4. CORE SYSTEM DATA ROW GRID WITH MULTI-SCREEN VIEW SWIPING ENABLED */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          overflowX: "auto", 
          borderRadius: "16px",
          border: "1px solid #F3F4F6",
        }}
      >
        <Table sx={{ minWidth: 1000 }}>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow sx={{ borderBottom: "1px solid #F3F4F6" }}>
              <TableCell padding="checkbox" sx={{ pl: 3, width: "50px" }}>
                <Checkbox
                  size="small"
                  checked={paginatedTransactions.length > 0 && selectedRows.length === paginatedTransactions.length}
                  indeterminate={selectedRows.length > 0 && selectedRows.length < paginatedTransactions.length}
                  onChange={handleSelectAll}
                  sx={{ color: "#D1D5DB", "&.Mui-checked": { color: "#111827" } }}
                />
              </TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>DATE & TIME</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>TYPE</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>REFERENCE / TXN ID</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>RELATED ITEM</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>AMOUNT</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>BALANCE</TableCell>
              <TableCell sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px" }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "0.5px", pr: 3 }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((tx) => {
                const isChecked = selectedRows.includes(tx.id);
                const typeStyle = getTypeBadgeStyles(tx.type);
                const statusStyle = getStatusChipStyles(tx.status);
                
                // Formulate Timestamp object fields safely
                const txDate = tx.created_at ? new Date(tx.created_at) : new Date();
                const formattedDay = txDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                const formattedYear = txDate.getFullYear();

                // Differentiate mathematical presentation based on transaction classifications
                const isNegativeType = ["refund", "payout"].includes(tx.type?.toLowerCase());
                const prefixSign = isNegativeType ? "-" : "+";
                const amountColor = isNegativeType ? "#DC2626" : "#16A34A";

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
                    
                    {/* Date Details field block */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontSize: "13.5px" }}>{formattedDay}</Typography>
                      <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{formattedYear}</Typography>
                    </TableCell>

                    {/* Badge Column Type field */}
                    <TableCell>
                      <Box component="span" sx={{ px: 2, py: 0.5, borderRadius: "50px", fontSize: "11px", fontWeight: 700, bgcolor: typeStyle.bg, color: typeStyle.text }}>
                        {typeStyle.display}
                      </Box>
                    </TableCell>

                    {/* Code reference Meta elements */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontSize: "13.5px" }}>{tx.reference || "—"}</Typography>
                      <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{tx.property_id ? `Property ID: ${tx.property_id}` : "Direct Wallet Transfer"}</Typography>
                    </TableCell>

                    {/* Related Asset Title Context matching 'name' row key */}
                    <TableCell sx={{ color: "#4B5563", fontSize: "13.5px", fontWeight: 500, maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {tx.name || "System Ledger Inflow"}
                    </TableCell>

                    {/* Dynamic Financial amount value notation column mapping */}
                    <TableCell sx={{ fontWeight: 700, fontSize: "14px", color: amountColor }}>
                      {prefixSign}{formatCurrency(tx.amount, tx.currency)}
                    </TableCell>

                    {/* Dynamic fallback placeholder for balance properties to be synchronized later */}
                    <TableCell sx={{ color: "#111827", fontWeight: 600, fontSize: "13.5px" }}>
                      {tx.balance ? formatCurrency(tx.balance, tx.currency) : "Pending sync"}
                    </TableCell>

                    {/* Processing State Badge column alignment mapping */}
                    <TableCell>
                      <Chip label={tx.status ? tx.status.charAt(0).toUpperCase() + tx.status.slice(1).toLowerCase() : "Successful"} size="small" sx={{ fontSize: "11px", fontWeight: 600, height: "22px", bgcolor: statusStyle.bg, color: statusStyle.text }} />
                    </TableCell>

                    {/* Table contextual Action Row layout nodes */}
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <div className="d-flex align-items-center justify-content-end gap-1">
                        <IconButton size="small" sx={{ color: "#9CA3AF" }}><ChevronRight fontSize="small" /></IconButton>
                        <IconButton size="small" sx={{ color: "#9CA3AF" }}><ArrowDownward fontSize="small" /></IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              /* CLEAN GRAPHIC ENHANCED EMPTY STATE PLACEHOLDER OVERLAY ROW ELEMENT */
              <TableRow sx={{ "&:hover": { backgroundColor: "transparent !important" } }}>
                <TableCell colSpan={9} align="center" sx={{ py: 7, borderBottom: "none" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: "50%", bgcolor: "#F9FAFB", display: "flex", alignItems: "center", justify: "center", border: "1px dashed #E5E7EB" }}>
                      <ReceiptLongOutlined sx={{ color: "#9CA3AF", fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                        No transactions yet
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block", maxWidth: "290px", mx: "auto", mt: 0.5, color: "#6B7280", lineHeight: 1.5 }}>
                        Any payments, processing deposits, or wallet top-ups you execute will populate neatly inside this table area.
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 5. DATA NAVIGATION PAGINATION CONTROLS PANEL FOOTER SECTION */}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", px: 3, py: 2, bgcolor: "#fff", borderTop: "1px solid #F3F4F6", gap: 2 }}>
          <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "14px" }}>
            Rows per page: <Box component="span" sx={{ color: "#111827", fontWeight: 600, mr: 4 }}>{rowsPerPage}</Box>
            Showing {transactions.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, transactions.length)} of {transactions.length} results
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
                      backgroundColor: "#111827",
                      color: "#fff",
                      borderColor: "#111827",
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

export default TransactionHistoryPage;