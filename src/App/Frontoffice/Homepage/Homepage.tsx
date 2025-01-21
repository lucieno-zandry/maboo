import React from "react";
import Header from "./Header/Header";
import Sections from "./Sections/Sections";
import Footer from "./Footer/Footer";

const Homepage = React.memo(() => {
    return <div className="homepage-container">
        <Header />
        <Sections />
        <Footer />
    </div>
})

export default Homepage;