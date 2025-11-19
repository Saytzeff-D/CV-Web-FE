import CloseIcon from "../../assets/close-icon.png";
import CancelIcon from "../../assets/cancel-icon.png";
import { Alert, Dialog, DialogContent, DialogTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Pending = (props) => {
  const { properties, isLoading, update } = props;
  const uri = useSelector((state) => state.UriReducer.uri);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const currency = useSelector((state) => state.CurrencyReducer.currency);
  const rates = useSelector((state) => state.CurrencyReducer.rates);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleApproveClick = (property) => {
    setSelectedProperty(property);
    setOpenApprove(true);
  };

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setOpenDelete(true);
  };

  const handleDelete = () =>{
    setLoading(true);
    axios.delete(`${uri}property/delete/${selectedProperty.id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
    })
    .then(response => {
        console.log("Property deleted successfully:", response.data);
        setOpenDelete(false);
        setLoading(false);
        setSuccessMessage("Property deleted successfully.");
        update(Math.random()*1000);        
    })
    .catch(error => {
        setLoading(false);
        setErrorMessage("Error deleting property. Try again.");
        console.error("Error deleting property:", error);
    });
  }

  const handleApprove = async () => {
    if (!selectedProperty) return;
    setLoading(true);
    try {
      const response = await axios.patch(
        `${uri}admin/approve-property`,
        { propertyId: selectedProperty.id },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );      
      setSuccessMessage(response.data.message);
      setOpenApprove(false);
      update(Math.random()*1000);  
    } catch (error) {      
      setErrorMessage("Failed to approve property. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-9">
        <div>
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <button
                className="nav-link active border-0 text-dark"
                data-bs-toggle="tab"
                data-bs-target="#land"
              >
                Land
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link border-0 text-dark"
                data-bs-toggle="tab"
                data-bs-target="#apartment"
              >
                Apartment
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {/* LAND PROPERTIES */}
            <div className="tab-pane fade show active" id="land">
              {isLoading && (
                <p className="text-center text-muted">
                  Loading land properties that are pending approval...
                </p>
              )}
              {properties.filter((p) => p.type.toLowerCase() === "land")
                .length === 0 &&
                !isLoading && (
                  <p className="text-center text-muted">
                    No pending land properties.
                  </p>
                )}
              {properties
                .filter((p) => p.type.toLowerCase() === "land")
                .map((p) => (
                  <div
                    key={p.id}
                    className="row align-items-center mb-4 w-100"
                  >
                    <div className="col-md-5">
                      <img
                        src={p.main_photo}
                        alt={p.name}
                        className="rounded"
                        style={{ width: "100%", height: "200px" }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="d-flex justify-content-between flex-md-row flex-column">
                        <div>
                          <h6 className="fw-semibold mb-1">{p.name}</h6>
                          <p className="text-muted small mb-1">{p.address}</p>
                          <h6 className="fw-bold mb-2">
                            {Number(p.total_price * rates[currency]).toLocaleString("en-NG", {
                              style: "currency",
                              currency,
                            })}
                          </h6>
                        </div>
                        <div>
                          <button
                            className="btn btn-outline-success btn-sm me-2 mb-2"
                            onClick={() => handleApproveClick(p)}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p)}
                            className="btn btn-outline-danger btn-sm mb-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-muted small gap-3">
                        <p>{p.land_size} Sqm</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* APARTMENT PROPERTIES */}
            <div className="tab-pane fade" id="apartment">
              {isLoading && (
                <p className="text-center text-muted">
                  Loading Apartment properties that are pending approval...
                </p>
              )}
              {properties.filter((p) => p.type.toLowerCase() !== "land")
                .length === 0 &&
                !isLoading && (
                  <p className="text-center text-muted">
                    No pending apartment properties.
                  </p>
                )}
              {properties
                .filter((p) => p.type.toLowerCase() !== "land")
                .map((p) => (
                  <div
                    key={p.id}
                    className="row align-items-center mb-4 w-100"
                  >
                    <div className="col-md-5">
                      <img
                        src={p.main_photo}
                        alt={p.name}
                        className="rounded"
                        style={{ width: "100%", height: "200px" }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="d-flex justify-content-between flex-md-row flex-column">
                        <div>
                          <h6 className="fw-semibold my-2">{p.name}</h6>
                          <p className="text-muted small mb-1">{p.address}</p>
                          <h6 className="fw-bold mb-2">
                            {Number(p.total_price * rates[currency]).toLocaleString("en-NG", {
                              style: "currency",
                              currency,
                            })}
                          </h6>
                        </div>
                        <div>
                          <button
                            className="btn btn-outline-success btn-sm me-2 mb-2"
                            onClick={() => handleApproveClick(p)}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p)}
                            className="btn btn-outline-danger btn-sm mb-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center text-muted small gap-3">
                        <span>
                          <i className="fas fa-bed"></i> {p.bedrooms} beds
                        </span>
                        <span>
                          <i className="fas fa-toilet"></i> {p.toilets} toilet
                        </span>
                        <span>
                          <i className="fas fa-bath"></i> {p.bathrooms} bath
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage("")}>
          <Alert variant="filled" severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={() => setErrorMessage("")}>
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>

        {/* DELETE DIALOG */}
        <Dialog
          open={openDelete}
          maxWidth={'xs'}
          onClose={() => setOpenDelete(false)}
          aria-labelledby="modal-title"
        >
          <DialogTitle id="modal-title" className="text-success">
            Delete Property
          </DialogTitle>
          <DialogContent>
            <p className="text-success h6">Are you sure you want to delete?</p>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <button
                  onClick={() => setOpenDelete(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>              
              <div>
                <button onClick={handleDelete} className="btn btn-danger" disabled={loading}>
                  {loading ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>              
            </div>
          </DialogContent>
        </Dialog>

        {/* APPROVE DIALOG */}
        <Dialog
          open={openApprove}
          maxWidth={'xs'}
          onClose={() => setOpenApprove(false)}
          aria-labelledby="approve-dialog"
        >
          <DialogTitle id="approve-dialog" className="text-success">
            Approve Property
          </DialogTitle>
          <DialogContent>
            <p className="text-dark h6">
              Are you sure you want to approve{" "}
              <strong>{selectedProperty?.name}</strong>?
            </p>
            <div className="d-flex justify-content-between mt-4">
              <div>
                <button
                  onClick={() => setOpenApprove(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>              
              <div>
                <button onClick={handleApprove} className="btn btn-success" disabled={loading}>
                  {loading ? "Approving..." : "Yes, Approve"}
                </button>
              </div>              
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pending;