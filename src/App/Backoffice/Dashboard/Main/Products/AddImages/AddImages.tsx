import React from "react";
import generateArray from "../../../../../../utilities/helpers/generateArray";
import ImageInputDD, { Image } from "../../../../../../utilities/minitiatures/ImageInputDD/ImageInputDD";

type Props = {
    count?: number,
    addImage: (image: Image) => void,
    removeImage: (url: string) => void,
    images: Image[],
}

const AddImages = React.memo((props: Props) => {
    const { count = 4, images, ...imageInpuDDProps} = props;
    const length = React.useMemo(() => (images.length + 1) < count ? images.length + 1 : count, [count, images]);

    return <div className="add-images-container d-flex gap-1">
        {generateArray(length).map((any, key) => {
            any
            return <ImageInputDD
                key={key}
                imageUrl={images[key]?.imageUrl}
                {...imageInpuDDProps}
                id={'image-input-dd' + key} />
        })}
    </div>
});

export default AddImages;