import React from "react";
import Categories from "./Categories/Categories";
import Functionnalities from "./Functionnalities/Functionnalities";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Offers from "./Offers/Offers";

const Sections = React.memo(() => {
    return <main className="sections-container">
        <Categories />
        <Functionnalities />
        <FeaturedProducts />
        <Offers />
    </main>
})

export default Sections;