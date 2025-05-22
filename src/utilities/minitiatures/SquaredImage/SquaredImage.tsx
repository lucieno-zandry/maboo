import React from "react";
import { motion } from "framer-motion";

type Props = {
    image?: string | null,
    className?: string,
    layout?: boolean,
}

const SquaredImage = React.memo((props: Props) => {
    const { image, className = '', layout } = props;
    const motionProps = {} as { [key: string]: any };

    if (layout && image) {
        motionProps.layoutId = image;
    }

    if (image) {
        return <motion.img
            className={`squared-image ${className}`}
            src={image}
            alt=""
            {...motionProps} />
    } else {
        return <div className={`squared-image ${className}`}></div>
    }
})

export default SquaredImage;