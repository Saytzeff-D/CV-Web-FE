import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Modal,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function Withdrawal({ balance = 0 }) {
  const uri = useSelector((s) => s.UriReducer?.uri || s.uri); // adapt to your store
  const currency = useSelector((state) => state.CurrencyReducer.currency);
  const rates = useSelector((state) => state.CurrencyReducer.rates);

  const token = sessionStorage.getItem("userToken");

  // UI state
  const [amount, setAmount] = useState("");
  const [savedAccounts, setSavedAccounts] = useState([]); // fetched from server
  const [selected, setSelected] = useState(null);

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [newBank, setNewBank] = useState("");
  const [newAccount, setNewAccount] = useState("");

  // loading / feedback
  const [loadingMethods, setLoadingMethods] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [snack, setSnack] = useState({ open: false, severity: "info", message: "" });

  // Fetch payment methods from server
  useEffect(() => {
    fetchMethods();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  const fetchMethods = async () => {
    if (!uri) return;
    setLoadingMethods(true);
    try {
      const res = await axios.get(`${uri}payment-methods`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Expecting array of { id, bank, account }
      setSavedAccounts(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
      setSnack({
        open: true,
        severity: "error",
        message: "Failed to load saved payment methods.",
      });
    } finally {
      setLoadingMethods(false);
    }
  };

  // Withdraw action (submit to server)
  const handleWithdraw = async () => {
    if (!amount || !selected) {
      setSnack({ open: true, severity: "warning", message: "Enter amount and select an account." });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        amount,
        method_id: selected.id,
      };
      await axios.post(`${uri}withdrawals/create`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSnack({ open: true, severity: "success", message: "Withdrawal request submitted." });
      // optionally reset amount or deselect
      setAmount("");
    } catch (err) {
      console.error("Withdraw error:", err);
      const msg = err?.response?.data?.message || "Failed to submit withdrawal.";
      setSnack({ open: true, severity: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  // Add new payment method (POST)
  const handleAddMethod = async () => {
    // simple validation
    if (!newBank.trim() || !newAccount.trim()) {
      setSnack({ open: true, severity: "warning", message: "Please fill in bank and account number." });
      return;
    }

    setAdding(true);
    try {
      const payload = { bank: newBank.trim(), account: newAccount.trim() };
      const res = await axios.post(`${uri}payment-methods`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // push returned created item or fallback to client-side created
      const created = res.data?.data || res.data || { id: Date.now(), ...payload };
      setSavedAccounts((prev) => [...prev, created]);
      setNewBank("");
      setNewAccount("");
      setOpenModal(false);
      setSnack({ open: true, severity: "success", message: "Payment method added." });
    } catch (err) {
      console.error("Add method error:", err);
      const msg = err?.response?.data?.message || "Failed to add payment method.";
      setSnack({ open: true, severity: "error", message: msg });
    } finally {
      setAdding(false);
    }
  };

  // Delete a method (DELETE)
  const handleDeleteMethod = async (id) => {
    // optional inline confirm
    if (!window.confirm("Are you sure you want to delete this payment method?")) return;

    setDeletingId(id);
    try {
      await axios.delete(`${uri}payment-methods/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSavedAccounts((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
      setSnack({ open: true, severity: "success", message: "Payment method deleted." });
    } catch (err) {
      console.error("Delete method error:", err);
      setSnack({ open: true, severity: "error", message: "Failed to delete payment method." });
    } finally {
      setDeletingId(null);
    }
  };

  // Modal close control: don't let modal close (backdrop/escape) until form valid & not adding
  const isAddFormValid = newBank.trim() !== "" && newAccount.trim() !== "";

  // UX helpers
  const formattedBalance = (() => {
    try {
      return Number(balance * rates[currency]).toLocaleString("en-NG", {
        style: "currency",
        currency,
      });
    } catch {
      return balance;
    }
  })();

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          {/* Transparent wrapper - no Card */}
          <div className="row g-4 align-items-start">
            {/* LEFT SIDE */}
            <div className="col-md-8 border-end">
              <h5 className="fw-bold text-success mb-1">Available Earnings</h5>
              <p className="fs-4 fw-semibold text-dark mb-3">{formattedBalance}</p>

              <div className="mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Enter amount to withdraw"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <p className="fw-semibold text-secondary mb-2 d-flex justify-content-between align-items-center">
                <span>Select Bank Account</span>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenModal(true)}
                >
                  Add account
                </Button>
              </p>

              <div>
                {loadingMethods ? (
                  <div className="d-flex align-items-center gap-2">
                    <CircularProgress size={20} />
                    <small className="text-muted">Loading saved accounts...</small>
                  </div>
                ) : savedAccounts.length === 0 ? (
                  <p className="text-muted">You have no saved bank accounts. Add one to withdraw.</p>
                ) : (
                  <div className="d-flex flex-column gap-2">
                    {savedAccounts.map((acc) => (
                      <div
                        key={acc.id}
                        className={`d-flex align-items-center justify-content-between border rounded p-2 ${selected?.id === acc.id ? "bg-success text-white" : ""}`}
                        role="button"
                        onClick={() => setSelected(acc)}
                      >
                        <div>
                          <div className="fw-semibold">{acc.bank}</div>
                          <div className="small">{acc.account}</div>
                        </div>

                        <div className="d-flex align-items-center gap-2">
                          {deletingId === acc.id ? (
                            <CircularProgress size={18} />
                          ) : (
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteMethod(acc.id);
                              }}
                              aria-label="delete"
                              sx={{
                                color: selected?.id === acc.id ? "#fff" : "#d32f2f",
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleWithdraw}
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Proceed"}
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-md-4 text-center">
              <h6 className="text-success fw-bold mb-3">
                <i className="fa-solid fa-plus me-2" />
                Add New Payment Method
              </h6>

              <Button
                variant="outlined"
                color="success"
                fullWidth
                size="large"
                onClick={() => setOpenModal(true)}
              >
                <i className="fa-solid fa-building-columns me-2" />
                Bank Transfer
              </Button>

              <p className="text-muted small mt-3">Only bank transfer is supported.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add account modal - cannot close until validated & not adding */}
      <Modal
        open={openModal}
        onClose={() => {
          // Prevent dismiss via backdrop or escape while adding or until form valid
          if (!adding && !isAddFormValid) {
            // do nothing (force user to fill)
            setSnack({ open: true, severity: "warning", message: "Please complete the form to save the account." });
            return;
          }
          if (!adding) setOpenModal(false);
        }}
        disableEscapeKeyDown={true}
        aria-labelledby="add-bank-modal"
      >
        <Box
          sx={{
            width: 360,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            mx: "auto",
            mt: 10,
            boxShadow: 24,
            position: "relative",
          }}
        >
          {/* close icon — disabled until form valid */}
          <IconButton
            onClick={() => {setOpenModal(false)}}
            disabled={adding}
            sx={{ position: "absolute", top: 8, right: 8 }}
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>

          <h5 className="fw-bold text-success mb-2">Add Bank Account</h5>
          <p className="text-muted small mb-3">Provide bank name and account number.</p>

          <TextField
            label="Bank name"
            fullWidth
            value={newBank}
            onChange={(e) => setNewBank(e.target.value)}
            className="mb-3"
            disabled={adding}
          />
          <TextField
            label="Account number"
            fullWidth
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
            className="mb-3"
            disabled={adding}
          />

          <div className="d-flex gap-2">
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={handleAddMethod}
              disabled={adding}
            >
              {adding ? "Saving..." : "Save account"}
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              fullWidth
              onClick={() => {
                // if form is empty, allow close; else require save
                if (!newBank && !newAccount && !adding) {
                  setOpenModal(false);
                } else {
                  setSnack({
                    open: true,
                    severity: "info",
                    message: "Complete the form or click Save to close.",
                  });
                }
              }}
              disabled={adding}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}