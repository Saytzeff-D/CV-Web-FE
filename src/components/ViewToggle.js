import { useState } from "react";

export default function ViewToggle() {
  const [view, setView] = useState("list");

  return (
    <div className="view-toggle d-inline-flex">
      <button
        className={`toggle-btn ${view === "list" ? "active" : ""}`}
        onClick={() => setView("list")}
      >
        <i className="fa fa-list me-2"></i>
        List View
      </button>

      <button
        className={`toggle-btn ${view === "map" ? "active" : ""}`}
        onClick={() => setView("map")}
      >
        <i className="fa fa-map me-2"></i>
        Map View
      </button>
    </div>
  );
}