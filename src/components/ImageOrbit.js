import { Skeleton, Alert } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

export default function ImageOrbit({ intervalMs = 3000 /* total per step */, animMs = 2000 }) {
  const [images, setImages] = useState([{ image: "https://picsum.photos/600/400?random=10", category: "Apartment" }]);
  // order: [center, top, right, bottom, left] -> stores indexes into images[]
  const [order, setOrder] = useState([0, 1, 2, 3, 4]);
  const rotatingRef = useRef(false);
  const [captionVisible, setCaptionVisible] = useState(true);
  const uri = useSelector(state=>state.UriReducer.uri)
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

    const id = setInterval(step, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, animMs]);

  useEffect(()=>{
    axios.get(`${uri}property/top-categories`).then((response) => {
      setIsLoading(false);
      setImages((prev) => [...prev, ...response.data.data]);      
    }).catch((error) => {
      setIsLoading(false);
      setErrorMessage("Failed to load top categories.");
    });
  }, [])

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

      {
        !isLoading && images.length > 1
        ?
        <>
          <div className="orbit-wrapper">
        <div className="orbit-stage w-100" aria-hidden={false}>
          {/* Top */}
          <div className="slot slot-top">
            <img src={images[positions.top]?.image} alt="" className="slot-img" />
          </div>

          {/* Right */}
          <div className="slot slot-right">
            <img src={images[positions.right]?.image} alt="" className="slot-img" />
          </div>

          {/* Bottom */}
          <div className="slot slot-bottom">
            <img src={images[positions.bottom]?.image} alt="" className="slot-img" />
          </div>

          {/* Left */}
          <div className="slot slot-left">
            <img src={images[positions.left]?.image} alt="" className="slot-img" />
          </div>

          {/* Center */}
          <div className="slot slot-center">
            <img
              src={images[positions.center]?.image}
              alt=""
              className={`center-img ${captionVisible ? "enter" : "exit"}`}
            />
            <div className={`center-caption ${captionVisible ? "show" : "hide"}`}>
              {images[positions.center]?.category}
            </div>
          </div>
        </div>
      </div>
        </>
        :
        !isLoading && errorMessage
        ?
        <Alert severity="error" className="w-100">{errorMessage}</Alert>
        :
        <div className="orbit-wrapper">
        <div className="orbit-stage w-100" aria-hidden={false}>
          {/* Top */}
          <div className="slot slot-top">
            <Skeleton variant="rectangular" width={"100%"} height={150} />
          </div>

          {/* Right */}
          <div className="slot slot-right">
            <Skeleton variant="rectangular" width={"100%"} height={150} />
          </div>

          {/* Bottom */}
          <div className="slot slot-bottom">
            <Skeleton variant="rectangular" width={"100%"} height={150} />
          </div>

          {/* Left */}
          <div className="slot slot-left">
            <Skeleton variant="rectangular" width={"100%"} height={150} />
          </div>

          {/* Center */}
          <div className="slot slot-center">
            <Skeleton variant="rectangular" width={"100%"} height={150} />
            <Skeleton variant="text" width={"60%"} height={30} className="mt-3" />
          </div>
        </div>
      </div>
      }
    </div>
  );
}