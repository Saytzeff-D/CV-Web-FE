import { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { addBlogSchema } from "../../schemas";
import { IconButton, Snackbar } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";

const AddBlog = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const uri = useSelector((state) => state.uri);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = sessionStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      alert("You are not authorized to view this page.");
      navigate("/admin/login");
    }
  }, [uri]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessMessage('');
    setErrorMessage('');
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        &times;
      </IconButton>
    </Fragment>
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      content: "",
    },
    validationSchema: addBlogSchema,
    onSubmit: (values, { resetForm }) => {
      const finalData = { ...values, main_photo: images[0] };

      if (images.length !== 0) {
        console.log("Submitting blog with data:", finalData);
        setIsLoading(true);
        axios
          .post(`${uri}blog/create`, finalData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setIsLoading(false);
            resetForm();
            setSuccessMessage("Blog submitted successfully!");
            editor.commands.clearContent();
          })
          .catch((err) => {
            setIsLoading(false);
            setErrorMessage("Failed to submit blog. Kindly try again.");
            console.error("Error submitting blog:", err);
          });
      } else {
        alert("Please upload a cover image for the blog.");
      }
    },
  });

  const editor = useEditor({
    extensions: [StarterKit.configure({link: false, underline: false}), Link, Image, Underline],
    content: "",
    onUpdate: ({ editor }) => {
      formik.setFieldValue("content", editor.getHTML());
    },
  });

  const handleDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const processImages = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");     
    } else {
    const fs = new FileReader();
    fs.readAsDataURL(file);
    fs.onload = () => {
      setImages([fs.result]);
    };
  }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-center mb-0 flex-grow-1 fw-semibold text-success">
          Upload New Blog
        </h4>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn"
        >
          ×
        </button>
      </div>

      <div className="d-flex justify-content-center">
        <form className="col-md-8" onSubmit={formik.handleSubmit}>
          {/* Title and Subtitle */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Blog Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title here..."
                className={`form-control ${
                  formik.touched.title && formik.errors.title ? "is-invalid" : ""
                }`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Blog Subtitle</label>
              <input
                type="text"
                name="subtitle"
                placeholder="Enter subtitle here..."
                className={`form-control ${
                  formik.touched.subtitle && formik.errors.subtitle
                    ? "is-invalid"
                    : ""
                }`}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.subtitle}
              />
            </div>
          </div>

          {/* Tiptap Editor */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Blog Content</label>

            <div className="border rounded bg-white">
              <div className="border-bottom p-2 d-flex gap-2 flex-wrap">
                {/* Bold */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("bold") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                >
                  <b>B</b>
                </button>

                {/* Italic */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("italic") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                  <i>I</i>
                </button>

                {/* Underline */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("underline") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                  <u>U</u>
                </button>

                {/* Headings */}
                {[1, 2, 3].map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={`btn btn-sm ${
                      editor?.isActive("heading", { level }) ? "btn-dark" : "btn-outline-secondary"
                    }`}
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                  >
                    H{level}
                  </button>
                ))}

                {/* Bullet List */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("bulletList") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                  • List
                </button>

                {/* Ordered List */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("orderedList") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                  1.
                </button>

                {/* Paragraph */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("paragraph") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => editor.chain().focus().setParagraph().run()}
                >
                  ¶
                </button>

                {/* Link */}
                <button
                  type="button"
                  className={`btn btn-sm ${
                    editor?.isActive("link") ? "btn-dark" : "btn-outline-secondary"
                  }`}
                  onClick={() => {
                    const url = prompt("Enter URL");
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                  }}
                >
                  🔗
                </button>

                {/* Undo */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => editor.chain().focus().undo().run()}
                >
                  ↺
                </button>

                {/* Redo */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => editor.chain().focus().redo().run()}
                >
                  ↻
                </button>

                {/* Image Upload */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => document.getElementById("editor-image-upload").click()}
                >
                  🖼
                </button>
                <input
                  type="file"
                  id="editor-image-upload"
                  className="d-none"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                      editor.chain().focus().setImage({ src: reader.result }).run();
                    };
                  }}
                />
              </div>

              <EditorContent editor={editor} className="p-3" />
            </div>

            {formik.touched.content && formik.errors.content && (
              <div className="invalid-feedback d-block">
                {formik.errors.content}
              </div>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Upload Cover Image</label>
            <div
              className="border rounded p-4 text-center bg-light"
              style={{ maxWidth: "300px", cursor: "pointer" }}
              onClick={() => document.getElementById("upload").click()}
            >
              <i className="bi bi-cloud-upload fs-2 text-success"></i>
              <p className="text-success mb-0">Upload Images</p>
              <i className="fa fa-cloud text-success"></i>
              <input
                type="file"
                id="upload"
                multiple={false}
                className="form-control mt-2 d-none"
                onChange={processImages}
              />
            </div>
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mt-3">
              {images.map((img, index) => (
              <div
                key={index}
                className="position-relative border rounded overflow-hidden mb-3"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={img}
                  alt={`upload-${index}`}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                  style={{ width: "24px", height: "24px", padding: 0 }}
                  onClick={() => handleDelete(index)}
                >
                  &times;
                </button>
              </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-success px-5 mt-3"
          >
            {isLoading ? "Adding Blog..." : "Add Blog"}
          </button>
        </form>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleClose}
          message={successMessage}
          action={action}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMessage}
          action={action}
        />
      </div>
    </div>
  );
};

export default AddBlog;