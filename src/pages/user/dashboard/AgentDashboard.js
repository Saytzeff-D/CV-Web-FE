import { useState } from "react";
import Avatar from '../../../assets/avatar.png'
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import Earnings from "../../../components/agent-dashboard/Earnings";
import ListedProperties from "../../../components/agent-dashboard/ListedProperties";
import Withdrawal from "../../../components/agent-dashboard/Withdrawal";

const AgentDashboard = () => {    
    const [activeTab, setActiveTab] = useState("earnings");

    return (
        <>
            <Navbar />
            <div className="bg-admin">
                <div className="container-fluid p-0 inner-bg-admin">      
                    <div className="d-flex pt-5 mt-5 px-3 px-md-5 flex-md-row flex-column">
                        <div className="me-2">
                            <img
                            src={Avatar}
                            alt="profile"
                            className="rounded-circle border border-3 border-white mb-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="ms-2 pt-4">
                            <h2 className="text-success">Welcome to Agent’s Dashboard</h2>
                            <h3 className="fw-bold text-success">Iyanda Peter</h3>
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
                        <Earnings />
                        )}
                        {activeTab === "listed" && (
                        <ListedProperties />
                        )}
                        {activeTab === "withdrawal" && (
                        <Withdrawal />
                        )}
                    </div>                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AgentDashboard;