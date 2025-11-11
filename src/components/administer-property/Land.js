import CloseIcon from "../../assets/close-icon.png"
import CancelIcon from "../../assets/cancel-icon.png"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";

const Land = (props) => {
    const {properties, isLoading} = props;
    const [open, setOpen] = useState(false);
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
                <div className="col-5">
                    <img
                    src={p.main_photo}
                    alt={p.name}
                    className="rounded"
                    style={{ width: "100%", height: "200px" }}
                    />
                </div>
                <div className="col-7">
                    <div className='d-flex justify-content-between flex-md-row flex-column'>
                        <div>
                            <h6 className="fw-semibold mb-1">{p.name}</h6>
                            <p className="text-muted small mb-1">{p.address}</p>
                            <h6 className="fw-bold mb-2">{p.total_price}</h6>
                        </div>
                        <div>
                            <button className="btn btn-outline-success btn-sm me-2 mb-2">
                                Edit
                            </button>                            
                            <button onClick={()=>setOpen(true)} className="btn btn-outline-danger btn-sm mb-2">
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

            <Dialog open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
                <DialogTitle id="modal-title" className="text-success">Delete Property</DialogTitle>
                <DialogContent>
                    <p className="text-success h6">Are you sure you want to delete?</p>
                    <div className="d-flex justify-content-between mt-4">
                        <div onClick={()=>setOpen(false)} className="cursor-pointer">
                            <img src={CancelIcon} alt="Close" width={'20px'} height={'20px'} />
                            <p className="text-success">Cancel</p>
                        </div>
                        <div className="cursor-pointer">
                            <img src={CloseIcon} alt="Close" width={'20px'} height={'20px'} />
                            <p className="text-danger">Delete</p>
                        </div>
                    </div>
                </DialogContent>                
            </Dialog>
            
        </div>
    </div>
    )
}

export default Land;