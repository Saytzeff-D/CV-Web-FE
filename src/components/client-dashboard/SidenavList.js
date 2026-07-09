import React, { Profiler } from "react";
import {
  DashboardOutlined,
  CalendarTodayOutlined,
  AutorenewOutlined,
  FavoriteBorderOutlined,
  LogoutOutlined,
  PersonOutlined
} from "@mui/icons-material";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider, // Imported Box for flexible layout handling
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../assets/icon.png"

const SidenavList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    { title: "Dashboard", icon: <DashboardOutlined />, path: "/user" },
    { title: "Bookings", icon: <CalendarTodayOutlined />, path: "/user/bookings" },
    { title: "Transactions", icon: <AutorenewOutlined />, path: "/user/transactions" },
    { title: "Saved Searches", icon: <FavoriteBorderOutlined />, path: "/user/saved-searches" },
    { title: "Profile", icon: <PersonOutlined />, path: "/user/profile" }
  ];

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      className="bg-sidebar"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh", // Guarantees full container height on all viewports
      }}
    >
      <div className="d-flex align-items-center justify-content-around py-3">
        <div>
          <img src={CompanyLogo} alt="Company Logo" width="50px" height="50px" />
        </div>
        <div onClick={() => navigate('/')} className="d-flex flex-column align-items-start ms-2" style={{ cursor: "pointer" }}>
          <p className="text-cv fw-bold fs-5 mt-2">
            CV Properties
          </p>
        </div>
      </div>
      <Divider />
      {/* Top Menu Container */}
      <Box sx={{ flexGrow: 1 }}> 
        <List sx={{ mt: 2 }}>
          {menus.map((menu) => {
            const active = location.pathname === menu.path;

            return (
              <ListItem key={menu.title} disablePadding sx={{ px: 1, mb: 1 }}>
                <ListItemButton
                  onClick={() => navigate(menu.path)}
                  sx={{
                    borderRadius: "12px",
                    py: 1.2,
                    bgcolor: active ? "#23663E" : "transparent",
                    color: active ? "#fff" : "#B8C4B8",
                    "&:hover": {
                      bgcolor: active ? "#23663E" : "#173322",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: active ? "#fff" : "#B8C4B8", minWidth: 38 }}>
                    {menu.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menu.title}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: active ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Logout - Anchored at the base */}
      <Box sx={{ pb: 2 }}>
        <List className="bg-sidebar">
          <ListItem disablePadding sx={{ px: 1 }}>
            <ListItemButton
              onClick={logout}
              sx={{
                borderRadius: "12px",
                color: "#B8C4B8",
                "&:hover": {
                  bgcolor: "#173322",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#B8C4B8", minWidth: 38 }}>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  fontSize: 14,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SidenavList;