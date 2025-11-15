import CloseIcon from "../../assets/close-icon.png";
import CancelIcon from "../../assets/cancel-icon.png";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Pending = (props) => {
  const { properties, isLoading } = props;
  const uri = useSelector((state) => state.uri);
  const [openDelete, setOpenDelete] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleApproveClick = (property) => {
    setSelectedProperty(property);
    setOpenApprove(true);
  };

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
    setOpenDelete(true);
  };

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
      console.log("Approved:", response.data);
      alert("Property approved successfully!");
      setOpenApprove(false);
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Failed to approve property. Try again.");
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
                            {Number(p.total_price).toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
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
                            {Number(p.total_price).toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
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

        {/* DELETE DIALOG */}
        <Dialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          aria-labelledby="modal-title"
        >
          <DialogTitle id="modal-title" className="text-success">
            Delete Property
          </DialogTitle>
          <DialogContent>
            <p className="text-success h6">Are you sure you want to delete?</p>
            <div className="d-flex justify-content-between mt-4">
              <div onClick={() => setOpenDelete(false)} className="cursor-pointer">
                <img src={CancelIcon} alt="Close" width={"20px"} height={"20px"} />
                <p className="text-success">Cancel</p>
              </div>
              <div className="cursor-pointer">
                <img src={CloseIcon} alt="Close" width={"20px"} height={"20px"} />
                <p className="text-danger">Delete</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* APPROVE DIALOG */}
        <Dialog
          open={openApprove}
          onClose={() => setOpenApprove(false)}
          aria-labelledby="approve-dialog"
        >
          <DialogTitle id="approve-dialog" className="text-success">
            Approve Property
          </DialogTitle>
          <DialogContent>
            <p className="text-success h6">
              Are you sure you want to approve{" "}
              <strong>{selectedProperty?.name}</strong>?
            </p>
            <div className="d-flex justify-content-between mt-4">
              <div
                onClick={() => setOpenApprove(false)}
                className="cursor-pointer"
              >
                <img
                  src={CancelIcon}
                  alt="Close"
                  width={"20px"}
                  height={"20px"}
                />
                <p className="text-success">Cancel</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={handleApprove}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                <img
                  src={CloseIcon}
                  alt="Approve"
                  width={"20px"}
                  height={"20px"}
                />
                <p className="text-success">
                  {loading ? "Approving..." : "Yes, Approve"}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Pending;