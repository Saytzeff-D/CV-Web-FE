import CloseIcon from "../../assets/close-icon.png"
import CancelIcon from "../../assets/cancel-icon.png"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Land = (props) => {
    const {properties, isLoading, updatedProperties} = props;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const uri = useSelector(state=>state.uri)
    const [isDeleting, setIsDeleting] = useState(false);
    const [id, setId] = useState(null);

    const editProperty = (property) => {
        sessionStorage.setItem("editProperty", JSON.stringify(property));
        navigate('/admin/edit-property');
    }
    const deleteProperty = () => {
        setIsDeleting(true);
        axios.delete(`${uri}property/delete/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
        })
        .then(response => {
            console.log("Property deleted successfully:", response.data);
            setOpen(false);
            setIsDeleting(false);
            updatedProperties(properties.filter(property => property.id !== id));
            // Optionally, refresh the property list or update state here
        })
        .catch(error => {
            setIsDeleting(false);
            console.error("Error deleting property:", error);
        });
    }
    return (
        <div className='d-flex justify-content-center'>
        <div className='col-md-9'>
            {/* Property List */}
            {
                isLoading ? (
                    <p className="text-center text-muted">Loading land properties...</p>
                ) : null
            }
            {
                properties.length === 0 && !isLoading && (
                    <p className="text-center text-muted">None of the pending land properties have been approved.</p>
                )
            }
            {
                properties.map((p) => (
                <div key={p.id} className="row align-items-center mb-4 w-100">
                <div className="col-md-5">
                    <img
                    src={p.main_photo}
                    alt={p.name}
                    className="rounded"
                    style={{ width: "100%", height: "200px" }}
                    />
                </div>
                <div className="col-md-7">
                    <div className='d-flex justify-content-between flex-md-row flex-column'>
                        <div>
                            <h6 className="fw-semibold my-2">{p.name}</h6>
                            <p className="text-muted small mb-1">{p.address}</p>
                            <h6 className="fw-bold mb-2">{Number(p.total_price).toLocaleString('en-NG', {style: 'currency', currency: 'NGN'})}</h6>
                        </div>
                        <div>
                            <button onClick={()=>editProperty(p)} className="btn btn-outline-success btn-sm me-2 mb-2">
                                Edit
                            </button>                            
                            <button onClick={()=>setOpen(true)} className="btn btn-outline-danger btn-sm mb-2">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center text-muted small gap-3">
                        <p>{Number(p.land_size).toLocaleString()} Sqm</p>                        
                    </div>
                </div>
                </div>
            ))}

            <Dialog open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
                <DialogTitle id="modal-title" className="text-success">Delete Property</DialogTitle>
                <DialogContent>
                    <p className="text-success h6">Are you sure you want to delete?</p>
                    <div className="d-flex justify-content-between mt-4">
                        <button disabled={isDeleting} onClick={()=>setOpen(false)} className="cursor-pointer btn btn-secondary">
                            Cancel
                        </button>
                        <button disabled={isDeleting} onClick={()=>deleteProperty()} className="cursor-pointer btn btn-danger">
                            Delete
                            {
                                isDeleting && (
                                    <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
                                )
                            }
                        </button>
                    </div>
                </DialogContent>                
            </Dialog>
            
        </div>
    </div>
    )
}

export default Land;