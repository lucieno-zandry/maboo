import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";

const Functionnalities = React.memo(() => {
    return <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: .3, duration: .5 } }}
        className="functionnalities-container">
        <div className="section-information container">
            <h5 className="section-title display-6">Faites-nous confiance</h5>
            <p className="section-description">
                La confiance est la chose même que tout le monde dans ce monde désire, ou du moins devrait désirer les uns des autres.
                Qui veut avoir une amitié ou une relation sans confiance ? Personne ne le fait.
            </p>
        </div>
        <Carousel controls={false}>
            <Carousel.Item>
                <div className="functionnality-gradient">
                    <div className="functionnality-content">
                        <h6>
                            Conseils et astuces
                        </h6>
                        <p>
                            Grâce à notre expérience en tant que parents et à notre formation en puériculture,
                            nous sommes en mesure de conseiller les jeunes parents sur l’allaitement,
                            les soins du nouveau-né et le développement de l’enfant.
                        </p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="functionnality-gradient">
                    <div className="functionnality-content">
                        <h6>
                            Produits adaptés
                        </h6>
                        <p>
                            Notre expertise en matière de vêtements de maternité nous permet d’aider les
                            futures mamans à choisir des tenues adaptées à leur morphologie et à chaque étape de leur grossesse.
                        </p>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="functionnality-gradient">
                    <div className="functionnality-content">
                        <h6>
                            Nourritures et alimentations
                        </h6>
                        <p>
                            En tant que diététiciens, nous guidons nos clients vers des choix alimentaires équilibrés
                            en fonction de leurs besoins nutritionnels.
                        </p>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    </motion.section>
});

export default Functionnalities;