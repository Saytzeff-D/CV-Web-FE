import React from "react";
import {
  DashboardOutlined,
  CalendarTodayOutlined,
  AutorenewOutlined,
  FavoriteBorderOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      icon: <DashboardOutlined />,
      path: "/user",
    },
    {
      title: "Bookings",
      icon: <CalendarTodayOutlined />,
      path: "/user/bookings",
    },
    {
      title: "Transactions",
      icon: <AutorenewOutlined />,
      path: "/user/transactions",
    },
    {
      title: "Saved Searches",
      icon: <FavoriteBorderOutlined />,
      path: "/user/saved-searches",
    },
  ];

  const logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column justify-content-between h-100"
    //   style={{ minHeight: "78vh" }}
    >
      {/* Top Menu */}
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
                <ListItemIcon
                  sx={{
                    color: active ? "#fff" : "#B8C4B8",
                    minWidth: 38,
                  }}
                >
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

      {/* Logout */}

      <List className="bg-sidebar" sx={{ mb: 2 }}>
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
            <ListItemIcon
              sx={{
                color: "#B8C4B8",
                minWidth: 38,
              }}
            >
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
    </div>
  );
};

export default Menu;