import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Switch,
  Typography,
  IconButton,
} from "@mui/material";
import {
  PhotoCamera,
  LockOutlined,
  MailOutline,
  LocalPhoneOutlined,
  ShieldOutlined,
  HelpOutline,
} from "@mui/icons-material";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "Alexander",
    lastName: "Wright",
    username: "alex_wright_estate",
    email: "alex.wright@estateadmin.com",
    phone: "+1 (555) 802-4412",
    currentPassword: "••••••••••••",
    newPassword: "",
    confirmPassword: "",
    receiveNotifications: true,
    betaFeatures: false,
  });

  const handleChange = (field, val) => {
    setProfile({ ...profile, [field]: val });
  };

  return (
    <div className="container-fluid px-0 py-4" style={{ minHeight: "100vh" }}>
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

      {/* MAIN DATA FORM CONTAINER CARD */}
      <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mb-4 bg-white mx-auto" style={{ maxWidth: "900px" }}>
        
        {/* SECTION 1: PROFILE IDENTITY */}
        <div>
          <h5 className="fw-bold text-dark mb-1">Profile Identity</h5>
          <small className="text-muted d-block mb-4">Update your photo and basic details for the marketplace.</small>
          
          {/* Avatar Management Row */}
          <div className="d-flex flex-wrap align-items-center gap-4 mb-4">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton 
                  size="small" 
                  style={{ backgroundColor: "#22C55E", color: "#fff", padding: "6px" }}
                >
                  <PhotoCamera style={{ fontSize: "14px" }} />
                </IconButton>
              }
            >
              <Avatar 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" 
                sx={{ width: 100, height: 100 }} 
              />
            </Badge>

            <div>
              <h6 className="fw-bold text-dark mb-1" style={{ fontSize: "14px" }}>Profile Picture</h6>
              <span className="text-muted d-block mb-2" style={{ fontSize: "12px" }}>
                PNG, JPG or GIF. Max size of 2MB.<br />Recommended resolution: 800 x 800px.
              </span>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 fw-semibold" style={{ fontSize: "12px", borderColor: "#E5E7EB", color: "#111827" }}>
                  Replace
                </button>
                <button className="btn btn-link text-danger text-decoration-none btn-sm fw-semibold" style={{ fontSize: "12px" }}>
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Input Layout Stack */}
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>First Name</label>
              <input 
                type="text" 
                className="form-control rounded-3 py-2" 
                value={profile.firstName} 
                onChange={(e) => handleChange("firstName", e.target.value)}
                style={{ fontSize: "14px" }} 
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Last Name</label>
              <input 
                type="text" 
                className="form-control rounded-3 py-2" 
                value={profile.lastName} 
                onChange={(e) => handleChange("lastName", e.target.value)}
                style={{ fontSize: "14px" }} 
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Display Name (Username)</label>
              <input 
                type="text" 
                className="form-control rounded-3 py-2" 
                value={profile.username} 
                onChange={(e) => handleChange("username", e.target.value)}
                style={{ fontSize: "14px" }} 
              />
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
                  value={profile.email} 
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
                  className="form-control rounded-end-3 py-2 border-start-0" 
                  value={profile.phone} 
                  onChange={(e) => handleChange("phone", e.target.value)}
                  style={{ fontSize: "14px" }} 
                />
              </div>
            </div>
          </div>

          {/* PASSWORD SUBSYSTEM CONTAINER */}
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
                  className="form-control rounded-3 py-2 bg-white" 
                  value={profile.currentPassword} 
                  onChange={(e) => handleChange("currentPassword", e.target.value)}
                  style={{ fontSize: "14px" }} 
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>New Password</label>
                <input 
                  type="password" 
                  className="form-control rounded-3 py-2 bg-white" 
                  placeholder="Enter new password"
                  value={profile.newPassword} 
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  style={{ fontSize: "14px" }} 
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-semibold text-dark" style={{ fontSize: "13px" }}>Confirm New Password</label>
                <input 
                  type="password" 
                  className="form-control rounded-3 py-2 bg-white" 
                  placeholder="Confirm new password"
                  value={profile.confirmPassword} 
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  style={{ fontSize: "14px" }} 
                />
              </div>
              <div className="col-12">
                <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                  At least 8 characters, 1 number.
                </small>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-5" style={{ borderColor: "#ECECEC" }} />

        {/* SECTION 3: PREFERENCES TOGGLES */}
        <div className="mb-5">
          <h5 className="fw-bold text-dark mb-1">Preferences</h5>
          <small className="text-muted d-block mb-4">Choose how you want to be notified about platform activities.</small>

          <div className="d-flex flex-column gap-3">
            {/* Toggle Row 1 */}
            <div className="d-flex align-items-center justify-content-between p-3 rounded-4 border" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>Receive Notifications</span>
                <span className="text-muted" style={{ fontSize: "12px" }}>Get emails for bookings, verifications, and finance reports.</span>
              </div>
              <Switch 
                checked={profile.receiveNotifications} 
                onChange={(e) => handleChange("receiveNotifications", e.target.checked)}
                color="success" 
              />
            </div>

            {/* Toggle Row 2 */}
            <div className="d-flex align-items-center justify-content-between p-3 rounded-4 border" style={{ borderColor: "#E5E7EB" }}>
              <div>
                <span className="fw-bold text-dark d-block" style={{ fontSize: "14px" }}>Beta Features</span>
                <span className="text-muted" style={{ fontSize: "12px" }}>Try new admin tools before they are released globally.</span>
              </div>
              <Switch 
                checked={profile.betaFeatures} 
                onChange={(e) => handleChange("betaFeatures", e.target.checked)}
                color="success" 
              />
            </div>
          </div>
        </div>

        {/* BUTTON SUBMISSION INTERFACE */}
        <div className="d-flex justify-content-end gap-3 pt-3" style={{ borderTop: "1px solid #ECECEC" }}>
          <button className="btn btn-outline-dark rounded-pill px-4 py-2 fw-semibold" style={{ fontSize: "14px", borderColor: "#E5E7EB" }}>
            Discard Changes
          </button>
          <button className="btn btn-success rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "14px", backgroundColor: "#22C55E", border: 0 }}>
            Save Profile Changes
          </button>
        </div>

      </div>

      {/* LOWER FOOTER SUPPORT/PRIVACY INFO CARDS */}
      <div className="row g-3 mx-auto" style={{ maxWidth: "900px" }}>
        {/* Support Card Container */}
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

        {/* Data Encryption Privacy Card Container */}
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