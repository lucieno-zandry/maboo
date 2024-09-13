import React from "react";
import SquaredImage from "../SquaredImage/SquaredImage";
import { createPortal } from "react-dom";
import Fade from "../Fade/Fade";

type Props = {
    imageUrl: string,
    onHide: () => void,
}

const ImagePreview = React.memo((props: Props) => {
    
    return createPortal(<Fade
        className="product-variant-preview"
        show={Boolean(props.imageUrl)}
        onClick={props.onHide}>
        <SquaredImage
            image={props.imageUrl}
            layout />
    </Fade>, document.body)
});

export default ImagePreview;