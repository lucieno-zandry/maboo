import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, Rootstate } from "../../../utilities/redux/store";
import { refreshProduct } from "../../../utilities/redux/frontoffice/frontofficeSlice";
import LeftSide from "./LeftSide/LeftSide";
import RightSide from "./RightSide/RightSide";
import Loading from "../../../utilities/minitiatures/Loading/Loading";
import Fade from "../../../utilities/minitiatures/Fade/Fade";

const Product = React.memo(() => {
    const dispatch = useDispatch<AppDispatch>();

    const slug = useParams().slug;
    const product = useSelector((state: Rootstate) => state.frontoffice.products[slug!]);

    React.useEffect(() => {
        if (!product) {
            dispatch(refreshProduct(slug!));
        }
    }, [product]);

    return <Fade className="product-container container" show>
        {product && <>
            <LeftSide />
            <RightSide />
        </>}
        <Loading show={!product}/>
    </Fade>
})

export default Product;