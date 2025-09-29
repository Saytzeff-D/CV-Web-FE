import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Header from "../components/Header";
import PropertiesForYou from "../components/PropertiesForYou";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <PropertiesForYou />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;