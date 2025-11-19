import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "suspend" | "restore"
  const [selectedUser, setSelectedUser] = useState(null);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();
  const uri = useSelector(state=>state.UriReducer.uri)
  const token = sessionStorage.getItem("userToken");
  const [errorMessage, setErrorMessage] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    axios
      .get(`${uri}admin/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.allCustomers);
      })
      .catch((err) => {
        setErr('Error fetching agents')        
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uri, token]);

  // ---------- MODAL ACTION HANDLERS ----------
  const openConfirm = (type, user) => {
    setActionType(type);
    setSelectedUser(user);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setSelectedUser(null);
    setActionType("");
  };

  const handleConfirmAction = () => {
    setProcessing(true);
    axios.patch(`${uri}admin/account/suspend`, { accountId: selectedUser.id }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(()=>{
      setProcessing(false);
      closeConfirm();
      setUsers((prev) =>
        prev.map((a) =>
          a.id === selectedUser.id
            ? { ...a, suspended: actionType === "suspend" ? 1 : 0 }
            : a
        )
      );
    }).catch((err)=>{
      setProcessing(false);
      setErrorMessage('Your request could not be processed.')
    })
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }    
    setErrorMessage('');
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        &times;
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="container py-5 px-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="text-center mb-0 flex-grow-1 fw-semibold">
          User Management
        </h6>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn"
        >
          ×
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-9">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className="nav-link active border-0 text-dark"
                data-bs-toggle="tab"
                data-bs-target="#active_agents"
              >
                Active Agents
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link border-0 text-dark"
                data-bs-toggle="tab"
                data-bs-target="#suspended_agents"
              >
                Suspended Agents
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link border-0 text-dark"
                data-bs-toggle="tab"
                data-bs-target="#customers"
              >
                Customers
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {/* ACTIVE AGENTS */}
            <div className="tab-pane fade show active" id="active_agents">
              {isLoading && (
                <p className="text-center text-muted">Loading active agents...</p>
              )}

              {!isLoading && err == '' &&
                users.filter((a) => a.role === "agent" && a.suspended === 0)
                  .length === 0 && (
                  <p className="text-center text-muted">
                    No active agents found.
                  </p>
                )}

                {
                  err !== '' && <Alert severity="error" >{err}</Alert>
                }

              {users
                .filter((a) => a.role === "agent" && a.suspended === 0)
                .map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white flex-md-row flex-column"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.firstname}
                        className="rounded-circle"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="fw-bold mb-0">
                          {user.firstname}{" "}
                          <span
                            className="badge bg-success ms-2"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Active
                          </span>
                        </h6>
                        <p className="text-dark small mb-0">
                          Experience level: {user.level}
                        </p>
                        <p className="text-dark small mb-0">
                          Property listed: {user.listed}
                        </p>
                      </div>
                    </div>

                    <button
                      className="btn btn-outline-danger btn-sm mt-3 mt-md-0"
                      onClick={() => openConfirm("suspend", user)}
                    >
                      Suspend
                    </button>
                  </div>
                ))}
            </div>

            {/* SUSPENDED AGENTS */}
            <div className="tab-pane fade" id="suspended_agents">
              {isLoading && (
                <p className="text-center text-muted">
                  Loading suspended agents...
                </p>
              )}

              {
                err !== '' && <Alert severity="error" >{err}</Alert>
              }

              {!isLoading && err == '' &&
                users.filter((a) => a.role === "agent" && a.suspended === 1)
                  .length === 0 && (
                  <p className="text-center text-muted">
                    No suspended agents found.
                  </p>
                )}

              {users
                .filter((a) => a.role === "agent" && a.suspended === 1)
                .map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white flex-md-row flex-column"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.firstname}
                        className="rounded-circle"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="fw-bold mb-0">
                          {user.firstname}{" "}
                          <span
                            className="badge bg-secondary ms-2"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Inactive
                          </span>
                        </h6>
                        <p className="text-dark small mb-0">
                          Experience level: {user.level}
                        </p>
                        <p className="text-dark small mb-0">
                          Property listed: {user.listed}
                        </p>
                      </div>
                    </div>

                    <button
                      className="btn btn-success btn-sm mt-3 mt-md-0"
                      onClick={() => openConfirm("restore", user)}
                    >
                      Restore
                    </button>
                  </div>
                ))}
            </div>

            {/* CUSTOMERS */}
            <div className="tab-pane fade" id="customers">
              {isLoading && (
                <p className="text-center text-muted">Loading Customers...</p>
              )}

              {!isLoading && err == '' &&
                users.filter((a) => a.role === "customer").length === 0 && (
                  <p className="text-center text-muted">No customers found.</p>
                )}

                {
                  err !== '' && <Alert severity="error" >{err}</Alert>
                }

              {users
                .filter((a) => a.role === "customer")
                .map((user) => (
                  <div
                    key={user.id}
                    className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white flex-md-row flex-column"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.firstname}
                        className="rounded-circle"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h6 className="fw-bold mb-0">
                          {user.firstname} {user.lastname}
                          <span
                            className={`badge ms-2 ${
                              user.verified == 1
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                            style={{ fontSize: "0.7rem" }}
                          >
                            {user.verified == 1 ? "Verified" : "Unverified"}
                          </span>
                        </h6>
                        <p className="text-dark small mb-0">
                          Email:{" "}
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>
                        <p className="text-dark small mb-0">
                          Onboarded using: {user.method}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- MUI CONFIRM MODAL ---------- */}
      <Modal open={confirmOpen} onClose={closeConfirm}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" className="mb-3">
            {actionType === "suspend"
              ? "Suspend this agent?"
              : "Restore this agent?"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Are you sure you want to{" "}
            {actionType === "suspend" ? "suspend" : "restore"}{" "}
            <b>{selectedUser?.firstname}</b>?
          </Typography>

          <Box className="d-flex justify-content-center gap-3">
            <Button
              variant="contained"
              color={actionType === "suspend" ? "error" : "success"}
              onClick={handleConfirmAction}
              disabled={processing}
            >
              {processing ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Yes"
              )}
            </Button>
            <Button variant="outlined" onClick={closeConfirm}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={handleClose}
        action={action}
        message={errorMessage}
      />
    </div>
  );
};

export default AllUsers;