import React from "react";
import Offer1 from "./Offer1/Offer1";
import Offer2 from "./Offer2/Offer2";
import Offer3 from "./Offer3/Offer3";

import { motion } from "framer-motion";


const Offers = React.memo(() => {
    return <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: .3, duration: .5 } }}
        className="offers-container"
        id="subscriptions">
        <div className="section-information">
            <h5 className="display-6">Nos Offres</h5>
            <p>
                Que vous soyez parent, grand-parent ou futur parent, vous trouverez chez nous tout ce dont vous avez besoin pour prendre soin de votre bébé.
            </p>
        </div>
        <div className="offers">
            <div className='subscriptions' id='subscriptions'>
                <div className='subscription-items'>
                    <Offer1 />
                    <Offer2 />
                    <Offer3 />
                </div>
            </div>
        </div>
    </motion.section>
});

export default Offers;