import React, { useState } from "react";
import { Box, Typography, Button, Stack, Chip, Menu, MenuItem, Fade, ListItemIcon, Divider, Select } from "@mui/material";
import { 
  SearchOutlined, LocationOnOutlined, KeyboardArrowDownOutlined, MenuOutlined, 
  HomeOutlined, KeyOutlined, ApartmentOutlined, CorporateFareOutlined, 
  HotelOutlined, RoomServiceOutlined, InfoOutlined, BookOutlined, AlternateEmailOutlined
} from "@mui/icons-material";
import Logo from '../assets/icon.png'
import { useDispatch, useSelector } from "react-redux";
import HomeImage from "../assets/home-image.png"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch()
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = Boolean(menuAnchor);
  const currency = useSelector(state=>state.CurrencyReducer.currency);
  const navigate = useNavigate()

  const handleCurrency = (value) => {        
    dispatch({type: 'SET_CURRENCY', payload: value});
  }

  return (
    <Box className="font-poppins" sx={{ width: "100%", bgcolor: "#F9FAFB", overflowX: "hidden" }}>
      
      {/* GRAPHIC BACKDROP OVERLAY CARD BOX CONTAINER */}
      <Box 
        sx={{ 
          backgroundImage: `url(${HomeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%", 
          position: "relative",
          pt: { xs: "120px", md: "160px" },
          pb: { xs: "80px", md: "140px" }, 
          px: { xs: 2, sm: 4, md: 8 }
        }}
      >
        {/* ENHANCED DESIGNER BLACK GRADIENT COVER */}
        <Box 
          sx={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)",
            zIndex: 1 
          }} 
        />

        {/* FLOATING TRANSPARENT HOME NAV BAR WITH BRAND ICON */}
        <Box 
          component="nav" 
          sx={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            zIndex: 10, 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            px: { xs: 2, sm: 4, md: 8 }, 
            py: 3 
          }}
        >
          {/* LOGO ICON */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box 
              component="img" 
              src={Logo} 
              alt="Logo" 
              sx={{ width: 50, height: 50, objectFit: "contain", filter: "brightness(0) invert(1)" }} 
            />
            {/* <Typography variant="h6" sx={{ color: "#fff", fontWeight: 800, letterSpacing: "-0.5px", fontSize: "18px" }}>
              Chaks & Vix
            </Typography> */}
            <Chip icon={<LocationOnOutlined sx={{ "&&": { color: "#22C55E" }, fontSize: 14 }} />} label="Lagos, Nigeria" size="small" sx={{ bgcolor: "rgba(255,255,255,0.9)", fontWeight: 600, color: "#1F2937", display: { xs: "none", sm: "flex" } }} />
          </Stack>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Select
              value={currency}
              onChange={(e) => handleCurrency(e.target.value)}
              size="small"
              IconComponent={(props) => <KeyboardArrowDownOutlined {...props} sx={{ color: "#fff !important" }} />}
              sx={{
                borderRadius: "50px",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                fontWeight: 600,
                fontSize: "14px",
                color: "#ffffff",
                width: "105px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                "& .MuiSelect-select": { py: 0.8, pl: 2, pr: "32px !important" }
              }}
              MenuProps={{
                slotProps: {
                  paper: {
                    sx: {
                      borderRadius: "12px",
                      mt: 1,
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      "& .MuiMenuItem-root": { fontSize: "14px", fontWeight: 500 }
                    }
                  }
                }
              }}
            >
              <MenuItem value="NGN">NGN</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="GBP">GBP</MenuItem>
            </Select>
            <Button variant="text" sx={{ color: "#fff", textTransform: "none", fontWeight: 600, display: { xs: "none", md: "inline-block" } }} onClick={() => navigate("/create-account")}>Sign Up</Button>
            <Button variant="contained" sx={{ bgcolor: "#22C55E", color: "#fff", borderRadius: "50px", textTransform: "none", fontWeight: 600, px: 3, "&:hover": { bgcolor: "#16A34A" } }} onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ minWidth: "auto", p: 1.2, borderRadius: "50%", color: "#fff", bgcolor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}><MenuOutlined fontSize="small" /></Button>
            
            <Menu anchorEl={menuAnchor} open={isMenuOpen} onClose={() => setMenuAnchor(null)} TransitionComponent={Fade} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} transformOrigin={{ vertical: "top", horizontal: "right" }} slotProps={{ paper: { sx: { mt: 1.5, borderRadius: "16px", width: "240px", p: 1 } } }}>
              <Typography variant="caption" sx={{ px: 2, py: 1, display: "block", color: "#9CA3AF", fontWeight: 700 }}>MARKETPLACE</Typography>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><HomeOutlined fontSize="small" /></ListItemIcon> Buy Properties</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><KeyOutlined fontSize="small" /></ListItemIcon> Rent Listings</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><ApartmentOutlined fontSize="small" /></ListItemIcon> Shortlet Studios</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><CorporateFareOutlined fontSize="small" /></ListItemIcon> Hostels</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><HotelOutlined fontSize="small" /></ListItemIcon> Hotels & Resorts</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><RoomServiceOutlined fontSize="small" /></ListItemIcon> Premium Services</MenuItem>
              <Divider sx={{ my: 1 }} />
              <Typography variant="caption" sx={{ px: 2, py: 1, display: "block", color: "#9CA3AF", fontWeight: 700 }}>COMPANY</Typography>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><InfoOutlined fontSize="small" /></ListItemIcon> About Us</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><BookOutlined fontSize="small" /></ListItemIcon> Blog Insights</MenuItem>
              <MenuItem onClick={() => setMenuAnchor(null)} sx={{ py: 1, borderRadius: "8px" }}><ListItemIcon><AlternateEmailOutlined fontSize="small" /></ListItemIcon> Contact Support</MenuItem>
            </Menu>
          </Stack>
        </Box>

        {/* RE-ALIGNED HERO LEFT ELEMENT INNER CONTENT TRACK */}
        <Box sx={{ position: "relative", zIndex: 5, color: "#fff", maxWidth: "680px", mx: "0", textAlign: "left" }}>
          <Stack direction="column" spacing={1.5} alignItems="flex-start" sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: { xs: "9px", sm: "11px" }, letterSpacing: "0.8px", bgcolor: "rgba(255,255,255,0.15)", px: 2, py: 0.8, borderRadius: "50px", backdropFilter: "blur(4px)" }}>
              ● AVAILABLE ON IOS & ANDROID
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: "34px", sm: "46px", md: "60px" }, lineHeight: 1.15, letterSpacing: "-1.5px", m: "0 !important" }}>
              Find Your <Box component="span" sx={{ color: "#22C55E" }}>Perfect</Box> Stay
            </Typography>
          </Stack>
          
          <Typography variant="body" sx={{ color: "rgba(255,255,255,0.85)", fontSize: { xs: "14px", sm: "16px" }, mb: 4, lineHeight: 1.5, maxWidth: "560px", mx: "0" }}>
            <p>
              Discover premium listings, from luxury penthouses to cozy studio apartments, all verified for your safety and comfort.
            </p>
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-start">
            <Button variant="contained" sx={{ bgcolor: "#22C55E", color: "#fff", borderRadius: "12px", px: 4, py: 1.6, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: "#16A34A" } }}>About Us</Button>
            <Button onClick={()=> window.open('https://agent.cvproperties.co')} variant="outlined" sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.6)", borderRadius: "12px", px: 4, py: 1.6, fontWeight: 700, textTransform: "none", backdropFilter: "blur(4px)" }}>List a Property</Button>
          </Stack>
        </Box>
      </Box>

      {/* FLOATING SEARCH CONTROL ENGINE PANEL */}

    </Box>
  );
};

export default Header;