import React from "react"
import HoverableProduct, { HoverableProductPlaceholder } from "../../../../../utilities/minitiatures/HoverableProduct/HoverableProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from "../../../../../utilities/redux/store";
import { refreshFeaturedProducts } from "../../../../../utilities/redux/frontoffice/frontofficeSlice";
import generateArray from "../../../../../utilities/helpers/generateArray";
import { motion } from "framer-motion";

const FeaturedProducts = React.memo(() => {
    const products = useSelector((state: Rootstate) => state.frontoffice.featuredProducts);
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!products) {
            dispatch(refreshFeaturedProducts());
        }
    }, [products]);

    return <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: .3, duration: .5 } }}
        className="featured-products container">
        <div className="section-information">
            <h5 className="display-6">
                Nos produits, les Vôtres
            </h5>
            <p className="section-description">
                Avec un soin méticuleux, nous avons sélectionné spécialement pour vous ces produits exceptionnels.
                Chaque article a été choisi avec une attention particulière pour répondre à vos besoins et à vos goûts uniques
            </p>
        </div>
        <div className="products-container">
            {products ? products.map((product) => {
                return <HoverableProduct product={product} key={product.id} />
            }) :
                generateArray(5).map((random, key) => {
                    random;
                    return <HoverableProductPlaceholder key={key} index={key} />
                })}
        </div>
    </motion.section>
});

export default FeaturedProducts;