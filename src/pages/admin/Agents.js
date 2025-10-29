import React, { useState } from "react";
import data from "../../data.json"

const AgentsPage = () => {

  const [agents, setAgents] = useState(data.agents);

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
      <h5 className="fw-bold text-success mb-3">Active National Agents</h5>
      {agents
        .filter((a) => a.status === "active")
        .map((agent) => (
          <div
            key={agent.id}
            className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white"
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

            <div className="d-flex gap-2">
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

      {/* Suspended Agents Section */}
      <h5 className="fw-bold text-danger mt-5 mb-3">Suspended Agents</h5>
      {agents
        .filter((a) => a.status === "suspended")
        .map((agent) => (
          <div
            key={agent.id}
            className="d-flex align-items-center justify-content-between p-3 mb-3 bg-white"
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
              className="btn btn-success btn-sm"
              onClick={() => handleRestore(agent)}
            >
              Restore This Agent
            </button>
          </div>
        ))}
    </div>
  );
};

export default AgentsPage;