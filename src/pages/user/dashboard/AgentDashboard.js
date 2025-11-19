import { useEffect, useState } from "react";
import Avatar from '../../../assets/avatar.png'
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import Earnings from "../../../components/agent-dashboard/Earnings";
import ListedProperties from "../../../components/agent-dashboard/ListedProperties";
import Withdrawal from "../../../components/agent-dashboard/Withdrawal";
import axios from "axios";
import { useSelector } from "react-redux";
import { Skeleton, Dialog, DialogContent } from "@mui/material";

const AgentDashboard = () => {    
    const [activeTab, setActiveTab] = useState("earnings");
    const uri = useSelector(state=>state.UriReducer.uri)
    const token = sessionStorage.getItem('userToken')
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [properties, setProperties] = useState([])
    const [transactions, setTransactions] = useState([])
    const [balance, setBalance] = useState()
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
                setProperties(res.data.listedProperties)
                setTransactions(res.data.transactions)
                setUserData(res.data.account)
                setBalance(res.data.availableBalance)
                console.log(res.data);
            })
            .catch((err)=>{
                sessionStorage.removeItem('userToken')
                sessionStorage.removeItem('avatar')
                navigate('/login')
            })            
        }
    },[uri])

    return (
        <>
            <Navbar />
            <div className="bg-admin">
                <div className="container-fluid p-0 inner-bg-admin">      
                    <div className="d-flex pt-5 mt-5 px-3 px-md-5 flex-md-row flex-column">
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
                            <h2 className="text-success">Welcome to Agent’s Dashboard</h2>                            
                            {
                                isLoading 
                                ? 
                                <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem'}} /> 
                                :                         
                                <h3 className="fw-bold text-success">{userData.firstname} {userData.lastname}</h3>                                
                            }
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mx-2 d-flex justify-content-center flex-row flex-nowrap overflow-auto my-4 gap-3">
                        {["earnings", "listed", "withdrawal"].map((tab) => (
                        <button
                            key={tab}
                            className={`btn ${
                            activeTab === tab ? "btn-success text-white" : "btn-outline-success"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "earnings"
                            ? "My Earnings"
                            : tab === "listed"
                            ? "My Listed Properties"
                            : "Withdrawal"}
                        </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="container">
                        {activeTab === "earnings" && (
                        <Earnings transactions={transactions} balance={balance} />
                        )}
                        {activeTab === "listed" && (
                        <ListedProperties properties={properties} />
                        )}
                        {activeTab === "withdrawal" && (
                        <Withdrawal />
                        )}
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

export default AgentDashboard;