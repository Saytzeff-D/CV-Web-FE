import { useNavigate } from 'react-router-dom';
import data from '../../data.json'
import { useState } from 'react';
import CloseIcon from "../../assets/close-icon.png"
import CancelIcon from "../../assets/cancel-icon.png"
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const BlogManager = () => {
  const { blogs } = data;
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-blog')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h6 className="text-center mb-0 flex-grow-1 fw-semibold">
          Blog Management
        </h6>

        <button onClick={()=>navigate('/admin/dashboard')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          ×
        </button>
      </div>
        <div className='d-flex justify-content-center'>
        <div className='col-md-9'>
            {/* Property List */}
                {blogs.slice(0, 6).map((blog) => (
            <div className="row g-4 mb-5 align-items-center">
                <div className="col-md-6" key={blog.id}>
                    <div className="card border-0 h-100">
                    <img src={blog.img} className="card-img-top rounded-3" alt={blog.title} />
                    <div className="card-body">
                        <p className="text-success small mb-1 fw-semibold">
                        {blog.category} • <span className="text-muted">{blog.date}</span>
                        </p>
                        <h6 className="fw-bold mb-2">{blog.title}</h6>
                        <p className="text-muted small mb-0">{blog.desc}</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='d-flex flex-md-row flex-column'>
                        <button className="btn btn-lg btn-outline-success btn-sm me-2 px-4 fs-5 mb-2">
                            Edit
                        </button>                            
                        <button onClick={()=>setOpen(true)} className="btn btn-lg px-4 fs-5 btn-outline-danger btn-sm mb-2">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            ))} 
            <Dialog open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
                <DialogTitle id="modal-title" className="text-success">Delete Blog</DialogTitle>
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

            {/* See More */}
            <div className="text-center">
                <button className="btn btn-link text-dark fw-semibold">
                See more
                </button>
            </div>
        </div>
    </div>
    </div>
  );
}

export default BlogManager;