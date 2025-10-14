import React from "react";
import data from '../../../data.json';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Blog = () => {
  const { blogs } = data;
  return (
    <>
    <Navbar />
    <div className="container py-5 my-5">
      {/* Latest Blogs Section */}
      <h3 className="fw-semibold mb-4">Latest blogs</h3>
      <div className="row g-4 mb-5">
        {blogs.slice(0, 6).map((blog) => (
          <div className="col-md-4" key={blog.id}>
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
        ))}
      </div>

      {/* Quick Blogs Section */}
      <h5 className="fw-semibold mb-3">Quick blogs</h5>
      <div className="row g-4">
        {blogs.slice(0, 3).map((blog) => (
          <div className="col-md-4" key={blog.id}>
            <div className="card border-0 h-100">
              <img src={blog.img} className="card-img-top rounded-3" alt={blog.title} />
              <div className="card-body py-3">
                <p className="text-success small mb-1 fw-semibold">
                  {blog.category} • <span className="text-muted">{blog.date}</span>
                </p>
                <h6 className="fw-bold mb-2">{blog.title}</h6>
                <p className="text-muted small mb-0">{blog.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Blog