import React, { useState, useEffect } from "react";
import { Box, Typography, Slider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Assuming you have an action type or creator to set properties in Redux
// import { setFilteredPropertiesAction } from "../redux/actions"; 

const PropertyFiltersSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Global backend URI and auth configurations from Redux/Session
  const uri = useSelector((state) => state.UriReducer.uri);
  const token = sessionStorage.getItem("userToken");

  // 1. FILTER CONTROLS STATE
  const [priceRange, setPriceRange] = useState([200000, 2000000]);
  const [selectedType, setSelectedType] = useState('land'); // Default to 'Land' or empty string for no selection
  const [instantBook, setInstantBook] = useState(false);

  // 2. DATA HOLDER STATES
  const [rawServerProperties, setRawServerProperties] = useState([]); 
  const [isSearching, setIsSearching] = useState(false);

  // 3. STEP 1: FETCH DATA BASED ONLY ON TYPE AND INSTANT BOOK
  useEffect(() => {
    const fetchServerData = async () => {
      setIsSearching(true);
      
      const apiQueryPath = `type=${selectedType}&instant_book=${instantBook}`;

      try {
        const response = await axios.get(`${uri}property/all?${apiQueryPath}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const propertiesArray = response.data.data;
        setRawServerProperties(propertiesArray);
      } catch (error) {
        console.error("Backend query failed for type/instantBook:", error);
        setRawServerProperties([]);
      } finally {
        setIsSearching(false);
      }
    };

    fetchServerData();
  }, [selectedType, instantBook, uri, token]);

  // 4. STEP 2: CLIENT-SIDE PRICE FILTERING
  const getFilteredProperties = () => {
    return rawServerProperties.filter((property) => {
      const propertyPrice = property.total_price; 
      return propertyPrice >= priceRange[0] && propertyPrice <= priceRange[1];
    });
  };

  const currentFilteredResults = getFilteredProperties();
  const totalCount = currentFilteredResults.length;

  // 5. STEP 3: SAVE STATE AND ROUTE TO NEW PAGE
  const handleApplyFilters = () => {
    if (currentFilteredResults.length === 0) {
      alert("No properties found matching these criteria.");
      return;
    }

    // A. Save to sessionStorage to prevent loss on browser refresh
    sessionStorage.setItem("filteredProperties", JSON.stringify(currentFilteredResults));

    // B. Save to Redux Reducer (Optional: uncomment and update action matching your store setup)
    /* 
    dispatch({ 
      type: "SET_FILTERED_PROPERTIES", 
      payload: currentFilteredResults 
    });
    */

    // C. Route the user to your dedicated properties listing/results page
    navigate("/property/results"); // Update this string to match your layout router path (e.g., /properties or /buy)
  };

  const handleResetFilters = () => {
    setPriceRange([200000, 2000000]);
    setSelectedType("");
    setInstantBook(false);
  };

  return (
    <div className="col-lg-3 mb-4">
      <div className="filter-card p-3 bg-white rounded-4 border" style={{ borderColor: "#F3F4F6" }}>
        
        {/* HEADER SECTION */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h6 className="fw-bold mb-0" style={{ color: "#111827" }}>Filters</h6>
          <button 
            type="button" 
            onClick={handleResetFilters} 
            className="btn btn-sm border-0 p-0"
          >
            <small className="fw-bold text-success" style={{ cursor: "pointer" }}>Reset</small>
          </button>
        </div>

        {/* PRICE SLIDER */}
        <Box className="mb-4">
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
            Price Range (NGN)
          </Typography>

          <div className="d-flex justify-content-between mb-2" style={{ fontSize: "13px", fontWeight: 600, color: "#4B5563" }}>
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>

          <Slider
            value={priceRange}
            onChange={(e, val) => setPriceRange(val)}
            min={150000}
            max={5000000}
            step={50000}
            sx={{ color: "green" }}
          />
        </Box>

        {/* PROPERTY TYPE PILLS */}
        <h6 className="fw-bold mt-4" style={{ color: "#111827", fontSize: "14px" }}>Property Type</h6>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {[
            "Land",
            "Apartment",                
            "Event Center",
            "Hotel",
            "Hostel",
          ].map((item) => {
            const isCurrentActive = selectedType === item.toLowerCase().replaceAll(" ", "_");
            return (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedType(selectedType === item.toLowerCase().replaceAll(" ", "_") ? "" : item.toLowerCase().replaceAll(" ", "_"))}
                className={`btn btn-sm rounded-pill px-3 py-1.5 transition-all ${
                  isCurrentActive 
                    ? "btn-success text-white fw-semibold border-success" 
                    : "btn-outline-dark border-light-subtle"
                }`}
                style={{ fontSize: "12px" }}
              >
                {item}
              </button>
            );
          })}
        </div>

        <hr className="my-4" style={{ borderColor: "#F3F4F6" }} />

        {/* INSTANT BOOK SWITCH */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Instant Book</span>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="instantBookToggle"
                checked={instantBook}
                onChange={(e) => setInstantBook(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>

        {/* ACTION EXECUTION BUTTON */}
        <button 
          type="button"
          onClick={handleApplyFilters}
          disabled={isSearching}
          className="btn btn-dark rounded-pill w-100 mt-2 py-2.5 fw-semibold d-flex align-items-center justify-content-center gap-2"
          style={{ fontSize: "14px", transition: "all 0.2s" }}
        >
          {isSearching ? "Loading..." : `Show ${totalCount} Results`}
        </button>

      </div>
    </div>
  );
};

export default PropertyFiltersSidebar;