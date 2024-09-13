import React from "react";

type Props = {
    image?: string,
}

const RoundedImage = React.memo((props: Props) => {
    const { image } = props;

    if (image) {
        return <img
            className="rounded-image"
            src={image} />
    } else {
        return <div className="rounded-image"></div>
    }
})

export default RoundedImage;