import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useParams } from "react-router-dom";
import Details from "../../../components/land/details";
import Map from "../../../components/apartment/map";
import Realtor from "../../../components/apartment/realtor";
import Landmarks from "../../../components/land/landmarks";
import Booking from "../../../components/Booking";
import { useSelector } from "react-redux";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";

const images = [
  "https://picsum.photos/900/500?random=2",
  "https://picsum.photos/300/180?random=3",
  "https://picsum.photos/300/180?random=4",
  "https://picsum.photos/300/180?random=5"  
];

const ApartmentDetails = () => {
  const { type, id } = useParams();
  const [mainIndex, setMainIndex] = useState(0);
  const uri = useSelector(state=>state.uri)
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    axios.get(`${uri}property/${id}`)
      .then((response) => {
        console.log("Fetched property details:", response.data);
        setProperty(response.data.data);
        // You can set the fetched data to state here if needed
      })
      .catch((error) => {
        console.error("Error fetching property details:", error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [uri, id]);


  return (
    <>
      <Navbar />
      {
        property &&
      <div className="container py-5 my-5">        
        <div className="my-3">
          <h3 className="fw-bold mb-1">{property.name}</h3>
          <div className="d-flex justify-content-between">
            <div>
              <p className="text-muted mb-0">
                {property.address}
              </p>
            </div>
            <div className="d-flex justify-content-end mb-3 gap-2">
              <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Share">
                <i className="fa fa-share"></i> Share
              </button>
              <button className="btn btn-light btn-sm btn-circle shadow-sm" title="Save">
                <i className="fa fa-heart-o"></i> Save
              </button>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="rounded overflow-hidden">
              <img
                src={property.main_photo}
                alt="main"
                className="img-fluid w-100"
                style={{ height: 300, objectFit: "cover", borderRadius: 8 }}
              />
            </div>            
          </div>          
          <div className="col-lg-5">                                
            {/* thumbnail grid (two columns inside the col-4) */}
            <div className="row g-2 thumbnail-grid">
              {property.resources.map((src, i) => (
                <div key={i} className="col-6">
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    onClick={() => setMainIndex(i)}
                    className={
                      "img-fluid thumb-img thumb-active"
                    }
                    style={{ width: "100%", height:  145, objectFit: "cover", borderRadius: 8 }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-muted small d-flex justify-content-end">
            <p>
                30 days on <b className="text-dark">C&V</b> · <b className="text-dark">300</b> views · <b className="text-dark">20</b> saves
            </p>
          </div>
        </div>

        <div>
          <span className="h4 fw-bold">N{property.total_price}</span>
        </div>

        {/* SECOND ROW: TABS (col-8) + BOOKING CARD (col-4) */}
        <div className="row g-4 mt-4">
          {/* TABS & CONTENT */}
          <div className="col-lg-8">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#details">
                  Details
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#map">
                  Map
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#realtor">
                  Realtor
                </button>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="details">
                <Details property={property} />
              </div>

              <div className="tab-pane fade" id="map">
                <Map lat={property.latitude} lng={property.longitude} />
              </div>

              <div className="tab-pane fade" id="realtor">
                <Realtor />
              </div>
            </div>
          </div>

          {/* BOOKING CARD (beside tabs) */}
          <div className="col-lg-4">
            <Booking type={type} property={property} />
          </div>
        </div>
      </div>
      }
      <Dialog open={isLoading} PaperProps={{
          style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          }
      }}
      >
          <DialogContent>
              <p>
                  <span className='spinner-border text-white'></span>
              </p>
          </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}

export default ApartmentDetails;