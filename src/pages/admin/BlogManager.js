import { useNavigate } from 'react-router-dom';
import data from '../../data.json'
import { useEffect, useState } from 'react';
import CloseIcon from "../../assets/close-icon.png"
import CancelIcon from "../../assets/cancel-icon.png"
import { Alert, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from 'react-redux';
import axios from 'axios';

const BlogManager = () => {  
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const uri = useSelector(state=>state.uri)
  const [blogs, setBlogs] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [isDeleting, setIsDeleting] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Fetch blogs from the API
    axios.get(`${uri}blog/all`)
      .then(response => {
        setIsFetching(false)
        setBlogs(response.data.blogs);
      })
      .catch(error => {
        setIsFetching(false)
        setError('Failed to fetch blogs');
        // console.error("Error fetching blogs:", error);
      });
  }, [uri]);

  const editBlog = (blog) => {
    sessionStorage.setItem('editBlog', JSON.stringify(blog));
    navigate('/admin/edit-blog');
  }

  const openDelete = (propertyId) => {
        setId(propertyId);
        setOpen(true);
    }

    const deleteProperty = () => {
        setIsDeleting(true);
        axios.delete(`${uri}blog/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
        })
        .then(response => {            
            setOpen(false);
            setIsDeleting(false);
            setBlogs(blogs.filter(blog => blog.id !== id));
            // Optionally, refresh the property list or update state here
        })
        .catch(error => {
            setIsDeleting(false);
            console.error("Error deleting property:", error);
        });
    }

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
            <div>
                {
                    error !== ''
                    ? (
                        <div className=''>
                            <Alert severity="error" className="mb-4">
                                {error}
                            </Alert>
                        </div>
                    )
                    :
                    blogs.length === 0 && !isFetching
                    ? (
                        <p className="text-center text-muted">No blogs available.</p>
                    )
                    : (
                        blogs.map((blog) => (
                            <div className="row g-4 mb-5 align-items-center">
                                <div className="col-md-6" key={blog.id}>
                                    <div className="card border-0 h-100">
                                        <img src={blog.main_photo} className="card-img-top rounded-3" alt={blog.title} height={'300px'} />
                                        <div className="card-body">
                                            <p className="text-success small mb-1 fw-semibold">
                                                {blog.title} • <span className="text-muted">{new Date(blog.created_at).toLocaleDateString()}</span>
                                            </p>
                                            <h6 className="fw-bold mb-2">{blog.subtitle}</h6>
                                            <p className="text-muted small mb-0" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className='d-flex flex-md-row flex-column'>
                                        <button onClick={()=>editBlog(blog)} className="btn btn-lg btn-outline-success btn-sm me-2 px-4 fs-5 mb-2">
                                            Edit
                                        </button>
                                        <button onClick={() => openDelete(blog.id)} className="btn btn-lg px-4 fs-5 btn-outline-danger btn-sm mb-2">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
            
            <Dialog open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
                <DialogTitle id="modal-title" className="text-success">Delete Blog</DialogTitle>
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
    <Dialog open={isFetching} PaperProps={{
        style: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        }
    }}
    >
        <DialogContent>
            <p>
                <span className='spinner-border text-white'></span>
            </p>
        </DialogContent>
    </Dialog>
    </div>
  );
}

export default BlogManager;