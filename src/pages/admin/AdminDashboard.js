import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Avatar from '../../assets/avatar.png';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Skeleton } from "@mui/material";

const AdminDashboard = () => {
    const navigate = useNavigate()
    const uri = useSelector(state=>state.uri)
    const token = sessionStorage.getItem('userToken')
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        if(!token){
            navigate('/admin/login')
        }else{
            axios.get(`${uri}auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res)=>{
                setIsLoading(false)
                sessionStorage.setItem('avatar', res.data.account.avatar)                
                setUserData(res.data.account)
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })            
        }
    },[uri])
  return (
    <div className="bg-admin">
        <div className="inner-bg-admin">
            <Navbar />
            <div className="container py-5">
            {/* ===== Header ===== */}
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
                    <h2 className="text-success">Welcome to Admin’s Dashboard</h2>
                    {
                        isLoading 
                        ? 
                        <Skeleton variant="text" animation="wave" sx={{fontSize: '1rem'}} /> 
                        :                         
                        <h3 className="fw-bold text-success">{userData.firstname} {userData.lastname}</h3>                                
                    }
                </div>
            </div>

            {/* ===== Property / Content Management ===== */}
            <section className="mb-5">
                <h4 className="fw-semibold mb-4 text-success text-center">
                    Property / Content Management
                </h4>
                <div className="row g-4 w-100">                
                    <div className="col-md-6 px-md-5 px-2">
                        <button onClick={() => navigate('/admin/property-manager')} className="btn px-5 py-3 rounded-0 btn-success me-3">
                            Property Management (Add/Edit/Delete)
                        </button>
                    </div>
                    <div className="col-md-6 px-md-5 px-2">
                        <button onClick={() => navigate('/admin/blog-manager')} className="btn px-5 py-3 rounded-0 btn-success me-3">
                            Blog Management (Add/Edit/Delete)
                        </button>                        
                    </div>
                </div>
            </section>

            {/* ===== Agent Management ===== */}
            <section className="mb-5">
                <h4 className="fw-semibold mb-4 text-success text-center">Agent Management</h4>
                <div className="d-flex justify-content-center">
                    <button onClick={()=>navigate('/admin/view-agents')} className="btn px-5 py-3 rounded-0 btn-success me-3">
                        All Agents Section
                    </button>                                                               
                </div>
            </section>

            {/* ===== Transaction / Payment Management ===== */}
            <section>
                <h4 className="fw-semibold mb-4 text-success text-center">
                Transaction / Payment Management
                </h4>
                {/* <div className="row g-4 w-100">
                {[
                    "Approve / Reject Agent Payment",
                    "Management Property Listing Payment",
                    "Track Property Performance",
                    "View All Property Inquiries",
                    "View Financial Report",
                ].map((title, i) => (
                    <div key={i} className="col-6 col-md-3 px-md-5 px-2">
                    <div
                        className="card text-center fw-semibold shadow-sm border-success card-custom"                
                    >
                        <div className="card-body py-4">
                        <p className="card-title fw-medium mb-2">{title}</p>
                        <i className="bi bi-credit-card text-success fs-5"></i>
                        </div>
                    </div>
                    </div>
                ))}
                </div> */}
            </section>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default AdminDashboard;