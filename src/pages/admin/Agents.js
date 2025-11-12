import React, { useEffect, useState } from "react";
import data from "../../data.json"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const uri = useSelector(state=>state.uri)

  useEffect(()=>{
    axios.get(`${uri}admin/customers`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('userToken')}` }
    })
    .then((res)=>{
      console.log("Fetched agents:", res.data);
      setAgents(res.data.allCustomers);
    })
    .catch((err)=>{
      console.error("Error fetching agents:", err);
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }, [uri]);

  const handleSuspend = (agent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agent.id ? { ...a, status: "suspended" } : a))
    );
  };

  const handleRestore = (agent) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agent.id ? { ...a, status: "active" } : a))
    );
  };

  const handleAssign = (agent) => {
    alert(`Assign a property to ${agent.name}`);
  }; 

  return (
    <div className="container py-5 px-5"> 
    <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-blog')} className="d-none btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h6 className="text-center mb-0 flex-grow-1 fw-semibold">
          User Management
        </h6>

        <button onClick={()=>navigate('/admin/dashboard')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          ×
        </button>
      </div>    
      <div className='d-flex justify-content-center'>
        <div className='col-md-9'>
            <div>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button className="nav-link active border-0 text-dark" data-bs-toggle="tab" data-bs-target="#active_agents">
                        Active Agents
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#suspended_agents">
                        Suspended Agents
                        </button>
                    </li>                    
                    <li className="nav-item">
                        <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#customers">
                        Customers
                        </button>
                    </li>  
                </ul>

                <div className="tab-content">
                    <div className="tab-pane fade show active" id="active_agents">
                        {
                            isLoading ? (
                                <p className="text-center text-muted">Loading active agents...</p>
                            ) : null
                        }
                        {
                            agents.length === 0 && !isLoading && (
                                <p className="text-center text-muted">No active agents found.</p>
                            )
                        }
                        {
                          agents                            
                            .map((agent) => (
                              <div
                                key={agent.id}
                                className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white flex-md-row flex-column"
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={agent.avatar}
                                    alt={agent.firstname}
                                    className="rounded-circle"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                  />
                                  <div>
                                    <h6 className="fw-bold mb-0">
                                      {agent.firstname}{" "}
                                      <span
                                        className="badge bg-success ms-2"
                                        style={{ fontSize: "0.7rem" }}
                                      >
                                        Active
                                      </span>
                                    </h6>
                                    <p className="text-dark small mb-0">
                                      Experience level: {agent.level}
                                    </p>
                                    <p className="text-dark small mb-0">
                                      Property listed: {agent.listed}
                                    </p>
                                    <p className="text-dark small mb-0">
                                      Location: {agent.location}
                                    </p>
                                  </div>
                                </div>

                                <div className="d-flex gap-2 mt-3 mt-md-0">
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => handleAssign(agent)}
                                  >
                                    Assign a Property
                                  </button>              
                                  <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleSuspend(agent)}
                                  >
                                    Suspend
                                  </button>
                                </div>
                              </div>
                            ))}
                    </div>
                    <div className="tab-pane fade" id="suspended_agents">
                        {
                            isLoading ? (
                                <p className="text-center text-muted">Loading suspended agents...</p>
                            ) : null
                        }
                        {
                            agents.length === 0 && !isLoading && (
                                <p className="text-center text-muted">No suspended agents found.</p>
                            )
                        }
                        {
                          agents
                            .filter((a) => a.status === "suspended")
                            .map((agent) => (
                              <div
                                key={agent.id}
                                className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white flex-md-row flex-column"
                              >
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="rounded-circle"
                                    style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                  />
                                  <div>
                                    <h6 className="fw-bold mb-0">
                                      {agent.name}{" "}
                                      <span
                                        className="badge bg-secondary ms-2"
                                        style={{ fontSize: "0.7rem" }}
                                      >
                                        Inactive
                                      </span>
                                    </h6>
                                    <p className="text-dark small mb-0">
                                      Experience level: {agent.level}
                                    </p>
                                    <p className="text-dark small mb-0">
                                      Property listed: {agent.listed}
                                    </p>
                                    <p className="text-dark small mb-0">
                                      Location: {agent.location}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  className="btn btn-success btn-sm mt-3 mt-md-0"
                                  onClick={() => handleRestore(agent)}
                                >
                                  Restore This Agent
                                </button>
                              </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
      </div>       
    </div>
  );
};

export default AgentsPage;