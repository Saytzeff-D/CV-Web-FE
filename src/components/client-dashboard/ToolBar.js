import React from "react";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import { useSelector } from "react-redux";

const ToolBar = () => {
//   const currentUser = useSelector(
//     (state) => state.UserReducer.userInfo
//   );

  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: "1px solid #ECECEC",
        borderRadius: 0,
        background: "#fff",
        px: { xs: 2, md: 3 },
        py: 2,
      }}
    >
    <div className="tool-bar">
        <div className="d-md-block d-none">
            <div
                className="d-flex align-items-center px-3 flex-grow-1"
                style={{
                    background: "#F6F7FB",
                    borderRadius: "30px",
                    height: 46,
                    minWidth: 180,
                }}
            >
                <SearchIcon sx={{ color: "#9CA3AF", mr: 1 }} />

                <input
                    placeholder="Search properties, agents, or bookings..."
                    style={{
                        border: 0,
                        outline: 0,
                        background: "transparent",
                        width: "100%",
                        fontSize: 14,
                    }}
                />
            </div>
        </div>
        <div className="d-flex justify-content-between">
            <div className="mt-3 mx-3 cursor-pointer"  >
                <div
                    className="d-none d-md-flex align-items-center px-3"
                    style={{
                        background: "#F6F7FB",
                        borderRadius: 25,
                        height: 46,
                        fontWeight: 600,
                    }}
                >
                    <LocationOnOutlinedIcon sx={{ mr: 1, fontSize: 18 }} />
                    Lagos, NG
                </div>
            </div>
            <div className="mt-3">
                <IconButton>
                    <Badge color="error" variant="dot">
                        <NotificationsNoneOutlinedIcon />
                    </Badge>
                </IconButton>

                <Divider orientation="vertical" flexItem />
            </div>
            <div className="d-none d-md-block text-end">
                <Typography fontWeight={700} fontSize={15}>
                    Ajadi Promise
                    {/* {currentUser?.firstName} {currentUser?.lastName} */}
                </Typography>

                <Typography
                    fontSize={12}
                    color="text.secondary"
                >
                    Pro Member
                </Typography>
            </div>

            {/* AVATAR */}
            <Badge
                overlap="circular"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                badgeContent={
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            background: "#22C55E",
                            borderRadius: "50%",
                            border: "2px solid white",
                        }}
                    />
                }
            >
                <Avatar
                    // src={currentUser?.picture}
                    sx={{
                        width: 48,
                        height: 48,
                    }}
                />
            </Badge>        
        </div>
    </div>
    </Paper>
  );
};

export default ToolBar;