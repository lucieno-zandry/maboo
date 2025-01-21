import React from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Rootstate } from "../../../../utilities/redux/store";
import { useParams } from "react-router-dom";
import appImage from "../../../../utilities/helpers/appImage";
import Fade from "../../../../utilities/minitiatures/Fade/Fade";
import SquaredImage from "../../../../utilities/minitiatures/SquaredImage/SquaredImage";

const LeftSide = React.memo(() => {

    const slug = useParams().slug!;
    const product = useSelector((state: Rootstate) => state.frontoffice.products[slug]!);

    const [state, setState] = React.useState({
        activeIndex: 0,
    });

    const setActiveIndex = React.useCallback((index: number) => {
        setState(s => ({ ...s, activeIndex: index }));
    }, []);


    return <Fade className="left-side-container" show>
        {product.images.length > 0 ? <>
            <Carousel
                activeIndex={state.activeIndex}
                indicators={false}
                controls={false}
                className="product-image-carousel">
                {product.images.map(image => {
                    return <Carousel.Item key={image.id}>
                        <SquaredImage
                            image={appImage(image.name)}
                            className="product-carousel-image"/>
                    </Carousel.Item>
                })}
            </Carousel>
            <ul className="product-images-nav">
                {product.images.map((image, key) => {
                    return <li
                        key={key}
                        className={`product-images-nav-item ${state.activeIndex === key && 'active'}`}
                        onClick={() => setActiveIndex(key)}>
                        <img src={appImage(image.name)} className="img-thumbnail"/>
                    </li>
                })}
            </ul>
        </> : <>
            <div className="product-no-image">

            </div>
        </>}
    </Fade>
})

export default LeftSide;