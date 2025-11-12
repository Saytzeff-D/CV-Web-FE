import { useEffect, useState } from "react";
import TransactionHistory from "../../../components/client-dashboard/TransactionHistory";
import ActiveBookings from "../../../components/client-dashboard/ActiveBookings";
import SavedProperties from "../../../components/client-dashboard/SavedProperties";
import data from '../../../data.json'
import Avatar from '../../../assets/avatar.png'
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Skeleton, Dialog, DialogContent } from "@mui/material";

const ClientDashboard = () => {
    const uri = useSelector(state=>state.uri)
    const recommendedProperties = data.recommendedProperties;
    const [activeTab, setActiveTab] = useState("transactions");
    const token = sessionStorage.getItem('userToken')
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [savedProperties, setSavedProperties] = useState([])
    const [transactions, setTransactions] = useState([])
    const [bookings, setBookings] = useState([])
    const [openDialog, setOpenDialog] = useState(true)

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }else{
            axios.get(`${uri}auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setIsLoading(false)
                setOpenDialog(false)
                sessionStorage.setItem('avatar', res.data.account.avatar)
                setBookings(res.data.activeBookings)
                setTransactions(res.data.transactions)
                setSavedProperties(res.data.savedProperties)
                setUserData(res.data.account)
                console.log(res.data);
            })
            .catch((err)=>{
                navigate('/login')
            })            
        }
    },[uri])
    return (
        <>
            <Navbar />
            <div className="bg-admin">
                <div className="container-fluid p-0 inner-bg-admin"> 
                    <div className="d-flex pt-5 mt-5 px-md-5 px-3 flex-md-row flex-column">
                        <div className="me-2">
                            {isLoading ? <Skeleton variant="circular" width={150} height={150} /> : (
                            <img
                            src={userData.avatar}
                            alt="profile"
                            className="rounded-circle border border-3 border-white mb-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />)}
                        </div>                                                
                        <div className="ms-2 pt-4">
                            <h2 className="text-success">Welcome to Client’s Dashboard</h2>                            
                            {isLoading ? <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem'}} /> : (
                            <h3 className="fw-bold text-success">{userData.firstname} {userData.lastname}</h3>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mx-2 d-flex justify-content-center flex-row flex-nowrap overflow-auto my-4 gap-3">
                        {["transactions", "bookings", "saved"].map((tab) => (
                        <button
                            key={tab}
                            className={`btn ${
                            activeTab === tab ? "btn-success text-white" : "btn-outline-success"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "transactions"
                            ? "Transaction History"
                            : tab === "bookings"
                            ? "Active Bookings"
                            : "Saved Property"}
                        </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="container">
                        {activeTab === "transactions" && (
                        <TransactionHistory transactions={transactions} isLoading={isLoading} />
                        )}
                        {activeTab === "bookings" && (
                        <ActiveBookings bookings={bookings} isLoading={isLoading} />
                        )}
                        {activeTab === "saved" && (
                        <SavedProperties savedProperties={savedProperties} isLoading={isLoading} />
                        )}
                    </div>

                    {/* Recommended Properties */}
                    <div className="mt-5 py-4">
                        <div className="container">
                        <h4 className="fw-bold mb-3 px-4 px-md-0">Recommended Property</h4>
                        <div className="row g-3 w-100 px-4 px-md-0">
                            {recommendedProperties.map((property, index) => (
                            <div className="col-md-6 col-lg-3" key={index}>
                                <div className="card border-0 shadow-sm">
                                <div className="position-relative overflow-hidden rounded">
                                    <img
                                    src={property.image}
                                    className="card-img-top"
                                    alt={property.title}
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                                <button type="button"
                                    className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                                    <i className="fa fa-heart-o"></i>
                                </button>
        
                                <Link to={'/buy/house'}
                                    className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                                    See More
                                </Link>
                                </div>
                                <div className="card-body">
                                    <h6 className="fw-bold">{property.title}</h6>
                                    <p className="mb-1 text-muted small">{property.location}</p>
                                    <p className="fw-bold text-success">{property.price}</p>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
            <Footer />
            <Dialog open={openDialog} PaperProps={{
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
        </>
    )
}

export default ClientDashboard;