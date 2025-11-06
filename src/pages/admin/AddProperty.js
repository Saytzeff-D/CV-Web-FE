import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import data from "../../data.json"

const AddProperty = () => {
  const featuredOptions = data.featuredOption;
  const navigate = useNavigate()
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [toilets, setToilets] = useState('Any');
  const [parking, setParking] = useState('Any');
  const [features, setFeatures] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicGF4ZGF2IiwiYSI6ImNtaGdmbDhwbzBnbmMybXM3ZW84ZThsbDcifQ.EHc4njJ4J2q3-sNv9taX_A";

  const handleFeatureToggle = (feature) => {
    setFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "4-Bedroom Flat",
      location: "",
      category: "",
      total_price: "",
      type: "",
      inspection_fee: "",
      about: "",
      land_size: ""      
    },
    onSubmit: (values, { resetForm }) => {
      const finalData = {
        ...values,
        bedrooms,
        bathrooms,
        toilets,
        parking_space: parking,
        amenities:features,
        images,
        coordinates: selectedCoordinates        
      };
      console.log("Submitted Property:", finalData);
      alert("Property submitted successfully!");
      resetForm();
      setBedrooms('Any');
      setBathrooms('Any');
      setFeatures([]);
    },
  });

  let typingTimer;
  const handleLocationChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue("location", value);
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

  const handleDelete = (index) => {
    let newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const processImages = (e)=>{
      let files = e.target.files
      if (files.length == 0) {
          console.log('No file selected');
      } else {
        const allValid = Array.from(files).every(file => file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg');
        if (allValid) {
            Array.from(files).map(file => {              
              const fs = new FileReader()
              fs.readAsDataURL(file)
              fs.onload = () => {
                setImages((prev) => [...prev, fs.result]);
              };
          });
        } else {
            alert('One or more file formats not supported')
        }        
      }
  }

  const handleSuggestionClick = (place) => {
    formik.setFieldValue("location", place.place_name);
    setSelectedCoordinates({
      latitude: place.geometry.coordinates[1],
      longitude: place.geometry.coordinates[0],
    });
    setSuggestions([]); // close suggestions list
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-property')} className="d-none btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h4 className="text-center mb-0 flex-grow-1 fw-semibold">
          Add a New Property
        </h4>

        <button onClick={()=>navigate('/admin/dashboard')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Property location</label>
            <input
                type="text"
                name="location"                
                placeholder="Start typing location..."
                className={`form-control ${
                formik.touched.location && formik.errors.location ? "is-invalid" : ""
              }`}
                onBlur={formik.handleBlur}
                onChange={handleLocationChange}
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">Select category</option>
              <option value="Sales">Sales</option>
              <option value="Rent">Rent</option>
              <option value="Shortlet">Shortlet</option>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option value="">Select type</option>
              <option value="Apartment">Apartment</option>
              <option value="Hostel">Hostel</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </div>
        </div>
          {/* Beds & Baths */}
          {
            formik.values.type == 'Land'
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
                          bedrooms === opt
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
                          bathrooms === opt
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
                          toilets === opt
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
                          parking === opt
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>


        {/* Features */}
        <div className="mb-4">
          <label className="form-label fw-bold">Other Features</label>
          <div className="d-flex flex-wrap gap-2">
            {featuredOptions['General'].map((feature) => (
              <button
                key={feature}
                type="button"
                className={`btn btn-sm ${
                  features.includes(feature)
                    ? "btn-success text-white"
                    : "btn-outline-success"
                }`}
                onClick={() => handleFeatureToggle(feature)}
              >
                {feature}
              </button>
            ))}
            {
              formik.values.type && 
              featuredOptions[formik.values.type].map((feature) => (
                <button
                  key={feature}
                  type="button"
                  className={`btn btn-sm ${
                    features.includes(feature)
                      ? "btn-success text-white"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleFeatureToggle(feature)}
                >
                  {feature}
                </button>
            ))}
          </div>
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="form-label fw-bold">Upload Property Images?</label>
          <div
            className="border rounded p-4 text-center bg-light"
            style={{ maxWidth: "300px", cursor: "pointer" }}
            onClick={()=> document.getElementById('upload').click()}
          >
            <i className="bi bi-cloud-upload fs-2 text-success"></i>
            <p className="text-success mb-0">Upload Images</p>
            <i className="fa fa-cloud text-success small"></i>
            <input
              type="file"
              id="upload"
              multiple
              className="form-control mt-2 d-none"
              onChange={(e) =>
                processImages(e)
              }
            />
          </div>
        </div>
        {images.length > 0 && (
          <div className="d-flex flex-wrap gap-3 mt-3">
            {images.map((img, index) => (
              <div
                key={index}
                className="position-relative border rounded overflow-hidden mb-3"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={img}
                  alt={`upload-${index}`}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle"
                  style={{ width: "24px", height: "24px", padding: 0 }}
                  onClick={() => handleDelete(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button onClick={formik.handleSubmit} type="button" className="btn btn-success px-5">
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddProperty;