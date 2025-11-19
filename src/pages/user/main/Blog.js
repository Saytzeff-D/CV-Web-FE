import React, { useEffect, useState } from "react";
import data from '../../../data.json';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert, Dialog, DialogContent } from "@mui/material";

const Blog = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const uri = useSelector(state=>state.UriReducer.uri)
  const [blogs, setBlogs] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {    
    axios.get(`${uri}blog/all`)
      .then(response => {
        setIsFetching(false)
        setBlogs(response.data.blogs);
      })
      .catch(error => {
        setIsFetching(false)
        setError('Failed to fetch blogs');      
      });
  }, [uri]);

  return (
    <>
    <Navbar />
    <div className="container py-5 my-5">
      {/* Latest Blogs Section */}
      <h3 className="fw-semibold mb-4">Latest blogs</h3>
      <div className="row g-4 mb-5">
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
          :
          blogs.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              <div className="card border-0 h-100">
                <img src={blog.main_photo} className="card-img-top rounded-3" alt={blog.title} height={'250px'} />
                <div className="card-body">
                  <p className="text-success small mb-1 fw-semibold">
                    {blog.title.slice(0,20)} • <span className="text-muted">{new Date(blog.created_at).toLocaleDateString()}</span>
                  </p>
                  <h6 className="fw-bold mb-2">{blog.subtitle.slice(0,20)}</h6>
                  <p className="text-muted small mb-0" dangerouslySetInnerHTML={{__html: blog.content.substring(0, 150)}}></p>
                </div>
              </div>
            </div>
          ))
        }
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
    <Footer />
    </>
  );
}

export default Blog