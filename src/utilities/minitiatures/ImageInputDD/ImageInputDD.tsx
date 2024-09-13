import React from "react";

export type Image = {
    imageData: File | null,
    imageUrl?: string
}

type Props = {
    id: string,
    className?: string,
    size?: 'lg' | 'md' | 'sm',
    addImage: (image: Image) => void,
    removeImage: (url: string) => void
    imageUrl?: string,
    maxAllowedSize?: number
}

const DEFAULTMAXALLOWEDSIZE = 2000000;

const authorizedFileType = 'image';

const ImageInputDD = React.memo((props: Props) => {
    const { size = 'lg', addImage, removeImage, imageUrl, id, className = '', maxAllowedSize = DEFAULTMAXALLOWEDSIZE} = props;

    const imageMaxHeight = React.useMemo(() => {
        switch (size) {
            case 'sm':
                return '100px';

            case 'md':
                return '200px';

            default:
                return '250px';
        }
    }, [size]);

    const handleAllowDrop = React.useCallback((e: any) => {
        e.preventDefault();
    }, []);

    const handleChange = React.useCallback((e: any) => {
        e.preventDefault();
        const files = e.type === 'drop' ? e.dataTransfer.files : e.target.files;

        const imageData = files[0] as File | null;

        if (imageData && imageData.type.includes(authorizedFileType) && imageData.size <= maxAllowedSize) {
            const Reader = new FileReader;

            Reader.readAsDataURL(imageData);
            Reader.onload = () => {
                const imageUrl = Reader.result as string;
                addImage({ imageData, imageUrl });
            }
        }
    }, [addImage]);

    return <>
        {!imageUrl &&
            <label className={'dragAndDrop ' + className}
                onDragOver={handleAllowDrop}
                onDrop={handleChange}
                htmlFor={id}>

                <input
                    type="file"
                    hidden={true}
                    onChange={handleChange}
                    accept="image/*"
                    id={id} />

                <div className="dragAndDropDescription">
                    <div className="d-flex justify-content-center">
                        <i className="fa fa-upload"></i>
                    </div>
                    {size !== 'sm' &&
                        <div>Drag and Drop</div>}
                </div>
            </label>}

        {imageUrl && <div
            className={"imageInputDiv " + className}>
            <span onClick={() => removeImage(imageUrl)}><i className="fa fa-xmark"></i></span>
            <img
                src={imageUrl}
                className="img-fluid img-thumbnail"
                alt="Just inserted image"
                style={{ maxHeight: imageMaxHeight }}
            />
        </div>}
    </>
});

export default ImageInputDD;