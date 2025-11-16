import React, { useState } from "react";
import { Popover, Box, Slider, Typography, Button } from "@mui/material";

const FilterBar = (props) => {
  const { type, properties, setFilteredProperties } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [priceRange, setPriceRange] = useState([1500000, 2000000]);
  const [sizeRange, setSizeRange] = useState([50000, 95000]);
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");

  const handleOpen = (event, filterType) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filterType);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
  };

  const resetBedsBath = () => {
    setBedrooms("Any");
    setBathrooms("Any");
  };

  const priceFilter = (val)=>{
    setPriceRange(val)    
    const filtered = properties.filter(each => Number(String(each.total_price).replace(/[^0-9.]/g, '')) >= val[0] && Number(String(each.total_price).replace(/[^0-9.]/g, '')) <= val[1])
    setFilteredProperties(filtered)    
  }

  const landFilter = (val)=>{
    setSizeRange(val)    
    const filtered = properties.filter(each => Number(String(each.land_size).replace(/[^0-9.]/g, '')) >= val[0] && Number(String(each.land_size).replace(/[^0-9.]/g, '')) <= val[1])
    setFilteredProperties(filtered)    
  }

  const bedsBathFilter = ()=>{
    handleClose()
    if(bedrooms === "Any" && bathrooms === "Any"){
      setFilteredProperties(properties.filter(each => each.bedrooms !== null && each.bathrooms !== null))
      return;
    }
    const filtered = properties.filter(each => (each.bedrooms == bedrooms && each.bathrooms == bathrooms))
    setFilteredProperties(filtered)
  }

  const searchProperties = (query) => {
    const filtered = properties.filter(each => 
      each.address.toLowerCase().includes(query.toLowerCase()) ||
      each.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  }

  const open = Boolean(anchorEl);

  return (
    <div className="d-flex justify-content-center gap-3 my-4 flex-wrap">
      {/* Search Box */}
      <div className="input-group" style={{ maxWidth: "550px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Address, neighborhood, city, zipcode"
          onChange={(e)=>searchProperties(e.target.value)}
        />
        <span className="input-group-text bg-white">
          <i className="fa fa-search"></i>
        </span>
      </div>

      {/* Filter Buttons */}     

      <button
        className="btn btn-outline-secondary dropdown-toggle"
        onClick={(e) => handleOpen(e, "price")}
      >
        Price Range
      </button>

      {
        type == "land" && (
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            onClick={(e) => handleOpen(e, "size")}
          >
            Size
          </button>
        )
      }

      {
        type == "all" && (
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            onClick={(e) => handleOpen(e, "size")}
          >
            Size
          </button>
        )
      }

      {
        type != "land" && (
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            onClick={(e) => handleOpen(e, "bedsBath")}
          >
            Beds & Bath
          </button>
        )
      }

      <button onClick={()=>setFilteredProperties(properties)} className="btn btn-outline-secondary">
        <i className="fa fa-sliders-h"></i> Filters
      </button>

      {/* Popover Container */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 300,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        {/* Price Range */}
        {activeFilter === "price" && (
          <Box>
            <Typography variant="subtitle2" className="fw-bold mb-2">
              Price Range
            </Typography>
            <div className="d-flex justify-content-between mb-2">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              value={priceRange}
              onChange={(e, val) => priceFilter(val)}
              min={200000}
              max={5000000}
              step={50000}
              sx={{ color: "green" }}
            />
          </Box>
        )}

        {/* Size */}
        {activeFilter === "size" && (
          <Box>
            <Typography variant="subtitle2" className="fw-bold mb-2">
              Size
            </Typography>
            <div className="d-flex justify-content-between mb-2">
              <span>{sizeRange[0].toLocaleString()}sq</span>
              <span>{sizeRange[1].toLocaleString()}sq</span>
            </div>
            <Slider
              value={sizeRange}
              onChange={(e, val) => landFilter(val)}
              min={100}
              max={100000}
              step={100}
              sx={{ color: "green" }}
            />
          </Box>
        )}

        {/* Beds & Baths */}
        {activeFilter === "bedsBath" && (
          <Box>
            <Typography variant="subtitle2" className="fw-bold text-success mb-2">
              Beds & Bath
            </Typography>

            {/* Bedrooms */}
            <div className="mb-3">
              <Typography variant="subtitle2" className="text-success fw-bold mb-1">
                Bedrooms
              </Typography>
              <div className="d-flex flex-wrap gap-2">
                {["Any", "+1", "+2", "+3", "+4", "+5"].map((label) => (
                  <button
                    key={label}
                    className={`btn btn-sm ${
                      bedrooms === label ? "btn-success text-white" : "btn-outline-success"
                    } rounded-pill px-3`}
                    onClick={() => setBedrooms(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="mb-3">
              <Typography variant="subtitle2" className="text-success fw-bold mb-1">
                Bathrooms
              </Typography>
              <div className="d-flex flex-wrap gap-2">
                {["Any", "+1", "+2", "+3", "+4", "+5"].map((label) => (
                  <button
                    key={label}
                    className={`btn btn-sm ${
                      bathrooms === label ? "btn-success text-white" : "btn-outline-success"
                    } rounded-pill px-3`}
                    onClick={() => setBathrooms(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex justify-content-between align-items-center border-top pt-2">
              <Button
                onClick={resetBedsBath}
                color="inherit"
                size="small"
                sx={{ textTransform: "none" }}
              >
                Clear all
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ textTransform: "none", px: 3 }}
                onClick={bedsBathFilter}
              >
                Save
              </Button>
            </div>
          </Box>
        )}
      </Popover>
    </div>
  );
};

export default FilterBar;