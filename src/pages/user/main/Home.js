import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Newsletter from "../../../components/Newsletter";
import Header from "../../../components/Header";
import PropertiesForYou from "../../../components/PropertiesForYou";
import Spotlight from "../../../components/Spotlight";
import ImageSlider from "../../../components/ImageSlider";
import WhatClientsSay from "../../../components/WhatClientSay";
import ImageOrbit from "../../../components/ImageOrbit";
import ExperienceMore from "../../../components/ExperienceMore";
import GrowYourBusiness from "../../../components/GrowYourBusiness";

const Home = () => {
    useEffect(() => {
        document.title = "CV Properties - Home";
      }, []);
    return (
        <div>
            <Navbar />            
            <Header />
            <PropertiesForYou />                    
            <Spotlight />
            <ImageSlider />
            <GrowYourBusiness />
            <ExperienceMore />
            <WhatClientsSay />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;