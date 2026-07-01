import React, { Fragment } from "react";
import {
  CalendarMonthOutlined,
  AccessTimeOutlined,
  ChatBubbleOutlineRounded,
  CheckCircleOutlineRounded,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";

const stats = [
  {
    title: "TOTAL BOOKINGS",
    value: "148",
    icon: <CalendarMonthOutlined />,
    iconColor: "#2563EB",
    trend: "+12%",
    trendColor: "#16A34A",
    trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
  },
  {
    title: "UPCOMING CHECK-INS",
    value: "12",
    icon: <AccessTimeOutlined />,
    iconColor: "#F97316",
    trend: "Next 7 days",
    trendColor: "#6B7280",
    trendIcon: null,
  },
  {
    title: "PENDING REQUESTS",
    value: "05",
    icon: <ChatBubbleOutlineRounded />,
    iconColor: "#A855F7",
    trend: "-2.4%",
    trendColor: "#6B7280",
    trendIcon: <TrendingDown sx={{ fontSize: 14 }} />,
  },
  {
    title: "COMPLETED THIS MONTH",
    value: "24",
    icon: <CheckCircleOutlineRounded />,
    iconColor: "#16A34A",
    trend: "+5.2%",
    trendColor: "#16A34A",
    trendIcon: <TrendingUp sx={{ fontSize: 14 }} />,
  },
];

const Bookings = () => {
  return (
    <div className="my-5">
        <Typography variant="h4" fontWeight={700}>
            Bookings
        </Typography>

        <Typography color="text.secondary" mb={4}>
            Manage and track all property reservations and service requests.
        </Typography>
        <div className="row g-4">
        {stats.map((item) => (
            <div className="col-lg-3 col-md-6" key={item.title}>
            <Card
                elevation={0}
                sx={{
                borderRadius: 3,
                border: "1px solid #ECECEC",
                height: "100%",
                transition: ".3s",
                "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,.08)",
                },
                }}
            >
                <CardContent>

                {/* Top Row */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <Avatar
                    sx={{
                        bgcolor: `${item.iconColor}15`,
                        color: item.iconColor,
                        width: 46,
                        height: 46,
                    }}
                    >
                    {item.icon}
                    </Avatar>

                    <Chip
                    size="small"
                    label={item.trend}
                    icon={item.trendIcon}
                    sx={{
                        bgcolor:
                        item.trendColor === "#16A34A"
                            ? "#ECFDF3"
                            : "#F3F4F6",
                        color: item.trendColor,
                        fontWeight: 600,
                        fontSize: 11,
                    }}
                    />
                </Stack>

                {/* Title */}

                <Typography
                    variant="caption"
                    sx={{
                    color: "#98A2B3",
                    fontWeight: 700,
                    letterSpacing: ".5px",
                    }}
                >
                    {item.title}
                </Typography>

                {/* Value */}

                <Typography
                    variant="h4"
                    sx={{
                    fontWeight: 700,
                    mt: .5,
                    color: "#111827",
                    }}
                >
                    {item.value}
                </Typography>

                </CardContent>
            </Card>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Bookings;