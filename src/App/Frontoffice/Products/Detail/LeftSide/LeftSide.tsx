import React from "react";
import { Carousel } from "react-bootstrap";
import appImage from "../../../../../utilities/helpers/appImage";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import SquaredImage from "../../../../../utilities/minitiatures/SquaredImage/SquaredImage";
import { Product } from "../../../../../utilities/constants/types";

type Props = { product: Product };

const LeftSide = React.memo((props: Props) => {
    const { product } = props;

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
                {product.images.map(image => (
                    <Carousel.Item key={image.id}>
                        <SquaredImage
                            image={appImage(image.name)}
                            className="product-carousel-image"/>
                    </Carousel.Item>
                ))}
            </Carousel>
            <ul className="product-images-nav">
                {product.images.map((image, key) => (
                    <li
                        key={key}
                        className={`product-images-nav-item ${state.activeIndex === key && 'active'}`}
                        onClick={() => setActiveIndex(key)}>
                        <img src={appImage(image.name)} className="img-thumbnail"/>
                    </li>
                ))}
            </ul>
        </> : <>
            <div className="product-no-image"></div>
        </>}
    </Fade>
})

export default LeftSide;
