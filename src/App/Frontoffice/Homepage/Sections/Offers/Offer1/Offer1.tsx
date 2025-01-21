import React from "react";
import Checkbox from "../../../../../../utilities/minitiatures/Checkbox/Checkbox";
import { motion } from "framer-motion";

const Offer1 = React.memo(() => {
    return <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0, transition: { delay: .5, duration: .5 } }}
        className='subscription-item'>
        <div>
            <div className='subscription-name'>Boo Essentiel <small>(actuel)</small></div>
            <div className='subscription-price'>Essai gratuit en 1 mois</div>
        </div>
        <div className='subscription-pack-items'>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Découverte de nos produits et nos services"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Accès aux articles et aux forums"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
            <div className='subscription-pack-item'>
                <Checkbox
                    label="Accès à la liste des professionnels"
                    defaultChecked={true}
                    disabled={true}></Checkbox>
            </div>
        </div>
    </motion.div>
});

export default Offer1;