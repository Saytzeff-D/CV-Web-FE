import React, { use, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import data from "../../data.json"
import axios from "axios";
import { useSelector } from "react-redux";
import { addPropertySchema } from "../../schemas";
import { Snackbar, Button, IconButton } from "@mui/material";

const EditProperty = () => {
  const [featuredOptions, setFeaturedOptions] = useState([]);
  const navigate = useNavigate()
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [toilets, setToilets] = useState('Any');
  const [parking, setParking] = useState('Any');
  const [features, setFeatures] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);  
  const uri = useSelector(state=>state.uri)
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = sessionStorage.getItem('userToken')
  const route = sessionStorage.getItem('route')
  const edit = sessionStorage.getItem('editProperty')

  useEffect(() => {
    setBathrooms(edit ? JSON.parse(edit).bathrooms : 'Any');
    setBedrooms(edit ? JSON.parse(edit).bedrooms : 'Any');
    setToilets(edit ? JSON.parse(edit).toilets : 'Any');
    setParking(edit ? JSON.parse(edit).parking_space : 'Any'); 
    // setFeatures(edit ? JSON.parse(edit).amenities : []);      
  }, [edit]);

  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicGF4ZGF2IiwiYSI6ImNtaGdmbDhwbzBnbmMybXM3ZW84ZThsbDcifQ.EHc4njJ4J2q3-sNv9taX_A";

  const handleFeatureToggle = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };  

  useEffect(()=>{
    if (edit) {
        axios.get(`${uri}property/amenities`)
          .then((response) => {
            setIsFetching(false);          
            setFeaturedOptions(response.data.data);        
          })
          .catch((error) => {
            setIsFetching(false);
            alert("Failed to fetch amenities. Kindly reload page");
            console.error("Error fetching amenities:", error);
          });            
    }else route == '/admin/dashboard' ? navigate('/admin/property-manager') : navigate('/agent/dashboard');
    }, [uri]);

  const formik = useFormik({
    initialValues: {
      name: edit ? JSON.parse(edit).name : "",
      address: edit ? JSON.parse(edit).address : "",
      category: edit ? JSON.parse(edit).category : "",
      total_price: edit ? JSON.parse(edit).total_price : "",
      type: edit ? JSON.parse(edit).type : "",
      inspection_fee: edit ? JSON.parse(edit).inspection_fee : "",
      about: edit ? JSON.parse(edit).about : "",
      land_size: edit ? JSON.parse(edit).land_size : ""      
    },
    validationSchema: addPropertySchema,
    onSubmit: (values, { resetForm }) => {
      const finalData = {
        ...values,
        bedrooms,
        bathrooms,
        toilets,
        parking_space: parking,
        // amenities:features,        
        coordinates: selectedCoordinates        
      };
      setIsLoading(true);
      console.log("Submitted Property:", finalData);
      axios.patch(`${uri}property/update/${JSON.parse(edit).id}`, finalData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          setIsLoading(false);
          // resetForm();
          // setBedrooms('Any');
          // setBathrooms('Any');
          // setFeatures([]);
          route == '/admin/dashboard' ? navigate('/admin/property-manager') : navigate('/agent/dashboard')
          setSuccessMessage("Property submitted successfully!");
        })
        .catch((err) => {
          setIsLoading(false);
          setErrorMessage("Failed to submit property. Kindly try again");
          console.error("Error submitting property:", err);
        });    
    },
  });

  let typingTimer;
  const handleAddressChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("address", value);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => fetchSuggestions(value), 500);
  };

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=10`
      );
      const data = await res.json();
      console.log(data);
      if (data.features) {
        setSuggestions(data.features);
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    } finally {
      setLoading(false);
    }
  };  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessMessage('');
    setErrorMessage('');
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        &times;
      </IconButton>
    </React.Fragment>
  );

  const handleSuggestionClick = (place) => {
    formik.setFieldValue("address", place.place_name);
    setSelectedCoordinates({
      latitude: place.geometry.coordinates[1],
      longitude: place.geometry.coordinates[0],
    });
    setSuggestions([]); // close suggestions list
  };

  const closeProperty = () => {
    setSuccessMessage('');
    setErrorMessage('');    
    sessionStorage.removeItem('editProperty');
    navigate(route == '/admin/dashboard' ? '/admin/property-manager' : '/agent/dashboard');
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-property')} className="d-none btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h4 className="text-center mb-0 flex-grow-1 fw-semibold">
          Edit Property
        </h4>

        <button onClick={() => closeProperty()} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          ×
        </button>
      </div>

    <div className="d-flex justify-content-center">
      <form className="col-md-8" onSubmit={formik.handleSubmit}>
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name of listing property?</label>
            <input
              type="text"
              name="name"              
              placeholder="Enter name"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Property location</label>
            <input
                type="text"
                name="address"  
                value={formik.values.address}              
                placeholder="Start typing address..."
                className={`form-control ${
                formik.touched.address && formik.errors.address ? "is-invalid" : ""
              }`}
                onBlur={formik.handleBlur}
                onChange={handleAddressChange}
                autoComplete="off"
            />

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 shadow-sm"
              style={{
                zIndex: 1050,
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              {suggestions.map((place) => (
                <li
                  key={place.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(place)}
                  style={{ cursor: "pointer" }}
                >
                  {place.place_name}
                </li>
              ))}
            </ul>
          )}

          {loading && (
            <div className="text-muted small mt-1">Fetching suggestions...</div>
          )}
        </div>          
        </div>

        {/* Row 2 */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Property Category?</label>
            <select
              name="category"              
              className={`form-select ${
                formik.touched.category && formik.errors.category ? "is-invalid" : ""
              }`}
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">Select category</option>
              <option value="sale">Sales</option>
              <option value="rent">Rent</option>
              <option value="shortlet">Shortlet</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">How much is this property?</label>
            <input
              type="number"
              name="total_price"              
              placeholder="Enter Amount"
              className={`form-control ${
                formik.touched.total_price && formik.errors.total_price ? "is-invalid" : ""
              }`}
              value={formik.values.total_price}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Property Type</label>
            <select
              name="type"              
              className={`form-select ${
                formik.touched.type && formik.errors.type ? "is-invalid" : ""
              }`}
              value={formik.values.type}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">Select type</option>              
              <option value="hostel">Hostel</option>
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">Property Inspection Fees</label>
            <input
              type="number"
              name="inspection_fee"            
              placeholder="Enter Amount"
              className={`form-control ${
                formik.touched.inspection_fee && formik.errors.inspection_fee ? "is-invalid" : ""
              }`}
              value={formik.values.inspection_fee}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
        </div>
          {/* Beds & Baths */}
          {
            formik.values.type == 'land'
            ?
            <>
              <div className="mb-4">
                <label className="form-label fw-semibold">Land Size</label>
                <input
                  type="text"
                  name="land_size"                  
                  placeholder="Half Plot(150m)"
                  className={`form-control ${
                    formik.touched.land_size && formik.errors.land_size ? "is-invalid" : ""
                  }`}
                  value={formik.values.land_size}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>
            </>
            :
            <div className="d-flex justify-content-between flex-md-row flex-column">
              <div className="mb-4">
                <label className="form-label fw-bold">
                  How many Bedrooms & Bathrooms?
                </label>
                <div
                  className="border rounded p-3 bg-light"
                  style={{ maxWidth: "400px" }}
                >
                  <div className="mb-2 fw-semibold">Bedrooms</div>
                  <div className="d-flex gap-2 flex-wrap mb-3">
                    {["Any", "+1", "+2", "+3", "+4", "+5"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`btn btn-sm ${
                          parseInt(bedrooms) === parseInt(opt.replace('+', '')) || (bedrooms === 'Any' && opt === 'Any')
                            ? "btn-success text-white"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setBedrooms(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="fw-semibold">Bathrooms</div>
                  <div className="d-flex gap-2 flex-wrap">
                    {["Any", "+1", "+2", "+3", "+4", "+5"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`btn btn-sm ${
                          parseInt(bathrooms) === parseInt(opt.replace('+', '')) || (bathrooms === 'Any' && opt === 'Any')
                            ? "btn-success text-white"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setBathrooms(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">
                  How many Toilets & Parking Space?
                </label>
                <div
                  className="border rounded p-3 bg-light"
                  style={{ maxWidth: "400px" }}
                >
                  <div className="mb-2 fw-semibold">Toilets</div>
                  <div className="d-flex gap-2 flex-wrap mb-3">
                    {["Any", "+1", "+2", "+3", "+4", "+5"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`btn btn-sm ${
                          parseInt(toilets) === parseInt(opt.replace('+', '')) || (toilets === 'Any' && opt === 'Any')
                            ? "btn-success text-white"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setToilets(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="fw-semibold">Parking Space</div>
                  <div className="d-flex gap-2 flex-wrap">
                    {["Any", "+1", "+2", "+3", "+4", "+5"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`btn btn-sm ${
                          parseInt(parking) === parseInt(opt.replace('+', '')) || (parking === 'Any' && opt === 'Any')
                            ? "btn-success text-white"
                            : "btn-outline-success"
                        }`}
                        onClick={() => setParking(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          }

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Write About this Property?</label>
          <textarea
            name="about"            
            rows="3"
            placeholder="Describe the property"
            className={`form-control ${
                formik.touched.about && formik.errors.about ? "is-invalid" : ""
              }`}
            value={formik.values.about}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>


        {/* Features */}
        <div className="mb-4">
          <label className="form-label fw-bold">Other Features</label>
          <div className="d-flex flex-wrap gap-2">
            {
              isFetching
              ?
              <p className="text-muted">Loading features...</p>
              :
                featuredOptions.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  className={`btn btn-sm ${
                    features.includes(feature.id)
                      ? "btn-success text-white"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  {feature.name}
                </button>
              ))
            }            
          </div>
        </div>        

        <button disabled={isLoading} onClick={formik.handleSubmit} type="button" className="btn btn-success px-5">
          {isLoading ? "Editting Property..." : "Edit Property"}
        </button>
      </form>
      <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!successMessage}
      autoHideDuration={4000}
      onClose={handleClose}
      action={action}
      message={successMessage}
    />
    <Snackbar
      open={!!errorMessage}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={4000}
      onClose={handleClose}
      action={action}
      message={errorMessage}
    />
    </div>
    </div>
  );
};

export default EditProperty;