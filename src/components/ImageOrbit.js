import React, { useEffect, useState, useRef } from "react";

const images = [
  { src: "https://picsum.photos/600/400?random=10", caption: "Apartment" },
  { src: "https://picsum.photos/600/400?random=11", caption: "Rent" },
  { src: "https://picsum.photos/600/400?random=12", caption: "House" },
  { src: "https://picsum.photos/600/400?random=13", caption: "Hostel" },
  { src: "https://picsum.photos/600/400?random=14", caption: "Land" },
];

export default function ImageOrbit({ intervalMs = 3000 /* total per step */, animMs = 2000 }) {
  // order: [center, top, right, bottom, left] -> stores indexes into images[]
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const rotatingRef = useRef(false);
  const [captionVisible, setCaptionVisible] = useState(true);

  useEffect(() => {
    const step = () => {
      if (rotatingRef.current) return;
      rotatingRef.current = true;

      // fade caption out shortly before swap
      setCaptionVisible(false);

      // small delay so caption fades before swap (200ms)
      setTimeout(() => {
        setOrder((prev) => {
          // rotate left: move first element to end
          return prev.slice(1).concat(prev[0]);
        });
      }, 200);

      // after animation completes (animMs) + small buffer, show caption & allow next round
      setTimeout(() => {
        setCaptionVisible(true);
        rotatingRef.current = false;
      }, animMs + 300);
    };

    // start interval
    const id = setInterval(step, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, animMs]);

  // convenience mapping
  const positions = {
    center: order[0],
    top: order[1],
    right: order[2],
    bottom: order[3],
    left: order[4],
  };

  return (
    <div className="image-orbit-page w-100">
      <div className="text-center mb-5">
        <h5 className="text-success fw-bold">Top Categories</h5>
        <p className="text-muted">Tailored Property Listings to Match Your Lifestyle</p>
      </div>

      <div className="orbit-stage w-100" aria-hidden={false}>
        {/* Top */}
        <div className="slot slot-top">
          <img src={images[positions.top].src} alt="" className="slot-img" />
        </div>

        {/* Right */}
        <div className="slot slot-right">
          <img src={images[positions.right].src} alt="" className="slot-img" />
        </div>

        {/* Bottom */}
        <div className="slot slot-bottom">
          <img src={images[positions.bottom].src} alt="" className="slot-img" />
        </div>

        {/* Left */}
        <div className="slot slot-left">
          <img src={images[positions.left].src} alt="" className="slot-img" />
        </div>

        {/* Center */}
        <div className="slot slot-center">
          <img
            src={images[positions.center].src}
            alt=""
            className={`center-img ${captionVisible ? "enter" : "exit"}`}
          />
          <div className={`center-caption ${captionVisible ? "show" : "hide"}`}>
            {images[positions.center].caption}
          </div>
        </div>
      </div>

      {/* <div className="text-center mt-4">
        <button className="btn btn-outline-success">Explore properties</button>
      </div> */}
    </div>
  );
}
