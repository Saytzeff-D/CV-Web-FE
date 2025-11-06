import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import Header from "../../../components/Header";
import PropertiesForYou from "../../../components/PropertiesForYou";
import Spotlight from "../../../components/Spotlight";
import ImageSlider from "../../../components/ImageSlider";
import WhatClientsSay from "../../../components/WhatClientSay";
import ImageOrbit from "../../../components/ImageOrbit";

const Home = () => {
    return (
        <div>
            <Navbar />            
            <Header />
            <PropertiesForYou />
            <ImageSlider />
            <ImageOrbit />
            <Spotlight />
            <WhatClientsSay />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;