import React from "react";
import { Box, Paper, Typography, Slider } from "@mui/material";

const formatNgn = (val) => `₦${Math.round(Number(val || 0)).toLocaleString("en-NG")}`;

const DEFAULT_ROOMS = [
  { name: "Deluxe Room", maxOccupancy: "2 Guests", bedType: "King Bed", availableRooms: "5 Units", price: 45000, sliderVal: 4 },
  { name: "Executive Suite", maxOccupancy: "3 Guests", bedType: "King Bed + Sofa", availableRooms: "2 Units", price: 85000, sliderVal: 2 },
  { name: "Penthouse Collection", maxOccupancy: "2 Guests", bedType: "Super King Bed", availableRooms: "1 Units", price: 150000, sliderVal: 1 },
];

const HotelRoomTypesSection = ({ rooms = DEFAULT_ROOMS }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "16px", mb: 2 }}>
        Room types & pricing
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rooms.map((room, idx) => (
          <Paper
            key={idx}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              bgcolor: "#F8FAFC",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1.4fr 1fr 1.2fr" },
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Col 1: Name & Bed */}
            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
                ROOM NAME
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#0F172A", fontSize: "15px", mb: 1 }}>
                {room.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
                BED TYPE
              </Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontWeight: 700, fontSize: "12px" }}>
                {room.bedType}
              </Typography>
            </div>

            {/* Col 2: Occupancy & Units */}
            <div>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
                MAX OCCUPANCY
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#334155", fontSize: "12.5px", mb: 1 }}>
                {room.maxOccupancy}
              </Typography>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
                AVAILABLE ROOMS
              </Typography>
              <Typography variant="body2" sx={{ color: "#334155", fontWeight: 700, fontSize: "12px" }}>
                {room.availableRooms}
              </Typography>
            </div>

            {/* Col 3: Price & Visual Indicator */}
            <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 800, fontSize: "9.5px", letterSpacing: "0.5px" }}>
                PRICE PER NIGHT
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: "#017E53", fontSize: "20px", mb: 0.5 }}>
                {formatNgn(room.price)}
              </Typography>
              <Box sx={{ width: "100%", maxWidth: 140, ml: { sm: "auto" } }}>
                <Slider
                  size="small"
                  value={room.sliderVal || 3}
                  min={1}
                  max={5}
                  disabled
                  sx={{
                    color: "#017E53",
                    p: 0,
                    height: 4,
                    "& .MuiSlider-thumb": { width: 10, height: 10, bgcolor: "#FFFFFF", border: "2px solid #017E53" },
                    "& .MuiSlider-track": { bgcolor: "#017E53" },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default HotelRoomTypesSection;