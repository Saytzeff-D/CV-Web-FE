import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
const navigate = useNavigate()
  const [bedrooms, setBedrooms] = useState('Any');
  const [bathrooms, setBathrooms] = useState('Any');
  const [features, setFeatures] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

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
      name: "",
      location: "",
      category: "",
      price: "",
      propertyType: "",
      inspectionFee: "",
      description: "",
      images: [],
    },
    onSubmit: (values, { resetForm }) => {
      const finalData = {
        ...values,
        bedrooms,
        bathrooms,
        features,
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

  const handleSuggestionClick = (place) => {
    formik.setFieldValue("location", place.place_name);
    setSelectedCoordinates({
      lat: place.geometry.coordinates[1],
      lng: place.geometry.coordinates[0],
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
              className="form-control"
              placeholder="Enter name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </div>
          <div className="col-md-6 mb-3 position-relative">
            <label className="form-label fw-bold">Property location</label>
            <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Start typing location..."
                value={formik.values.location}
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
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Property Category?</label>
            <select
              name="category"
              className="form-select"
              value={formik.values.category}
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
              name="price"
              className="form-control"
              placeholder="Enter Amount"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Property Type</label>
            <select
              name="propertyType"
              className="form-select"
              value={formik.values.propertyType}
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
              name="inspectionFee"
              className="form-control"
              placeholder="Enter Amount"
              value={formik.values.inspectionFee}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Write About this Property?</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            placeholder="Describe the property"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        {/* Beds & Baths */}
        <div className="mb-4">
          <label className="form-label fw-bold">
            7. How many Bedrooms & Bathrooms?
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

        {/* Features */}
        <div className="mb-4">
          <label className="form-label fw-bold">9. Other Features</label>
          <div className="d-flex flex-wrap gap-2">
            {[
              "Air Conditioning",
              "Swimming Pool",
              "Security",
              "Parking Space",
              "Borehole",
              "Fenced Compound",
              "Gym Area",
              "CCTV",
            ].map((feature) => (
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
          <label className="form-label fw-bold">10. Upload Property Images?</label>
          <div
            className="border rounded p-4 text-center bg-light"
            style={{ maxWidth: "300px" }}
          >
            <i className="bi bi-cloud-upload fs-2 text-success"></i>
            <p className="text-success mb-0">Upload Images</p>
            <input
              type="file"
              multiple
              className="form-control mt-2"
              onChange={(e) =>
                formik.setFieldValue("images", Array.from(e.target.files))
              }
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success px-5">
          Save Changes
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddProperty;