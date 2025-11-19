import { useNavigate } from 'react-router-dom';
import data from '../../data.json'
import { useEffect, useState } from 'react';
import Apartment from '../../components/administer-property/Apartment';
import Pending from '../../components/administer-property/Pending';
import Land from '../../components/administer-property/Land';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate()
  const uri = useSelector(state=>state.UriReducer.uri)
  const [activeTab, setActiveTab] = useState("apartment");
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    axios.get(`${uri}property/all`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
    })
      .then((response) => {        
        setProperties(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [uri, update]);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-property')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h6 className="text-center mb-0 flex-grow-1 fw-semibold">
          Property Management
        </h6>

        <button onClick={()=>navigate('/admin/dashboard')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          ×
        </button>
      </div>

    <div className="mx-2 d-flex justify-content-center flex-row flex-nowrap overflow-auto my-4 gap-3">
        {["apartment", "land", "pending"].map((tab) => (
        <button
            key={tab}
            className={`btn ${
            activeTab === tab ? "btn-success text-white" : "btn-outline-success"
            }`}
            onClick={() => setActiveTab(tab)}
        >
            {tab === "apartment"
            ? "Apartment"
            : tab === "land"
            ? "Land"
            : "Pending Approval"}
        </button>
        ))}
    </div>
    {/* Tab Content */}
    <div className="container">
        {activeTab === "apartment" && (
        <Apartment isLoading={isLoading} update={setUpdate} properties={properties.filter(each=>each.type.toLowerCase() !== 'land' && each.publicized == 1)} />
        )}
        {activeTab === "land" && (
        <Land isLoading={isLoading} update={setUpdate} properties={properties.filter(each=>each.type.toLowerCase() === 'land' && each.publicized == 1)} />
        )}
        {activeTab === "pending" && (
        <Pending isLoading={isLoading} properties={properties.filter(each=>each.publicized == 0)} update={setUpdate} />
        )}
    </div>
    </div>
  );
}

export default PropertyManager;