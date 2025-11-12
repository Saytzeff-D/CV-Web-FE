import React, { useEffect, useRef } from "react";

const Map = ({ lat, lng }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.mapboxgl || !mapContainer.current) return;

    window.mapboxgl.accessToken =
      "pk.eyJ1IjoicGF4ZGF2IiwiYSI6ImNtaGdmbDhwbzBnbmMybXM3ZW84ZThsbDcifQ.EHc4njJ4J2q3-sNv9taX_A";

    // Initialize the map only once
    const map = new window.mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [parseFloat(lng), parseFloat(lat)],
      zoom: 15,
    });

    map.addControl(new window.mapboxgl.NavigationControl());

    new window.mapboxgl.Marker({ color: "#d62828" })
      .setLngLat([parseFloat(lng), parseFloat(lat)])
      .addTo(map);

    mapRef.current = map;

    // Fallback resize after a short delay
    setTimeout(() => {
      map.resize();
    }, 500);

    return () => map.remove();
  }, [lat, lng]);

  useEffect(() => {
    // Function to handle when a tab is made visible
    const handleTabShown = () => {
      if (mapRef.current) {
        setTimeout(() => mapRef.current.resize(), 100);
      }
    };

    // Attach event listeners for all bootstrap tabs
    const tabLinks = document.querySelectorAll(
      '[data-bs-toggle="tab"], [data-bs-toggle="pill"]'
    );

    tabLinks.forEach((tab) =>
      tab.addEventListener("shown.bs.tab", handleTabShown)
    );

    return () => {
      tabLinks.forEach((tab) =>
        tab.removeEventListener("shown.bs.tab", handleTabShown)
      );
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="map-container"
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    />
  );
};

export default Map;