import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Badge,
  Switch,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  PhotoCamera,
  LockOutlined,
  MailOutline,
  LocalPhoneOutlined,
  ShieldOutlined,
  HelpOutline,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";
import { updateProfileSchema } from "../../../schemas";


const EditProfile = () => {
  // Inside your EditProfile component function body:
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null); // Holds raw binary file object for later upload
  const [previewUrl, setPreviewUrl] = useState("");       // Holds local object URL string for instant page preview
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
  // 1. CHOOSE PHOTO (Triggers on selection via camera icon or file explorer picker)
  const handlePhotoSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validation: Guard constraint to enforce max 2MB file cap sizing rules
    if (file.size > 2 * 1024 * 1024) {
      setFeedback({ message: "File is too large. Max size allowed is 2MB.", isError: true });
      return;
    }
    
    setSelectedFile(file);
    
    // Creates a clean, temporary local blob URL string: e.g., "blob:http://localhost:3000/..."
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setFeedback({ message: "Photo updated locally. Click 'Replace' to upload to the server.", isError: false });
  };
  
  // 2. UPLOAD PHOTO TO SERVER (Triggers ONLY when clicking the "Replace" button)
  const handlePhotoUploadToServer = () => {
    if (!selectedFile) {
      setFeedback({ message: "Please select an image first using the camera icon.", isError: true });
      return;
    }
  
    const formData = new FormData();
    formData.append("avatar", selectedFile); // Key name expected by backend endpoint architecture
    
    // setIsUploadingPhoto(true);
    setFeedback({ message: "", isError: false });
    
    // axios
    // .post(`${uri}auth/update-avatar`, formData, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // .then((res) => {
    //   setFeedback({ message: "Profile picture saved to backend successfully! 🎉", isError: false });
    //   setSelectedFile(null); // Clear selected temporary state pipeline since file is now synchronized
      
    //   if (dispatch && res.data.user) {
    //     dispatch({ type: "UPDATE_USER_INFO", payload: res.data.user });
    //   }
    // })
    // .catch((err) => {
    //   console.error("Avatar upload fault error:", err);
    //   setFeedback({
    //     message: err.response?.data?.message || "Failed to upload image to server.",
    //     isError: true,
    //   });
    // })
    // .finally(() => {
    //   setIsUploadingPhoto(false);
    // });
  };
  
  // Optional clean-up routine to prevent dynamic memory leaks from open blob allocations
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  const dispatch = useDispatch();
  const uri = useSelector((state) => state.UriReducer.uri);
  
  // Retrieve the existing logged-in user profile from Redux
  const currentUser = useSelector((state) => state.UserReducer.userInfo);
  const token = sessionStorage.getItem("userToken");

  const [feedback, setFeedback] = useState({ message: "", isError: false });
  const [isSubmittingState, setIsSubmittingState] = useState(false);

  // Formik validation & state control loop setup
  const formik = useFormik({
    enableReinitialize: true, // Forces form to update when Redux storage compiles asynchronous load payload
    initialValues: {
      firstName: currentUser?.firstName || currentUser?.firstname || "",
      lastName: currentUser?.lastName || currentUser?.lastname || "",
      username: currentUser?.username || "",
      phone: currentUser?.phone || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      receiveNotifications: currentUser?.receiveNotifications ?? true,
      betaFeatures: currentUser?.betaFeatures ?? false,
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      setIsSubmittingState(true);
      setFeedback({ message: "", isError: false });

      // Clean payload data structure preparation parameters
      const payload = {
        firstname: values.firstName,
        lastname: values.lastName,
        // username: values.username,
        phone_number: values.phone,
        // receiveNotifications: values.receiveNotifications,
        // betaFeatures: values.betaFeatures,
      };

      // Append security mutation objects safely if explicitly targeted inside view layout elements
      if (values.newPassword) {
        payload.old_password = values.currentPassword;
        payload.new_password = values.newPassword;
        payload.confirm_password = values.confirmPassword;
      }

      axios
        .put(`${uri}auth/edit-profile`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFeedback({
            message: res.data.message || "Profile updated successfully! 🎉",
            isError: false,
          });
          
          // OPTIONAL: Update Redux store on success so changes sync globally across top bar and layout views
          if (dispatch && res.data.user) {
            dispatch({ type: "UPDATE_USER_INFO", payload: res.data.user });
          }
        })
        .catch((err) => {
          console.error("Profile saving execution fault:", err);
          setFeedback({
            message: err.response?.data?.message || "An unexpected error occurred during execution loops.",
            isError: true,
          });
        })
        .finally(() => {
          setIsSubmittingState(false);
        });
    },
  });

  return (
    <div className="container-fluid px-0 py-4" style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      {/* PAGE BREADCRUMB HEADER */}
      <div className="mb-4">
        <small className="text-muted">
          Account <span className="mx-1">|</span> <span className="text-success fw-medium">Edit Profile</span>
        </small>
        <h3 className="fw-bold text-dark mt-1 mb-1">Edit Profile</h3>
        <Typography variant="body2" color="text.secondary">
          Manage your personal information, security preferences, and account settings.
        </Typography>
      </div>

      {/* CORE INTEGRATION FORM FRAME */}
      <form onSubmit={formik.handleSubmit}>
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white mx-auto" style={{ maxWidth: "900px" }}>
          
          {/* SECTION 1: PROFILE IDENTITY */}
          <div>
            <h5 className="fw-bold text-dark mb-1">Profile Identity</h5>
            <small className="text-muted d-block mb-4">Update your photo and basic details for the marketplace.</small>
            
            <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
              {/* Hidden native input stream listener */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoSelect} // 1. Changes instant local state only
                accept="image/png, image/jpeg, image/jpg, image/gif"
                style={{ display: "none" }}
              />

              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent = {
                  <IconButton 
                    size="small" 
                    onClick={() => fileInputRef.current.click()} // Camera icon opens local explorer selector window
                    disabled={isUploadingPhoto}
                    style={{ backgroundColor: "#22C55E", color: "#fff", padding: "6px" }}
                  >
                    <PhotoCamera style={{ fontSize: "14px" }} />
                  </IconButton>
                }
              >
                <Avatar 
                  // Prioritizes local temporary view state string over historical static server route links
                  src={previewUrl || currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200"} 
                  sx={{ width: 100, height: 100, opacity: isUploadingPhoto ? 0.5 : 1 }} 
                >
                  {isUploadingPhoto && <CircularProgress size={24} sx={{ position: 'absolute', color: '#22C55E' }} />}
                </Avatar>
              </Badge>

              <div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "14px" }}>Profile Picture</h6>
                <span className="text-muted d-block mb-2" style={{ fontSize: "12px" }}>
                  PNG, JPG or GIF. Max size of 2MB.<br />Recommended resolution: 800 x 800px.
                </span>
                <div className="d-flex gap-2">
                  <button 
                    type="button" 
                    onClick={handlePhotoUploadToServer} // 2. Natively handles payload streaming up to server parameters
                    disabled={isUploadingPhoto || !selectedFile} // Disabled if loading or if no local image has been chosen yet
                    className={`btn btn-sm rounded-pill px-3 fw-semibold ${selectedFile ? 'btn-success text-white' : 'btn-outline-secondary'}`} 
                    style={{ fontSize: "12px", borderColor: selectedFile ? "transparent" : "#E5E7EB", color: selectedFile ? "#fff" : "#111827" }}
                  >
                    {isUploadingPhoto ? "Uploading..." : "Replace"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(""); // Clean out temporary buffers if user cancels operation parameters
                    }}
                    className="btn btn-link text-danger text-decoration-none btn-sm fw-semibold" 
                    style={{ fontSize: "12px" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  className={`form-control rounded-3 py-2 ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`} 
                  {...formik.getFieldProps("firstName")}
                  style={{ fontSize: "14px" }} 
                />
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  className={`form-control rounded-3 py-2 ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`} 
                  {...formik.getFieldProps("lastName")}
                  style={{ fontSize: "14px" }} 
                />
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Display Name (Username)</label>
                <input 
                  type="text" 
                  name="username"
                  className={`form-control rounded-3 py-2 ${formik.touched.username && formik.errors.username ? "is-invalid" : ""}`} 
                  {...formik.getFieldProps("username")}
                  style={{ fontSize: "14px" }} 
                />
                <div className="invalid-feedback">{formik.errors.username}</div>
                <small className="text-muted mt-1 d-block" style={{ fontSize: "11px" }}>
                  Your public name visible to other agents and buyers.
                </small>
              </div>
            </div>
          </div>

          <hr className="my-5" style={{ borderColor: "#ECECEC" }} />

          {/* SECTION 2: CONTACT & SECURITY */}
          <div>
            <h5 className="fw-bold text-dark mb-1">Contact & Security</h5>
            <small className="text-muted d-block mb-4">Verify your communication channels and manage your password.</small>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Email Address 🔒</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0 text-muted">
                    <MailOutline style={{ fontSize: "18px" }} />
                  </span>
                  <input 
                    type="email" 
                    className="form-control rounded-end-3 py-2 border-start-0 bg-light text-muted" 
                    value={currentUser?.email || ""} 
                    disabled
                    style={{ fontSize: "14px" }} 
                  />
                </div>
                <small className="text-muted mt-1 d-block" style={{ fontSize: "11px" }}>
                  Primary email cannot be changed for security.
                </small>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0 text-muted">
                    <LocalPhoneOutlined style={{ fontSize: "18px" }} />
                  </span>
                  <input 
                    type="text" 
                    name="phone"
                    className={`form-control rounded-end-3 py-2 border-start-0 ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`} 
                    {...formik.getFieldProps("phone")}
                    style={{ fontSize: "14px" }} 
                  />
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                </div>
              </div>
            </div>

            {/* PASSWORD CONTAINER ROW STACK */}
            <div className="p-3 rounded-4" style={{ backgroundColor: "#FAFAFA", border: "1px solid #F3F4F6" }}>
              <div className="d-flex align-items-center gap-2 mb-3 text-muted">
                <LockOutlined style={{ fontSize: "16px" }} />
                <span className="fw-bold text-uppercase" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>Password Update</span>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    className={`form-control rounded-3 py-2 bg-white ${formik.touched.currentPassword && formik.errors.currentPassword ? "is-invalid" : ""}`} 
                    {...formik.getFieldProps("currentPassword")}
                    placeholder="••••••••••••"
                    style={{ fontSize: "14px" }} 
                  />
                  <div className="invalid-feedback">{formik.errors.currentPassword}</div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    className={`form-control rounded-3 py-2 bg-white ${formik.touched.newPassword && formik.errors.newPassword ? "is-invalid" : ""}`} 
                    {...formik.getFieldProps("newPassword")}
                    placeholder="Enter new password"
                    style={{ fontSize: "14px" }} 
                  />
                  <div className="invalid-feedback">{formik.errors.newPassword}</div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    className={`form-control rounded-3 py-2 bg-white ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "is-invalid" : ""}`} 
                    {...formik.getFieldProps("confirmPassword")}
                    placeholder="Confirm new password"
                    style={{ fontSize: "14px" }} 
                  />
                  <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                </div>
                <div className="col-12">
                  <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                    Leave blank if you do not wish to perform a password update. Must be at least 8 characters, 1 number.
                  </small>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-5" style={{ borderColor: "#ECECEC" }} />

          {/* SECTION 3: PREFERENCES TOGGLES */}
          <div className="mb-4">
            <h5 className="fw-bold text-dark mb-1">Preferences</h5>
            <small className="text-muted d-block mb-4">Choose how you want to be notified about platform activities.</small>

            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center justify-content-between p-3 rounded-4 border" style={{ borderColor: "#E5E7EB" }}>
                <div>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>Receive Notifications</span>
                  <span className="text-muted" style={{ fontSize: "12px" }}>Get emails for bookings, verifications, and finance reports.</span>
                </div>
                <Switch 
                  checked={formik.values.receiveNotifications} 
                  onChange={(e) => formik.setFieldValue("receiveNotifications", e.target.checked)}
                  color="success" 
                />
              </div>

              <div className="d-flex align-items-center justify-content-between p-3 rounded-4 border" style={{ borderColor: "#E5E7EB" }}>
                <div>
                  <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>Beta Features</span>
                  <span className="text-muted" style={{ fontSize: "12px" }}>Try new admin tools before they are released globally.</span>
                </div>
                <Switch 
                  checked={formik.values.betaFeatures} 
                  onChange={(e) => formik.setFieldValue("betaFeatures", e.target.checked)}
                  color="success" 
                />
              </div>
            </div>
          </div>

          {/* FEEDBACK ROW */}
          {feedback.message && (
            <div className={`alert text-center fw-semibold py-2 mb-4 rounded-3 ${feedback.isError ? "alert-danger text-danger" : "alert-success text-success"}`} style={{ fontSize: "14px" }}>
              {feedback.message}
            </div>
          )}

          {/* SUBMISSION ACTION ROW ITEMS */}
          <div className="d-flex justify-content-end gap-3 pt-3" style={{ borderTop: "1px solid #ECECEC" }}>
            <button type="button" onClick={() => formik.resetForm()} className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" style={{ fontSize: "14px", borderColor: "#E5E7EB" }}>
              Discard Changes
            </button>
            <button 
              type="submit" 
              disabled={isSubmittingState}
              className="btn btn-success rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2" 
              style={{ fontSize: "14px", backgroundColor: "#22C55E", border: 0 }}
            >
              {isSubmittingState ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : "Save Profile Changes"}
            </button>
          </div>

        </div>
      </form>

      {/* LOWER FOOTER COMPONENT METAS */}
      <div className="row g-3 mx-auto" style={{ maxWidth: "900px" }}>
        <div className="col-md-6">
          <div className="card border-0 rounded-4 p-3 h-100" style={{ backgroundColor: "#E8F5E9", border: "1px solid #C8E6C9" }}>
            <div className="d-flex gap-3 align-items-start">
              <div className="rounded-3 p-2 bg-white text-success d-flex align-items-center justify-content-center shadow-sm">
                <HelpOutline style={{ fontSize: "20px" }} />
              </div>
              <div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "14px" }}>Need help?</h6>
                <p className="text-secondary mb-2" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                  If you are having trouble updating your profile or need administrative clearance, please contact our support team.
                </p>
                <a href="#ticket" className="text-success fw-bold text-decoration-none" style={{ fontSize: "12px" }}>
                  Open Ticket
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 rounded-4 p-3 h-100 shadow-sm bg-white" style={{ border: "1px solid #F3F4F6" }}>
            <div className="d-flex gap-3 align-items-start">
              <div className="rounded-3 p-2 bg-light text-secondary d-flex align-items-center justify-content-center">
                <ShieldOutlined style={{ fontSize: "20px" }} />
              </div>
              <div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "14px" }}>Data Privacy</h6>
                <p className="text-secondary mb-2" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                  Your personal information is encrypted and only visible to you and account super-administrators.
                </p>
                <a href="#privacy" className="text-muted fw-bold text-decoration-none" style={{ fontSize: "12px" }}>
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;