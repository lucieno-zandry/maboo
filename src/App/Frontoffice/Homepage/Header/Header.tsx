import React from "react"
import { motion } from "framer-motion";

const Header = React.memo(() => {
    return <motion.header
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: .3, duration: .5 } }}
        className="header-container">
        <div className="header-gradient">
            <div className="header-content mx-5">
                <h3 className="display-5 text-secondary">Petit Trésors, Grands Bonheurs</h3>
                <p className="text-light">
                    Câlins, sourires et couches : notre spécialité.
                    Des solutions pratiques pour les parents, des rires pour les bébés
                </p>
                <a className="btn btn-outline-light header-action" href="#subscriptions">Nos Abonnements <i className="fa fa-chevron-down"></i></a>
            </div>
        </div>
    </motion.header>
});

export default Header;